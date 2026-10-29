import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/news";
export default function NewsCard({ article: a }: { article: Article }) {
  return (
    <Link href={`/noticias/${a.slug}`} className="news-card">
      <div className="news-image">
        <Image
          src={a.image_url}
          alt={a.title}
          fill
          sizes="(max-width: 700px) 100vw, 33vw"
        />
        <span>{a.category}</span>
        <div className="round-arrow">
          <ArrowUpRight size={20} />
        </div>
      </div>
      <div className="news-date">
        {new Date(a.published_at).toLocaleDateString("es-MX", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })}
        <span>· 3 min de lectura</span>
      </div>
      <h3>{a.title}</h3>
      <p>{a.excerpt}</p>
    </Link>
  );
}
