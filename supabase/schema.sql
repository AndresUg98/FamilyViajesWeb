-- Ejecutar en el editor SQL de un proyecto Supabase nuevo.
create table public.agency_admins (
 user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.agency_admins enable row level security;
create policy "Admin can verify own membership" on public.agency_admins for select to authenticated using (user_id = (select auth.uid()));
create table public.news (
 id uuid primary key default gen_random_uuid(),
 slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) between 3 and 180),
 title text not null check (length(title) between 5 and 160),
 excerpt text not null check (length(excerpt) between 15 and 400),
 body text not null check (length(body) between 30 and 30000),
 category text not null check (category in ('Inspiración','Tips de viaje','Destinos','Noticias')),
 image_url text not null,
 published boolean not null default false,
 published_at timestamptz not null default now()
);
alter table public.news enable row level security;
create policy "Read published news" on public.news for select to anon, authenticated using (published = true);
create policy "Agency manages news" on public.news for all to authenticated
 using (exists (select 1 from public.agency_admins where user_id = (select auth.uid())))
 with check (exists (select 1 from public.agency_admins where user_id = (select auth.uid())));
revoke all on public.agency_admins from anon, authenticated;
grant select on public.agency_admins to authenticated;
grant select on public.news to anon;
grant select, insert, update, delete on public.news to authenticated;
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('news-images','news-images',true,5242880,array['image/jpeg','image/png','image/webp']);
create policy "Public reads news images" on storage.objects for select to anon, authenticated using (bucket_id='news-images');
create policy "Agency uploads news images" on storage.objects for insert to authenticated
with check (bucket_id='news-images' and (storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.agency_admins where user_id=(select auth.uid())));
create policy "Agency removes news images" on storage.objects for delete to authenticated
using (bucket_id='news-images' and (storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.agency_admins where user_id=(select auth.uid())));
-- Crear el usuario desde Authentication > Users. Después, registrar su UUID:
-- insert into public.agency_admins(user_id) values ('UUID-DEL-USUARIO');
