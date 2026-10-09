import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react'
import AuthShell from '../components/AuthShell'
import { loginSchema } from '../schemas/authSchema'
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

function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [formError, setFormError] = useState(null)

  // Alamat yang tadi mau dibuka sebelum ditendang ke /login
  const from = location.state?.from?.pathname || '/'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data) => {
    setFormError(null)
    try {
      await signIn(data)
      navigate(from, { replace: true })
    } catch (err) {
      setFormError(err.message)
    }
  }

  return (
    <AuthShell
      title="Masuk"
      subtitle="Masuk untuk mengelola daftar klub sepak bola."
      footer={
        <>
          Belum punya akun?{' '}
          <Link to="/signup" className="font-text text-caption-strong text-action hover:text-action-focus">
            Daftar di sini
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
              autoComplete="current-password"
              placeholder="Minimal 6 karakter"
              className={`${inputClass} pl-11`}
              {...register('password')}
            />
          </div>
          <FieldError message={errors.password?.message} />
        </div>

        {formError && (
          <p className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-text text-caption text-red-600">
            <AlertCircle size={16} className="shrink-0" />
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full disabled:pointer-events-none disabled:opacity-50"
        >
          <LogIn size={18} />
          {isSubmitting ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
    </AuthShell>
  )
}

export default LoginPage
