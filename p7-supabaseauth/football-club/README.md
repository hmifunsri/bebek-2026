# Football Club — Supabase Auth (P7)

Aplikasi daftar klub sepak bola dengan **CRUD Supabase** (dari P6) yang kini dilengkapi
**Authentication**: sign up, login, logout, dan proteksi path.

## Fitur

- Daftar akun (`/signup`), login (`/login`), logout (tombol di header)
- Manajemen sesi otomatis lewat `AuthProvider` + `onAuthStateChange`
- Path `/` (CRUD klub) hanya bisa diakses user yang sudah login
- CRUD klub: tambah, lihat, edit, hapus ke tabel `clubs` Supabase

## Menjalankan

```bash
npm install
npm run dev
```

## Environment

Buat file `.env.local` di root project:

```env
VITE_SUPABASE_URL = https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY = your-anon-public-key
```

## Setup Database & Auth

Lihat [`../DATABASE.md`](../DATABASE.md) untuk SQL tabel `clubs` + policy RLS,
dan [`../AUTH.md`](../AUTH.md) untuk alur authentication serta manajemen sesi.

## Scripts

- `npm run dev` — jalankan dev server
- `npm run build` — build produksi
- `npm run lint` — ESLint
- `npm run preview` — preview hasil build
