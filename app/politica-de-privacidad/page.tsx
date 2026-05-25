import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad | N8n Labs",
  description: "Política de privacidad de N8n Labs. Cómo recopilamos, usamos y protegemos tu información personal.",
};

export default function PoliticaPrivacidad() {
  return (
    <main style={{ paddingTop: 96, paddingBottom: "5rem", minHeight: "100vh", background: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 1.5rem", fontFamily: "var(--font-poppins)" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "#2563eb", textDecoration: "none", marginBottom: "2.5rem" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Volver al inicio
        </Link>

        <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
          Política de Privacidad
        </h1>
        <p style={{ fontSize: "0.82rem", color: "#888", marginBottom: "3rem" }}>Última actualización: mayo 2025</p>

        {([
          {
            title: "1. Responsable del tratamiento",
            body: "N8n Labs (en adelante «nosotros» o «la empresa») es el responsable del tratamiento de los datos personales recogidos a través del sitio web automatizacionesn8n.com. Puedes contactarnos en kelatosclaude2@gmail.com.",
          },
          {
            title: "2. Datos que recopilamos",
            body: "Recopilamos únicamente los datos que nos proporcionas de forma voluntaria: nombre, dirección de correo electrónico, nombre de empresa y cualquier otra información incluida en formularios de contacto o agendado de llamadas. No recopilamos datos sensibles.",
          },
          {
            title: "3. Finalidad y base legal",
            body: "Tratamos tus datos para (a) responder a tus consultas y gestionar reuniones, (b) enviarte información sobre nuestros servicios si nos has dado tu consentimiento, y (c) cumplir obligaciones legales. La base legal es el consentimiento del interesado y, en su caso, el interés legítimo.",
          },
          {
            title: "4. Plazo de conservación",
            body: "Conservamos los datos el tiempo necesario para la finalidad para la que fueron recogidos y, como máximo, durante el plazo legalmente exigido. Puedes solicitar su eliminación en cualquier momento.",
          },
          {
            title: "5. Destinatarios",
            body: "No vendemos ni cedemos tus datos a terceros. Podemos compartirlos con proveedores de servicios estrictamente necesarios (p. ej. herramientas de agendado o envío de correo) que actúan como encargados del tratamiento bajo acuerdos de confidencialidad.",
          },
          {
            title: "6. Tus derechos",
            body: "Puedes ejercer tus derechos de acceso, rectificación, supresión, portabilidad, limitación y oposición enviando un correo a kelatosclaude2@gmail.com. Tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es).",
          },
          {
            title: "7. Cookies",
            body: "Este sitio web puede utilizar cookies técnicas necesarias para su funcionamiento. No utilizamos cookies de rastreo publicitario de terceros.",
          },
          {
            title: "8. Modificaciones",
            body: "Nos reservamos el derecho a actualizar esta política. La versión vigente siempre estará disponible en esta URL. Los cambios sustanciales serán notificados por correo electrónico si mantenemos tu dirección.",
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
