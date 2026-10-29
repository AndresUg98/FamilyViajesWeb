import Link from "next/link";
import { Logo } from "./header";
import { ArrowUpRight } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
export default function Footer() {
  return (
    <footer>
      <div className="container footer-top">
        <div>
          <Logo />
          <p>
            El mundo está lleno de historias.
            <br />
            Vamos a crear la tuya.
          </p>
        </div>
        <div>
          <span className="eyebrow">EXPLORA</span>
          <Link href="/#nosotros">Nosotros</Link>
          <Link href="/#servicios">Nuestros servicios</Link>
          <Link href="/noticias">Noticias & inspiración</Link>
        </div>
        <div>
          <span className="eyebrow">SIEMPRE CERCA</span>
          <p>
            Tu agencia de viajes 100% online.
            <br />
            Atención personal, estés donde estés.
          </p>
          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            Hablemos de tu próximo viaje <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Family Viajes. Todos los derechos
          reservados.
        </span>
        <Link href="/admin">Acceso agencia</Link>
        <span>Hecho para llevarte más lejos ↗</span>
      </div>
    </footer>
  );
}
