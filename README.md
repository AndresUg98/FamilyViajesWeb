# Family Viajes

Sitio responsive en español con Next.js App Router, React, TypeScript y Tailwind CSS. Inicio, servicios, destinos, contacto, listado y detalle de noticias, y panel privado en `/admin`.

## Desarrollo

Requiere Node.js 20.9 o superior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abrir http://localhost:3000. Sin Supabase se muestran tres artículos de ejemplo; no son publicaciones reales. El panel informa que falta configuración y no permite publicar. Los colores provisionales se definen en `src/app/globals.css`. No se proporcionaron activos de marca. Fotografías descargadas de Unsplash, servidas localmente y optimizadas con Next Image.

## Activar las publicaciones

1. Crear un proyecto en Supabase. Ejecutar `supabase/schema.sql` en el editor SQL (una vez sobre un proyecto nuevo).
2. Copiar la URL del proyecto y la clave pública publicable a `.env.local`, siguiendo `.env.example`. Nunca exponer una clave `service_role`.
3. Crear al usuario de la agencia desde Authentication > Users con una contraseña robusta. Registrar su UUID en `agency_admins` con la instrucción del final del SQL. Desactivar el registro público en Authentication si no se necesita; la pertenencia a `agency_admins` es necesaria incluso con una cuenta autenticada.
4. Reiniciar la aplicación. Entrar a `/admin` para crear borradores, subir una portada y publicar o editar noticias. Desmarcar «Publicar» para retirar una noticia del sitio. Los cambios públicos se actualizan en un máximo aproximado de 60 segundos.
5. Completar `NEXT_PUBLIC_CONTACT_EMAIL` con el correo real de la agencia. El formulario abre el cliente de correo del visitante con su solicitud. No envía ni almacena datos automáticamente. Sin correo configurado permanece desactivado.

Las políticas RLS restringen escritura y lectura de borradores a administradores; los visitantes solo leen noticias publicadas. La tabla de administradores no permite autoasignarse permisos. Storage limita imágenes a JPG/PNG/WebP de hasta 5 MB; las portadas son públicas y no deben contener información privada. Contenido renderizado como texto, sin HTML arbitrario. Autenticación gestionada por Supabase con sus límites de intentos; configurar MFA y política de contraseñas desde el servicio para producción. Sesión de administración en el navegador; toda autorización real se aplica en PostgreSQL y Storage, no depende de ocultar el panel.

## Verificación y despliegue

Para trabajar en el diseño, usa `npm run dev`. Para verificar producción, detén primero cualquier servidor iniciado con `npm start`, genera la compilación y vuelve a iniciarlo. No ejecutes `npm run build` mientras el servidor de producción está activo: puede conservar referencias a archivos CSS y JavaScript de la compilación anterior.

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

Desplegar en una plataforma compatible con Next.js e incluir las variables de entorno. Servir por HTTPS. Configurar Site URL en Supabase con el dominio definitivo. El almacenamiento y las cuentas requieren configurar el servicio externo; no se crean con solo ejecutar la web.

Verificar al conectar Supabase: un visitante no puede insertar noticias ni subir imágenes; una cuenta no autorizada tampoco; el administrador puede crear un borrador, editarlo y publicarlo; el borrador no aparece públicamente. Comprobar el caso de archivo mayor de 5 MB y los mensajes de error. Revisar destinatario real de contacto antes del lanzamiento.
