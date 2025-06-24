import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.signOut().then(() => {
      router.push('/login')
    })
  }, [])

  return <p style={{ padding: '2rem' }}>Logging out...</p>
}