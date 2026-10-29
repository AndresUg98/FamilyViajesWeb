"use client";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
export default function Contact() {
  const [sent, setSent] = useState(false);
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  return (
    <section id="contacto" className="contact-section">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow">EL PRIMER PASO ES SOÑARLO</span>
          <h2>
            Tu próximo viaje
            <br />
            empieza con un <em>hola.</em>
          </h2>
          <p>
            Cuéntanos a dónde quieres ir.
            <br />
            Nosotros te ayudamos a hacerlo realidad.
          </p>
          <span className="contact-note">
            ✳ Atención personal · Sin compromiso
          </span>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email) return;
            const f = new FormData(e.currentTarget);
            window.location.href = `mailto:${email}?subject=${encodeURIComponent("Quiero planear mi viaje — " + f.get("destino"))}&body=${encodeURIComponent(`Hola, soy ${f.get("nombre")}.\nMi correo: ${f.get("email")}\nMe gustaría viajar a: ${f.get("destino")}\nDetalles: ${f.get("mensaje")}`)}`;
            setSent(true);
          }}
        >
          <div className="form-row">
            <label>
              Tu nombre
              <input
                name="nombre"
                placeholder="¿Cómo te llamas?"
                required
                maxLength={100}
              />
            </label>
            <label>
              Correo electrónico
              <input
                name="email"
                type="email"
                placeholder="hola@ejemplo.com"
                required
                maxLength={254}
              />
            </label>
          </div>
          <label>
            ¿Qué destino tienes en mente?
            <input
              name="destino"
              placeholder="Ese lugar que siempre has querido conocer…"
              required
              maxLength={200}
            />
          </label>
          <label>
            Cuéntanos un poquito más
            <textarea
              name="mensaje"
              placeholder="Fechas, viajeros, ideas... ¡Te escuchamos!"
              maxLength={2000}
              rows={2}
            />
          </label>
          <button className="button" disabled={!email}>
            {sent ? (
              <>
                <Check size={18} /> Abrir de nuevo mi correo
              </>
            ) : (
              <>
                Empecemos la aventura <ArrowUpRight size={18} />
              </>
            )}
          </button>
          <small>
            {email
              ? "Se abrirá tu aplicación de correo para enviar la solicitud."
              : "Próximamente: estamos preparando nuestro canal de contacto."}
          </small>
        </form>
      </div>
    </section>
  );
}
