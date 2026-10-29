"use client";
import { useEffect, useState } from "react";
import { getSupabase, configured } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { z } from "zod";
const schema = z.object({
  title: z.string().min(5).max(160),
  slug: z
    .string()
    .min(3)
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().min(15).max(400),
  body: z.string().min(30).max(30000),
  category: z.enum(["Inspiración", "Tips de viaje", "Destinos", "Noticias"]),
});
type NewsRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  image_url: string;
  published: boolean;
};
export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(configured);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [items, setItems] = useState<NewsRow[]>([]);
  const [editing, setEditing] = useState<NewsRow | null>(null);
  const [formKey, setFormKey] = useState(0);
  useEffect(() => {
    const db = getSupabase();
    if (!db) return;
    let active = true;
    async function check(u: User | null) {
      if (!active) return;
      setUser(u);
      setAllowed(false);
      setItems([]);
      if (u) {
        const { data } = await db!
          .from("agency_admins")
          .select("user_id")
          .eq("user_id", u.id)
          .maybeSingle();
        if (active && data) {
          setAllowed(true);
          const { data: news } = await db!
            .from("news")
            .select("*")
            .order("published_at", { ascending: false });
          if (active) setItems(news ?? []);
        }
      }
      if (active) setLoading(false);
    }
    void db.auth.getUser().then(({ data }) => check(data.user));
    const {
      data: { subscription },
    } = db.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => void check(session?.user ?? null), 0);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);
  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const f = new FormData(e.currentTarget);
    const { error } = await getSupabase()!.auth.signInWithPassword({
      email: String(f.get("email")),
      password: String(f.get("password")),
    });
    setMessage(
      error
        ? "No se pudo iniciar sesión. Comprueba tus datos e intenta nuevamente."
        : "Sesión iniciada.",
    );
    setBusy(false);
  }
  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const form = e.currentTarget;
    const f = new FormData(form);
    const parsed = schema.safeParse(Object.fromEntries(f));
    if (!parsed.success) {
      setMessage(
        "Revisa los campos: " +
          parsed.error.issues
            .map((i) => i.path.join(".") + ": " + i.message)
            .join(". "),
      );
      setBusy(false);
      return;
    }
    const db = getSupabase()!;
    let image = editing?.image_url ?? "";
    let uploaded: string | null = null;
    try {
      const file = f.get("image") as File;
      if (file?.size) {
        if (
          file.size > 5 * 1024 * 1024 ||
          !["image/jpeg", "image/png", "image/webp"].includes(file.type)
        )
          throw new Error(
            "La imagen debe ser JPG, PNG o WebP y pesar menos de 5 MB.",
          );
        const extension = {
          "image/jpeg": "jpg",
          "image/png": "png",
          "image/webp": "webp",
        }[file.type]!;
        const path = `${user!.id}/${crypto.randomUUID()}.${extension}`;
        const { error } = await db.storage
          .from("news-images")
          .upload(path, file, { contentType: file.type, upsert: false });
        if (error)
          throw new Error(
            "No se pudo subir la imagen. Comprueba los permisos y vuelve a intentarlo.",
          );
        uploaded = path;
        image = db.storage.from("news-images").getPublicUrl(path)
          .data.publicUrl;
      }
      if (!image) throw new Error("Agrega una imagen de portada.");
      const payload = {
        ...parsed.data,
        image_url: image,
        published: f.get("published") === "on",
      };
      const result = editing
        ? await db
            .from("news")
            .update(payload)
            .eq("id", editing.id)
            .select("id")
            .single()
        : await db.from("news").insert(payload).select("id").single();
      if (result.error)
        throw new Error(
          "No se pudo guardar. Comprueba los permisos y que el enlace no esté repetido.",
        );
      setEditing(null);
      setFormKey((k) => k + 1);
      setMessage(
        "Noticia guardada. Los cambios públicos pueden tardar hasta un minuto.",
      );
      const { data } = await db
        .from("news")
        .select("*")
        .order("published_at", { ascending: false });
      setItems(data ?? []);
    } catch (err) {
      if (uploaded) await db.storage.from("news-images").remove([uploaded]);
      setMessage(
        err instanceof Error ? err.message : "No se pudo guardar la noticia.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <main id="contenido" className="container section admin">
      <span className="eyebrow">SOLO PARA EL EQUIPO FAMILY</span>
      <div className="admin-toolbar">
        <h1>Panel de la agencia</h1>
        {user && (
          <button
            className="button"
            onClick={async () => {
              await getSupabase()!.auth.signOut();
              setEditing(null);
              setMessage("Sesión cerrada.");
            }}
          >
            Cerrar sesión
          </button>
        )}
      </div>
      {!configured ? (
        <div className="admin-panel admin-setup">
          <h2>Conecta tu espacio de publicaciones</h2>
          <p>
            Para habilitar el acceso privado, configura Supabase con las
            variables de <code>.env.example</code> y ejecuta{" "}
            <code>supabase/schema.sql</code>. Consulta las instrucciones del
            README.
          </p>
          <p>
            Las noticias visibles actualmente son ejemplos. No se ha habilitado
            ningún usuario administrador ni contraseña predeterminada.
          </p>
        </div>
      ) : loading ? (
        <p>Verificando acceso…</p>
      ) : !user ? (
        <form className="admin-panel" onSubmit={login}>
          <h2>Bienvenido de nuevo</h2>
          <p>Ingresa con la cuenta autorizada de la agencia.</p>
          <label>
            Correo
            <input name="email" type="email" autoComplete="username" required />
          </label>
          <label>
            Contraseña
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={8}
            />
          </label>
          <button className="button" disabled={busy}>
            {busy ? "Verificando…" : "Entrar a la agencia"}
          </button>
        </form>
      ) : !allowed ? (
        <p className="admin-message">
          Esta cuenta no tiene permisos de administración. Contacta al
          responsable de Family Viajes.
        </p>
      ) : (
        <>
          <form key={formKey} className="admin-panel" onSubmit={save}>
            <h2>{editing ? "Editar noticia" : "Crear una noticia"}</h2>
            <label>
              Título
              <input
                name="title"
                defaultValue={editing?.title}
                required
                minLength={5}
                maxLength={160}
              />
            </label>
            <label>
              Enlace (minúsculas, números y guiones)
              <input
                name="slug"
                defaultValue={editing?.slug}
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                placeholder="mi-proxima-aventura"
                required
                minLength={3}
                maxLength={180}
              />
            </label>
            <label>
              Categoría
              <select
                name="category"
                defaultValue={editing?.category ?? "Inspiración"}
              >
                {["Inspiración", "Tips de viaje", "Destinos", "Noticias"].map(
                  (c) => (
                    <option key={c}>{c}</option>
                  ),
                )}
              </select>
            </label>
            <label>
              Resumen
              <textarea
                name="excerpt"
                defaultValue={editing?.excerpt}
                required
                minLength={15}
                maxLength={400}
              />
            </label>
            <label>
              Contenido (separa los párrafos con un salto de línea)
              <textarea
                name="body"
                defaultValue={editing?.body}
                required
                rows={10}
                minLength={30}
                maxLength={30000}
              />
            </label>
            <label>
              Imagen de portada · JPG, PNG o WebP · máximo 5 MB
              <input
                name="image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                required={!editing}
              />
            </label>
            <label className="checkbox">
              <input
                name="published"
                type="checkbox"
                defaultChecked={editing?.published ?? false}
              />
              Publicar y hacer visible a los visitantes
            </label>
            <button className="button" disabled={busy}>
              {busy ? "Guardando…" : "Guardar noticia"}
            </button>
            {editing && (
              <button
                type="button"
                className="button"
                onClick={() => {
                  setEditing(null);
                  setFormKey((k) => k + 1);
                }}
              >
                Cancelar edición
              </button>
            )}
          </form>
          <section className="admin-panel">
            <h2>Tus publicaciones</h2>
            {items.length === 0 && <p>Aún no hay noticias. Crea la primera.</p>}
            {items.map((n) => (
              <div className="admin-item" key={n.id}>
                <span>
                  {n.title}
                  <small> · {n.published ? "Publicada" : "Borrador"}</small>
                </span>
                <button
                  onClick={() => {
                    setEditing(n);
                    setFormKey((k) => k + 1);
                    window.scrollTo({ top: 80, behavior: "smooth" });
                  }}
                >
                  Editar
                </button>
              </div>
            ))}
          </section>
        </>
      )}
      {message && (
        <p role="status" className="admin-message">
          {message}
        </p>
      )}
    </main>
  );
}
