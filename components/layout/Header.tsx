"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Inicio",    href: "/" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros",  href: "#nosotros" },
  { label: "Blog",      href: "#blog" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── DESKTOP PILL ── */}
      <header
        style={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 999,
          padding: "5px 5px 5px 5px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 6px rgba(0,0,0,0.05)",
        }}
        className="hidden md:flex"
      >
        {/* Logo circle */}
        <Link href="/" style={{ flexShrink: 0, marginRight: 4 }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "#eff6ff",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}>
            <svg width="22" height="22" viewBox="0 0 34 34" fill="none">
              <polygon points="17,2 30,9.5 30,24.5 17,32 4,24.5 4,9.5" stroke="#2563eb" strokeWidth="1.8" fill="#eff6ff"/>
              <circle cx="17" cy="17" r="2.6" fill="#2563eb"/>
              <circle cx="17" cy="6.5"  r="1.5" fill="#3b82f6"/>
              <circle cx="17" cy="27.5" r="1.5" fill="#3b82f6"/>
              <circle cx="7.5"  cy="12" r="1.5" fill="#3b82f6"/>
              <circle cx="26.5" cy="12" r="1.5" fill="#3b82f6"/>
              <circle cx="7.5"  cy="22" r="1.5" fill="#3b82f6"/>
              <circle cx="26.5" cy="22" r="1.5" fill="#3b82f6"/>
              <line x1="17"   y1="8"    x2="17"   y2="14.4" stroke="#2563eb" strokeWidth="1.1"/>
              <line x1="17"   y1="19.6" x2="17"   y2="26"   stroke="#2563eb" strokeWidth="1.1"/>
              <line x1="9"    y1="12.8" x2="14.6" y2="15.6" stroke="#2563eb" strokeWidth="1.1"/>
              <line x1="19.4" y1="18.4" x2="25"   y2="21.2" stroke="#2563eb" strokeWidth="1.1"/>
              <line x1="9"    y1="21.2" x2="14.6" y2="18.4" stroke="#2563eb" strokeWidth="1.1"/>
              <line x1="19.4" y1="15.6" x2="25"   y2="12.8" stroke="#2563eb" strokeWidth="1.1"/>
            </svg>
          </div>
        </Link>

        {/* Nav links */}
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            style={{
              display: "inline-flex", alignItems: "center",
              padding: "0.42rem 0.95rem",
              fontSize: "0.87rem", fontWeight: 500,
              color: "#555", textDecoration: "none",
              borderRadius: 999,
              transition: "background 0.15s, color 0.15s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f5f5f5"; (e.currentTarget as HTMLElement).style.color = "#0f0f0f"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#555"; }}
          >
            {label}
          </Link>
        ))}

        {/* CTA */}
        <Link
          href="#contacto"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "#0f0f0f", color: "#fff",
            fontSize: "0.87rem", fontWeight: 600,
            padding: "0.48rem 1.15rem",
            borderRadius: 999,
            textDecoration: "none",
            marginLeft: 4,
            transition: "background 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#2563eb"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#0f0f0f"; }}
        >
          Agendar llamada
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      </header>

      {/* ── MOBILE PILL ── */}
      <header
        style={{
          position: "fixed",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: menuOpen ? 20 : 999,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 6px rgba(0,0,0,0.05)",
          width: "calc(100vw - 32px)",
          maxWidth: 480,
          overflow: "hidden",
          transition: "border-radius 0.2s",
        }}
        className="md:hidden"
      >
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 5px 5px 5px" }}>
          <Link href="/" style={{ flexShrink: 0 }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "#0f0f0f",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 34 34" fill="none">
                <polygon points="17,2 30,9.5 30,24.5 17,32 4,24.5 4,9.5" stroke="#2563eb" strokeWidth="1.8" fill="#eff6ff"/>
                <circle cx="17" cy="17" r="2.6" fill="#2563eb"/>
              </svg>
            </div>
          </Link>

          <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "#0f0f0f", letterSpacing: "-0.02em" }}>N8n Labs</span>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "#f5f5f5", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="2.2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{ padding: "0 10px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block", padding: "0.6rem 0.85rem",
                  fontSize: "0.88rem", fontWeight: 500, color: "#555",
                  textDecoration: "none", borderRadius: 12,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f5f5f5"; (e.currentTarget as HTMLElement).style.color = "#0f0f0f"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#555"; }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                marginTop: 6, background: "#0f0f0f", color: "#fff",
                fontSize: "0.88rem", fontWeight: 600,
                padding: "0.65rem 1rem",
                borderRadius: 12, textDecoration: "none",
              }}
            >
              Agendar llamada
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
