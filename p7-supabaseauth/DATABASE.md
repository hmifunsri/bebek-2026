# P7 - Supabase Auth: Struktur Database, RLS & Auth

Proyek Football Club (versi auth) memakai Supabase untuk **CRUD** tabel `clubs` **dan**
**Authentication** (sign up / login / logout). Halaman CRUD hanya bisa dibuka setelah login.

## 1. Struktur Tabel `clubs`

Sama seperti P6.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | `uuid` | Primary key, default `gen_random_uuid()` |
| `strTeam` | `text` | Nama klub (wajib) |
| `strStadium` | `text` | Nama stadion (wajib) |
| `intFormedYear` | `int4` | Tahun berdiri (wajib) |
| `strBadge` | `text` | URL logo klub (opsional) |
| `created_at` | `timestamptz` | Default `now()`, dipakai untuk sorting |

```sql
create table if not exists clubs (
  id uuid primary key default gen_random_uuid(),
  strTeam text not null,
  strStadium text not null,
  intFormedYear int4 not null,
  strBadge text,
  created_at timestamptz not null default now()
);
```

## 2. Row Level Security (RLS) + Auth

Di P7, policy dibatasi untuk user yang **sudah login** (`to authenticated`).
Dengan begitu, anon key tanpa sesi tidak bisa membaca/menulis tabel.

```sql
alter table clubs enable row level security;

create policy "Authenticated can read clubs"
  on clubs for select to authenticated using (true);

create policy "Authenticated can insert clubs"
  on clubs for insert to authenticated with check (true);

create policy "Authenticated can update clubs"
  on clubs for update to authenticated using (true) with check (true);

create policy "Authenticated can delete clubs"
  on clubs for delete to authenticated using (true);
```

> Catatan: kalau ingin tiap user hanya melihat data miliknya sendiri, tambahkan kolom
> `user_id uuid references auth.users(id) default auth.uid()` lalu ubah policy
> `using (auth.uid() = user_id)`.

## 3. Authentication

Supabase Auth sudah menyediakan tabel `auth.users` + manajemen sesi (JWT) secara otomatis,
jadi tidak perlu membuat tabel user sendiri.

- Sign up: `supabase.auth.signUp({ email, password })`
- Login: `supabase.auth.signInWithPassword({ email, password })`
- Logout: `supabase.auth.signOut()`
- Pantau sesi: `supabase.auth.getSession()` dan `supabase.auth.onAuthStateChange(...)`

Detail alur ada di [`AUTH.md`](./AUTH.md).

## 4. Cara Menjalankan Project

```bash
npm install        # sekali saja
npm run dev        # jalankan dev server
```

Pastikan `.env.local` sudah diisi:

```env
VITE_SUPABASE_URL = https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY = your-anon-public-key
```

## 5. Referensi Nama Kolom & Kode

- `src/schemas/clubSchema.js` — validasi zod untuk data klub.
- `src/schemas/authSchema.js` — validasi zod untuk login & sign up.
- `src/context/AuthProvider.jsx` — manajemen sesi & fungsi auth.
- `src/pages/HomePage.jsx` — CRUD `clubs` (terproteksi).
- `src/components/ProtectedRoute.jsx` — penjaga path yang butuh login.
