'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaArrowRight, FaExclamationCircle, FaHospital, FaUserMd, FaHome } from 'react-icons/fa'
import api from '@/lib/api'
import { useDailyRecordData } from '@/context/DailyRecordContext'

export default function DailyRecordRecommendation() {
  const router = useRouter()
  const { data, updateData } = useDailyRecordData()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendation = async () => {
      setLoading(true)
      try {
        const requestData = {
          primaryPainArea: data.primaryPainArea,
          painIntensity: data.painIntensity,
          painQualities: data.painQualities,
          durationUnit: data.durationUnit,
          durationValue: data.durationValue,
          functionalImpactPhysical: data.functionalImpactPhysical,
          functionalImpactWork: data.functionalImpactWork,
          functionalImpactSocial: data.functionalImpactSocial,
          phq2Score: (data.phq2Answer1 || 0) + (data.phq2Answer2 || 0),
          gad2Score: (data.gad2Answer1 || 0) + (data.gad2Answer2 || 0),
        }

        // En modo mock, generar recomendación basada en los datos
        let category: 'autocuidado' | 'cesfam-ccr' | 'sapu-sar' | 'urgencia' = 'autocuidado'
        let message = 'Consulta con tu médico si el dolor persiste o empeora.'

        if (data.painIntensity >= 8) {
          category = 'urgencia'
          message = 'El dolor es muy intenso. Se recomienda acudir a urgencia hospitalaria para evaluación inmediata.'
        } else if (data.painIntensity >= 6) {
          category = 'sapu-sar'
          message = 'El dolor es moderado a severo. Se recomienda consultar en SAPU o llamar al SAR (600 360 7777) para evaluación.'
        } else if (data.painIntensity >= 4 || data.functionalImpactPhysical >= 6) {
          category = 'cesfam-ccr'
          message = 'Se recomienda programar una consulta en CESFAM o CCR para evaluación y seguimiento.'
        } else {
          category = 'autocuidado'
          message = 'El dolor es leve. Puedes manejarlo con autocuidado, pero si persiste o empeora, consulta con tu médico.'
        }

        updateData({ 
          recommendation: {
            category,
            message
          }
        })
      } catch (error) {
        console.error('Error al obtener recomendación:', error)
        updateData({ 
          recommendation: {
            category: 'autocuidado' as const,
            message: 'Consulta con tu médico si el dolor persiste o empeora.'
          }
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendation()
  }, [data, updateData])

  const handleContinue = () => {
    router.push('/daily-record/save')
  }

  const getRecommendationConfig = (category: string) => {
    switch (category) {
      case 'autocuidado':
        return {
          icon: FaHome,
          color: 'from-green-500 to-emerald-500',
          bgColor: 'from-green-50 to-emerald-50',
          borderColor: 'border-green-200',
          title: 'Autocuidado'
        }
      case 'cesfam-ccr':
        return {
          icon: FaUserMd,
          color: 'from-blue-500 to-cyan-500',
          bgColor: 'from-blue-50 to-cyan-50',
          borderColor: 'border-blue-200',
          title: 'CESFAM / CCR'
        }
      case 'sapu-sar':
        return {
          icon: FaHospital,
          color: 'from-orange-500 to-amber-500',
          bgColor: 'from-orange-50 to-amber-50',
          borderColor: 'border-orange-200',
          title: 'SAPU / SAR'
        }
      case 'urgencia':
        return {
          icon: FaExclamationCircle,
          color: 'from-red-500 to-pink-500',
          bgColor: 'from-red-50 to-pink-50',
          borderColor: 'border-red-200',
          title: 'Urgencia'
        }
      default:
        return {
          icon: FaHome,
          color: 'from-gray-500 to-gray-600',
          bgColor: 'from-gray-50 to-gray-100',
          borderColor: 'border-gray-200',
          title: 'Recomendación'
        }
    }
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="glass-effect rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-2xl text-center">
          <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-b-2 border-medical-blue mx-auto mb-4"></div>
          <p className="text-gray-600 text-base sm:text-lg">Procesando recomendación...</p>
        </div>
      </motion.div>
    )
  }

  const config = data.recommendation 
    ? getRecommendationConfig(data.recommendation.category)
    : getRecommendationConfig('autocuidado')
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-4">
          <span className="px-3 py-1 bg-medical-blue text-white rounded-full font-semibold">Paso 8 de 9</span>
          <span>Recomendación</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-medical-blue to-medical-purple bg-clip-text text-transparent">
          2.8 Recomendación
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Según tu información, esta es la recomendación</p>
      </div>

      <div className={`glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl bg-gradient-to-br ${config.bgColor} border-2 ${config.borderColor}`}>
        <div className="text-center mb-6">
          <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${config.color} text-white shadow-xl mb-4`}>
            <Icon className="text-3xl sm:text-4xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{config.title}</h2>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
          <p className="text-base sm:text-lg text-gray-700 text-center leading-relaxed">
            {data.recommendation?.message || 'Consulta con tu médico si el dolor persiste o empeora.'}
          </p>
        </div>

        <div className="mt-6 bg-white/80 rounded-xl p-4 text-xs sm:text-sm text-gray-600">
          <p className="text-center">
            <strong>Nota:</strong> Esta es una recomendación automática basada en la información proporcionada. 
            Si tienes dudas o el dolor empeora, consulta siempre con un profesional de la salud.
          </p>
        </div>
      </div>

      {/* Navegación */}
      <div className="mt-6 sm:mt-8 flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/daily-record/medication')}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-200 text-gray-700 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 touch-manipulation text-sm sm:text-base"
        >
          <FaArrowLeft />
          <span>Volver</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinue}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-medical-blue to-medical-purple text-white rounded-xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all flex items-center space-x-2 touch-manipulation"
        >
          <span>Continuar</span>
          <FaArrowRight />
        </motion.button>
      </div>
    </motion.div>
  )
}

