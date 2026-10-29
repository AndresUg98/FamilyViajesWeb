import Link from "next/link";
export default function NotFound() {
  return (
    <main id="contenido" className="container section empty">
      <span className="eyebrow">NOS SALIMOS DE LA RUTA</span>
      <h1>Este destino no está aquí.</h1>
      <p>La página que buscas no existe o ya no está disponible.</p>
      <Link href="/" className="button">
        Volver al inicio ↗
      </Link>
    </main>
  );
}
