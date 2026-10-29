import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle } from "@/lib/news";
export const revalidate = 60;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getArticle(slug);
  return {
    title: a?.title ?? "Noticia no encontrada",
    description: a?.excerpt,
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) notFound();
  return (
    <main id="contenido" className="article container section">
      <Link className="text-link" href="/noticias">
        ← Volver a noticias
      </Link>
      <div className="article-header">
        <span className="eyebrow">{a.category}</span>
        <h1>{a.title}</h1>
        <p>{a.excerpt}</p>
        <span>
          {new Date(a.published_at).toLocaleDateString("es-MX", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          })}{" "}
          · Family Viajes
        </span>
      </div>
      <div className="article-image">
        <Image
          src={a.image_url}
          alt={a.title}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 1100px"
        />
      </div>
      <div className="article-body">
        {a.body
          .split("\n")
          .filter(Boolean)
          .map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        <div className="article-cta">
          <h2>¿Lo empezamos a planear?</h2>
          <Link href="/#contacto" className="button">
            Hablemos de tu viaje ↗
          </Link>
        </div>
      </div>
    </main>
  );
}
