'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import api from '../lib/api'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  specialty?: string
  hasProfile?: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (data: RegisterData) => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  role: string
  specialty?: string
  diagnosis?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const savedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    
    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        // Verificar token válido
        api.get('/auth/me')
          .then((res: any) => {
            if (res.data) {
              setUser(res.data)
            } else {
              setUser(parsedUser)
            }
          })
          .catch(() => {
            // En modo mock, mantener el usuario guardado
            if (process.env.NEXT_PUBLIC_USE_MOCK === 'true' || !process.env.NEXT_PUBLIC_API_URL) {
              setUser(parsedUser)
            } else {
              if (typeof window !== 'undefined') {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
              }
              setUser(null)
            }
          })
          .finally(() => setLoading(false))
      } catch (e) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
        setUser(null)
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password })
    const { user, token } = res.data
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    }
    setUser(user)
  }

  const register = async (data: RegisterData) => {
    const res = await api.post('/auth/register', data)
    const { user, token } = res.data
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    }
    setUser(user)
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

