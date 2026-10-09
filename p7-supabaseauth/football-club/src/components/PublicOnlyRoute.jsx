import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import LoadingScreen from './common/LoadingScreen'

// Kebalikan dari ProtectedRoute: halaman login/daftar tidak perlu ditampilkan
// kalau user sudah punya sesi. Langsung arahkan ke halaman utama.
export default function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingScreen message="Memeriksa sesi masuk..." />
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return children
}
