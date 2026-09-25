import type { Metadata } from "next";
import Link from "next/link";
import { formatearFecha, getAllPosts } from "@/lib/blog";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const TITULO = `Blog de automatización con n8n | ${SITE_NAME}`;
const DESCRIPCION = "Guías y casos prácticos para automatizar procesos de tu empresa con n8n, WhatsApp e inteligencia artificial.";

export function generateMetadata(): Metadata {
  const hayArticulos = getAllPosts().length > 0;
  return {
    title: TITULO,
    description: DESCRIPCION,
    alternates: { canonical: absoluteUrl("/blog") },
    openGraph: { title: TITULO, description: DESCRIPCION, url: absoluteUrl("/blog"), siteName: SITE_NAME, locale: "es_ES", type: "website" },
    // Un índice vacío no debe indexarse
    robots: hayArticulos ? undefined : { index: false, follow: true },
  };
}

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <main className="blog-page">
      <div className="blog-index">
        <header className="blog-index-head">
          <h1 className="blog-title">Blog</h1>
          <p>{DESCRIPCION}</p>
        </header>

        {posts.length === 0 ? (
          <p className="blog-empty">Estamos preparando los primeros artículos. Vuelve pronto.</p>
        ) : (
          <ul className="blog-grid">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="blog-card">
                  <span className="blog-card-cat">{p.category}</span>
                  <h2>{p.title}</h2>
                  <p>{p.description}</p>
                  <span className="blog-card-meta">
                    {formatearFecha(p.date)} · {p.readingMinutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
