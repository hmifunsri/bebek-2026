import { Trophy } from 'lucide-react'

// Kerangka halaman auth (login & daftar) supaya tampilannya konsisten.
export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen flex-col bg-parchment text-ink">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-void text-white">
              <Trophy size={24} aria-hidden />
            </span>
            <h1 className="mt-4 font-display text-display-md text-ink">{title}</h1>
            <p className="mt-2 font-text text-body text-ink-48">{subtitle}</p>
          </div>

          <div className="rounded-[18px] border border-hairline bg-white p-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            {children}
          </div>

          {footer ? (
            <div className="mt-6 text-center font-text text-caption text-ink-48">{footer}</div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
