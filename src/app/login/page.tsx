'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'
import { FaStethoscope, FaHeartbeat, FaUser, FaLock, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-block mb-4"
          >
            <div className="p-4 bg-white rounded-2xl shadow-2xl">
              <FaStethoscope className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-medical-blue to-medical-purple" />
            </div>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Bienvenido a Alivia
          </h2>
          <p className="text-white/80 text-base sm:text-lg">
            Tu plataforma de manejo de dolor crónico
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-3xl p-6 sm:p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                <FaUser className="inline mr-2 text-medical-blue" />
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 transition-all duration-300"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                <FaLock className="inline mr-2 text-medical-blue" />
                Contraseña
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 transition-all duration-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-medical-blue via-medical-purple to-medical-pink text-white py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <>
                  <FaHeartbeat />
                  <span>Iniciar Sesión</span>
                  <FaArrowRight />
                </>
              )}
            </motion.button>

            <div className="text-center">
              <Link
                href="/register"
                className="text-medical-blue hover:text-medical-purple font-semibold transition-colors duration-300 inline-flex items-center space-x-2 text-sm sm:text-base"
              >
                <span>¿No tienes cuenta?</span>
                <motion.span
                  whileHover={{ x: 5 }}
                  className="flex items-center"
                >
                  Regístrate
                  <FaArrowRight className="ml-1" />
                </motion.span>
              </Link>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}

