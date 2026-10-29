import { getSupabase } from "./supabase";
export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  image_url: string;
  category: string;
  published_at: string;
};
export const examples: Article[] = [
  {
    id: "1",
    slug: "el-caribe-a-tu-ritmo",
    title: "El Caribe a tu ritmo: encuentra tu próxima escapada",
    excerpt:
      "Playas de agua turquesa, días sin prisa y momentos para compartir. La inspiración que necesitas para volver al mar.",
    body: "Hay lugares que invitan a bajar el ritmo. El Caribe es uno de ellos: caminar por la orilla, descubrir los sabores locales y disfrutar de una tarde junto al mar.\n\nAntes de elegir tu destino, piensa en cómo te gustaría vivirlo. Un hotel con actividades puede ser ideal para viajar en familia; una pequeña estancia frente al mar puede acompañar una escapada en pareja.\n\nEn Family Viajes te ayudamos a encontrar una opción que se adapte a tus fechas, tus intereses y tu presupuesto. Cuéntanos qué viaje imaginas y comenzamos a planearlo contigo.",
    image_url: "/images/caribe.jpg",
    category: "Inspiración",
    published_at: "2026-10-20",
  },
  {
    id: "2",
    slug: "viajar-en-familia",
    title: "Pequeños consejos, grandes viajes en familia",
    excerpt:
      "Todo comienza con una buena planeación. Ideas para disfrutar juntos desde el primer día.",
    body: "Planear un viaje juntos también es parte de la aventura. Involucra a todos al elegir las actividades y deja espacio para descansar.\n\nViaja ligero, ten a mano los documentos y contempla los tiempos de traslado. Un itinerario flexible permite disfrutar los pequeños descubrimientos.\n\nNuestro equipo te acompaña a organizar los detalles para que tú puedas concentrarte en compartir.",
    image_url: "/images/familia.jpg",
    category: "Tips de viaje",
    published_at: "2026-10-15",
  },
  {
    id: "3",
    slug: "descubre-mexico",
    title: "México siempre tiene una nueva historia para ti",
    excerpt:
      "Pueblos llenos de color y paisajes que sorprenden. Redescubre lo extraordinario que tenemos cerca.",
    body: "México se descubre con todos los sentidos. Sus pueblos, sus paisajes y su cocina hacen que cada recorrido sea diferente.\n\nElige una región, date tiempo para recorrerla y conoce las experiencias que ofrecen sus comunidades. A veces, el mejor recuerdo está en un lugar que no esperabas.\n\nPodemos ayudarte a diseñar una ruta que conecte con tu manera de viajar.",
    image_url: "/images/mexico.jpg",
    category: "Destinos",
    published_at: "2026-10-10",
  },
];
export async function getNews(): Promise<Article[]> {
  const db = getSupabase();
  if (!db) return examples;
  const { data, error } = await db
    .from("news")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(60);
  if (error)
    throw new Error(
      "No fue posible cargar las noticias. Intenta de nuevo más tarde.",
    );
  return data ?? [];
}
export async function getArticle(slug: string): Promise<Article | null> {
  const db = getSupabase();
  if (!db) return examples.find((a) => a.slug === slug) ?? null;
  const { data, error } = await db
    .from("news")
    .select("*")
    .eq("published", true)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error("No fue posible cargar la noticia.");
  return data;
}
