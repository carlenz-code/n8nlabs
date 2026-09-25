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
    <main style={{ paddingTop: 96, paddingBottom: "5rem", minHeight: "100vh", background: "#fff" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 1.5rem", fontFamily: "var(--font-poppins)" }}>
        <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>Blog</h1>
        <p style={{ fontSize: "0.95rem", color: "#555", marginBottom: "2.5rem", lineHeight: 1.6 }}>{DESCRIPCION}</p>

        {posts.length === 0 ? (
          <p style={{ fontSize: "0.9rem", color: "#888" }}>Estamos preparando los primeros artículos. Vuelve pronto.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "1.25rem" }}>
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} style={{ display: "block", textDecoration: "none", padding: "1.25rem 1.4rem", border: "1px solid #e5e5e5", borderRadius: 14, background: "#fff" }}>
                  <p style={{ fontSize: "0.75rem", color: "#888", marginBottom: "0.4rem" }}>
                    {formatearFecha(p.date)} · {p.readingMinutes} min de lectura
                  </p>
                  <h2 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#0f0f0f", letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>{p.title}</h2>
                  <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.55 }}>{p.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
