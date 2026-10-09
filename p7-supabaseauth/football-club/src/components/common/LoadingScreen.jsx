import { LoaderCircle } from 'lucide-react'

export default function LoadingScreen({ message = 'Memuat...' }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-parchment text-ink">
      <LoaderCircle size={32} className="animate-spin text-action" aria-hidden />
      <p className="font-text text-body text-ink-48">{message}</p>
    </div>
  )
}
