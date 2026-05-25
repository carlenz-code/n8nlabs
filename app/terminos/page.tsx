import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones | N8n Labs",
  description: "Términos y condiciones de uso de los servicios de N8n Labs.",
};

export default function Terminos() {
  return (
    <main style={{ paddingTop: 96, paddingBottom: "5rem", minHeight: "100vh", background: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 1.5rem", fontFamily: "var(--font-poppins)" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "#2563eb", textDecoration: "none", marginBottom: "2.5rem" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Volver al inicio
        </Link>

        <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
          Términos y Condiciones
        </h1>
        <p style={{ fontSize: "0.82rem", color: "#888", marginBottom: "3rem" }}>Última actualización: mayo 2025</p>

        {([
          {
            title: "1. Aceptación",
            body: "Al acceder y utilizar el sitio web automatizacionesn8n.com o contratar cualquiera de nuestros servicios, aceptas quedar vinculado por estos Términos y Condiciones. Si no los aceptas, te rogamos que no utilices el sitio.",
          },
          {
            title: "2. Descripción del servicio",
            body: "N8n Labs ofrece servicios de automatización de procesos empresariales mediante n8n e inteligencia artificial para clientes B2B. El alcance concreto de cada proyecto se define en el acuerdo de servicio firmado con el cliente.",
          },
          {
            title: "3. Propiedad intelectual",
            body: "Todos los contenidos del sitio web (textos, imágenes, logotipos, código) son propiedad de N8n Labs o de sus licenciantes. Queda prohibida su reproducción total o parcial sin autorización expresa por escrito.",
          },
          {
            title: "4. Uso aceptable",
            body: "Te comprometes a utilizar el sitio y los servicios de forma lícita y a no realizar actividades que puedan dañar, deshabilitar o sobrecargar nuestra infraestructura, ni a intentar acceder a sistemas o datos no autorizados.",
          },
          {
            title: "5. Limitación de responsabilidad",
            body: "N8n Labs no será responsable de daños indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso del sitio o los servicios. En ningún caso nuestra responsabilidad total superará el importe pagado por el cliente en los últimos 3 meses.",
          },
          {
            title: "6. Modificaciones del servicio",
            body: "Nos reservamos el derecho a modificar, suspender o interrumpir el servicio en cualquier momento, con o sin previo aviso. Avisaremos con la mayor antelación posible a los clientes activos.",
          },
          {
            title: "7. Ley aplicable y jurisdicción",
            body: "Estos términos se rigen por la legislación española. Para cualquier controversia derivada de su interpretación o cumplimiento, las partes se someten a los juzgados y tribunales de Madrid.",
          },
          {
            title: "8. Contacto",
            body: "Para cualquier duda sobre estos términos, escríbenos a kelatosclaude2@gmail.com.",
          },
        ] as const).map(({ title, body }) => (
          <section key={title} style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#0f0f0f", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>{title}</h2>
            <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.75, margin: 0 }}>{body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
