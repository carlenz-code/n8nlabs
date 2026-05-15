"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Location,
  Call,
  Clock,
  ArrowRight2,
  Flash,
  Code,
  Routing,
  Sms,
} from "iconsax-react";

const contactInfo = [
  {
    Icon: Location,
    label: "Dirección",
    value: "Calle Blasco de Garay 63, Madrid 28015",
  },
  {
    Icon: Call,
    label: "Teléfono",
    value: "+34 910 05 40 12",
  },
  {
    Icon: Clock,
    label: "Horario",
    value: "Lun–Vie 09:30–18:00",
    note: "Sábados y Domingos Cerrado",
  },
];

const workflowNodes = [
  { label: "Gmail",    color: "#ea4335", icon: Sms },
  { label: "n8n",      color: "#ea580c", icon: Flash },
  { label: "Slack",    color: "#4a154b", icon: Routing },
  { label: "HubSpot",  color: "#ff7a59", icon: Code },
];

const stats = [
  { value: "50+",    label: "Empresas automatizadas" },
  { value: "300+",   label: "Flujos en producción" },
  { value: "99.9%",  label: "Uptime garantizado" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#080f1c] flex items-center overflow-hidden">

      {/* Glow de fondo */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid decorativo */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,179,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT ── */}
          <div className="flex flex-col gap-6">

            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="flex items-center"
            >
              <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium px-3.5 py-1.5 rounded-full">
                <Flash size={12} color="#60a5fa" variant="Bold" />
                Automatización B2B certificada con n8n
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.1}
              className="flex flex-col gap-2"
            >
              <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase">
                Laboratorios N8n
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-black text-white leading-[1.1] tracking-tight">
                Conecta tus herramientas.{" "}
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  Escala sin límites.
                </span>
              </h1>
            </motion.div>

            {/* Contact info */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.2}
              className="flex flex-col gap-2.5 pt-1"
            >
              {contactInfo.map(({ Icon, label, value, note }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 bg-blue-500/10 border border-blue-500/20 p-1.5 rounded-md">
                    <Icon size={14} color="#60a5fa" variant="Bold" />
                  </span>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    <span className="font-semibold text-zinc-200">{label}:</span>{" "}
                    {value}
                    {note && (
                      <>
                        <br />
                        <em className="not-italic text-zinc-500 text-xs">{note}</em>
                      </>
                    )}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.35}
              className="flex items-center gap-6 pt-2 border-t border-white/5"
            >
              {stats.map(({ value, label }, i) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-2xl font-black text-white">{value}</span>
                  <span className="text-xs text-zinc-500">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT ── */}
          <div className="flex flex-col gap-8">

            {/* Workflow card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative bg-white/[0.03] border border-white/8 rounded-2xl p-6 backdrop-blur-sm"
            >
              {/* Card header */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs text-zinc-600 font-mono">workflow.n8n</span>
              </div>

              {/* Nodes */}
              <div className="flex items-center justify-between gap-2 mb-6">
                {workflowNodes.map(({ label, color, icon: Icon }, i) => (
                  <div key={label} className="flex flex-col items-center gap-2 flex-1">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                      className="relative w-12 h-12 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${color}15`,
                        borderColor: `${color}30`,
                      }}
                    >
                      <Icon size={20} color={color} variant="Bold" />
                      {i < workflowNodes.length - 1 && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                          className="absolute left-full top-1/2 -translate-y-1/2 w-full h-px origin-left"
                          style={{ background: `linear-gradient(90deg, ${color}60, transparent)` }}
                        />
                      )}
                    </motion.div>
                    <span className="text-[11px] text-zinc-500 font-medium">{label}</span>
                  </div>
                ))}
              </div>

              {/* Activity log */}
              <div className="space-y-2">
                {[
                  { msg: "Nuevo lead recibido desde formulario",  time: "ahora", dot: "#22c55e" },
                  { msg: "Datos sincronizados con HubSpot CRM",   time: "2s",   dot: "#3b82f6" },
                  { msg: "Notificación enviada a #ventas Slack",  time: "4s",   dot: "#a855f7" },
                ].map(({ msg, time, dot }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                    className="flex items-center gap-2.5 bg-white/[0.03] rounded-lg px-3 py-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: dot }} />
                    <span className="text-xs text-zinc-400 flex-1 min-w-0 truncate">{msg}</span>
                    <span className="text-[10px] text-zinc-600 flex-shrink-0">{time}</span>
                  </motion.div>
                ))}
              </div>

              {/* Pulse indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-[10px] text-zinc-500">En vivo</span>
              </div>
            </motion.div>

            {/* Description + CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.3}
              className="flex flex-col gap-5"
            >
              <p className="text-zinc-400 text-base leading-relaxed">
                Diseñamos e implementamos automatizaciones con n8n para equipos B2B.
                Conectamos tus herramientas, eliminamos tareas manuales y reducimos errores
                para que puedas escalar sin sumar trabajo operativo.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="#contacto"
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors text-white font-semibold px-6 py-3.5 rounded-xl text-sm group"
                >
                  Empezar ahora
                  <ArrowRight2 size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="#servicios"
                  className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors text-zinc-300 hover:text-white font-medium px-6 py-3.5 rounded-xl text-sm"
                >
                  Ver servicios
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
