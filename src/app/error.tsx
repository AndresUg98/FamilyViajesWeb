"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="contenido" className="container section empty">
      <h1>Hagamos una pequeña pausa.</h1>
      <p>
        No pudimos cargar esta información. Intenta de nuevo en unos momentos.
      </p>
      <button className="button" onClick={reset}>
        Volver a intentar
      </button>
    </main>
  );
}
