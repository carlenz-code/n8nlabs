"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Inicio",           href: "/" },
  { label: "Servicios",        href: "#servicios" },
  { label: "¿Cómo trabajamos?", href: "#nosotros" },
  { label: "Blog",             href: "#blog" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── DESKTOP ── */}
      <header
        className="hidden md:flex"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: 64,
          alignItems: "center",
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
          transition: "background 0.3s, box-shadow 0.3s, border-color 0.3s, backdrop-filter 0.3s",
          padding: "0 2rem",
        }}
      >
        {/* Inner container */}
        <div style={{ width: "100%", maxWidth: 1170, margin: "0 auto", display: "flex", alignItems: "center", gap: 2 }}>

        {/* Logo + wordmark */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.55rem", flexShrink: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(37,99,235,0.14)", flexShrink: 0 }}>
            <img src="/logogeneral.png" alt="n8nlabs" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.025em", fontFamily: "var(--font-poppins)" }}>n8nlabs</span>
        </Link>

        {/* Nav — centered */}
        <nav style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "0.4rem 0.9rem",
                fontSize: "0.85rem", fontWeight: 500,
                color: "#555", textDecoration: "none",
                borderRadius: 8,
                fontFamily: "var(--font-poppins)",
                letterSpacing: "-0.01em",
                transition: "background 0.15s, color 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.05)"; (e.currentTarget as HTMLElement).style.color = "#0f0f0f"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#555"; }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="#agendar"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.35rem",
            background: "linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)",
            color: "#fff",
            fontSize: "0.85rem", fontWeight: 600,
            padding: "0.5rem 1.15rem",
            borderRadius: 999,
            textDecoration: "none",
            fontFamily: "var(--font-poppins)",
            letterSpacing: "-0.01em",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 2px 10px rgba(37,99,235,0.3)",
            transition: "box-shadow 0.15s, transform 0.15s",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 18px rgba(37,99,235,0.45)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 10px rgba(37,99,235,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          Agendar llamada
        </Link>
        </div>
      </header>

      {/* ── MOBILE ── */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          background: scrolled || menuOpen ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
          boxShadow: scrolled || menuOpen ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
          transition: "background 0.3s, box-shadow 0.3s, border-color 0.3s",
        }}
        className="md:hidden"
      >
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 58, padding: "0 1rem" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.45rem" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(37,99,235,0.14)", flexShrink: 0 }}>
              <img src="/logogeneral.png" alt="n8nlabs" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.025em", fontFamily: "var(--font-poppins)" }}>n8nlabs</span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="#agendar" style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              background: "linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)",
              color: "#fff", fontSize: "0.8rem", fontWeight: 600,
              padding: "0.42rem 0.85rem", borderRadius: 999,
              textDecoration: "none", whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
              fontFamily: "var(--font-poppins)",
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              Agendar
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: menuOpen ? "#f0f0f0" : "#f5f5f5",
                border: "1px solid rgba(0,0,0,0.08)",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}
              aria-label="Toggle menu"
            >
              {menuOpen
                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="2.4" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="2.4" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              }
            </button>
          </div>
        </div>

        {/* Dropdown */}
        <div style={{ maxHeight: menuOpen ? "260px" : "0", overflow: "hidden", transition: "max-height 0.3s cubic-bezier(0.4,0,0.2,1)" }}>
          <nav style={{ padding: "6px 10px 12px", display: "flex", flexDirection: "column", gap: 2, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex", alignItems: "center", padding: "0.65rem 0.85rem",
                  fontSize: "0.88rem", fontWeight: 500, color: "#444",
                  textDecoration: "none", borderRadius: 8,
                  fontFamily: "var(--font-poppins)",
                  transition: "background 0.12s, color 0.12s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f5f5f5"; (e.currentTarget as HTMLElement).style.color = "#0f0f0f"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#444"; }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
