'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const protect = async () => {
      if (pathname === '/admin/login') {
        setLoading(false)
        return
      }

      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.replace(`/admin/login?redirect=${encodeURIComponent(pathname)}`)
      } else {
        setLoading(false)
      }
    }
    protect()
  }, [pathname, router])

  if (loading) {
    return <p className="text-white p-4">Cargando...</p>
  }

  return <>{children}</>
}
