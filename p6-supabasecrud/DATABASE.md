# P6 - Supabase CRUD: Struktur & Skema Database

Proyek Football Club memakai Supabase sebagai backend CRUD. Satu-satunya tabel yang dipakai adalah `clubs`.

## 1. Struktur Tabel

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | `uuid` | Primary key, default `gen_random_uuid()` |
| `strTeam` | `text` | Nama klub (wajib) |
| `strStadium` | `text` | Nama stadion (wajib) |
| `intFormedYear` | `int4` | Tahun berdiri (wajib) |
| `strBadge` | `text` | URL logo klub (opsional) |
| `created_at` | `timestamptz` | Default `now()`, dipakai untuk sorting |

## 2. SQL DDL

Jalankan di **SQL Editor** Supabase Dashboard:

```sql
-- Tabel clubs: id default uuid, dengan timestamp otomatis
create table if not exists clubs (
  id uuid primary key default gen_random_uuid(),
  strTeam text not null,
  strStadium text not null,
  intFormedYear int4 not null,
  strBadge text,
  created_at timestamptz not null default now()
);
```

## 3. Row Level Security (RLS)

Tanpa policy RLS, query dari frontend (anon key) akan ditolak. Wajib dibuat agar CRUD di aplikasi berfungsi.

```sql
alter table clubs enable row level security;

create policy "Enable read for anon"
  on clubs for select using (true);

create policy "Enable insert for anon"
  on clubs for insert with check (true);

create policy "Enable update for anon"
  on clubs for update using (true) with check (true);

create policy "Enable delete for anon"
  on clubs for delete using (true);
```

Catatan: Untuk project belajar, RLS di-*open* penuh ke anon. Untuk produksi, batasi lewat auth/owner.

## 4. Cara Menjalankan Project

```bash
npm install        # sekali saja
npm run dev        # jalankan dev server
```

Pastikan `.env.local` sudah diisi:

```env
VITE_SUPABASE_URL = https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY = your-anon-public-key
```

## 5. Referensi Nama Kolom di Kode

- `src/schemas/clubSchema.js` — validasi zod menyesuaikan nama kolom DB.
- `src/App.jsx` — query `from('clubs').select('*').order('created_at', { ascending: false })`.