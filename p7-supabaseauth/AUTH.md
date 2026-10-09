# P7 - Alur Authentication & Manajemen Sesi

Project ini menambahkan **authentication** (sign up, login, logout) dan **manajemen sesi**
(session) di atas CRUD Supabase dari P6.

## 1. Ringkasan Fitur

| Fitur | Path | Proteksi |
|---|---|---|
| Daftar akun | `/signup` | publik — kalau sudah login diarahkan ke `/` |
| Login | `/login` | publik — kalau sudah login diarahkan ke `/` |
| Daftar & kelola klub (CRUD) | `/` | **butuh login** — kalau belum login diarahkan ke `/login` |
| Logout | tombol "Keluar" di Header | — |
| Halaman lain | `*` | halaman 404 |

## 2. Manajemen Sesi (AuthProvider)

Semua status auth disimpan di satu tempat: `src/context/AuthProvider.jsx`.

State yang disediakan lewat `useAuth()`:

- `user` — data user yang sedang login (`null` kalau belum login)
- `session` — objek sesi Supabase (berisi access token, dsb.)
- `loading` — `true` saat aplikasi masih memeriksa sesi tersimpan
- `signUp({ email, password })`
- `signIn({ email, password })`
- `signOut()`

Alur saat aplikasi dibuka:

```text
AuthProvider mount
      ↓
supabase.auth.getSession()  → baca sesi tersimpan (localStorage)
      ↓
setSession(...) + setLoading(false)
      ↓
supabase.auth.onAuthStateChange(...)  → dengarkan perubahan sesi
      ↓
setiap SIGNED_IN / SIGNED_OUT / TOKEN_REFRESHED → setSession(...)
```

Karena sesi dipantau lewat `onAuthStateChange`, komponen yang memakai `useAuth()`
otomatis ter-update tanpa perlu refresh halaman.

## 3. Fungsi Auth (helper di AuthProvider)

```js
// SIGN UP
const { data, error } = await supabase.auth.signUp({ email, password })

// LOGIN
const { data, error } = await supabase.auth.signInWithPassword({ email, password })

// LOGOUT
const { error } = await supabase.auth.signOut()
```

Setiap fungsi melempar `new Error(error.message)` saat gagal, sehingga halaman
bisa menangkapnya dan menampilkan pesan ke user.

## 4. Proteksi Path (Route Guard)

- `src/components/ProtectedRoute.jsx`
  - `loading` → tampilkan layar "Memeriksa sesi masuk..."
  - `!user` → `<Navigate to="/login" state={{ from: location }} />`
  - `user` → render halaman
- `src/components/PublicOnlyRoute.jsx`
  - `user` → redirect ke `/` (halaman login/daftar tidak perlu dibuka kalau sudah login)

Di `src/App.jsx`:

```jsx
<Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
<Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
<Route path="/signup" element={<PublicOnlyRoute><SignUpPage /></PublicOnlyRoute>} />
```

Setelah login, user dikembalikan ke halaman yang tadi mau dibuka
(`location.state.from`), atau ke `/` kalau tidak ada.

## 5. Sign Up dengan Konfirmasi Email

Secara default Supabase meminta konfirmasi email:

- `signUp()` mengembalikan `data.session === null` sampai email dikonfirmasi.
- Halaman `/signup` lalu menampilkan pesan "Cek email kamu untuk mengonfirmasi akun."
- Kalau konfirmasi email **dimatikan** (Authentication → Providers → Email), maka
  `data.session` langsung terisi dan user otomatis masuk.

## 6. Catatan Keamanan

- Hanya **anon/publishable key** yang dipakai di frontend. **Jangan** menaruh `service_role`
  key di kode client.
- Proteksi di frontend hanyalah UX. Kunci sebenarnya ada di **RLS**: policy `to authenticated`
  memastikan API memblokir request tanpa sesi.
