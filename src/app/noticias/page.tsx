import type { Metadata } from "next";
import { getNews } from "@/lib/news";
import NewsCard from "@/components/news-card";
export const metadata: Metadata = { title: "Noticias & inspiración" };
export const revalidate = 60;
export default async function News() {
  const articles = await getNews();
  return (
    <main id="contenido" className="container news-page section">
      <span className="eyebrow">EL VIAJE COMIENZA CON UNA IDEA</span>
      <h1>
        Noticias & <em>inspiración.</em>
      </h1>
      <p className="page-intro">
        Destinos, consejos y nuevas historias para despertar tus ganas de
        viajar.
      </p>
      <div className="news-grid">
        {articles.map((a) => (
          <NewsCard key={a.id} article={a} />
        ))}
      </div>
      {!articles.length && (
        <p>Estamos preparando nuestras próximas historias. Vuelve pronto.</p>
      )}
    </main>
  );
}
