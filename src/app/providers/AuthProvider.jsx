import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '@/features/auth/hooks/useAuth'
import { authService } from '@/features/auth/services/authService'
import { setUnauthorizedHandler } from '@/services/api/apiClient'
import { storage } from '@/services/storage/localStorage'
import { resolvePermissions } from '@/utils/permissions'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.getUser())
  const [isReady, setIsReady] = useState(false)

  const clearSession = useCallback(() => {
    storage.clearSession()
    setUser(null)
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(() => {
      clearSession()
      if (!window.location.pathname.startsWith('/login')) {
        window.location.assign('/login')
      }
    })
  }, [clearSession])

  useEffect(() => {
    let active = true

    async function restore() {
      if (!storage.getToken()) {
        if (active) setIsReady(true)
        return
      }
      try {
        const profile = await authService.me()
        if (active) {
          storage.setUser(profile)
          setUser(profile)
        }
      } catch {
        if (active) clearSession()
      } finally {
        if (active) setIsReady(true)
      }
    }

    restore()
    return () => {
      active = false
    }
  }, [clearSession])

  const login = useCallback(async (credentials) => {
    const profile = await authService.login(credentials)
    setUser(profile)
    return profile
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    clearSession()
  }, [clearSession])

  const permissions = useMemo(() => resolvePermissions(user), [user])

  const value = useMemo(
    () => ({
      user,
      isReady,
      isAuthenticated: Boolean(user && storage.getToken()),
      permissions,
      hasPermission: (permission) => permissions.includes(permission),
      login,
      logout,
    }),
    [user, isReady, permissions, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
