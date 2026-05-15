"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  HambergerMenu,
  CloseSquare,
  Flash,
  Code,
  PresentionChart,
  Sms,
  ArrangeVertical,
  Cloud,
  ArrowRight2,
} from "iconsax-react";
import { cn } from "@/lib/utils";

const services = [
  {
    Icon: Flash,
    title: "Automatización de flujos",
    description: "Flujos inteligentes que conectan tus herramientas sin intervención manual.",
    href: "#automatizacion",
    color: "#f59e0b",
  },
  {
    Icon: Code,
    title: "Integración de APIs",
    description: "Conectamos REST, webhooks y cualquier servicio con endpoints personalizados.",
    href: "#integraciones",
    color: "#3b82f6",
  },
  {
    Icon: PresentionChart,
    title: "CRM & Ventas",
    description: "Automatiza leads, seguimiento y pipeline de ventas sin trabajo manual.",
    href: "#crm",
    color: "#10b981",
  },
  {
    Icon: Sms,
    title: "Marketing Automation",
    description: "Emails, segmentación y campañas en piloto automático 24/7.",
    href: "#marketing",
    color: "#8b5cf6",
  },
  {
    Icon: ArrangeVertical,
    title: "Data Pipelines",
    description: "Mueve, transforma y sincroniza datos entre sistemas en tiempo real.",
    href: "#data",
    color: "#06b6d4",
  },
  {
    Icon: Cloud,
    title: "n8n Self-Hosted",
    description: "Desplegamos n8n en tu propia infraestructura con soporte completo.",
    href: "#self-hosted",
    color: "#f43f5e",
  },
];

const navLinks = [
  { label: "Blog",      href: "#blog" },
  { label: "Nosotros",  href: "#nosotros" },
];

export default function Header() {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled,     setScrolled]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-100/60"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto px-0" style={{ maxWidth: "1170px" }}>
        <div className="flex items-center justify-between h-16">

          {/* ── LOGO ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                <polygon
                  points="17,2 30,9.5 30,24.5 17,32 4,24.5 4,9.5"
                  stroke="#2563eb"
                  strokeWidth="1.8"
                  fill="#eff6ff"
                />
                <circle cx="17" cy="17" r="2.6" fill="#2563eb" />
                <circle cx="17" cy="6.5"  r="1.5" fill="#3b82f6" />
                <circle cx="17" cy="27.5" r="1.5" fill="#3b82f6" />
                <circle cx="7.5"  cy="12" r="1.5" fill="#3b82f6" />
                <circle cx="26.5" cy="12" r="1.5" fill="#3b82f6" />
                <circle cx="7.5"  cy="22" r="1.5" fill="#3b82f6" />
                <circle cx="26.5" cy="22" r="1.5" fill="#3b82f6" />
                <line x1="17"  y1="8"    x2="17"   y2="14.4" stroke="#2563eb" strokeWidth="1.1" />
                <line x1="17"  y1="19.6" x2="17"   y2="26"   stroke="#2563eb" strokeWidth="1.1" />
                <line x1="9"   y1="12.8" x2="14.6" y2="15.6" stroke="#2563eb" strokeWidth="1.1" />
                <line x1="19.4" y1="18.4" x2="25"  y2="21.2" stroke="#2563eb" strokeWidth="1.1" />
                <line x1="9"   y1="21.2" x2="14.6" y2="18.4" stroke="#2563eb" strokeWidth="1.1" />
                <line x1="19.4" y1="15.6" x2="25"  y2="12.8" stroke="#2563eb" strokeWidth="1.1" />
              </svg>
            </div>
            <span className="font-bold text-[1.05rem] text-gray-900 tracking-tight">
              N8n Labs
            </span>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-0">

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className="inline-flex items-center h-9 px-3.5 text-sm font-medium text-blue-600 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors outline-none"
                  >
                    Inicio
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="text-gray-600 hover:text-gray-900 bg-transparent hover:bg-gray-100/70 data-open:bg-gray-100/70 data-open:text-gray-900 h-9 px-3.5 text-sm font-medium"
                  >
                    Servicios
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-0.5 p-2 w-140">
                      {services.map(({ Icon, title, description, href, color }) => (
                        <NavigationMenuLink
                          key={href}
                          href={href}
                          className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors outline-none"
                        >
                          <span
                            className="mt-0.5 shrink-0 p-1.5 rounded-lg"
                            style={{
                              backgroundColor: `${color}12`,
                              border: `1px solid ${color}25`,
                            }}
                          >
                            <Icon size={15} color={color} variant="Bold" />
                          </span>
                          <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
                              {title}
                            </span>
                            <span className="text-xs text-gray-400 leading-relaxed">
                              {description}
                            </span>
                          </div>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 px-4 py-2.5 mx-1 mb-1 flex items-center justify-between">
                      <span className="text-xs text-gray-400">6 servicios disponibles</span>
                      <NavigationMenuLink
                        href="#servicios"
                        className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors outline-none"
                      >
                        Ver todos
                        <ArrowRight2 size={11} />
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {navLinks.map(({ label, href }) => (
                  <NavigationMenuItem key={href}>
                    <NavigationMenuLink
                      href={href}
                      className="inline-flex items-center h-9 px-3.5 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100/70 transition-colors outline-none"
                    >
                      {label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* ── CTA ── */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="#contacto"
              className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 active:bg-black transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              Contáctanos
              <ArrowRight2 size={14} />
            </Link>
          </div>

          {/* ── MOBILE TOGGLE ── */}
          <button
            className="md:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseSquare size={22} /> : <HambergerMenu size={22} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-3 py-3 flex flex-col gap-0.5 shadow-lg">
          <Link
            href="/"
            className="flex items-center px-3 py-2.5 text-sm font-medium text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </Link>

          <button
            className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setServicesOpen(!servicesOpen)}
          >
            <span>Servicios</span>
            <ArrowRight2
              size={14}
              className={cn(
                "text-gray-400 transition-transform duration-200",
                servicesOpen && "rotate-90"
              )}
            />
          </button>

          {servicesOpen && (
            <div className="mx-3 mb-1 flex flex-col gap-0.5 border-l-2 border-blue-100 pl-3">
              {services.map(({ Icon, title, href, color }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2.5 py-2 px-2 text-sm text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon size={14} color={color} variant="Bold" />
                  {title}
                </Link>
              ))}
            </div>
          )}

          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div className="pt-2 mt-1 border-t border-gray-100 px-1">
            <Link
              href="#contacto"
              className="flex items-center justify-center gap-1.5 w-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Contáctanos
              <ArrowRight2 size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
