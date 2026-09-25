// Portada generada para los artículos que no tienen foto. Es un dibujo (SVG) que representa un flujo de automatización:
// nodos unidos por líneas. Los colores dependen de la categoría y la disposición del artículo (slug), así que cada artículo
// tiene la suya, siempre la misma, sin depender de ningún servicio externo.

const TONOS: Record<string, number> = {
  "Automatización": 215,
  "Casos de uso": 262,
  "Excel y datos": 150,
  "CRM y ventas": 22,
  "WhatsApp": 142,
  "Redes sociales": 328,
  "Email marketing": 42,
  "Atención al cliente": 190,
  "Reservas y citas": 172,
  "Novedades": 4,
};

function hash(texto: string): number {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Convierte un color HSL (grados, % y %) a #rrggbb (la imagen para redes sociales solo admite formatos simples). */
export function hslAHex(h: number, s: number, l: number): string {
  const sat = s / 100;
  const lum = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(lum, 1 - lum);
  const f = (n: number) => Math.round(255 * (lum - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
  return `#${[f(0), f(8), f(4)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

/** Colores y posiciones de los nodos de la portada de un artículo (compartido con la imagen para redes sociales). */
export function disenoPortada(slug: string, category: string) {
  const h = hash(slug);
  const tono = TONOS[category] ?? h % 360;
  const tono2 = (tono + 38 + (h % 26)) % 360;
  const nodos = Array.from({ length: 5 }, (_, i) => ({
    x: 110 + i * 145 + ((h >> (i * 3)) & 31),
    y: 150 + (i % 2 === 0 ? 0 : 110) + ((h >> (i * 2 + 1)) & 47),
    r: 13 + ((h >> (i + 2)) & 7),
  }));
  return { tono, tono2, nodos };
}

export default function Portada({ slug, category, className }: { slug: string; category: string; className?: string }) {
  const { tono, tono2, nodos } = disenoPortada(slug, category);
  const id = `portada-${slug}`;
  const fondo = `hsl(${tono} 62% 20%)`;
  const luz = `hsl(${tono2} 70% 42%)`;
  return (
    <svg className={className} viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`Portada del artículo: ${category}`}>
      <defs>
        <linearGradient id={`${id}-fondo`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={fondo} />
          <stop offset="1" stopColor={luz} />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill={`url(#${id}-fondo)`} />
      <circle cx={690} cy={70} r={150} fill="#fff" opacity="0.06" />
      <circle cx={90} cy={400} r={120} fill="#fff" opacity="0.05" />
      {nodos.slice(0, -1).map((n, i) => {
        const s = nodos[i + 1];
        const mx = (n.x + s.x) / 2;
        return <path key={i} d={`M${n.x} ${n.y} C ${mx} ${n.y}, ${mx} ${s.y}, ${s.x} ${s.y}`} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9" />;
      })}
      {nodos.map((n, i) => (
        <g key={i}>
          <rect x={n.x - 34} y={n.y - 24} width="68" height="48" rx="14" fill="#fff" opacity="0.14" />
          <circle cx={n.x} cy={n.y} r={n.r} fill="#fff" opacity={i === 0 || i === nodos.length - 1 ? 0.95 : 0.75} />
        </g>
      ))}
      <text x="48" y="412" fill="#fff" fillOpacity="0.85" fontSize="22" letterSpacing="3" style={{ textTransform: "uppercase" }}>
        {category}
      </text>
    </svg>
  );
}
