import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-parchment px-4 text-center text-ink">
      <Compass size={40} className="text-ink-48" aria-hidden />
      <div>
        <h1 className="font-display text-display-md text-ink">Halaman tidak ditemukan</h1>
        <p className="mt-2 font-text text-body text-ink-48">
          Alamat yang kamu tuju tidak tersedia.
        </p>
      </div>
      <Link to="/" className="btn-primary">
        Kembali ke Daftar Klub
      </Link>
    </div>
  )
}
