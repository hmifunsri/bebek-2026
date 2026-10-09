import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { supabase } from '../lib/supabaseClient'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    // Ambil sesi yang tersimpan (kalau user pernah login dan belum logout)
    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return
      setSession(data.session)
      setLoading(false)
    })

    // Supabase memanggil callback ini setiap sesi berubah:
    // SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, USER_UPDATED, ...
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  // SIGN UP - daftar akun baru dengan email + password
  const signUp = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw new Error(error.message)
    return data
  }

  // LOGIN - tukar email + password menjadi sesi
  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
    return data
  }

  // LOGOUT - hapus sesi di client dan di server Supabase
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
  }

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
