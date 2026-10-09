import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react'
import AuthShell from '../components/AuthShell'
import { signUpSchema } from '../schemas/authSchema'
import { useAuth } from '../context/useAuth'

const inputClass =
  'font-text text-body w-full rounded-full border border-hairline bg-white px-5 py-3 text-ink placeholder:text-ink-48/60 outline-none transition focus:border-action-focus focus:ring-2 focus:ring-action-focus/25'

function FieldError({ message }) {
  if (!message) return null
  return (
    <p className="mt-2 flex items-center gap-1.5 font-text text-caption text-red-600">
      <AlertCircle size={14} className="shrink-0" />
      {message}
    </p>
  )
}

function SignUpPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [formError, setFormError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = async ({ email, password }) => {
    setFormError(null)
    setSuccessMessage(null)
    try {
      const data = await signUp({ email, password })

      // Kalau konfirmasi email dimatikan di Supabase, session langsung ada
      // dan user otomatis masuk. Kalau tidak, session null -> minta cek email.
      if (data.session) {
        navigate('/', { replace: true })
      } else {
        setSuccessMessage('Pendaftaran berhasil! Cek email kamu untuk mengonfirmasi akun.')
      }
    } catch (err) {
      setFormError(err.message)
    }
  }

  return (
    <AuthShell
      title="Daftar Akun"
      subtitle="Buat akun baru untuk mulai mengelola daftar klub."
      footer={
        <>
          Sudah punya akun?{' '}
          <Link to="/login" className="font-text text-caption-strong text-action hover:text-action-focus">
            Masuk di sini
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div>
          <label htmlFor="email" className="mb-2 block font-text text-caption-strong text-ink-80">
            Email
          </label>
          <div className="relative">
            <Mail size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-48" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="nama@email.com"
              className={`${inputClass} pl-11`}
              {...register('email')}
            />
          </div>
          <FieldError message={errors.email?.message} />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block font-text text-caption-strong text-ink-80">
            Password
          </label>
          <div className="relative">
            <Lock size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-48" />
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Minimal 6 karakter"
              className={`${inputClass} pl-11`}
              {...register('password')}
            />
          </div>
          <FieldError message={errors.password?.message} />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-2 block font-text text-caption-strong text-ink-80">
            Konfirmasi Password
          </label>
          <div className="relative">
            <Lock size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-48" />
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Ulangi password"
              className={`${inputClass} pl-11`}
              {...register('confirmPassword')}
            />
          </div>
          <FieldError message={errors.confirmPassword?.message} />
        </div>

        {formError && (
          <p className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-text text-caption text-red-600">
            <AlertCircle size={16} className="shrink-0" />
            {formError}
          </p>
        )}

        {successMessage && (
          <p className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 font-text text-caption text-green-700">
            <CheckCircle2 size={16} className="shrink-0" />
            {successMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full disabled:pointer-events-none disabled:opacity-50"
        >
          <UserPlus size={18} />
          {isSubmitting ? 'Memproses...' : 'Daftar'}
        </button>
      </form>
    </AuthShell>
  )
}

export default SignUpPage
