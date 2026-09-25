import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { formatearFecha, getAllPosts, getPost } from "@/lib/blog";
import { absoluteUrl, BUSINESS, SITE_NAME } from "@/lib/site";

// Solo se generan los artículos que existen; cualquier otro slug es un 404
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: SITE_NAME,
      locale: "es_ES",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const url = absoluteUrl(`/blog/${post.slug}`);

  return (
    <main style={{ paddingTop: 96, paddingBottom: "5rem", minHeight: "100vh", background: "#fff" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              dateModified: post.updated ?? post.date,
              inLanguage: "es",
              mainEntityOfPage: url,
              author: { "@type": "Organization", name: BUSINESS.name, url: BUSINESS.url },
              publisher: { "@type": "Organization", name: BUSINESS.name, url: BUSINESS.url },
              ...(post.keyword ? { keywords: [post.keyword, ...post.tags].join(", ") } : {}),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
                { "@type": "ListItem", position: 3, name: post.title, item: url },
              ],
            },
          ],
        }}
      />
      <article style={{ maxWidth: 760, margin: "0 auto", padding: "0 1.5rem", fontFamily: "var(--font-poppins)" }}>
        <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "#2563eb", textDecoration: "none", marginBottom: "2rem" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Volver al blog
        </Link>
        <header style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "0.75rem" }}>{post.title}</h1>
          <p style={{ fontSize: "0.8rem", color: "#888" }}>
            <time dateTime={post.date}>{formatearFecha(post.date)}</time>
            {post.updated && post.updated !== post.date ? <> · Actualizado el <time dateTime={post.updated}>{formatearFecha(post.updated)}</time></> : null}
            {" · "}{post.readingMinutes} min de lectura
          </p>
        </header>
        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        <aside style={{ marginTop: "3rem", padding: "1.25rem 1.4rem", border: "1px solid #e5e5e5", borderRadius: 14, background: "#fafafa" }}>
          <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#0f0f0f", marginBottom: "0.35rem" }}>¿Quieres automatizar procesos en tu empresa?</p>
          <p style={{ fontSize: "0.85rem", color: "#555", marginBottom: "0.9rem", lineHeight: 1.55 }}>Cuéntanos tu caso en una llamada de 30 minutos y te decimos qué se puede automatizar.</p>
          <Link href="https://cal.com/n8n-automatizaciones/30min" style={{ display: "inline-block", background: "#2563eb", color: "#fff", fontSize: "0.85rem", fontWeight: 600, padding: "0.5rem 1.15rem", borderRadius: 999, textDecoration: "none" }}>
            Reservar una llamada
          </Link>
        </aside>
      </article>
    </main>
  );
}
