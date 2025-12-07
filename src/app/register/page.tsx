'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'
import { FaStethoscope, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'PATIENT',
    specialty: '',
    diagnosis: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register(formData)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  const isProfessional = formData.role === 'HEALTH_PRO'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
            Crear Cuenta
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-3xl p-6 sm:p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  id="firstName"
                  required
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 transition-all"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido
                </label>
                <input
                  id="lastName"
                  required
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 transition-all"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 transition-all"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 transition-all"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Usuario
              </label>
              <select
                id="role"
                required
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 transition-all"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="PATIENT">Paciente</option>
                <option value="HEALTH_PRO">Profesional de la Salud</option>
              </select>
            </div>

            {isProfessional && (
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
                  Especialidad
                </label>
                <input
                  id="specialty"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 transition-all"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                />
              </div>
            )}

            {formData.role === 'PATIENT' && (
              <div>
                <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-2">
                  Diagnóstico (opcional)
                </label>
                <input
                  id="diagnosis"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 transition-all"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                />
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-medical-blue to-medical-purple text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Registrando...</span>
                </>
              ) : (
                <>
                  <span>Registrarse</span>
                  <FaArrowRight />
                </>
              )}
            </motion.button>

            <div className="text-center">
              <Link href="/login" className="text-medical-blue hover:text-medical-purple text-sm sm:text-base">
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}

