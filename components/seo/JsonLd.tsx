/** Datos estructurados (schema.org) en JSON-LD. El contenido lo genera el propio código, no el usuario. */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  // "<" se escapa para que ningún texto pueda cerrar la etiqueta <script>
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
