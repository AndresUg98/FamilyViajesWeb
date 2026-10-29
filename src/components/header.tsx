"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Family Viajes, inicio">
      <Image
        src="/images/logo-family.png"
        alt="Family Viajes — Tu agencia de confianza"
        width={260}
        height={129}
        priority
      />
    </Link>
  );
}
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <Logo />
        <nav
          className={open ? "nav open" : "nav"}
          aria-label="Navegación principal"
        >
          <Link onClick={() => setOpen(false)} href="/">
            Inicio
          </Link>
          <Link onClick={() => setOpen(false)} href="/#nosotros">
            Nosotros
          </Link>
          <Link onClick={() => setOpen(false)} href="/#servicios">
            Servicios
          </Link>
          <Link onClick={() => setOpen(false)} href="/noticias">
            Noticias & inspiración
          </Link>
        </nav>
        <Link href="/#contacto" className="button header-cta">
          Planeemos tu viaje <ArrowUpRight size={16} />
        </Link>
        <button
          className="menu-button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
