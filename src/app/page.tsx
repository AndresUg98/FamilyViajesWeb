import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import NewsCard from "@/components/news-card";
import { getNews } from "@/lib/news";
import { getWhatsAppUrl } from "@/lib/whatsapp";
export const revalidate = 60;
const services = [
  {
    title: "Vuelos que te acercan",
    text: "Encontramos las mejores opciones para conectar contigo y con tu próximo destino.",
    tag: "Vuelos nacionales e internacionales",
  },
  {
    title: "Tu lugar en el mundo",
    text: "Desde una escapada acogedora hasta ese resort frente al mar. Tú eliges cómo descansar.",
    tag: "Hoteles y hospedaje",
  },
  {
    title: "Viajes tan únicos como tú",
    text: "Armamos cada detalle de tu aventura, para viajar en familia, en pareja o a tu propio ritmo.",
    tag: "Paquetes y experiencias a medida",
  },
];
export default async function Home() {
  const news = await getNews();
  return (
    <main id="contenido">
      <section className="hero">
        <Image
          src="/images/hero.jpg"
          alt="Bahía de aguas turquesa con cascada y acantilados"
          fill
          priority
          sizes="100vw"
          className="hero-photo"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <span className="hero-tag">
            <span /> GRANDES MOMENTOS, NUEVOS DESTINOS
          </span>
          <h1>
            El mundo te espera.
            <br />
            Vívelo con <em>family.</em>
          </h1>
          <p>
            Hay viajes que se convierten en tus mejores historias. <br />
            Nosotros te ayudamos a comenzar la siguiente.
          </p>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="button lime"
          >
            Encuentra tu próxima aventura <ArrowUpRight size={19} />
          </a>
        </div>
      </section>
      <section className="trust-strip">
        <div className="container">
          <span>100% online, 100% contigo</span>
          <span>Atención que se siente cercana</span>
          <span>Cada detalle, en buenas manos</span>
          <span>Experiencias a tu medida</span>
        </div>
      </section>
      <section id="servicios" className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">TÚ IMAGINA. NOSOTROS LO PLANEAMOS.</span>
            <h2>
              Todo para tu próxima <em>escapada.</em>
            </h2>
          </div>
          <p>
            Menos pendientes. Más emociones.
            <br />
            Nos encargamos de los detalles para que disfrutes el viaje.
          </p>
        </div>
        <div className="services">
          {services.map((s, i) => (
            <div className="service" key={s.title}>
              <div className="service-top">
                <span>0{i + 1}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.tag}
                <ArrowUpRight size={17} />
              </a>
            </div>
          ))}
        </div>
      </section>
      <section className="news-section">
        <div className="container section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">IDEAS PARA TU PRÓXIMO SÍ</span>
              <h2>
                Historias que invitan a <em>salir.</em>
              </h2>
            </div>
            <Link href="/noticias" className="text-link">
              Todas las noticias <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="news-grid">
            {news.slice(0, 3).map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </div>
          {!news.length && (
            <p>Pronto compartiremos nuevas historias y destinos.</p>
          )}
        </div>
      </section>
      <section id="nosotros" className="section container about">
        <div className="about-image">
          <Image
            src="/images/about.jpg"
            alt="Paisaje de montañas para inspirar tu próxima aventura"
            fill
            sizes="(max-width: 700px) 100vw, 45vw"
          />
        </div>
        <div className="about-copy">
          <span className="eyebrow">HOLA, SOMOS FAMILY VIAJES</span>
          <h2>
            Tu viaje es personal.
            <br />
            Nuestra atención <em>también.</em>
          </h2>
          <p>
            Creemos en los viajes que nos conectan: con otros lugares, con
            quienes queremos y con nosotros mismos.
          </p>
          <p>
            Somos una agencia online con un trato muy humano. Te escuchamos, te
            orientamos y planeamos contigo para que cada experiencia se sienta
            tuya, de principio a fin.
          </p>
          <div className="about-checks">
            <span>Asesoría cercana y personalizada</span>
            <span>Opciones para tu estilo y presupuesto</span>
            <span>Acompañamiento en cada paso</span>
          </div>
          <a
            className="text-link"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Conversemos sobre tu viaje <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}
