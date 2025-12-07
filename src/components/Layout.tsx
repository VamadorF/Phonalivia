'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { 
  FaHeartbeat, 
  FaChartLine, 
  FaSignOutAlt,
  FaStethoscope,
  FaPills,
  FaHistory
} from 'react-icons/fa'
import { motion } from 'framer-motion'
import MobileNav from './MobileNav'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  // Si no hay usuario, redirigir al login
  if (!loading && !user) {
    router.push('/login')
    return null
  }

  // Mostrar loading mientras se verifica el usuario
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: FaChartLine },
    { to: '/daily-record/location', label: 'Registrar Dolor', icon: FaHeartbeat },
    { to: '/medications', label: 'Mis Medicamentos', icon: FaPills },
    { to: '/history', label: 'Historial', icon: FaHistory },
  ]

  const isAuthPage = pathname === '/login' || pathname === '/register'

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      {/* Desktop Navigation */}
      <nav className="hidden sm:block glass-effect shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <a 
                href="/dashboard" 
                className="flex items-center space-x-3 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-medical-blue to-medical-purple p-2 rounded-xl shadow-lg"
                >
                  <FaStethoscope className="text-white text-2xl" />
                </motion.div>
                <span className="text-2xl font-bold bg-gradient-to-r from-medical-blue to-medical-purple bg-clip-text text-transparent">
                  Alivia
                </span>
              </a>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-2">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = pathname === link.to || 
                    (link.to === '/daily-record/location' && pathname?.startsWith('/daily-record'))
                  return (
                    <a
                      key={link.to}
                      href={link.to}
                      className={`
                        relative inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                        ${isActive 
                          ? 'bg-gradient-to-r from-medical-blue to-medical-purple text-white shadow-lg scale-105' 
                          : 'text-gray-700 hover:bg-white/50 hover:scale-105'
                        }
                      `}
                    >
                      <Icon className="mr-2" />
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-medical-blue to-medical-purple rounded-lg -z-10"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </a>
                  )
                })}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-white/50 px-4 py-2 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-medical-teal to-medical-green rounded-full flex items-center justify-center text-white font-bold">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <FaSignOutAlt />
                <span>Cerrar Sesión</span>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8 pb-20 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}

