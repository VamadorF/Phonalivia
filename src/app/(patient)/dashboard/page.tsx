'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import api from '@/lib/api'
import { motion } from 'framer-motion'
import { 
  FaHeartbeat, 
  FaPlusCircle,
  FaPills,
  FaClock,
  FaThermometerHalf,
  FaSmile
} from 'react-icons/fa'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
}

export default function PatientDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['patient-dashboard'],
    queryFn: async () => {
      const res = await api.get('/patient/dashboard')
      return res.data
    }
  })

  const { data: recordsData } = useQuery({
    queryKey: ['patient-daily-records'],
    queryFn: async () => {
      const res = await api.get('/patient/daily-records')
      return res.data
    }
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-medical-blue border-t-transparent rounded-full"
        />
      </div>
    )
  }

  const { stats } = data || {}
  const records = recordsData?.records || []

  // Calcular dolor promedio últimos 7 días
  const last7DaysRecords = records
    .filter((r: any) => {
      const recordDate = new Date(r.date)
      const daysAgo = new Date()
      daysAgo.setDate(daysAgo.getDate() - 7)
      return recordDate >= daysAgo
    })
    .slice(0, 7)
  
  const averagePain7Days = last7DaysRecords.length > 0
    ? (last7DaysRecords.reduce((sum: number, r: any) => sum + (r.painIntensity || 0), 0) / last7DaysRecords.length).toFixed(1)
    : 'N/A'

  // Estado emocional resumido (último registro)
  const lastRecord = records[0]
  const emotionalState = lastRecord ? {
    phq2Score: (lastRecord.phq2Answer1 || 0) + (lastRecord.phq2Answer2 || 0),
    gad2Score: (lastRecord.gad2Answer1 || 0) + (lastRecord.gad2Answer2 || 0),
  } : null

  const getEmotionalStateText = () => {
    if (!emotionalState) return 'Sin datos'
    const totalScore = emotionalState.phq2Score + emotionalState.gad2Score
    if (totalScore <= 2) return 'Bien'
    if (totalScore <= 4) return 'Regular'
    return 'Necesita atención'
  }

  const nextMedicationTime = 'En 2 horas'

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-medical-blue via-medical-purple to-medical-pink bg-clip-text text-transparent mb-2">
          Inicio
        </h1>
        <p className="text-base sm:text-lg text-gray-600">Resumen de tu evolución y bienestar</p>
      </motion.div>

      {/* Botón principal: Registrar Dolor Ahora */}
      <motion.div variants={itemVariants}>
        <Link href="/daily-record/location">
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl bg-gradient-to-br from-medical-blue/20 to-medical-purple/20 border-4 border-medical-blue/30 hover:border-medical-purple/50 transition-all duration-300 touch-manipulation"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="p-4 bg-gradient-to-br from-medical-blue to-medical-purple rounded-2xl shadow-xl">
                <FaPlusCircle className="text-white text-3xl sm:text-4xl" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Registrar Dolor Ahora</h2>
                <p className="text-sm sm:text-base text-gray-600">Toca para comenzar el registro de tu dolor</p>
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Widgets resumen */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
        {/* Próxima toma de medicamento */}
        <motion.div
          variants={itemVariants}
          className="glass-effect rounded-2xl p-4 sm:p-6 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100"
        >
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
              <FaClock className="text-white text-xl sm:text-2xl" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800">Próxima Toma</h3>
              <p className="text-xs sm:text-sm text-gray-600">Medicamento</p>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-blue-600">{nextMedicationTime}</p>
          <Link href="/medications" className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">
            Ver medicamentos →
          </Link>
        </motion.div>

        {/* Dolor promedio últimos 7 días */}
        <motion.div
          variants={itemVariants}
          className="glass-effect rounded-2xl p-4 sm:p-6 shadow-xl bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-100"
        >
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl shadow-lg">
              <FaThermometerHalf className="text-white text-xl sm:text-2xl" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800">Dolor Promedio</h3>
              <p className="text-xs sm:text-sm text-gray-600">Últimos 7 días</p>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-red-600">{averagePain7Days} / 10</p>
          <Link href="/history" className="text-xs sm:text-sm text-red-600 hover:text-red-800 mt-2 inline-block">
            Ver historial →
          </Link>
        </motion.div>

        {/* Estado emocional resumido */}
        <motion.div
          variants={itemVariants}
          className="glass-effect rounded-2xl p-4 sm:p-6 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100"
        >
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
              <FaSmile className="text-white text-xl sm:text-2xl" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800">Estado Emocional</h3>
              <p className="text-xs sm:text-sm text-gray-600">Último registro</p>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{getEmotionalStateText()}</p>
          <Link href="/history" className="text-xs sm:text-sm text-green-600 hover:text-green-800 mt-2 inline-block">
            Ver detalles →
          </Link>
        </motion.div>
      </div>

      {/* Acceso directo Mis Medicamentos */}
      <motion.div variants={itemVariants}>
        <Link href="/medications">
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="glass-effect rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-medical-green/10 to-medical-teal/10 border-2 border-medical-green/20 touch-manipulation"
          >
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-medical-green to-medical-teal rounded-xl shadow-lg">
                <FaPills className="text-white text-2xl sm:text-3xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Mis Medicamentos</h3>
                <p className="text-sm sm:text-base text-gray-600">Organiza y controla tus medicamentos</p>
              </div>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-2xl text-medical-green"
              >
                →
              </motion.span>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  )
}

