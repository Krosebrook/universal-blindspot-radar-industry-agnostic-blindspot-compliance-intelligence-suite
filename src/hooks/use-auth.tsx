import React, { createContext, useContext, useEffect, useState } from 'react'
import { blink } from '@/lib/blink'
import type { BlinkUser } from '@blinkdotnew/sdk'

interface AuthContextType {
  user: BlinkUser | null
  isLoading: boolean
  login: (redirectUrl?: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<BlinkUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setIsLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const login = (redirectUrl?: string) => {
    blink.auth.login(redirectUrl || window.location.origin)
  }

  const logout = () => {
    blink.auth.logout()
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
