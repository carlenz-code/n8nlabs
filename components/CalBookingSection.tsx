"use client";

import Cal from "@calcom/embed-react";

export default function CalBookingSection() {
  return (
    <section style={{
      background: "#fff",
      padding: "7rem 1.5rem 8rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Left skewed rect */}
      <div style={{ position:"absolute", left:"calc(50% - 720px)", top:"-9%", width:480, height:650, borderRadius:60, background:"linear-gradient(135deg, rgba(219,234,254,0.35) 0%, rgba(191,219,254,0.15) 100%)", border:"1px solid rgba(99,153,230,0.65)", pointerEvents:"none", zIndex:0, transform:"skewY(35deg)", transformOrigin:"left top", WebkitMaskImage:"linear-gradient(to right, transparent 0%, black 22%), linear-gradient(to top, transparent 0%, black 18%), radial-gradient(ellipse 90% 65% at 0% 0%, transparent 0%, transparent 30%, black 80%)", maskImage:"linear-gradient(to right, transparent 0%, black 22%), linear-gradient(to top, transparent 0%, black 18%), radial-gradient(ellipse 90% 65% at 0% 0%, transparent 0%, transparent 30%, black 80%)", WebkitMaskComposite:"destination-in, destination-in", maskComposite:"intersect, intersect" }} />
      {/* Right skewed rect */}
      <div style={{ position:"absolute", right:"calc(50% - 720px)", top:"-9%", width:480, height:650, borderRadius:60, background:"linear-gradient(225deg, rgba(219,234,254,0.35) 0%, rgba(191,219,254,0.15) 100%)", border:"1px solid rgba(99,153,230,0.65)", pointerEvents:"none", zIndex:0, transform:"skewY(-35deg)", transformOrigin:"right top", WebkitMaskImage:"linear-gradient(to left, transparent 0%, black 22%), linear-gradient(to top, transparent 0%, black 18%), radial-gradient(ellipse 90% 65% at 100% 0%, transparent 0%, transparent 30%, black 80%)", maskImage:"linear-gradient(to left, transparent 0%, black 22%), linear-gradient(to top, transparent 0%, black 18%), radial-gradient(ellipse 90% 65% at 100% 0%, transparent 0%, transparent 30%, black 80%)", WebkitMaskComposite:"destination-in, destination-in", maskComposite:"intersect, intersect" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            border: "1px solid #e5e7eb", borderRadius: 999,
            padding: "0.28rem 0.9rem", marginBottom: "1.6rem",
            fontSize: "0.75rem", color: "#555", background: "#fff",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            Disponible esta semana
          </div>

          <h2 style={{
            fontWeight: 600,
            fontSize: "clamp(1.9rem, 3.2vw, 3rem)",
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            color: "#0f0f0f",
            margin: "0 0 1.1rem",
          }}>
            Agenda una llamada gratuita<br />
            <em style={{
              fontFamily: "Times New Roman, Georgia, serif",
              fontStyle: "italic", fontWeight: 400, color: "#2563eb",
            }}>de 30 minutos.</em>
          </h2>

          <p style={{
            fontSize: "0.95rem", color: "#888", lineHeight: 1.75,
            maxWidth: 480, margin: "0 auto",
            fontFamily: "var(--font-poppins)",
          }}>
            Cuéntanos qué proceso quieres automatizar y revisaremos cómo ayudarte con IA, n8n e integraciones a medida.
          </p>
        </div>

        {/* Cal.com inline widget */}
        <div style={{ position:"relative" }}>
          {/* Dot — top-left */}
          <div style={{ position:"absolute", left:-90, top:-80, width:340, height:300, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.55) 2px, transparent 2px)", backgroundSize:"14px 14px", WebkitMaskImage:"radial-gradient(circle at 50% 50%, black 0%, black 35%, transparent 70%)", maskImage:"radial-gradient(circle at 50% 50%, black 0%, black 35%, transparent 70%)", pointerEvents:"none", zIndex:1 }} />
          {/* Dot — top-right */}
          <div style={{ position:"absolute", right:-90, top:-80, width:340, height:300, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.55) 2px, transparent 2px)", backgroundSize:"14px 14px", WebkitMaskImage:"radial-gradient(circle at 50% 50%, black 0%, black 35%, transparent 70%)", maskImage:"radial-gradient(circle at 50% 50%, black 0%, black 35%, transparent 70%)", pointerEvents:"none", zIndex:1 }} />
          {/* Dot — bottom-left */}
          <div style={{ position:"absolute", left:-90, bottom:-80, width:340, height:300, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.55) 2px, transparent 2px)", backgroundSize:"14px 14px", WebkitMaskImage:"radial-gradient(circle at 50% 50%, black 0%, black 35%, transparent 70%)", maskImage:"radial-gradient(circle at 50% 50%, black 0%, black 35%, transparent 70%)", pointerEvents:"none", zIndex:1 }} />
          {/* Dot — bottom-right */}
          <div style={{ position:"absolute", right:-90, bottom:-80, width:340, height:300, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.55) 2px, transparent 2px)", backgroundSize:"14px 14px", WebkitMaskImage:"radial-gradient(circle at 50% 50%, black 0%, black 35%, transparent 70%)", maskImage:"radial-gradient(circle at 50% 50%, black 0%, black 35%, transparent 70%)", pointerEvents:"none", zIndex:1 }} />

          <Cal
            calLink="n8n-automatizaciones/30min"
            style={{ width: "100%", minHeight: 700, position:"relative", zIndex:2 }}
            config={{ layout: "month_view", theme: "light", background: "#ffffff" }}
          />
        </div>


      </div>
    </section>
  );
}
