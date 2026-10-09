import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import LoadingScreen from './common/LoadingScreen'

// Path yang dibungkus komponen ini hanya bisa diakses kalau ada sesi login.
// Kalau belum login, user dilempar ke /login dan alamat asal disimpan di state.
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingScreen message="Memeriksa sesi masuk..." />
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
