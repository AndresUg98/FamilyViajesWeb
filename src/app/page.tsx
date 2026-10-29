import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  Plane,
  Hotel,
  Route,
  ShieldCheck,
  HeartHandshake,
  Globe2,
  Sparkles,
  MapPin,
  Check,
} from "lucide-react";
import NewsCard from "@/components/news-card";
import Contact from "@/components/contact";
import { getNews } from "@/lib/news";
export const revalidate = 60;
const services = [
  {
    icon: Plane,
    title: "Vuelos que te acercan",
    text: "Encontramos las mejores opciones para conectar contigo y con tu próximo destino.",
    tag: "Vuelos nacionales e internacionales",
  },
  {
    icon: Hotel,
    title: "Tu lugar en el mundo",
    text: "Desde una escapada acogedora hasta ese resort frente al mar. Tú eliges cómo descansar.",
    tag: "Hoteles y hospedaje",
  },
  {
    icon: Route,
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
          <Link href="#contacto" className="button lime">
            Encuentra tu próxima aventura <ArrowUpRight size={19} />
          </Link>
          <div className="hero-bottom">
            <span>
              <MapPin size={15} /> Tu próximo destino: un recuerdo inolvidable
            </span>
            <Link href="#servicios">
              Sigue explorando <ArrowDown size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="trust-strip">
        <div className="container">
          <span>
            <Globe2 />
            100% online, 100% contigo
          </span>
          <span>
            <HeartHandshake />
            Atención que se siente cercana
          </span>
          <span>
            <ShieldCheck />
            Cada detalle, en buenas manos
          </span>
          <span>
            <Sparkles />
            Experiencias a tu medida
          </span>
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
                <s.icon size={29} strokeWidth={1.3} />
                <span>0{i + 1}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <Link href="#contacto">
                {s.tag}
                <ArrowUpRight size={17} />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="destinations section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">UN POCO DE INSPIRACIÓN</span>
              <h2>
                ¿A dónde te lleva tu <em>curiosidad?</em>
              </h2>
            </div>
            <Link href="#contacto" className="text-link">
              Encuentra tu destino <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="destination-grid">
            {[
              {
                name: "El mar siempre es buena idea",
                place: "PLAYAS & CARIBE",
                image: "caribe",
                label: "Un respiro frente al mar",
              },
              {
                name: "Lejos de la rutina. Cerca de ti.",
                place: "ESCAPADAS POR MÉXICO",
                image: "mexico",
                label: "Redescubre lo nuestro",
              },
              {
                name: "Momentos que se quedan",
                place: "AVENTURAS EN FAMILIA",
                image: "familia",
                label: "Juntos, a donde sea",
              },
            ].map((d) => (
              <Link href="#contacto" className="destination" key={d.image}>
                <Image
                  src={`/images/${d.image}.jpg`}
                  alt={d.name}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                />
                <span className="destination-label">{d.label}</span>
                <div>
                  <span className="eyebrow">{d.place}</span>
                  <h3>{d.name}</h3>
                </div>
                <span className="destination-arrow">
                  <ArrowUpRight />
                </span>
              </Link>
            ))}
          </div>
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
          <div className="image-note">
            <Sparkles size={26} />
            <span>
              Viajar se disfruta más
              <br />
              <strong>cuando alguien te acompaña.</strong>
            </span>
          </div>
          <span className="about-stamp">
            HECHO CON CALMA
            <br />✳<br />
            VIVIDO CON EMOCIÓN
          </span>
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
            <span>
              <Check />
              Asesoría cercana y personalizada
            </span>
            <span>
              <Check />
              Opciones para tu estilo y presupuesto
            </span>
            <span>
              <Check />
              Acompañamiento en cada paso
            </span>
          </div>
          <Link className="text-link" href="#contacto">
            Conversemos sobre tu viaje <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="quote-band">
        <div className="container">
          <span>Un destino se visita.</span>
          <h2>
            Un buen viaje <em>se queda contigo.</em> ✳
          </h2>
          <p>Hagamos espacio para nuevos recuerdos.</p>
        </div>
      </section>
      <section className="section container">
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
      </section>
      <Contact />
    </main>
  );
}
