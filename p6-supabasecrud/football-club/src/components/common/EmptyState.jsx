import { Inbox } from 'lucide-react'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[18px] border border-hairline bg-white p-10 text-center">
      <Inbox size={36} className="text-ink-48" />
      <div>
        <p className="font-text text-body-strong text-ink-80">Belum ada klub yang tersedia</p>
        <p className="mt-1 font-text text-caption text-ink-48">
          Tambah klub pertama lewat form di atas, dan datanya akan muncul di sini.
        </p>
      </div>
    </div>
  )
}