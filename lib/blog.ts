import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";

// Los artículos son archivos Markdown en content/blog/<slug>.md con estos datos al inicio (frontmatter):
//   title, description, date (AAAA-MM-DD), slug (opcional, por defecto el nombre del archivo),
//   keyword (opcional), tags (opcional, lista), updated (opcional), draft (opcional, true = no se publica),
//   author (opcional, por defecto «N8n Labs»), category (opcional, por defecto «Automatización»)
//
// Reglas de seguridad para que un artículo mal formado NUNCA rompa el despliegue de la web:
//  - un archivo inválido se ignora (con aviso en el log de build), no falla el build;
//  - los borradores (draft: true) y los artículos con fecha futura no se publican;
//  - el HTML incrustado en el Markdown se descarta y solo se admiten enlaces http(s), mailto, relativos y anclas.

export interface TocItem {
  id: string;
  text: string;
}

export interface PostMeta {
  slug: string;
  author: string;
  category: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  keyword?: string;
  tags: string[];
  readingMinutes: number;
}

export interface Post extends PostMeta {
  html: string;
  toc: TocItem[];
}

interface PostInterno extends Post {
  draft: boolean;
  archivo: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FECHA_RE = /^\d{4}-\d{2}-\d{2}$/;

const URL_SEGURA = /^(https?:\/\/|mailto:|\/(?!\/)|#)/i;

function escapar(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function quitarEtiquetas(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}

function slugificar(texto: string): string {
  return (
    texto
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "seccion"
  );
}

// Estado del análisis en curso (el parseo es síncrono, así que no hay solapamientos)
let tocActual: TocItem[] = [];
let idsUsados = new Set<string>();

const marked = new Marked({
  gfm: true,
  breaks: false,
  renderer: {
    // Un único <h1> por página (el del título): «# ...» y «## ...» del Markdown se renderizan como <h2>, «###» como <h3>
    heading({ tokens, depth }) {
      const html = this.parser.parseInline(tokens);
      const nivel = depth <= 2 ? 2 : 3;
      if (nivel === 3) return `<h3>${html}</h3>
`;
      const texto = quitarEtiquetas(html);
      const base = slugificar(texto);
      let id = base;
      for (let n = 2; idsUsados.has(id); n++) id = `${base}-${n}`;
      idsUsados.add(id);
      tocActual.push({ id, text: texto });
      return `<h2 id="${id}">${html}</h2>
`;
    },
    // HTML incrustado: se descarta (el contenido sale como texto plano escapado, nunca como etiquetas)
    html({ text }) {
      return escapar(text);
    },
    link({ href, title, tokens }) {
      const texto = this.parser.parseInline(tokens);
      if (!URL_SEGURA.test(href)) return texto;
      const externo = /^https?:\/\//i.test(href);
      return `<a href="${escapar(href)}"${title ? ` title="${escapar(title)}"` : ""}${externo ? ' target="_blank" rel="noopener noreferrer"' : ""}>${texto}</a>`;
    },
    image({ href, title, text }) {
      if (!/^(https:\/\/|\/(?!\/))/i.test(href)) return escapar(text);
      return `<img src="${escapar(href)}" alt="${escapar(text)}"${title ? ` title="${escapar(title)}"` : ""} loading="lazy" />`;
    },
  },
});

function leerArchivo(nombre: string): PostInterno | null {
  try {
    const bruto = fs.readFileSync(path.join(CONTENT_DIR, nombre), "utf8");
    const { data, content } = matter(bruto);
    const slug = String(data.slug ?? nombre.replace(/\.md$/, ""));
    const fecha = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");
    if (!SLUG_RE.test(slug)) throw new Error(`slug no válido: ${slug}`);
    if (typeof data.title !== "string" || !data.title.trim()) throw new Error("falta title");
    if (typeof data.description !== "string" || !data.description.trim()) throw new Error("falta description");
    if (!FECHA_RE.test(fecha) || Number.isNaN(new Date(fecha).getTime())) throw new Error("date debe ser AAAA-MM-DD");
    if (!content.trim()) throw new Error("el artículo está vacío");
    const actualizado = data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : data.updated ? String(data.updated) : undefined;
    const palabras = content.split(/\s+/).filter(Boolean).length;
    tocActual = [];
    idsUsados = new Set<string>();
    const html = marked.parse(content, { async: false }) as string;
    const toc = tocActual;
    return {
      slug,
      author: typeof data.author === "string" && data.author.trim() ? data.author.trim().slice(0, 80) : "N8n Labs",
      category: typeof data.category === "string" && data.category.trim() ? data.category.trim().slice(0, 40) : "Automatización",
      title: data.title.trim(),
      description: data.description.trim(),
      date: fecha,
      updated: actualizado && FECHA_RE.test(actualizado) ? actualizado : undefined,
      keyword: typeof data.keyword === "string" ? data.keyword : undefined,
      tags: Array.isArray(data.tags) ? data.tags.filter((t: unknown): t is string => typeof t === "string") : [],
      readingMinutes: Math.max(1, Math.round(palabras / 200)),
      html,
      toc,
      draft: data.draft === true,
      archivo: nombre,
    };
  } catch (e) {
    console.warn(`[blog] Se ignora ${nombre}: ${e instanceof Error ? e.message : e}`);
    return null;
  }
}

let cache: Post[] | null = null;

/** Artículos publicados (sin borradores ni fechas futuras), del más reciente al más antiguo. */
export function getAllPosts(): Post[] {
  // En producción se lee una sola vez por proceso de build; en desarrollo se relee para ver los cambios
  if (cache && process.env.NODE_ENV === "production") return cache;
  cache = leerTodos();
  return cache;
}

function leerTodos(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const hoy = new Date().toISOString().slice(0, 10);
  const leidos = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(leerArchivo)
    .filter((p): p is PostInterno => p !== null);

  // Un slug solo puede tener un artículo. Si dos archivos declaran el mismo, gana el que se llama igual que el slug
  // (así un artículo nuevo nunca tapa en silencio a uno ya publicado); el otro se ignora con aviso.
  const elegidos = new Map<string, PostInterno>();
  for (const p of leidos.sort((a, b) => Number(b.archivo === `${b.slug}.md`) - Number(a.archivo === `${a.slug}.md`) || a.archivo.localeCompare(b.archivo))) {
    if (elegidos.has(p.slug)) {
      console.warn(`[blog] slug duplicado «${p.slug}»: se ignora ${p.archivo} (se mantiene ${elegidos.get(p.slug)!.archivo})`);
      continue;
    }
    elegidos.set(p.slug, p);
  }

  return [...elegidos.values()]
    .filter((p) => !p.draft && p.date <= hoy)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)))
    .map(({ draft: _draft, archivo: _archivo, ...post }) => post);
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatearFecha(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
