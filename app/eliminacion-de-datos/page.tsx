import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Eliminación de Datos | N8n Labs",
  description: "Cómo solicitar la eliminación de tus datos personales de los sistemas de N8n Labs.",
};

export default function EliminacionDeDatos() {
  return (
    <main style={{ paddingTop: 96, paddingBottom: "5rem", minHeight: "100vh", background: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 1.5rem", fontFamily: "var(--font-poppins)" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "#2563eb", textDecoration: "none", marginBottom: "2.5rem" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Volver al inicio
        </Link>

        <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
          Eliminación de Datos
        </h1>
        <p style={{ fontSize: "0.82rem", color: "#888", marginBottom: "3rem" }}>Última actualización: mayo 2025</p>

        <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.75, marginBottom: "2.5rem" }}>
          En N8n Labs respetamos tu derecho al olvido. Si deseas que eliminemos todos los datos personales que tenemos asociados a ti, sigue los pasos que se describen a continuación.
        </p>

        {([
          {
            title: "¿Qué datos podemos eliminar?",
            body: "Nombre, dirección de correo electrónico, empresa, historial de conversaciones o consultas, datos de agendado de llamadas y cualquier otra información personal que hayas compartido con nosotros de forma directa.",
          },
          {
            title: "Cómo enviar tu solicitud",
            body: "Envía un correo electrónico a kelatosclaude2@gmail.com con el asunto «Solicitud de eliminación de datos». Incluye el nombre y la dirección de correo que utilizaste al contactarnos para que podamos localizar tu información.",
          },
          {
            title: "Plazo de respuesta",
            body: "Procesaremos tu solicitud en un plazo máximo de 30 días naturales a partir de su recepción, conforme a lo establecido en el Reglamento General de Protección de Datos (RGPD). Te notificaremos por correo cuando la eliminación se haya completado.",
          },
          {
            title: "Excepciones",
            body: "Podemos conservar ciertos datos cuando estemos legalmente obligados a ello (p. ej. obligaciones fiscales o contables) o cuando sean necesarios para resolver disputas en curso. En ese caso te informaremos de los datos retenidos y el motivo.",
          },
          {
            title: "Datos en plataformas de terceros",
            body: "Si nos conectaste a alguna de tus herramientas (CRM, correo, etc.) durante un proyecto, te recomendamos también revocar los accesos directamente desde esas plataformas. Podemos asesorarte en el proceso si lo necesitas.",
          },
          {
            title: "Reclamaciones",
            body: "Si no recibes respuesta en el plazo indicado o no estás satisfecho con ella, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos en www.aepd.es.",
          },
        ] as const).map(({ title, body }) => (
          <section key={title} style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#0f0f0f", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>{title}</h2>
            <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.75, margin: 0 }}>{body}</p>
          </section>
        ))}

        <div style={{ marginTop: "3rem", padding: "1.5rem", background: "#eff6ff", borderRadius: 12, border: "1px solid rgba(37,99,235,0.15)" }}>
          <p style={{ fontSize: "0.88rem", color: "#1e40af", margin: 0, fontWeight: 500 }}>
            Para solicitar la eliminación de tus datos escríbenos directamente a{" "}
            <a href="mailto:kelatosclaude2@gmail.com" style={{ color: "#2563eb", fontWeight: 600 }}>
              kelatosclaude2@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
