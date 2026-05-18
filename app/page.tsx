"use client";

import { useState, useRef, useEffect, useCallback, ReactNode } from "react";
import { getCalApi } from "@calcom/embed-react";
import CalBookingSection from "@/components/CalBookingSection";

function ScrollReveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(26px)", transition: `opacity 0.75s ease ${delay}s, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s` }}>
      {children}
    </div>
  );
}

const FAQS = [
  { q: "¿Cuánto tarda una automatización típica?",  a: "Depende del flujo y las integraciones. Un workflow estándar puede estar en 1 a 2 semanas; proyectos completos suelen ir de 3 a 6 semanas." },
  { q: "¿Trabajan solo con n8n?",                   a: "Sí, somos especialistas en n8n, integraciones por API y arquitectura de workflows para operación B2B." },
  { q: "¿Necesito infraestructura propia?",         a: "Podemos trabajar sobre n8n cloud o despliegues propios. Recomendamos la opción según seguridad, volumen y criticidad." },
  { q: "¿Incluye soporte y mantenimiento?",         a: "Sí. Ofrecemos soporte, monitoreo, mejoras y optimización continua." },
  { q: "¿Qué herramientas integran?",               a: "CRM, email marketing, formularios, helpdesk, Slack, Notion, Airtable, Google Sheets, ERPs y sistemas internos vía API." },
];

function FaqSection() {
  const [open, setOpen] = useState<number>(-1);
  return (
    <section style={{ background:"#0d0f17", padding:"9rem 1.5rem 8rem", contentVisibility:"auto", containIntrinsicSize:"0 600px", position:"relative", overflow:"hidden" }}>
      {/* Subtle radial glow top-center */}
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:700, height:320, background:"radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 70%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1050, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:"5rem", alignItems:"start", position:"relative", zIndex:1 }}>

        {/* Left col */}
        <div style={{ position:"sticky", top:120 }}>
          <div style={{ fontSize:"0.68rem", fontWeight:600, color:"rgba(99,153,230,0.8)", letterSpacing:"0.18em", textTransform:"uppercase" as const, marginBottom:"1rem", fontFamily:"var(--font-poppins)" }}>Soporte</div>
          <h2 style={{ fontWeight:700, fontSize:"clamp(2rem,3vw,2.8rem)", color:"#fff", letterSpacing:"-0.035em", lineHeight:1.1, margin:"0 0 1.2rem" }}>
            Preguntas<br/>
            <em style={{ fontFamily:"Times New Roman, Georgia, serif", fontStyle:"italic", fontWeight:400, color:"rgba(99,153,230,0.9)" }}>frecuentes.</em>
          </h2>
          <p style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.4)", lineHeight:1.75, margin:"0 0 2rem", fontFamily:"var(--font-poppins)", maxWidth:260 }}>
            Todo lo que necesitas saber sobre nuestro servicio de automatización B2B con n8n.
          </p>
          <a href="#contacto" style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", fontSize:"0.82rem", fontWeight:600, color:"rgba(99,153,230,0.9)", textDecoration:"none", fontFamily:"var(--font-poppins)", borderBottom:"1px solid rgba(99,153,230,0.3)", paddingBottom:"0.1rem" }}
            onMouseEnter={e => (e.currentTarget.style.color="#fff")}
            onMouseLeave={e => (e.currentTarget.style.color="rgba(99,153,230,0.9)")}
          >
            ¿Más preguntas? Escríbenos
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>

        {/* Right col — accordion */}
        <div style={{ display:"flex", flexDirection:"column" }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderTop: i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1rem",
                    background:"transparent", border:"none", borderBottom:"1px solid rgba(255,255,255,0.07)",
                    padding:"1.4rem 0", cursor:"pointer", textAlign:"left",
                  }}
                >
                  <span style={{ fontSize:"0.93rem", fontWeight:500, color: isOpen ? "#fff" : "rgba(255,255,255,0.75)", fontFamily:"var(--font-poppins)", lineHeight:1.4, transition:"color 0.2s" }}>
                    {faq.q}
                  </span>
                  <span style={{
                    width:26, height:26, borderRadius:"50%", flexShrink:0,
                    border:"1px solid rgba(255,255,255,0.12)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    background: isOpen ? "rgba(37,99,235,0.35)" : "transparent",
                    transition:"background 0.2s, transform 0.3s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </span>
                </button>
                <div style={{ maxHeight: isOpen ? 180 : 0, overflow:"hidden", transition:"max-height 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
                  <p style={{ padding:"1rem 2.5rem 1.5rem 0", fontSize:"0.86rem", color:"rgba(255,255,255,0.5)", lineHeight:1.8, margin:0, fontFamily:"var(--font-poppins)" }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const rafId = useRef<number>(0);

  const updatePos = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    setPos(Math.min(Math.max(((clientX - left) / width) * 100, 5), 95));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => updatePos(e.clientX));
    };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafId.current);
    };
  }, [updatePos]);

  return (
    <section style={{ padding: "6rem 1.5rem 7rem", background: "#fff", contentVisibility:"auto", containIntrinsicSize:"0 700px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontWeight: 600, fontSize: "clamp(1.8rem,3vw,2.8rem)", letterSpacing: "-0.03em", lineHeight: 1.15, color: "#0f0f0f", margin: 0 }}>
            De trabajo manual a<br/>
            <em style={{ fontFamily: "Times New Roman, Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "#2563eb" }}>automatización inteligente.</em>
          </h2>
          <p style={{ marginTop: "1rem", fontSize: "0.95rem", color: "#888", maxWidth: 420, margin: "1rem auto 0", lineHeight: 1.7 }}>
            Arrastra para ver cómo la IA transforma procesos repetitivos en flujos automáticos escalables.
          </p>
        </div>
        <div
          ref={containerRef}
          style={{ position: "relative", height: 460, borderRadius: 24, overflow: "hidden", cursor: "ew-resize", userSelect: "none", border: "1px solid #e8eaed", boxShadow: "0 8px 48px rgba(0,0,0,0.07)" }}
          onMouseDown={(e) => { isDragging.current = true; updatePos(e.clientX); }}
          onTouchStart={(e) => updatePos(e.touches[0].clientX)}
          onTouchMove={(e) => { e.preventDefault(); updatePos(e.touches[0].clientX); }}
        >
          {/* ── BEFORE ── */}
          <div style={{ position: "absolute", inset: 0, background: "#fafaf9", clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
              <div style={{ width: "100%", maxWidth: 340 }}>
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: "1.2rem 1.4rem", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
                  <div style={{ marginBottom: "0.9rem" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Sin automatización</span>
                  </div>
                  {[
                    { text: "Seguimientos olvidados",        sub: "3 leads sin respuesta · hace 5 días" },
                    { text: "Leads en hojas de cálculo",     sub: "Excel · actualizado hace 2 días" },
                    { text: "Respuestas lentas",             sub: "Tiempo medio de respuesta: 4.2h" },
                    { text: "Tareas manuales repetitivas",   sub: "2h/día copiando datos entre apps" },
                    { text: "47 emails sin enviar",          sub: "Acumulados esta semana" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", padding: "0.5rem 0", borderBottom: i < 4 ? "1px solid #f3f4f6" : "none" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: i % 2 === 0 ? "#ef4444" : "#f97316", flexShrink: 0, marginTop: 6, display: "block" }} />
                      <div>
                        <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#374151" }}>{item.text}</div>
                        <div style={{ fontSize: "0.68rem", color: "#9ca3af", marginTop: "0.1rem" }}>{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "0.7rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "0.6rem 0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.85rem" }}>⚠️</span>
                  <span style={{ fontSize: "0.72rem", color: "#b91c1c", fontWeight: 500 }}>Pérdida estimada: ~12 leads/semana</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── AFTER ── */}
          <div style={{ position: "absolute", inset: 0, background: "#f8fbff", clipPath: `inset(0 0 0 ${pos}%)` }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
              <div style={{ width: "100%", maxWidth: 340 }}>
                <div style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 16, padding: "1.2rem 1.4rem", boxShadow: "0 4px 28px rgba(37,99,235,0.09)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Con N8n + IA</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "block" }} />
                      <span style={{ fontSize: "0.65rem", color: "#22c55e", fontWeight: 500 }}>En vivo</span>
                    </div>
                  </div>
                  <div style={{ marginBottom: "0.9rem", paddingBottom: "0.9rem", borderBottom: "1px solid #f0f4ff" }}>
                    <div style={{ fontSize: "0.68rem", color: "#9ca3af" }}>Leads procesados · este mes</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.45rem", marginTop: "0.2rem" }}>
                      <span style={{ fontSize: "1.6rem", fontWeight: 700, color: "#0f0f0f", lineHeight: 1 }}>847</span>
                      <span style={{ fontSize: "0.7rem", background: "#dcfce7", color: "#16a34a", fontWeight: 600, padding: "0.1rem 0.45rem", borderRadius: 999 }}>↑ 24%</span>
                    </div>
                  </div>
                  {[
                    { text: "IA responde al instante",                  sub: "Tiempo medio: 3 segundos" },
                    { text: "Flujos automatizados",                     sub: "1,247 ejecuciones · 0 errores" },
                    { text: "CRM actualizado automáticamente",          sub: "Notion + HubSpot sincronizados" },
                    { text: "Leads organizados y calificados",          sub: "Scoring automático con GPT-4" },
                    { text: "Seguimientos y reportes automáticos",      sub: "Cada lunes a las 9:00 AM" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", padding: "0.5rem 0", borderBottom: i < 4 ? "1px solid #f0f4ff" : "none" }}>
                      <span style={{ fontSize: "0.8rem", color: "#22c55e", flexShrink: 0, marginTop: 1 }}>✓</span>
                      <div>
                        <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#374151" }}>{item.text}</div>
                        <div style={{ fontSize: "0.68rem", color: "#9ca3af", marginTop: "0.1rem" }}>{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Labels */}
          <div style={{ position: "absolute", top: 18, left: 18, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", border: "1px solid #e5e7eb", borderRadius: 999, padding: "0.28rem 0.7rem", fontSize: "0.7rem", fontWeight: 700, color: "#6b7280", letterSpacing: "0.05em", opacity: pos > 12 ? 1 : 0, transition: "opacity 0.3s", zIndex: 10, userSelect: "none" as const }}>ANTES</div>
          <div style={{ position: "absolute", top: 18, right: 18, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", border: "1px solid #dbeafe", borderRadius: 999, padding: "0.28rem 0.7rem", fontSize: "0.7rem", fontWeight: 700, color: "#2563eb", letterSpacing: "0.05em", opacity: pos < 88 ? 1 : 0, transition: "opacity 0.3s", zIndex: 10, userSelect: "none" as const }}>DESPUÉS</div>

          {/* Divider line */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, transform: "translateX(-50%)", width: 3, background: "linear-gradient(to bottom, #ec4899, #8b5cf6, #3b82f6)", boxShadow: "0 0 18px rgba(139,92,246,0.7), 0 0 36px rgba(139,92,246,0.25)", zIndex: 20, pointerEvents: "none" }} />

          {/* Handle */}
          <div
            style={{ position: "absolute", top: "50%", left: `${pos}%`, transform: "translate(-50%, -50%)", width: 46, height: 46, borderRadius: "50%", background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.14), 0 0 0 3px rgba(139,92,246,0.18)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 21, cursor: "ew-resize" }}
            onMouseDown={(e) => { e.stopPropagation(); isDragging.current = true; }}
          >
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
              <path d="M6 1L1 6L6 11M14 1L19 6L14 11" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

const CELL = 130;
const COLS = 19;
const ROWS = 9;

type Pattern = "empty" | "diag" | "rdiag" | "cross";
function h(n: number) { return ((n * 2654435761) >>> 0); }
function pat(c: number, r: number): Pattern {
  const v = h(c * 100 + r) % 10;
  if (v < 4) return "empty";
  if (v < 7) return "diag";
  if (v < 9) return "rdiag";
  return "cross";
}
const PATS: Record<Pattern, string> = {
  empty: "",
  diag:  "repeating-linear-gradient(45deg,  rgba(0,0,0,0.055) 0px,rgba(0,0,0,0.055) 1px,transparent 1px,transparent 13px)",
  rdiag: "repeating-linear-gradient(-45deg, rgba(0,0,0,0.055) 0px,rgba(0,0,0,0.055) 1px,transparent 1px,transparent 13px)",
  cross: "repeating-linear-gradient(45deg,  rgba(0,0,0,0.04)  0px,rgba(0,0,0,0.04)  1px,transparent 1px,transparent 13px),repeating-linear-gradient(-45deg,rgba(0,0,0,0.04) 0px,rgba(0,0,0,0.04) 1px,transparent 1px,transparent 13px)",
};

// Precomputed globe dots via orthographic projection (center 20°E, 0°N)
const GLOBE_DOTS = (() => {
  function pip(poly: [number,number][], ln: number, lt: number): boolean {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi,yi] = poly[i], [xj,yj] = poly[j];
      if (((yi>lt)!==(yj>lt)) && ln<(xj-xi)*(lt-yi)/(yj-yi)+xi) inside = !inside;
    }
    return inside;
  }
  const polys: [number,number][][] = [
    // Africa — high detail
    [[-17.5,14.7],[-17,13],[-16,12],[-15,10],[-15,8],[-14,7],[-11,5],[-8,5],[-5,5],[0,5],[2,5],[4,5],[6,4],[8,4],[9,3],[10,1],[11,0],[11,-2],[12,-4],[12,-5],[12,-8],[12,-10],[12,-14],[12,-17],[13,-19],[14,-22],[15,-26],[16,-29],[16,-31],[17,-32],[18,-34],[18,-35],[19,-35],[20,-35],[22,-34],[24,-34],[26,-34],[27,-35],[28,-33],[30,-31],[32,-29],[35,-25],[36,-22],[38,-18],[39,-15],[40,-11],[41,-8],[41,-5],[42,-2],[42,1],[43,5],[44,8],[44,10],[45,10],[48,11],[51,12],[46,12],[43,11],[42,12],[40,14],[38,18],[37,22],[37,26],[37,28],[37,31],[34,31],[32,31],[30,31],[28,32],[25,32],[22,37],[20,37],[16,37],[14,37],[11,37],[9,37],[7,37],[3,37],[0,36],[-5,36],[-8,36],[-9,33],[-10,30],[-13,24],[-17,21],[-17.5,14.7]],
    // Europe — high detail
    [[-9,36],[-6,36],[0,36],[3,36],[6,36],[10,38],[12,38],[14,38],[15,38],[16,38],[18,40],[20,38],[22,37],[24,38],[26,38],[28,41],[29,42],[30,42],[32,41],[34,41],[36,41],[36,42],[34,44],[32,44],[30,46],[28,48],[26,50],[24,54],[22,55],[20,55],[18,58],[15,58],[12,58],[10,58],[8,58],[6,57],[5,58],[2,56],[0,54],[0,52],[-2,51],[-3,48],[-5,48],[-8,44],[-9,44],[-9,36]],
    // Scandinavia
    [[5,58],[8,58],[10,58],[14,58],[18,60],[24,66],[28,70],[18,70],[10,63],[5,62],[5,58]],
    // Central Asia / Turkey / Iran
    [[36,42],[45,38],[58,38],[65,32],[80,28],[80,45],[65,52],[45,48],[36,42]],
    // Russia
    [[30,48],[45,48],[65,52],[80,55],[100,60],[80,70],[55,70],[30,65],[25,57]],
    // Arabia
    [[37,30],[37,22],[42,12],[51,12],[58,23],[56,24],[55,26],[47,23],[43,18],[42,16],[36,22],[32,29]],
    // India
    [[67,23],[72,22],[75,28],[80,28],[88,22],[92,22],[87,20],[85,18],[82,14],[80,8],[76,8],[72,13]],
    // South America eastern bulge
    [[-35,5],[-35,-3],[-34,-8],[-35,-14],[-38,-18],[-43,-23],[-48,-28],[-51,-32],[-53,-34],[-55,-38],[-65,-55],[-68,-42],[-70,-20],[-75,-8],[-75,5],[-67,1],[-60,5],[-50,5],[-44,3]],
    // Britain + Ireland hint
    [[-5,50],[-5,58],[0,58],[2,56],[0,52],[-2,51],[-5,50]],
    // Greenland — large island, polar crown left side
    [[-44,60],[-42,58],[-38,56],[-30,58],[-24,60],[-20,62],[-18,65],[-18,70],[-20,76],[-25,80],[-35,83],[-45,83],[-52,80],[-57,76],[-58,72],[-57,68],[-54,65],[-52,62],[-48,60],[-44,60]],
    // Iceland
    [[-24,63],[-22,63],[-18,63],[-14,64],[-13,65],[-14,66],[-18,66],[-22,65],[-24,64],[-24,63]],
    // Norway north / Svalbard hint
    [[15,70],[20,70],[28,72],[30,74],[28,76],[20,76],[14,74],[12,72],[15,70]],
    // Canada east + Hudson Bay region
    [[-80,60],[-75,58],[-65,58],[-60,60],[-58,65],[-60,70],[-65,72],[-70,70],[-75,65],[-78,62],[-80,60]],
    // Canada west (BC + Yukon + NWT)
    [[-140,48],[-125,48],[-120,50],[-110,52],[-100,56],[-90,58],[-80,58],[-75,60],[-70,68],[-80,70],[-95,72],[-110,70],[-120,68],[-130,64],[-138,60],[-140,56],[-140,48]],
    // Alaska
    [[-168,54],[-158,54],[-150,58],[-142,60],[-138,60],[-130,56],[-130,54],[-138,52],[-148,52],[-158,52],[-164,54],[-168,54]],
  ];
  const isLand = (ln: number, lt: number) => polys.some(p => pip(p, ln, lt));
  const CX=265, CY=220, R=165, cL=18*Math.PI/180, cT=28*Math.PI/180;
  const S=1.2;
  const nbrs8 = (ln:number,lt:number) => [
    isLand(ln,lt+S),isLand(ln,lt-S),isLand(ln+S,lt),isLand(ln-S,lt),
    isLand(ln+S,lt+S),isLand(ln-S,lt+S),isLand(ln+S,lt-S),isLand(ln-S,lt-S),
  ];
  const out: {x:number;y:number;r:number;land:boolean}[] = [];
  for (let lt=-84; lt<=84; lt+=S) {
    for (let ln=-180; ln<180; ln+=S) {
      const la=lt*Math.PI/180, lo=ln*Math.PI/180;
      const c=Math.sin(cT)*Math.sin(la)+Math.cos(cT)*Math.cos(la)*Math.cos(lo-cL);
      if (c<=0.02) continue;
      const land = isLand(ln, lt);
      const n = nbrs8(ln, lt);
      const landFrac = n.filter(Boolean).length / 8;
      let baseR: number;
      if (land) {
        // interior=full, edge=small → fades outward
        baseR = 0.85 * (0.30 + 0.70 * landFrac);
      } else {
        // ocean near land gets coastal halo boost
        baseR = 0.38 + 0.44 * landFrac;
      }
      out.push({
        x: Math.round((CX+R*Math.cos(la)*Math.sin(lo-cL))*2)/2,
        y: Math.round((CY-R*(Math.cos(cT)*Math.sin(la)-Math.sin(cT)*Math.cos(la)*Math.cos(lo-cL)))*2)/2,
        r: Math.round(baseR*Math.pow(c,0.55)*10)/10,
        land,
      });
    }
  }
  return out;
})();

export default function Home() {
  const gridRef = useRef<HTMLElement>(null);
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setGridVisible(true); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden">

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes badge-pulse {
            0%,72%,100% { transform: scale(1); }
            80%         { transform: scale(1.13); }
            88%         { transform: scale(1); }
          }
          @keyframes badge-ripple {
            0%,72%  { transform: scale(1); opacity: 0; }
            73%     { opacity: 0.45; }
            100%    { transform: scale(2.1); opacity: 0; }
          }
          @keyframes ring-spark {
            from { stroke-dashoffset: 2639px; }
            to   { stroke-dashoffset: 0px; }
          }
          @keyframes ring2-cw { from { stroke-dashoffset:3330px; } to { stroke-dashoffset:0; } }
          @keyframes ring4-cw { from { stroke-dashoffset:4712px; } to { stroke-dashoffset:0; } }
          @keyframes ring5-cw { from { stroke-dashoffset:5403px; } to { stroke-dashoffset:0; } }
          @keyframes ring-enter {
            0%   { opacity:0; transform:scale(0.65); }
            60%  { opacity:1; transform:scale(1.04); }
            100% { transform:scale(1); }
          }
          @keyframes badge-enter {
            0%   { opacity:0; }
            100% { opacity:1; }
          }
          @keyframes hero-fade-in { from { opacity:0; } to { opacity:1; } }
          @keyframes hero-rise { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
          @keyframes card-float-a { 0%,100%{ transform:translateY(0px); } 50%{ transform:translateY(-6px); } }
          @keyframes card-float-b { 0%,100%{ transform:translateY(-3px); } 50%{ transform:translateY(4px); } }
          @keyframes card-float-c { 0%,100%{ transform:translateY(-5px); } 50%{ transform:translateY(2px); } }
          @keyframes conn-draw { from { stroke-dashoffset: 240; } to { stroke-dashoffset: 0; } }
          @keyframes badge-pop { 0%{opacity:0;transform:scale(0.3);} 70%{transform:scale(1.1);} 100%{opacity:1;transform:scale(1);} }
          @keyframes neuron-tl { 0%{stroke-dashoffset:115;} 70%{stroke-dashoffset:-8;} 100%{stroke-dashoffset:-8;} }
          @keyframes neuron-br { 0%{stroke-dashoffset:115;} 70%{stroke-dashoffset:-8;} 100%{stroke-dashoffset:-8;} }
          @keyframes border-trace {
            0%   { stroke-dashoffset: 200; opacity: 0; }
            6%   { opacity: 1; }
            45%  { stroke-dashoffset: 0;   opacity: 1; }
            58%  { stroke-dashoffset:-200; opacity: 0; }
            100% { stroke-dashoffset:-200; opacity: 0; }
          }
          @keyframes dot-reveal-l { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0% 0 0); } }
          @keyframes dot-reveal-r { from { clip-path: inset(0 0 0 100%); } to { clip-path: inset(0 0 0 0%); } }
          @keyframes dot-travel { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -505; } }
          [style*="card-float-a"],[style*="card-float-b"],[style*="card-float-c"] { will-change: transform; }
          [style*="badge-pulse"] { will-change: transform; }
          [style*="badge-ripple"] { will-change: transform, opacity; }
          [style*="ring-spark"],[style*="ring2-cw"],[style*="ring4-cw"],[style*="ring5-cw"] { will-change: stroke-dashoffset; }
          @keyframes globe-base-in {
            from { transform: scale(0.04); opacity: 0; }
            60%  { opacity: 1; }
            to   { transform: scale(1); opacity: 1; }
          }
          @keyframes globe-dots-in {
            from { transform: scale(0.05); opacity: 0; }
            25%  { opacity: 1; }
            to   { transform: scale(1); opacity: 1; }
          }
          @keyframes line-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
          @keyframes comet-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes node-pop {
            from { transform: scale(0); opacity: 0; }
            65%  { transform: scale(1.18); opacity: 1; }
            to   { transform: scale(1); opacity: 1; }
          }
        `}} />

        {/* Rings */}
        <div className="absolute pointer-events-none" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", animation: "hero-fade-in 1.8s ease both", zIndex: 4, willChange: "transform" }}>
          <svg width={2200} height={2200} viewBox="0 0 2200 2200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="badge-shadow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.10)" />
              </filter>
              <filter id="spark-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="ring-glow-6" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="16" />
              </filter>
              <linearGradient id="ring-grad-6" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="rgba(37,99,235,0.0)" />
                <stop offset="25%"  stopColor="rgba(37,99,235,0.75)" />
                <stop offset="55%"  stopColor="rgba(56,189,248,0.85)" />
                <stop offset="80%"  stopColor="rgba(99,102,241,0.9)" />
                <stop offset="100%" stopColor="rgba(147,197,253,0.0)" />
              </linearGradient>
            </defs>

            {/* ── Static rings (tighter: 110px gap, radii 420/530/640/750/860) */}
            <circle cx={1100} cy={1100} r={420} stroke="rgba(0,0,0,0.08)" strokeWidth="1" style={{ transformOrigin:"1100px 1100px", animation:"ring-enter 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.3s both" }} />
            <circle cx={1100} cy={1100} r={530} stroke="rgba(37,99,235,0.28)" strokeWidth="1.5" style={{ transformOrigin:"1100px 1100px", animation:"ring-enter 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.5s both" }} />
            <circle cx={1100} cy={1100} r={640} stroke="rgba(0,0,0,0.05)" strokeWidth="1" style={{ transformOrigin:"1100px 1100px", animation:"ring-enter 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.7s both" }} />
            <circle cx={1100} cy={1100} r={750} stroke="rgba(37,99,235,0.18)" strokeWidth="2" style={{ transformOrigin:"1100px 1100px", animation:"ring-enter 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.9s both" }} />
            <circle cx={1100} cy={1100} r={860} stroke="rgba(0,0,0,0.03)" strokeWidth="1" style={{ transformOrigin:"1100px 1100px", animation:"ring-enter 1.2s cubic-bezier(0.34,1.56,0.64,1) 1.1s both" }} />
            {/* ── Ring 6 — gradient glow (r=980) */}
            <circle cx={1100} cy={1100} r={980} fill="none" stroke="url(#ring-grad-6)" strokeWidth="14" style={{ transformOrigin:"1100px 1100px", animation:"ring-enter 1.2s cubic-bezier(0.34,1.56,0.64,1) 1.3s both" }} />
            <circle cx={1100} cy={1100} r={980} fill="none" stroke="url(#ring-grad-6)" strokeWidth="1" style={{ transformOrigin:"1100px 1100px", animation:"ring-enter 1.2s cubic-bezier(0.34,1.56,0.64,1) 1.3s both" }} />

            {/* ── Comet sparks — static arcs + rotate() = compositor-only, zero repaint ── */}

            {/* Ring 1 (r=420, 11s) */}
            <g style={{ transformOrigin:"1100px 1100px", animation:"comet-spin 11s linear infinite", willChange:"transform" }}>
              <path d="M 1480.6 922.6 A 420 420 0 0 1 1520 1100" fill="none" stroke="rgba(99,153,230,0.18)" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M 1505.7 991.3 A 420 420 0 0 1 1520 1100" fill="none" stroke="rgba(99,153,230,0.55)" strokeWidth="2.2" strokeLinecap="round"/>
              <circle cx={1520} cy={1100} r={3} fill="white" style={{ filter:"drop-shadow(0 0 3px #fff) drop-shadow(0 0 7px #60a5fa) drop-shadow(0 0 14px rgba(37,99,235,0.9))" }}/>
            </g>

            {/* Ring 2 (r=530, 14s) */}
            <g style={{ transformOrigin:"1100px 1100px", animation:"comet-spin 14s linear infinite", willChange:"transform" }}>
              <path d="M 1580.3 876.1 A 530 530 0 0 1 1630 1100" fill="none" stroke="rgba(99,153,230,0.18)" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M 1611.9 962.8 A 530 530 0 0 1 1630 1100" fill="none" stroke="rgba(99,153,230,0.55)" strokeWidth="2"   strokeLinecap="round"/>
              <circle cx={1630} cy={1100} r={3} fill="white" style={{ filter:"drop-shadow(0 0 3px #fff) drop-shadow(0 0 7px #60a5fa) drop-shadow(0 0 14px rgba(37,99,235,0.9))" }}/>
            </g>

            {/* Ring 4 (r=750, 20s) */}
            <g style={{ transformOrigin:"1100px 1100px", animation:"comet-spin 20s linear infinite", willChange:"transform" }}>
              <path d="M 1779.7 783.0 A 750 750 0 0 1 1850 1100" fill="none" stroke="rgba(99,153,230,0.15)" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M 1824.4 905.9 A 750 750 0 0 1 1850 1100" fill="none" stroke="rgba(99,153,230,0.50)" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx={1850} cy={1100} r={2.8} fill="white" style={{ filter:"drop-shadow(0 0 3px #fff) drop-shadow(0 0 6px #60a5fa) drop-shadow(0 0 12px rgba(37,99,235,0.8))" }}/>
            </g>

            {/* Ring 5 (r=860, 26s) */}
            <g style={{ transformOrigin:"1100px 1100px", animation:"comet-spin 26s linear infinite", willChange:"transform" }}>
              <path d="M 1879.4 736.6 A 860 860 0 0 1 1960 1100" fill="none" stroke="rgba(99,153,230,0.14)" strokeWidth="1.1" strokeLinecap="round"/>
              <path d="M 1930.7 877.4 A 860 860 0 0 1 1960 1100" fill="none" stroke="rgba(99,153,230,0.48)" strokeWidth="1.7" strokeLinecap="round"/>
              <circle cx={1960} cy={1100} r={2.8} fill="white" style={{ filter:"drop-shadow(0 0 3px #fff) drop-shadow(0 0 6px #60a5fa) drop-shadow(0 0 12px rgba(37,99,235,0.8))" }}/>
            </g>

            {/* ── Badges — static with pulse/ripple + entrance ──────────────── */}
            {/* Ring 1 */}
            <g style={{ animation:"badge-enter 0.6s cubic-bezier(0.22,1,0.36,1) 1.3s both" }}>
              <circle cx={680} cy={1100} r={28} fill="none" stroke="rgba(37,99,235,0.35)" strokeWidth="1.2" style={{ transformOrigin:"680px 1100px", animation:"badge-ripple 7s ease-out 0s infinite" }} />
              <g style={{ transformOrigin:"680px 1100px", animation:"badge-pulse 7s ease-in-out 0s infinite" }}>
                <circle cx={680} cy={1100} r={28} fill="white" stroke="rgba(0,0,0,0.10)" strokeWidth="1" filter="url(#badge-shadow)" />
                <image href="/icons/n8n-icon.webp" x={666} y={1086} width={28} height={28} preserveAspectRatio="xMidYMid meet" />
              </g>
            </g>
            <g style={{ animation:"badge-enter 0.6s cubic-bezier(0.22,1,0.36,1) 1.45s both" }}>
              <circle cx={1464} cy={890} r={28} fill="none" stroke="rgba(37,99,235,0.35)" strokeWidth="1.2" style={{ transformOrigin:"1464px 890px", animation:"badge-ripple 7s ease-out 1.1s infinite" }} />
              <g style={{ transformOrigin:"1464px 890px", animation:"badge-pulse 7s ease-in-out 1.1s infinite" }}>
                <circle cx={1464} cy={890} r={28} fill="white" stroke="rgba(0,0,0,0.10)" strokeWidth="1" filter="url(#badge-shadow)" />
                <image href="/icons/googlesheetslogo.png" x={1450} y={876} width={28} height={28} preserveAspectRatio="xMidYMid meet" />
              </g>
            </g>
            <g style={{ animation:"badge-enter 0.6s cubic-bezier(0.22,1,0.36,1) 1.6s both" }}>
              <circle cx={1310} cy={1464} r={28} fill="none" stroke="rgba(37,99,235,0.35)" strokeWidth="1.2" style={{ transformOrigin:"1310px 1464px", animation:"badge-ripple 7s ease-out 2.2s infinite" }} />
              <g style={{ transformOrigin:"1310px 1464px", animation:"badge-pulse 7s ease-in-out 2.2s infinite" }}>
                <circle cx={1310} cy={1464} r={28} fill="white" stroke="rgba(0,0,0,0.10)" strokeWidth="1" filter="url(#badge-shadow)" />
                <image href="/icons/Zapier-logo.png" x={1296} y={1450} width={28} height={28} preserveAspectRatio="xMidYMid meet" />
              </g>
            </g>

            {/* Ring 2 */}
            <g style={{ animation:"badge-enter 0.6s cubic-bezier(0.22,1,0.36,1) 1.75s both" }}>
              <circle cx={641} cy={835} r={28} fill="none" stroke="rgba(37,99,235,0.30)" strokeWidth="1.2" style={{ transformOrigin:"641px 835px", animation:"badge-ripple 7s ease-out 3.3s infinite" }} />
              <g style={{ transformOrigin:"641px 835px", animation:"badge-pulse 7s ease-in-out 3.3s infinite" }}>
                <circle cx={641} cy={835} r={28} fill="white" stroke="rgba(0,0,0,0.08)" strokeWidth="1" filter="url(#badge-shadow)" />
                <image href="/icons/ChatGPT-Logo.svg.png" x={627} y={821} width={28} height={28} preserveAspectRatio="xMidYMid meet" />
              </g>
            </g>
            <g style={{ animation:"badge-enter 0.6s cubic-bezier(0.22,1,0.36,1) 1.9s both" }}>
              <circle cx={620} cy={1324} r={28} fill="none" stroke="rgba(37,99,235,0.30)" strokeWidth="1.2" style={{ transformOrigin:"620px 1324px", animation:"badge-ripple 7s ease-out 4.4s infinite" }} />
              <g style={{ transformOrigin:"620px 1324px", animation:"badge-pulse 7s ease-in-out 4.4s infinite" }}>
                <circle cx={620} cy={1324} r={28} fill="white" stroke="rgba(0,0,0,0.08)" strokeWidth="1" filter="url(#badge-shadow)" />
                <image href="/icons/Google_Drive_icon_(2020).svg.png" x={606} y={1310} width={28} height={28} preserveAspectRatio="xMidYMid meet" />
              </g>
            </g>
            <g style={{ animation:"badge-enter 0.6s cubic-bezier(0.22,1,0.36,1) 2.05s both" }}>
              <circle cx={1580} cy={1324} r={28} fill="none" stroke="rgba(37,99,235,0.30)" strokeWidth="1.2" style={{ transformOrigin:"1580px 1324px", animation:"badge-ripple 7s ease-out 5.5s infinite" }} />
              <g style={{ transformOrigin:"1580px 1324px", animation:"badge-pulse 7s ease-in-out 5.5s infinite" }}>
                <circle cx={1580} cy={1324} r={28} fill="white" stroke="rgba(0,0,0,0.08)" strokeWidth="1" filter="url(#badge-shadow)" />
                <image href="/icons/claude-logo.png" x={1566} y={1310} width={28} height={28} preserveAspectRatio="xMidYMid meet" />
              </g>
            </g>
            <g style={{ animation:"badge-enter 0.6s cubic-bezier(0.22,1,0.36,1) 2.2s both" }}>
              <circle cx={1598} cy={919} r={28} fill="none" stroke="rgba(37,99,235,0.30)" strokeWidth="1.2" style={{ transformOrigin:"1598px 919px", animation:"badge-ripple 7s ease-out 0.5s infinite" }} />
              <g style={{ transformOrigin:"1598px 919px", animation:"badge-pulse 7s ease-in-out 0.5s infinite" }}>
                <circle cx={1598} cy={919} r={28} fill="white" stroke="rgba(0,0,0,0.08)" strokeWidth="1" filter="url(#badge-shadow)" />
                <image href="/icons/Telegram_2019_Logo.svg.png" x={1584} y={905} width={28} height={28} preserveAspectRatio="xMidYMid meet" />
              </g>
            </g>

            {/* Ring 3 */}
            <g style={{ animation:"badge-enter 0.6s cubic-bezier(0.22,1,0.36,1) 2.35s both" }}>
              <circle cx={1740} cy={1100} r={28} fill="none" stroke="rgba(37,99,235,0.25)" strokeWidth="1.2" style={{ transformOrigin:"1740px 1100px", animation:"badge-ripple 7s ease-out 1.6s infinite" }} />
              <g style={{ transformOrigin:"1740px 1100px", animation:"badge-pulse 7s ease-in-out 1.6s infinite" }}>
                <circle cx={1740} cy={1100} r={28} fill="white" stroke="rgba(0,0,0,0.07)" strokeWidth="1" filter="url(#badge-shadow)" />
                <image href="/icons/Notion-logo.svg.png" x={1726} y={1086} width={28} height={28} preserveAspectRatio="xMidYMid meet" />
              </g>
            </g>
            <g style={{ animation:"badge-enter 0.6s cubic-bezier(0.22,1,0.36,1) 2.5s both" }}>
              <circle cx={460} cy={1100} r={28} fill="none" stroke="rgba(37,99,235,0.25)" strokeWidth="1.2" style={{ transformOrigin:"460px 1100px", animation:"badge-ripple 7s ease-out 2.7s infinite" }} />
              <g style={{ transformOrigin:"460px 1100px", animation:"badge-pulse 7s ease-in-out 2.7s infinite" }}>
                <circle cx={460} cy={1100} r={28} fill="white" stroke="rgba(0,0,0,0.07)" strokeWidth="1" filter="url(#badge-shadow)" />
                <image href="/icons/WhatsApp_Logo_green.svg.png" x={446} y={1086} width={28} height={28} preserveAspectRatio="xMidYMid meet" />
              </g>
            </g>
            <g style={{ animation:"badge-enter 0.6s cubic-bezier(0.22,1,0.36,1) 2.65s both" }}>
              <circle cx={1702} cy={1319} r={28} fill="none" stroke="rgba(37,99,235,0.25)" strokeWidth="1.2" style={{ transformOrigin:"1702px 1319px", animation:"badge-ripple 7s ease-out 3.8s infinite" }} />
              <g style={{ transformOrigin:"1702px 1319px", animation:"badge-pulse 7s ease-in-out 3.8s infinite" }}>
                <circle cx={1702} cy={1319} r={28} fill="white" stroke="rgba(0,0,0,0.07)" strokeWidth="1" filter="url(#badge-shadow)" />
                <image href="/icons/shopifylogo.webp" x={1688} y={1305} width={28} height={28} preserveAspectRatio="xMidYMid meet" />
              </g>
            </g>
            <g style={{ animation:"badge-enter 0.6s cubic-bezier(0.22,1,0.36,1) 2.8s both" }}>
              <circle cx={498} cy={1319} r={28} fill="none" stroke="rgba(37,99,235,0.25)" strokeWidth="1.2" style={{ transformOrigin:"498px 1319px", animation:"badge-ripple 7s ease-out 4.9s infinite" }} />
              <g style={{ transformOrigin:"498px 1319px", animation:"badge-pulse 7s ease-in-out 4.9s infinite" }}>
                <circle cx={498} cy={1319} r={28} fill="white" stroke="rgba(0,0,0,0.07)" strokeWidth="1" filter="url(#badge-shadow)" />
                <image href="/icons/clickuplogo.png" x={484} y={1305} width={28} height={28} preserveAspectRatio="xMidYMid meet" />
              </g>
            </g>

            {/* Ring 4 */}
            <g style={{ animation:"badge-enter 0.6s cubic-bezier(0.22,1,0.36,1) 2.95s both" }}>
              <circle cx={438} cy={1452} r={28} fill="none" stroke="rgba(37,99,235,0.20)" strokeWidth="1.2" style={{ transformOrigin:"438px 1452px", animation:"badge-ripple 7s ease-out 0.8s infinite" }} />
              <g style={{ transformOrigin:"438px 1452px", animation:"badge-pulse 7s ease-in-out 0.8s infinite" }}>
                <circle cx={438} cy={1452} r={28} fill="white" stroke="rgba(0,0,0,0.06)" strokeWidth="1" filter="url(#badge-shadow)" />
                <image href="/icons/stripelogo.png" x={424} y={1438} width={28} height={28} preserveAspectRatio="xMidYMid meet" />
              </g>
            </g>
            <g style={{ animation:"badge-enter 0.6s cubic-bezier(0.22,1,0.36,1) 3.1s both" }}>
              <circle cx={1762} cy={1452} r={28} fill="none" stroke="rgba(37,99,235,0.20)" strokeWidth="1.2" style={{ transformOrigin:"1762px 1452px", animation:"badge-ripple 7s ease-out 1.9s infinite" }} />
              <g style={{ transformOrigin:"1762px 1452px", animation:"badge-pulse 7s ease-in-out 1.9s infinite" }}>
                <circle cx={1762} cy={1452} r={28} fill="white" stroke="rgba(0,0,0,0.06)" strokeWidth="1" filter="url(#badge-shadow)" />
                <image href="/icons/metalogo.jpg" x={1748} y={1438} width={28} height={28} preserveAspectRatio="xMidYMid meet" />
              </g>
            </g>
          </svg>
        </div>


        {/* Glow behind content */}
        <div className="absolute pointer-events-none" style={{
          left: "50%", top: "50%",
          transform: "translate(-50%, -52%)",
          width: 720, height: 520,
          background: "radial-gradient(ellipse at center, rgba(37,99,235,0.10) 0%, rgba(59,130,246,0.06) 45%, transparent 72%)",
        }} />

        {/* Content */}
        <div
          className="relative z-10 flex flex-col items-center text-center"
          style={{ padding: "0 1.5rem", marginTop: "-32px" }}
        >
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "999px", padding: "0.3rem 0.5rem 0.3rem 0.4rem", marginBottom: "1.8rem", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", animation: "hero-rise 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s both" }}>
            <span style={{ background: "#2563eb", color: "#fff", fontSize: "0.62rem", fontWeight: 700, padding: "0.18rem 0.6rem", borderRadius: "999px", letterSpacing: "0.05em", textTransform: "uppercase" }}>Nuevo</span>
            <span style={{ fontSize: "0.78rem", color: "#555", fontWeight: 400 }}>Automatizaciones con n8n e IA para empresas</span>
            <span style={{ color: "#2563eb", fontSize: "0.8rem", fontWeight: 500 }}>→</span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontWeight: 600,
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            color: "#0f0f0f",
            margin: 0,
            fontSize: "clamp(2rem, 4vw, 3.8rem)",
            maxWidth: "780px",
            animation: "hero-rise 0.9s cubic-bezier(0.22,1,0.36,1) 0.35s both",
          }}>
            Automatiza tu negocio<br />
            <em style={{ fontFamily: "Times New Roman, Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "#2563eb" }}>
              con Inteligencia Artificial.
            </em>
          </h1>

          {/* Subtitle */}
          <p style={{
            marginTop: "1.6rem",
            fontSize: "1rem",
            color: "#888",
            lineHeight: 1.7,
            maxWidth: "460px",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            fontFamily: "var(--font-poppins)",
            animation: "hero-rise 0.9s cubic-bezier(0.22,1,0.36,1) 0.55s both",
          }}>
            Diseñamos e implementamos automatizaciones inteligentes con n8n para que tu empresa trabaje sola.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "2.2rem", flexWrap: "wrap", justifyContent: "center", animation: "hero-rise 0.9s cubic-bezier(0.22,1,0.36,1) 0.75s both" }}>
            <button
              data-cal-namespace="30min"
              data-cal-link="n8n-automatizaciones/30min"
              data-cal-config='{"layout":"month_view"}'
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#2563eb", color: "#fff", fontWeight: 600, fontSize: "0.88rem", padding: "0.78rem 1.6rem", borderRadius: "999px", border: "none", cursor: "pointer", letterSpacing: "-0.01em", boxShadow: "0 4px 18px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.15)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Agendar una cita
            </button>
            <a href="#servicios" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "#fff", color: "#0f0f0f", fontWeight: 500, fontSize: "0.88rem", padding: "0.78rem 1.6rem", borderRadius: "999px", border: "1px solid #e5e7eb", textDecoration: "none", letterSpacing: "-0.01em", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              Ver servicios
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>

          {/* Floating activity cards */}
          <div style={{ marginTop: "3.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0", animation: "hero-rise 1s cubic-bezier(0.22,1,0.36,1) 1s both" }}>

            {/* Card 1 */}
            <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: "14px", padding: "0.75rem 1rem", width: "320px", boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "0.75rem", zIndex: 3, position: "relative", animation: "card-float-a 4s ease-in-out infinite", willChange: "transform" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <img src="/icons/n8n-icon.webp" width={22} height={22} style={{ objectFit: "contain" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#0f0f0f", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Flujo ejecutado · <span style={{ fontWeight: 400, color: "#555" }}>847 leads procesados</span>
                </div>
                <div style={{ fontSize: "0.7rem", color: "#aaa", marginTop: "0.15rem" }}>hace 30s · HubSpot → Notion</div>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
            </div>

            {/* Card 2 */}
            <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: "14px", padding: "0.75rem 1rem", width: "300px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "0.75rem", zIndex: 2, position: "relative", marginTop: "-8px", animation: "card-float-b 5s ease-in-out 0.6s infinite", willChange: "transform" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <img src="/icons/ChatGPT-Logo.svg.png" width={22} height={22} style={{ objectFit: "contain" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#0f0f0f", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  GPT-4 · <span style={{ fontWeight: 400, color: "#555" }}>Correo generado y enviado</span>
                </div>
                <div style={{ fontSize: "0.7rem", color: "#aaa", marginTop: "0.15rem" }}>hace 2 min · @cliente@empresa.com</div>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
            </div>

            {/* Card 3 */}
            <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: "14px", padding: "0.75rem 1rem", width: "280px", boxShadow: "0 4px 16px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: "0.75rem", zIndex: 1, position: "relative", marginTop: "-8px", animation: "card-float-c 4.5s ease-in-out 1.2s infinite", willChange: "transform" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fffbeb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <img src="/icons/Google_Drive_icon_(2020).svg.png" width={20} height={20} style={{ objectFit: "contain" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#0f0f0f", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Sync · <span style={{ fontWeight: 400, color: "#555" }}>4.201 filas actualizadas</span>
                </div>
                <div style={{ fontSize: "0.7rem", color: "#aaa", marginTop: "0.15rem" }}>hace 5 min · Sheets → Airtable</div>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", flexShrink: 0 }} />
            </div>

          </div>
        </div>
        {/* Fade bottom → second section */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: "240px", background: "linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(255,255,255,0.9) 70%, white 100%)", borderRadius: "50% 50% 0 0 / 36px 36px 0 0", zIndex: 20 }} />
      </section>

      {/* ── SECOND SECTION — grid ─────────────────────────────────────────── */}
      <section ref={gridRef} className="relative bg-white" style={{ height: CELL * 11, zIndex: 21, overflow:"clip", contentVisibility:"auto", containIntrinsicSize:`0 ${CELL * 11}px` }}>
        {/* Fade top */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: "140px", background: "linear-gradient(to bottom, white 0%, transparent 100%)", zIndex: 10 }} />
        <div
          className="absolute top-0 pointer-events-none"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
            gridTemplateRows: `repeat(11, ${CELL}px)`,
          }}
        >
          {Array.from({ length: COLS * 11 }, (_, i) => {
            const c = i % COLS;
            const r = Math.floor(i / COLS);
            const merged = (r >= 1 && r <= 9 && c >= 5 && c <= 13) || (r >= 1 && r <= 9 && ((c >= 2 && c <= 4) || (c >= 14 && c <= 16)));
            const outer = c < 2 || c > 16;
            return (
              <div
                key={i}
                style={{
                  border: (merged || outer) ? "none" : "1px solid rgba(0,0,0,0.07)",
                  background: merged ? "white" : undefined,
                  backgroundImage: (merged || outer) ? undefined : (PATS[pat(c, r + ROWS)] || undefined),
                }}
              />
            );
          })}
          {/* Center 9 — row 1 (no bottom border) */}
          <div style={{ position: "absolute", left: 5 * CELL, top: 0, width: 9 * CELL, height: CELL, borderTop: "1px solid rgba(0,0,0,0.07)", borderRight: "1px solid rgba(0,0,0,0.07)", background: "white", zIndex: 1 }} />
          {/* Center 9 — rows 2-5 unified (no top border) */}
          <div style={{ position: "absolute", left: 5 * CELL, top: CELL, width: 9 * CELL, height: 4 * CELL, borderBottom: "1px solid rgba(0,0,0,0.07)", borderRight: "1px solid rgba(0,0,0,0.07)", background: "white", zIndex: 1 }} />
          {/* Corner cross markers — gradient lines + diamond center */}
          {[
            [5*CELL,0],[14*CELL,0],[5*CELL,5*CELL],[14*CELL,5*CELL],
            [5*CELL,CELL],[14*CELL,CELL]
          ].flatMap(([x,y],i) => [
            <div key={`ch${i}`} style={{ position:"absolute", left:x, top:y, transform:`translate(-50%,-50%) scaleX(${gridVisible ? 1 : 0})`, width:140, height:2, background:"linear-gradient(to right, transparent, rgba(99,102,241,0.9), transparent)", zIndex:3, transition:`transform 0.6s cubic-bezier(0.4,0,0.2,1) ${0.3 + i*0.07}s`, transformOrigin:"center" }} />,
            ...(y === 0 ? [] : [<div key={`cv${i}`} style={{ position:"absolute", left:x, top:y, transform:`translate(-50%,-50%) scaleY(${gridVisible ? 1 : 0})`, width:2, height:140, background:"linear-gradient(to bottom, transparent, rgba(99,102,241,0.9), transparent)", zIndex:3, transition:`transform 0.6s cubic-bezier(0.4,0,0.2,1) ${0.35 + i*0.07}s`, transformOrigin:"center" }} />]),
            <svg key={`cd${i}`} style={{ position:"absolute", left:x, top:y, transform:"translate(-50%,-50%)", zIndex:4, opacity: gridVisible ? 1 : 0, transition:`opacity 0.4s ease ${0.7 + i*0.07}s` }} width="40" height="40" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 0 Q10 8 18 9 Q10 10 9 18 Q8 10 0 9 Q8 8 9 0Z" fill="white" stroke="rgba(99,102,241,0.6)" strokeWidth="0.5"/>
            </svg>
          ])}
          {/* Dots left block — cluster top-right */}
          <div style={{ position:"absolute", left:2*CELL-40, top:CELL*0.5, width:3*CELL+40, height:2.2*CELL, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.6) 1.4px, transparent 1.4px)", backgroundSize:"11px 11px", WebkitMaskImage:"radial-gradient(ellipse 80% 75% at 75% 35%, black 0%, black 25%, transparent 72%)", maskImage:"radial-gradient(ellipse 80% 75% at 75% 35%, black 0%, black 25%, transparent 72%)", pointerEvents:"none", zIndex:2, animation:"dot-reveal-l 1.2s steps(18, end) 0.3s both", animationPlayState: gridVisible ? "running" : "paused" }} />
          <div style={{ position:"absolute", left:2*CELL-60, top:2.8*CELL, width:3*CELL+60, height:2*CELL, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.5) 1.2px, transparent 1.2px)", backgroundSize:"10px 10px", WebkitMaskImage:"radial-gradient(ellipse 70% 80% at 25% 60%, black 0%, black 20%, transparent 68%)", maskImage:"radial-gradient(ellipse 70% 80% at 25% 60%, black 0%, black 20%, transparent 68%)", pointerEvents:"none", zIndex:2, animation:"dot-reveal-l 1.2s steps(16, end) 0.5s both", animationPlayState: gridVisible ? "running" : "paused" }} />
          {/* Dots right block — cluster top-left */}
          <div style={{ position:"absolute", left:14*CELL, top:CELL*0.5, width:3*CELL+40, height:2.2*CELL, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.6) 1.4px, transparent 1.4px)", backgroundSize:"11px 11px", WebkitMaskImage:"radial-gradient(ellipse 80% 75% at 25% 35%, black 0%, black 25%, transparent 72%)", maskImage:"radial-gradient(ellipse 80% 75% at 25% 35%, black 0%, black 25%, transparent 72%)", pointerEvents:"none", zIndex:2, animation:"dot-reveal-r 1.2s steps(18, end) 0.3s both", animationPlayState: gridVisible ? "running" : "paused" }} />
          <div style={{ position:"absolute", left:14*CELL, top:2.8*CELL, width:3*CELL+60, height:2*CELL, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.5) 1.2px, transparent 1.2px)", backgroundSize:"10px 10px", WebkitMaskImage:"radial-gradient(ellipse 70% 80% at 75% 60%, black 0%, black 20%, transparent 68%)", maskImage:"radial-gradient(ellipse 70% 80% at 75% 60%, black 0%, black 20%, transparent 68%)", pointerEvents:"none", zIndex:2, animation:"dot-reveal-r 1.2s steps(16, end) 0.5s both", animationPlayState: gridVisible ? "running" : "paused" }} />
          {/* Left 3 — row 1 */}
          <div style={{ position: "absolute", left: 2 * CELL, top: 0, width: 3 * CELL, height: CELL, borderTop: "1px solid rgba(0,0,0,0.07)", borderRight: "1px solid rgba(0,0,0,0.07)", borderBottom: "1px solid rgba(0,0,0,0.07)", background: "white", zIndex: 1 }} />
          {/* Left 3 — rows 2-5 unified */}
          <div style={{ position: "absolute", left: 2 * CELL, top: CELL, width: 3 * CELL, height: 4 * CELL, borderRight: "1px solid rgba(0,0,0,0.07)", borderBottom: "1px solid rgba(0,0,0,0.07)", background: "white", zIndex: 1 }} />
          {/* Right 3 — row 1 */}
          <div style={{ position: "absolute", left: 14 * CELL, top: 0, width: 3 * CELL, height: CELL, borderTop: "1px solid rgba(0,0,0,0.07)", borderLeft: "1px solid rgba(0,0,0,0.07)", borderBottom: "1px solid rgba(0,0,0,0.07)", background: "white", zIndex: 1 }} />
          {/* Right 3 — rows 2-5 unified */}
          <div style={{ position: "absolute", left: 14 * CELL, top: CELL, width: 3 * CELL, height: 4 * CELL, borderLeft: "1px solid rgba(0,0,0,0.07)", borderBottom: "1px solid rgba(0,0,0,0.07)", background: "white", zIndex: 1 }} />

          {/* ── BOTTOM SECTION: rows 6-9 ── */}
          {/* Vertical connectors — gap row 5→6 */}
          <div style={{ position:"absolute", left:5*CELL, top:5*CELL, transform:"translateX(-50%)", width:1.5, height:CELL, background:"rgba(99,102,241,0.5)", zIndex:3, pointerEvents:"none", opacity: gridVisible ? 1 : 0, transition:"opacity 0.5s ease 0.6s" }} />
          <div style={{ position:"absolute", left:14*CELL, top:5*CELL, transform:"translateX(-50%)", width:1.5, height:CELL, background:"rgba(99,102,241,0.5)", zIndex:3, pointerEvents:"none", opacity: gridVisible ? 1 : 0, transition:"opacity 0.5s ease 0.6s" }} />
          {/* Bottom unified block (cols 2-16, rows 6-9) — no inner separators */}
          <div style={{ position: "absolute", left: 2 * CELL, top: 6 * CELL, width: 15 * CELL, height: 4 * CELL, borderBottom: "1px solid rgba(0,0,0,0.07)", background: "white", zIndex: 1 }} />
          {/* Dots left — near top corner (y≈5*CELL) pulling toward [5*CELL,5*CELL] diamond */}
          <div style={{ position:"absolute", left:2*CELL-40, top:4.6*CELL, width:3*CELL+40, height:1.8*CELL, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.6) 1.4px, transparent 1.4px)", backgroundSize:"11px 11px", WebkitMaskImage:"radial-gradient(ellipse 75% 60% at 90% 50%, black 0%, black 15%, transparent 70%)", maskImage:"radial-gradient(ellipse 75% 60% at 90% 50%, black 0%, black 15%, transparent 70%)", pointerEvents:"none", zIndex:2, animation:"dot-reveal-l 1.2s steps(18, end) 0.3s both", animationPlayState: gridVisible ? "running" : "paused" }} />
          {/* Dots left — near bottom diamond (y≈9*CELL) pulling toward [5*CELL,9*CELL] diamond */}
          <div style={{ position:"absolute", left:2*CELL-40, top:9*CELL+0.2*CELL, width:3*CELL+40, height:1.6*CELL, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.6) 1.4px, transparent 1.4px)", backgroundSize:"11px 11px", WebkitMaskImage:"radial-gradient(ellipse 75% 60% at 90% 50%, black 0%, black 15%, transparent 70%)", maskImage:"radial-gradient(ellipse 75% 60% at 90% 50%, black 0%, black 15%, transparent 70%)", pointerEvents:"none", zIndex:2, animation:"dot-reveal-l 1.2s steps(16, end) 0.5s both", animationPlayState: gridVisible ? "running" : "paused" }} />
          {/* Dots right — near top corner (y≈5*CELL) pulling toward [14*CELL,5*CELL] diamond */}
          <div style={{ position:"absolute", left:14*CELL, top:4.6*CELL, width:3*CELL+40, height:1.8*CELL, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.6) 1.4px, transparent 1.4px)", backgroundSize:"11px 11px", WebkitMaskImage:"radial-gradient(ellipse 75% 60% at 10% 50%, black 0%, black 15%, transparent 70%)", maskImage:"radial-gradient(ellipse 75% 60% at 10% 50%, black 0%, black 15%, transparent 70%)", pointerEvents:"none", zIndex:2, animation:"dot-reveal-r 1.2s steps(18, end) 0.3s both", animationPlayState: gridVisible ? "running" : "paused" }} />
          {/* Dots right — near bottom diamond (y≈9*CELL) pulling toward [14*CELL,9*CELL] diamond */}
          <div style={{ position:"absolute", left:14*CELL, top:9*CELL+0.2*CELL, width:3*CELL+40, height:1.6*CELL, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.6) 1.4px, transparent 1.4px)", backgroundSize:"11px 11px", WebkitMaskImage:"radial-gradient(ellipse 75% 60% at 10% 50%, black 0%, black 15%, transparent 70%)", maskImage:"radial-gradient(ellipse 75% 60% at 10% 50%, black 0%, black 15%, transparent 70%)", pointerEvents:"none", zIndex:2, animation:"dot-reveal-r 1.2s steps(16, end) 0.5s both", animationPlayState: gridVisible ? "running" : "paused" }} />
          {/* Last row unified — cols 2-16, row 10 */}
          <div style={{ position:"absolute", left:2*CELL, top:10*CELL, width:15*CELL, height:CELL, background:"white", zIndex:1 }} />

          {/* Bottom section corner markers: inner y=6*CELL, outer y=9*CELL */}
          {([
            [5*CELL, 10*CELL], [14*CELL, 10*CELL],
          ] as [number,number][]).flatMap(([x,y],i) => [
            <div key={`bch${i}`} style={{ position:"absolute", left:x, top:y, transform:`translate(-50%,-50%) scaleX(${gridVisible ? 1 : 0})`, width:140, height:2, background:"linear-gradient(to right, transparent, rgba(99,102,241,0.9), transparent)", zIndex:3, transition:`transform 0.6s cubic-bezier(0.4,0,0.2,1) ${0.5+i*0.07}s`, transformOrigin:"center" }} />,
            <div key={`bcv${i}`} style={{ position:"absolute", left:x, top:y, transform:`translate(-50%,-50%) scaleY(${gridVisible ? 1 : 0})`, width:2, height:140, background:"linear-gradient(to bottom, transparent, rgba(99,102,241,0.9), transparent)", zIndex:3, transition:`transform 0.6s cubic-bezier(0.4,0,0.2,1) ${0.55+i*0.07}s`, transformOrigin:"center" }} />,
            <svg key={`bcd${i}`} style={{ position:"absolute", left:x, top:y, transform:"translate(-50%,-50%)", zIndex:4, opacity: gridVisible ? 1 : 0, transition:`opacity 0.4s ease ${0.9+i*0.07}s` }} width="40" height="40" viewBox="0 0 18 18" fill="none">
              <path d="M9 0 Q10 8 18 9 Q10 10 9 18 Q8 10 0 9 Q8 8 9 0Z" fill="white" stroke="rgba(99,102,241,0.6)" strokeWidth="0.5"/>
            </svg>,
          ])}

          {/* Dot background behind all cards */}
          <div style={{ position:"absolute", left:5*CELL, top:5*CELL+CELL*0.25, width:9*CELL, height:4*CELL, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.55) 1.4px, transparent 1.4px)", backgroundSize:"10px 10px", WebkitMaskImage:"linear-gradient(to bottom, black 0%, black 70%, transparent 100%), radial-gradient(ellipse 65% 65% at 8% 88%, black 0%, black 10%, transparent 85%), radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, black 8%, transparent 80%), radial-gradient(ellipse 45% 55% at 90% 90%, black 0%, black 8%, transparent 82%)", maskImage:"linear-gradient(to bottom, black 0%, black 70%, transparent 100%), radial-gradient(ellipse 65% 65% at 8% 88%, black 0%, black 10%, transparent 85%), radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, black 8%, transparent 80%), radial-gradient(ellipse 45% 55% at 90% 90%, black 0%, black 8%, transparent 82%)", WebkitMaskComposite:"destination-in, source-over, source-over", maskComposite:"intersect, add, add", pointerEvents:"none", zIndex:4 }} />

          {/* ── BOTTOM CENTER CONTENT ──*/}
          <div style={{ position:"absolute", left:5*CELL, top:5*CELL+CELL*0.25, width:9*CELL, height:4*CELL, display:"flex", flexDirection:"column", alignItems:"center", padding:`${CELL*0.2}px ${CELL*0.4}px ${CELL*0.15}px`, zIndex:5, opacity: gridVisible ? 1 : 0, transform: gridVisible ? "translateY(0)" : "translateY(20px)", transition:"opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s" }}>
            {/* Header */}
            <div style={{ textAlign:"center", marginBottom:CELL*0.18 }}>
              <div style={{ fontSize:"0.62rem", fontWeight:500, color:"rgba(99,102,241,0.7)", letterSpacing:"0.18em", textTransform:"uppercase" as const, marginBottom:"0.5rem" }}>Gestión sin esfuerzo</div>
              <h2 style={{ fontWeight:600, fontSize:"clamp(1.2rem,1.6vw,1.65rem)", letterSpacing:"-0.03em", lineHeight:1.15, color:"#0f0f0f", margin:0 }}>
                Planifica proyectos y da seguimiento<br/>
                <em style={{ fontFamily:"Times New Roman, Georgia, serif", fontStyle:"italic", fontWeight:400, color:"#2563eb" }}>a tus tareas sin esfuerzo.</em>
              </h2>
              <p style={{ fontSize:"0.75rem", color:"#888", maxWidth:460, margin:"0.5rem auto 0", lineHeight:1.6 }}>
                Simplifica la gestión con herramientas que te ayudan a planificar, priorizar y colaborar para que tu equipo logre más cada día.
              </p>
            </div>
            {/* Cards */}
            <div style={{ display:"flex", gap:9, width:"100%", flex:1, minHeight:0 }}>
              {/* Card 1 — Integraciones entre herramientas */}
              <div style={{ flex:1, background:"white", border:"1px solid #e8eaed", borderRadius:18, padding:"0.7rem 0.7rem 0.9rem", display:"flex", flexDirection:"column", boxShadow:"0 2px 12px rgba(0,0,0,0.05)", overflow:"hidden" }}>
                <div style={{ flex:1, marginBottom:"0.65rem", borderRadius:10, position:"relative", overflow:"hidden", minHeight:115 }}>
                  {/* Corner square with fading border + list inside */}
                  <div style={{ position:"absolute", right:0, bottom:0, width:"55%", height:"58%", borderTop:"2px solid rgba(99,102,241,1)", borderLeft:"2px solid rgba(99,102,241,1)", borderRadius:"18px 0 0 0", WebkitMaskImage:"linear-gradient(to right, black 0%, black 50%, transparent 90%), linear-gradient(to bottom, black 0%, black 50%, transparent 90%)", WebkitMaskComposite:"destination-in", maskImage:"linear-gradient(to right, black 0%, black 50%, transparent 90%), linear-gradient(to bottom, black 0%, black 50%, transparent 90%)", maskComposite:"intersect", padding:"7px 6px", display:"flex", flexDirection:"column", justifyContent:"space-around", gap:3 }}>
                    {[
                      { icon:"↻", label:"Asignar lead",        active:true },
                      { icon:"◎", label:"Actualizar etapa",    active:false },
                      { icon:"✉", label:"Enviar seguimiento",  active:false },
                      { icon:"⚙", label:"Crear tarea",         dim:true },
                    ].map((item,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:5, padding:"0.22rem 0.45rem", background: item.active ? "white" : "transparent", border: item.active ? "1px solid #bfdbfe" : "none", borderRadius:7, boxShadow: item.active ? "0 2px 8px rgba(37,99,235,0.12)" : "none" }}>
                        <div style={{ width:20, height:20, borderRadius:"50%", background:"#dbeafe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <span style={{ fontSize:"0.55rem", color: item.dim ? "#93c5fd" : "#2563eb" }}>{item.icon}</span>
                        </div>
                        <span style={{ fontSize:"0.6rem", fontWeight: item.active ? 700 : 400, color: item.dim ? "#93c5fd" : "#1e293b", whiteSpace:"nowrap" as const }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ padding:"0.8rem 0.7rem 0.5rem", display:"flex", flexDirection:"column", gap:"0.35rem" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.45rem" }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 10h16M4 14h8"/><circle cx="17" cy="17" r="3"/><path d="m21 21-1.5-1.5"/></svg>
                    <span style={{ fontSize:"0.95rem", fontWeight:600, color:"#0f0f0f", fontFamily:"var(--font-poppins)" }}>Integraciones entre herramientas</span>
                  </div>
                  <p style={{ fontSize:"0.75rem", color:"#888", margin:0, lineHeight:1.5, fontFamily:"var(--font-poppins)" }}>Conectamos tus apps por API para que los datos fluyan solos: CRM, email, Slack, Notion y ERPs.</p>
                </div>
              </div>

              {/* Card 2 — Integraciones & CRM */}
              <div style={{ flex:1, background:"white", border:"1px solid #e8eaed", borderRadius:18, padding:"0.7rem 0.7rem 0.9rem", display:"flex", flexDirection:"column", boxShadow:"0 2px 12px rgba(0,0,0,0.05)", overflow:"hidden" }}>
                <div style={{ flex:1, marginBottom:"0.65rem", borderRadius:10, position:"relative", overflow:"hidden", minHeight:115 }} />
                <div style={{ padding:"0.5rem 0.4rem 0.3rem", display:"flex", flexDirection:"column", gap:"0.3rem" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.45rem" }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <span style={{ fontSize:"0.95rem", fontWeight:600, color:"#0f0f0f", fontFamily:"var(--font-poppins)" }}>Automatización de CRM</span>
                  </div>
                  <p style={{ fontSize:"0.75rem", color:"#888", margin:0, lineHeight:1.5, fontFamily:"var(--font-poppins)" }}>Leads automáticos, etapas, seguimiento y deduplicación de contactos sin esfuerzo.</p>
                </div>
              </div>

              {/* Card 3 — Dashboards y reportes */}
              <div style={{ flex:1, background:"white", border:"1px solid #e8eaed", borderRadius:18, padding:"0.7rem 0.7rem 0.9rem", display:"flex", flexDirection:"column", boxShadow:"0 2px 12px rgba(0,0,0,0.05)", overflow:"hidden" }}>
                <div style={{ flex:1, marginBottom:"0.65rem", borderRadius:10, position:"relative", overflow:"hidden", minHeight:115 }} />
                <div style={{ padding:"0.5rem 0.4rem 0.3rem", display:"flex", flexDirection:"column", gap:"0.3rem" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.45rem" }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    <span style={{ fontSize:"0.95rem", fontWeight:600, color:"#0f0f0f", fontFamily:"var(--font-poppins)" }}>Dashboards y reportes</span>
                  </div>
                  <p style={{ fontSize:"0.75rem", color:"#888", margin:0, lineHeight:1.5, fontFamily:"var(--font-poppins)" }}>Reportes automáticos, alertas de desviación y resúmenes diarios a email o Slack.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* Vertical center divider */}
        <div style={{ position:"absolute", left:"50%", top:0, transform:"translateX(-50%)", width:1, height:5*CELL, background:"rgba(0,0,0,0.07)", zIndex:6, pointerEvents:"none" }} />

        {/* Centered title — row 0 */}
        <div style={{ position:"absolute", left:0, right:0, top:CELL*0.4, height:CELL, zIndex:7, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", gap:8, pointerEvents:"none", paddingBottom:18, opacity: gridVisible ? 1 : 0, transform: gridVisible ? "translateY(0)" : "translateY(22px)", transition:"opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}>
          <div style={{ fontSize:"0.62rem", fontWeight:500, color:"rgba(99,102,241,0.7)", letterSpacing:"0.18em", textTransform:"uppercase" as const }}>Automatización inteligente</div>
          <div style={{ fontSize:"clamp(1.3rem,2vw,1.75rem)", fontWeight:600, color:"#0f0f0f", letterSpacing:"-0.03em", lineHeight:1.15, textAlign:"center" as const }}>
            Automatizamos tus tareas e integramos<br/>
            <em style={{ fontFamily:"Times New Roman, Georgia, serif", fontStyle:"italic", fontWeight:400, color:"#2563eb" }}>tus herramientas de trabajo con IA.</em>
          </div>
        </div>

        {/* Left side visual — globe */}
        <div style={{ position:"absolute", right:"calc(50% + 60px)", top: CELL * 1.4, width:450, height:400, zIndex:5, overflow:"visible" }}>
          <svg viewBox="0 0 450 400" width="450" height="400" fill="none" overflow="visible">
            <defs>
              <radialGradient id="glight" cx="28%" cy="25%" r="58%" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="white" stopOpacity="0.75"/>
                <stop offset="50%" stopColor="white" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="gedge" cx="50%" cy="50%" r="50%" gradientUnits="objectBoundingBox">
                <stop offset="56%" stopColor="white" stopOpacity="0"/>
                <stop offset="100%" stopColor="white" stopOpacity="0.55"/>
              </radialGradient>
              <radialGradient id="globe-shadow" cx="52%" cy="56%" r="52%" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="rgba(37,99,235,0.13)"/>
                <stop offset="60%" stopColor="rgba(37,99,235,0.06)"/>
                <stop offset="100%" stopColor="rgba(37,99,235,0)"/>
              </radialGradient>
              <pattern id="bgdots" x="0" y="0" width="11" height="11" patternUnits="userSpaceOnUse">
                <circle cx="5.5" cy="5.5" r="1.7" fill="rgba(37,99,235,0.80)"/>
              </pattern>
              <radialGradient id="blob-bl" cx="50%" cy="50%" r="50%" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="white" stopOpacity="1"/>
                <stop offset="70%" stopColor="white" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="blob-tr" cx="50%" cy="50%" r="50%" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="white" stopOpacity="1"/>
                <stop offset="65%" stopColor="white" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </radialGradient>
              <mask id="ring-mask">
                {/* bottom-left blob — closer to globe */}
                <ellipse cx="172" cy="318" rx="105" ry="78" fill="url(#blob-bl)"/>
                {/* top-right blob — closer to globe */}
                <ellipse cx="368" cy="128" rx="88" ry="68" fill="url(#blob-tr)"/>
                {/* punch out globe interior */}
                <circle cx="265" cy="220" r="162" fill="black"/>
              </mask>
            </defs>

            {/* Shadow blob behind globe */}
            <ellipse cx="272" cy="236" rx="195" ry="178"
              fill="url(#globe-shadow)"
              style={{ filter:"blur(18px)", opacity: gridVisible ? 1 : 0, transition:"opacity 1.4s ease 0.1s" }}/>
            {/* Dot ring — only visible outside globe edge, fades away */}
            <rect x="-80" y="-80" width="610" height="560" fill="url(#bgdots)" mask="url(#ring-mask)"
              style={{ opacity: gridVisible ? 1 : 0, transition:"opacity 1.2s ease 0.4s" }}/>

            {/* Globe base — grows from center */}
            <g style={{
              transformBox:"fill-box", transformOrigin:"265px 220px",
              animation: "globe-base-in 0.9s cubic-bezier(0.34,1.4,0.64,1) 0.1s both",
              animationPlayState: gridVisible ? "running" : "paused",
            }}>
              <circle cx="265" cy="220" r="165" fill="white"/>
              <circle cx="265" cy="220" r="165" stroke="rgba(37,99,235,0.08)" strokeWidth="1"/>
            </g>

            {/* Globe dots — scale in from globe center */}
            <g style={{
              transformBox:"fill-box", transformOrigin:"265px 220px",
              animation: "globe-dots-in 1.2s cubic-bezier(0.34,1.2,0.64,1) 0.5s both",
              animationPlayState: gridVisible ? "running" : "paused",
            }}>
              {GLOBE_DOTS.map((d,i) => (
                <circle key={i} cx={d.x} cy={d.y} r={d.r}
                  fill={d.land ? `rgba(37,99,235,${Math.min(0.68, 0.38+d.r*0.13)})` : `rgba(37,99,235,${Math.min(0.40, 0.18+d.r*0.14)})`}
                />
              ))}
            </g>

            {/* Globe overlays */}
            <g style={{
              transformBox:"fill-box", transformOrigin:"265px 220px",
              animation: "globe-base-in 0.9s cubic-bezier(0.34,1.4,0.64,1) 0.1s both",
              animationPlayState: gridVisible ? "running" : "paused",
            }}>
              <circle cx="265" cy="220" r="165" fill="url(#glight)"/>
              <circle cx="265" cy="220" r="165" fill="url(#gedge)"/>
            </g>

            {/* ── n8n hub card — pops in first ── */}
            <g style={{
              transformBox:"fill-box", transformOrigin:"48px 160px",
              animation: "node-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.25s both",
              animationPlayState: gridVisible ? "running" : "paused",
            }}>
              <rect x="14" y="126" width="68" height="68" rx="16" fill="white" stroke="rgba(37,99,235,0.13)" strokeWidth="1.2" style={{ filter:"drop-shadow(0 4px 20px rgba(37,99,235,0.10))" }}/>
              {/* Iconsax building-2 icon, centered in card */}
              <g transform="translate(30,142)" stroke="#2563eb" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" fill="none">
                {/* main building body */}
                <path d="M 2 30 L 30 30"/>
                <path d="M 4 30 L 4 6 C 4 4.9 4.9 4 6 4 L 18 4 C 19.1 4 20 4.9 20 6 L 20 30"/>
                {/* right annex */}
                <path d="M 20 12 L 26 12 C 27.1 12 28 12.9 28 14 L 28 30"/>
                {/* windows left building */}
                <path d="M 8 9 L 11 9"/>
                <path d="M 8 14 L 11 14"/>
                <path d="M 8 19 L 11 19"/>
                <path d="M 13 9 L 16 9"/>
                <path d="M 13 14 L 16 14"/>
                <path d="M 13 19 L 16 19"/>
                {/* door */}
                <path d="M 10 30 L 10 24 C 10 23.4 10.4 23 11 23 L 13 23 C 13.6 23 14 23.4 14 24 L 14 30"/>
                {/* right annex window */}
                <path d="M 23 17 L 25 17"/>
                <path d="M 23 22 L 25 22"/>
              </g>
            </g>

            {/* ── connection lines — draw in sequentially ── */}
            {/* → WhatsApp */}
            <path d="M 48 126 Q 48 62 159 62"
              stroke="rgba(37,99,235,0.20)" strokeWidth="1.3" fill="none"
              strokeDasharray="220" style={{
                animation: "line-draw 0.55s ease-out 0.8s both",
                animationPlayState: gridVisible ? "running" : "paused",
              }}/>
            <path d="M 48 126 Q 48 62 159 62"
              stroke="rgba(37,99,235,0.82)" strokeWidth="2.0" strokeLinecap="round" strokeDasharray="6 600" fill="none"
              style={{ animation:"dot-travel 2.2s linear 1.6s infinite", animationPlayState: gridVisible ? "running" : "paused" }}/>
            {/* → Notion */}
            <path d="M 82 178 Q 105 178 105 210"
              stroke="rgba(37,99,235,0.20)" strokeWidth="1.3" fill="none"
              strokeDasharray="90" style={{
                animation: "line-draw 0.35s ease-out 1.05s both",
                animationPlayState: gridVisible ? "running" : "paused",
              }}/>
            <path d="M 82 178 Q 105 178 105 210"
              stroke="rgba(37,99,235,0.82)" strokeWidth="2.0" strokeLinecap="round" strokeDasharray="6 600" fill="none"
              style={{ animation:"dot-travel 1.5s linear 1.6s infinite", animationPlayState: gridVisible ? "running" : "paused" }}/>
            {/* → ChatGPT */}
            <path d="M 56 194 Q 56 322 196 322"
              stroke="rgba(37,99,235,0.20)" strokeWidth="1.3" fill="none"
              strokeDasharray="310" style={{
                animation: "line-draw 0.65s ease-out 1.3s both",
                animationPlayState: gridVisible ? "running" : "paused",
              }}/>
            <path d="M 56 194 Q 56 322 196 322"
              stroke="rgba(37,99,235,0.82)" strokeWidth="2.0" strokeLinecap="round" strokeDasharray="6 600" fill="none"
              style={{ animation:"dot-travel 2.6s linear 1.6s infinite", animationPlayState: gridVisible ? "running" : "paused" }}/>

            {/* junction dots */}
            <circle cx="48" cy="126" r="3.5" fill="rgba(37,99,235,0.45)"
              style={{ opacity: gridVisible ? 1 : 0, transition:"opacity 0s 0.8s" }}/>
            <circle cx="82" cy="178" r="3.5" fill="rgba(37,99,235,0.45)"
              style={{ opacity: gridVisible ? 1 : 0, transition:"opacity 0s 1.05s" }}/>
            <circle cx="56" cy="194" r="3.5" fill="rgba(37,99,235,0.45)"
              style={{ opacity: gridVisible ? 1 : 0, transition:"opacity 0s 1.3s" }}/>

            {/* ── service icons — pop in after lines draw ── */}
            {/* WhatsApp */}
            <g style={{
              transformBox:"fill-box", transformOrigin:"185px 62px",
              animation: "node-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.35s both",
              animationPlayState: gridVisible ? "running" : "paused",
            }}>
              <circle cx="185" cy="62" r="26" fill="white" stroke="rgba(37,99,235,0.13)" strokeWidth="1.2" style={{ filter:"drop-shadow(0 3px 14px rgba(0,0,0,0.07))" }}/>
              <image href="/icons/WhatsApp_Logo_green.svg.png" x="169" y="46" width="32" height="32" preserveAspectRatio="xMidYMid meet"/>
            </g>
            {/* Notion */}
            <g style={{
              transformBox:"fill-box", transformOrigin:"105px 236px",
              animation: "node-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.45s both",
              animationPlayState: gridVisible ? "running" : "paused",
            }}>
              <circle cx="105" cy="236" r="26" fill="white" stroke="rgba(37,99,235,0.13)" strokeWidth="1.2" style={{ filter:"drop-shadow(0 3px 14px rgba(0,0,0,0.07))" }}/>
              <image href="/icons/Notion-logo.svg.png" x="89" y="220" width="32" height="32" preserveAspectRatio="xMidYMid meet"/>
            </g>
            {/* ChatGPT */}
            <g style={{
              transformBox:"fill-box", transformOrigin:"222px 322px",
              animation: "node-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.55s both",
              animationPlayState: gridVisible ? "running" : "paused",
            }}>
              <circle cx="222" cy="322" r="26" fill="white" stroke="rgba(37,99,235,0.13)" strokeWidth="1.2" style={{ filter:"drop-shadow(0 3px 14px rgba(0,0,0,0.07))" }}/>
              <image href="/icons/ChatGPT-Logo.svg.png" x="206" y="306" width="32" height="32" preserveAspectRatio="xMidYMid meet"/>
            </g>
          </svg>
        </div>

        {/* Integration visualization — right center half */}
        <div style={{ position:"absolute", left:"50%", top:CELL, width:4.5*CELL, height:4*CELL, zIndex:5, display:"flex", alignItems:"center", justifyContent:"center" }}>
          {/* Connections — all 4 sides */}
          <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", overflow:"visible", pointerEvents:"none" }} viewBox="0 0 585 520" fill="none">
            <defs>
              <linearGradient id="conn-l" gradientUnits="userSpaceOnUse" x1="213" y1="260" x2="143" y2="110">
                <stop offset="0%" stopColor="#c8c8c8" stopOpacity="0.55"/><stop offset="100%" stopColor="#c8c8c8" stopOpacity="0.05"/>
              </linearGradient>
              <linearGradient id="conn-r" gradientUnits="userSpaceOnUse" x1="371" y1="260" x2="441" y2="406">
                <stop offset="0%" stopColor="#86efac" stopOpacity="0.6"/><stop offset="100%" stopColor="#86efac" stopOpacity="0.05"/>
              </linearGradient>
              <linearGradient id="conn-t" gradientUnits="userSpaceOnUse" x1="292" y1="181" x2="446" y2="111">
                <stop offset="0%" stopColor="#c8c8c8" stopOpacity="0.55"/><stop offset="100%" stopColor="#c8c8c8" stopOpacity="0.05"/>
              </linearGradient>
              <linearGradient id="conn-b" gradientUnits="userSpaceOnUse" x1="292" y1="339" x2="198" y2="392">
                <stop offset="0%" stopColor="#c8c8c8" stopOpacity="0.55"/><stop offset="100%" stopColor="#c8c8c8" stopOpacity="0.05"/>
              </linearGradient>
              <filter id="conn-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              {/* Misty white cloud blobs */}
              <radialGradient id="mist-tl" cx="25%" cy="22%" r="55%">
                <stop offset="0%" stopColor="white" stopOpacity="0.72"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="mist-br" cx="78%" cy="80%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="0.65"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="mist-tr" cx="80%" cy="25%" r="45%">
                <stop offset="0%" stopColor="white" stopOpacity="0.55"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="mist-bl" cx="22%" cy="78%" r="40%">
                <stop offset="0%" stopColor="white" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </radialGradient>
            </defs>

            {/* Misty white overlays */}
            <rect x="0" y="0" width="585" height="520" fill="url(#mist-tl)" />
            <rect x="0" y="0" width="585" height="520" fill="url(#mist-br)" />
            <rect x="0" y="0" width="585" height="520" fill="url(#mist-tr)" />
            <rect x="0" y="0" width="585" height="520" fill="url(#mist-bl)" />

            {/* ── LEFT: exits left → curves up ── */}
            <path d="M 213 260 L 163 260 Q 143 260 143 240 L 143 134"
              stroke="url(#conn-l)" strokeWidth="1.2" strokeDasharray="240"
              filter="url(#conn-glow)"
              style={{ animation:"conn-draw 0.9s cubic-bezier(0.4,0,0.2,1) 0.3s both", animationPlayState: gridVisible ? "running" : "paused" }} />
            <path d="M 138 193 L 143 184 L 148 193" stroke="rgba(180,180,180,0.5)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"
              style={{ animation:"hero-fade-in 0.4s ease 1s both", animationPlayState: gridVisible ? "running" : "paused" }} />
            <g style={{ transformOrigin:"143px 107px", animation:"badge-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.1s both", animationPlayState: gridVisible ? "running" : "paused" }}>
              <circle cx="143" cy="107" r="26" fill="white" stroke="rgba(0,0,0,0.08)" strokeWidth="1" filter="url(#badge-shadow)"/>
              <circle cx="143" cy="107" r="26" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1.2" style={{ transformOrigin:"143px 107px", animation:"badge-ripple 7s ease-out 1s infinite" }}/>
              <image href="/icons/Notion-logo.svg.png" x="129" y="93" width="28" height="28" preserveAspectRatio="xMidYMid meet"/>
            </g>

            {/* ── RIGHT: exits right → curves down ── */}
            <path d="M 371 260 L 421 260 Q 441 260 441 280 L 441 380"
              stroke="url(#conn-r)" strokeWidth="1.2" strokeDasharray="240"
              filter="url(#conn-glow)"
              style={{ animation:"conn-draw 0.9s cubic-bezier(0.4,0,0.2,1) 0.6s both", animationPlayState: gridVisible ? "running" : "paused" }} />
            <path d="M 436 330 L 441 339 L 446 330" stroke="rgba(134,239,172,0.55)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"
              style={{ animation:"hero-fade-in 0.4s ease 1.3s both", animationPlayState: gridVisible ? "running" : "paused" }} />
            <g style={{ transformOrigin:"441px 406px", animation:"badge-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.4s both", animationPlayState: gridVisible ? "running" : "paused" }}>
              <circle cx="441" cy="406" r="26" fill="white" stroke="rgba(0,0,0,0.08)" strokeWidth="1" filter="url(#badge-shadow)"/>
              <circle cx="441" cy="406" r="26" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1.2" style={{ transformOrigin:"441px 406px", animation:"badge-ripple 7s ease-out 2s infinite" }}/>
              <image href="/icons/WhatsApp_Logo_green.svg.png" x="427" y="392" width="28" height="28" preserveAspectRatio="xMidYMid meet"/>
            </g>

            {/* ── TOP: exits top → curves right ── */}
            <path d="M 292 181 L 292 131 Q 292 111 312 111 L 420 111"
              stroke="url(#conn-t)" strokeWidth="1.2" strokeDasharray="240"
              filter="url(#conn-glow)"
              style={{ animation:"conn-draw 0.9s cubic-bezier(0.4,0,0.2,1) 0.9s both", animationPlayState: gridVisible ? "running" : "paused" }} />
            <path d="M 363 106 L 372 111 L 363 116" stroke="rgba(180,180,180,0.5)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"
              style={{ animation:"hero-fade-in 0.4s ease 1.6s both", animationPlayState: gridVisible ? "running" : "paused" }} />
            <g style={{ transformOrigin:"446px 111px", animation:"badge-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.7s both", animationPlayState: gridVisible ? "running" : "paused" }}>
              <circle cx="446" cy="111" r="26" fill="white" stroke="rgba(0,0,0,0.08)" strokeWidth="1" filter="url(#badge-shadow)"/>
              <circle cx="446" cy="111" r="26" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1.2" style={{ transformOrigin:"446px 111px", animation:"badge-ripple 7s ease-out 3s infinite" }}/>
              <image href="/icons/ChatGPT-Logo.svg.png" x="432" y="97" width="28" height="28" preserveAspectRatio="xMidYMid meet"/>
            </g>

            {/* ── BOTTOM: exits bottom → curves left (short) ── */}
            <path d="M 292 339 L 292 372 Q 292 392 272 392 L 224 392"
              stroke="url(#conn-b)" strokeWidth="1.2" strokeDasharray="120"
              filter="url(#conn-glow)"
              style={{ animation:"conn-draw 0.9s cubic-bezier(0.4,0,0.2,1) 1.2s both", animationPlayState: gridVisible ? "running" : "paused" }} />
            <g style={{ transformOrigin:"198px 392px", animation:"badge-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 2s both", animationPlayState: gridVisible ? "running" : "paused" }}>
              <circle cx="198" cy="392" r="26" fill="white" stroke="rgba(0,0,0,0.08)" strokeWidth="1" filter="url(#badge-shadow)"/>
              <circle cx="198" cy="392" r="26" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1.2" style={{ transformOrigin:"198px 392px", animation:"badge-ripple 7s ease-out 4s infinite" }}/>
              <image href="/icons/googlesheetslogo.png" x="184" y="378" width="28" height="28" preserveAspectRatio="xMidYMid meet"/>
            </g>
          </svg>
          {/* Glow behind card */}
          <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", width:220, height:220, borderRadius:"50%", background:"radial-gradient(circle, rgba(220,225,255,0.7) 0%, rgba(200,210,255,0.3) 45%, transparent 72%)", filter:"blur(28px)", pointerEvents:"none", zIndex:1, opacity: gridVisible ? 1 : 0, transition:"opacity 0.8s ease 0.5s" }} />
          {/* Dot bg top-left */}
          <div style={{ position:"absolute", left:"calc(50% - 61px - 65px)", top:"calc(50% - 51px - 65px)", width:130, height:130, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.38) 1.5px, transparent 1.5px)", backgroundSize:"10px 10px", WebkitMaskImage:"radial-gradient(ellipse at center, black 60%, transparent 100%)", maskImage:"radial-gradient(ellipse at center, black 60%, transparent 100%)", WebkitMaskSize: gridVisible ? "100% 100%" : "0% 0%", maskSize: gridVisible ? "100% 100%" : "0% 0%", WebkitMaskRepeat:"no-repeat", maskRepeat:"no-repeat", WebkitMaskPosition:"center", maskPosition:"center", pointerEvents:"none", zIndex:2, transition:"mask-size 0.9s cubic-bezier(0.4,0,0.2,1) 0.45s, -webkit-mask-size 0.9s cubic-bezier(0.4,0,0.2,1) 0.45s" }} />
          {/* Dot bg bottom-right */}
          <div style={{ position:"absolute", left:"calc(50% + 61px - 65px)", top:"calc(50% + 51px - 65px)", width:130, height:130, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.38) 1.5px, transparent 1.5px)", backgroundSize:"10px 10px", WebkitMaskImage:"radial-gradient(ellipse at center, black 60%, transparent 100%)", maskImage:"radial-gradient(ellipse at center, black 60%, transparent 100%)", WebkitMaskSize: gridVisible ? "100% 100%" : "0% 0%", maskSize: gridVisible ? "100% 100%" : "0% 0%", WebkitMaskRepeat:"no-repeat", maskRepeat:"no-repeat", WebkitMaskPosition:"center", maskPosition:"center", pointerEvents:"none", zIndex:2, transition:"mask-size 0.9s cubic-bezier(0.4,0,0.2,1) 0.6s, -webkit-mask-size 0.9s cubic-bezier(0.4,0,0.2,1) 0.6s" }} />
          {/* Central card — square */}
          <div style={{ position:"relative", width:188, height:168, background:"#fff", borderRadius:16, boxShadow:"0 8px 36px rgba(0,0,0,0.08)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:3, opacity: gridVisible ? 1 : 0, transform: gridVisible ? "scale(1)" : "scale(0.88)", transition:"opacity 0.6s ease 0.4s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.4s" }}>
            {/* Top-left corner border — rounded */}
            <svg style={{ position:"absolute", top:0, left:0, pointerEvents:"none" }} width="56" height="56" viewBox="0 0 56 56" fill="none">
              <defs>
                <linearGradient id="cl-tl-h" gradientUnits="userSpaceOnUse" x1="56" y1="0" x2="16" y2="0">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0"/>
                  <stop offset="60%" stopColor="#818cf8" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.85"/>
                </linearGradient>
                <linearGradient id="cl-tl-v" gradientUnits="userSpaceOnUse" x1="0" y1="16" x2="0" y2="56">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.85"/>
                  <stop offset="40%" stopColor="#818cf8" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <line x1="56" y1="0.75" x2="16" y2="0.75" stroke="url(#cl-tl-h)" strokeWidth="1.5"/>
              <path d="M 16 0.75 A 15.25 15.25 0 0 0 0.75 16" stroke="#818cf8" strokeWidth="1.5" strokeOpacity="0.85" fill="none"/>
              <line x1="0.75" y1="16" x2="0.75" y2="56" stroke="url(#cl-tl-v)" strokeWidth="1.5"/>
            </svg>
            {/* Bottom-right corner border — rounded */}
            <svg style={{ position:"absolute", bottom:0, right:0, pointerEvents:"none" }} width="56" height="56" viewBox="0 0 56 56" fill="none">
              <defs>
                <linearGradient id="cl-br-h" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="40" y2="0">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0"/>
                  <stop offset="40%" stopColor="#818cf8" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.85"/>
                </linearGradient>
                <linearGradient id="cl-br-v" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="40">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0"/>
                  <stop offset="60%" stopColor="#818cf8" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.85"/>
                </linearGradient>
              </defs>
              <line x1="0" y1="55.25" x2="40" y2="55.25" stroke="url(#cl-br-h)" strokeWidth="1.5"/>
              <path d="M 40 55.25 A 15.25 15.25 0 0 0 55.25 40" stroke="#818cf8" strokeWidth="1.5" strokeOpacity="0.85" fill="none"/>
              <line x1="55.25" y1="40" x2="55.25" y2="0" stroke="url(#cl-br-v)" strokeWidth="1.5"/>
            </svg>
            <div style={{ position:"relative", width:76, height:76, borderRadius:20, background:"#fff", boxShadow:"0 4px 20px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", overflow:"visible" }} viewBox="0 0 76 76" fill="none">
                {/* Static border */}
                <rect x="0.75" y="0.75" width="74.5" height="74.5" rx="19.25" stroke="rgba(99,102,241,0.15)" strokeWidth="1.5"/>
                {/* Border trace */}
                <rect x="0.75" y="0.75" width="74.5" height="74.5" rx="19.25"
                  stroke="#818cf8" strokeWidth="2" strokeLinecap="round"
                  strokeDasharray="200"
                  style={{ animation:"border-trace 4s ease-in-out infinite", filter:"drop-shadow(0 0 5px rgba(129,140,248,0.8))" }}/>
                <rect x="0.75" y="0.75" width="74.5" height="74.5" rx="19.25"
                  stroke="white" strokeWidth="1" strokeLinecap="round"
                  strokeDasharray="200"
                  style={{ animation:"border-trace 4s ease-in-out infinite", opacity:0.6 }}/>
              </svg>
              <img src="/icons/n8n-icon.webp" width={46} height={46} style={{ objectFit:"contain" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — Video demo ── */}
      <section style={{ padding:"0 1.5rem 0", background:"#fff", position:"relative", overflow:"hidden", contentVisibility:"auto", containIntrinsicSize:"0 900px" }}>

        {/* Background rectangles — flanking the video */}
        <div style={{ position:"absolute", left:"calc(50% - 720px)", top:"-9%", width:480, height:650, borderRadius:60, background:"linear-gradient(135deg, rgba(219,234,254,0.35) 0%, rgba(191,219,254,0.15) 100%)", border:"1px solid rgba(99,153,230,0.65)", pointerEvents:"none", zIndex:0, transform:"skewY(35deg)", transformOrigin:"left top", WebkitMaskImage:"linear-gradient(to right, transparent 0%, black 22%), linear-gradient(to top, transparent 0%, black 18%), radial-gradient(ellipse 90% 65% at 0% 0%, transparent 0%, transparent 30%, black 80%)", maskImage:"linear-gradient(to right, transparent 0%, black 22%), linear-gradient(to top, transparent 0%, black 18%), radial-gradient(ellipse 90% 65% at 0% 0%, transparent 0%, transparent 30%, black 80%)", WebkitMaskComposite:"destination-in, destination-in", maskComposite:"intersect, intersect" }} />
        <div style={{ position:"absolute", right:"calc(50% - 720px)", top:"-9%", width:480, height:650, borderRadius:60, background:"linear-gradient(225deg, rgba(219,234,254,0.35) 0%, rgba(191,219,254,0.15) 100%)", border:"1px solid rgba(99,153,230,0.65)", pointerEvents:"none", zIndex:0, transform:"skewY(-35deg)", transformOrigin:"right top", WebkitMaskImage:"linear-gradient(to left, transparent 0%, black 22%), linear-gradient(to top, transparent 0%, black 18%), radial-gradient(ellipse 90% 65% at 100% 0%, transparent 0%, transparent 30%, black 80%)", maskImage:"linear-gradient(to left, transparent 0%, black 22%), linear-gradient(to top, transparent 0%, black 18%), radial-gradient(ellipse 90% 65% at 100% 0%, transparent 0%, transparent 30%, black 80%)", WebkitMaskComposite:"destination-in, destination-in", maskComposite:"intersect, intersect" }} />

        <div style={{ maxWidth:1200, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1, paddingTop:"1.2rem" }}>
          <ScrollReveal delay={0.05}>
          {/* Badge */}
          <div style={{ display:"inline-flex", alignItems:"center", border:"1px solid #e5e7eb", borderRadius:999, padding:"0.28rem 0.9rem", marginBottom:"1.6rem", fontSize:"0.75rem", color:"#555", background:"#fff" }}>
            Mira cómo funciona
          </div>

          {/* Heading */}
          <h2 style={{ fontWeight:600, fontSize:"clamp(1.8rem,3vw,2.8rem)", letterSpacing:"-0.035em", lineHeight:1.1, color:"#0f0f0f", margin:"0 0 1.1rem" }}>
            Automatización real,<br/>
            <em style={{ fontFamily:"Times New Roman, Georgia, serif", fontStyle:"italic", fontWeight:400, color:"#2563eb" }}>resultados en minutos.</em>
          </h2>

          {/* Subtitle */}
          <p style={{ fontSize:"0.95rem", color:"#888", maxWidth:440, margin:"0 auto 2rem", lineHeight:1.7 }}>
            Mira cómo conectamos tus herramientas y automatizamos procesos complejos desde cero.
          </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={0.15}><div style={{ display:"flex", gap:"0.75rem", justifyContent:"center", marginBottom:0, flexWrap:"wrap" }}>
            <a href="#contacto" style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"#2563eb", color:"#fff", fontWeight:600, fontSize:"0.88rem", padding:"0.78rem 1.6rem", borderRadius:999, textDecoration:"none", letterSpacing:"-0.01em", boxShadow:"0 4px 18px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.15)" }}>
              Empezar ahora
            </a>
            <a href="#servicios" style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", background:"#fff", color:"#0f0f0f", fontWeight:500, fontSize:"0.88rem", padding:"0.78rem 1.6rem", borderRadius:999, border:"1px solid #e5e7eb", textDecoration:"none", letterSpacing:"-0.01em", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
              Ver servicios
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div></ScrollReveal>

          {/* CTA → video connectors */}
          <div style={{ position:"relative", height:"4.5rem", width:"100%", pointerEvents:"none" }}>
            <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", overflow:"visible" }} viewBox="0 0 1200 72" preserveAspectRatio="none">
              {/* Primary button → long left → down to video */}
              <path d="M 523 0 L 523 14 Q 523 30 503 30 L 300 30 Q 280 30 280 50 L 280 72" fill="none" stroke="rgba(99,153,230,0.6)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Secondary button → long right → down */}
              <path d="M 688 0 L 688 14 Q 688 30 708 30 L 1080 30 Q 1100 30 1100 50 L 1100 72" fill="none" stroke="rgba(99,153,230,0.45)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Browser frame + video */}
          <ScrollReveal delay={0.25}><div style={{ position:"relative", marginTop:0 }}>
          {/* Left side — 2 short lines */}
          <svg style={{ position:"absolute", right:"100%", top:0, width:"22vw", height:"100%", overflow:"visible", pointerEvents:"none", zIndex:1 }} viewBox="0 0 260 400" preserveAspectRatio="none">
            <line x1="260" y1="170" x2="60" y2="170" stroke="rgba(99,153,230,0.6)" strokeWidth="0.7" strokeLinecap="round"/>
            <line x1="260" y1="230" x2="120" y2="230" stroke="rgba(99,153,230,0.45)" strokeWidth="0.7" strokeLinecap="round"/>
          </svg>

          {/* Right stepped line — short right → long up → right */}
          <svg style={{ position:"absolute", left:"100%", top:0, width:"40vw", height:"100%", overflow:"visible", pointerEvents:"none", zIndex:1 }} viewBox="0 0 400 400" preserveAspectRatio="none">
            <path d="M 0 200 L 42 200 Q 55 200 55 187 L 55 -67 Q 55 -80 68 -80 L 400 -80" fill="none" stroke="rgba(99,153,230,0.65)" strokeWidth="0.7" strokeLinecap="round"/>
          </svg>

          {/* Dot grid — top-left corner */}
          <div style={{ position:"absolute", left:-90, top:-80, width:380, height:320, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.55) 2px, transparent 2px)", backgroundSize:"14px 14px", WebkitMaskImage:"radial-gradient(circle at 50% 50%, black 0%, black 35%, transparent 70%)", maskImage:"radial-gradient(circle at 50% 50%, black 0%, black 35%, transparent 70%)", pointerEvents:"none", zIndex:1 }} />
          {/* Dot grid — top-right corner */}
          <div style={{ position:"absolute", right:-90, top:-80, width:380, height:320, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.55) 2px, transparent 2px)", backgroundSize:"14px 14px", WebkitMaskImage:"radial-gradient(circle at 50% 50%, black 0%, black 35%, transparent 70%)", maskImage:"radial-gradient(circle at 50% 50%, black 0%, black 35%, transparent 70%)", pointerEvents:"none", zIndex:1 }} />
          <div style={{ borderRadius:20, overflow:"hidden", border:"1px solid #e8eaed", boxShadow:"0 28px 80px rgba(0,0,0,0.10), 0 4px 20px rgba(0,0,0,0.06)", position:"relative", zIndex:2 }}>
            {/* Browser chrome */}
            <div style={{ background:"#f8f9fa", borderBottom:"1px solid #e8eaed", padding:"0.65rem 1rem", display:"flex", alignItems:"center", gap:"0.6rem" }}>
              <div style={{ display:"flex", gap:"0.38rem" }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:"#ff5f57" }} />
                <div style={{ width:10, height:10, borderRadius:"50%", background:"#ffbd2e" }} />
                <div style={{ width:10, height:10, borderRadius:"50%", background:"#28c840" }} />
              </div>
              <div style={{ flex:1, height:22, background:"#fff", borderRadius:6, border:"1px solid #e5e7eb", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:"0.65rem", color:"#aaa" }}>n8nlabs.com/demo</span>
              </div>
            </div>
            {/* Video */}
            <div style={{ position:"relative", aspectRatio:"16/9", background:"#0f172a", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <video style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} autoPlay muted loop playsInline poster="">
                <source src="/demo.mp4" type="video/mp4" />
              </video>
              {/* Play button placeholder — shows until video loads */}
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)", pointerEvents:"none" }}>
                <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.22)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
            </div>
          </div>
          </div></ScrollReveal>
        </div>
      </section>

      <div style={{ height:"4rem", background:"#fff" }} />
      <ScrollReveal delay={0.05}><FaqSection /></ScrollReveal>

      <ScrollReveal delay={0.05}><CalBookingSection /></ScrollReveal>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#fff", borderTop:"1px solid rgba(0,0,0,0.07)", position:"relative", overflow:"hidden", contentVisibility:"auto", containIntrinsicSize:"0 400px" }}>
        {/* Subtle dot bg top-left */}
        <div style={{ position:"absolute", left:-40, top:-40, width:280, height:220, backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.25) 1.5px, transparent 1.5px)", backgroundSize:"12px 12px", WebkitMaskImage:"radial-gradient(circle at 0% 0%, black 0%, black 30%, transparent 70%)", maskImage:"radial-gradient(circle at 0% 0%, black 0%, black 30%, transparent 70%)", pointerEvents:"none" }} />

        {/* Main footer content */}
        <ScrollReveal delay={0.05}><div style={{ maxWidth:1100, margin:"0 auto", padding:"4rem 2rem 2.5rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"3rem", marginBottom:"3.5rem" }}>

            {/* Brand col */}
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"1rem" }}>
                <span style={{ fontWeight:700, fontSize:"1.05rem", color:"#0f0f0f", letterSpacing:"-0.03em", fontFamily:"var(--font-poppins)" }}>N8n Labs</span>
              </div>
              <p style={{ fontSize:"0.82rem", color:"#888", lineHeight:1.7, maxWidth:260, margin:"0 0 1.5rem", fontFamily:"var(--font-poppins)" }}>
                Diseñamos e implementamos automatizaciones con n8n e IA para equipos B2B.
              </p>
              <a href="#contacto" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"#2563eb", color:"#fff", fontWeight:600, fontSize:"0.8rem", padding:"0.62rem 1.2rem", borderRadius:999, textDecoration:"none", boxShadow:"0 4px 14px rgba(37,99,235,0.3)" }}>
                Agendar llamada
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>

            {/* Servicios */}
            <div>
              <div style={{ fontSize:"0.7rem", fontWeight:600, color:"#0f0f0f", letterSpacing:"0.12em", textTransform:"uppercase" as const, marginBottom:"1.1rem", fontFamily:"var(--font-poppins)" }}>Servicios</div>
              {["Integraciones API", "Automatización CRM", "Dashboards", "Flujos con IA"].map(item => (
                <a key={item} href="#" style={{ display:"block", fontSize:"0.82rem", color:"#888", textDecoration:"none", marginBottom:"0.6rem", fontFamily:"var(--font-poppins)", transition:"color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color="#0f0f0f")}
                  onMouseLeave={e => (e.currentTarget.style.color="#888")}>{item}</a>
              ))}
            </div>

            {/* Empresa */}
            <div>
              <div style={{ fontSize:"0.7rem", fontWeight:600, color:"#0f0f0f", letterSpacing:"0.12em", textTransform:"uppercase" as const, marginBottom:"1.1rem", fontFamily:"var(--font-poppins)" }}>Empresa</div>
              {["Nosotros", "Proceso", "Casos de uso", "Blog"].map(item => (
                <a key={item} href="#" style={{ display:"block", fontSize:"0.82rem", color:"#888", textDecoration:"none", marginBottom:"0.6rem", fontFamily:"var(--font-poppins)" }}
                  onMouseEnter={e => (e.currentTarget.style.color="#0f0f0f")}
                  onMouseLeave={e => (e.currentTarget.style.color="#888")}>{item}</a>
              ))}
            </div>

            {/* Contacto */}
            <div>
              <div style={{ fontSize:"0.7rem", fontWeight:600, color:"#0f0f0f", letterSpacing:"0.12em", textTransform:"uppercase" as const, marginBottom:"1.1rem", fontFamily:"var(--font-poppins)" }}>Contacto</div>
              <a href="mailto:hola@n8nlabs.com" style={{ display:"block", fontSize:"0.82rem", color:"#888", textDecoration:"none", marginBottom:"0.6rem", fontFamily:"var(--font-poppins)" }}
                onMouseEnter={e => (e.currentTarget.style.color="#2563eb")}
                onMouseLeave={e => (e.currentTarget.style.color="#888")}>hola@n8nlabs.com</a>
              <div style={{ display:"flex", gap:"0.6rem", marginTop:"1rem" }}>
                {[
                  { label:"LinkedIn", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                  { label:"Twitter", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg> },
                ].map(s => (
                  <a key={s.label} href="#" title={s.label} style={{ width:32, height:32, borderRadius:"50%", border:"1px solid rgba(0,0,0,0.08)", display:"flex", alignItems:"center", justifyContent:"center", color:"#888", textDecoration:"none" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#2563eb"; (e.currentTarget as HTMLElement).style.color="#2563eb"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="rgba(0,0,0,0.08)"; (e.currentTarget as HTMLElement).style.color="#888"; }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop:"1px solid rgba(0,0,0,0.06)", paddingTop:"1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
            <span style={{ fontSize:"0.75rem", color:"#bbb", fontFamily:"var(--font-poppins)" }}>© 2025 N8n Labs. Todos los derechos reservados.</span>
            <div style={{ display:"flex", gap:"1.5rem" }}>
              {["Privacidad", "Términos"].map(item => (
                <a key={item} href="#" style={{ fontSize:"0.75rem", color:"#bbb", textDecoration:"none", fontFamily:"var(--font-poppins)" }}
                  onMouseEnter={e => (e.currentTarget.style.color="#555")}
                  onMouseLeave={e => (e.currentTarget.style.color="#bbb")}>{item}</a>
              ))}
            </div>
          </div>
        </div></ScrollReveal>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/34649970128"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        style={{
          position:"fixed", bottom:28, right:28, zIndex:200,
          width:56, height:56, borderRadius:"50%",
          background:"#25d366",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 4px 20px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.15)",
          textDecoration:"none",
          transition:"transform 0.2s, box-shadow 0.2s",
          willChange:"transform",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="scale(1.1)"; (e.currentTarget as HTMLElement).style.boxShadow="0 6px 28px rgba(37,211,102,0.6), 0 2px 10px rgba(0,0,0,0.18)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform="scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow="0 4px 20px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.15)"; }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </main>
  );
}
