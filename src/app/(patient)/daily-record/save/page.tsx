'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaArrowLeft, FaSpinner } from 'react-icons/fa'
import api from '@/lib/api'
import { useDailyRecordData } from '@/context/DailyRecordContext'

export default function DailyRecordSave() {
  const router = useRouter()
  const { data, resetData } = useDailyRecordData()
  const queryClient = useQueryClient()
  const [saved, setSaved] = useState(false)

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        primaryPainArea: data.primaryPainArea,
        secondaryPainAreas: data.secondaryPainAreas,
        isUsualPlace: data.isUsualPlace,
        painIntensity: data.painIntensity,
        painQualities: data.painQualities,
        painQualityOther: data.painQualityOther,
        durationUnit: data.durationUnit,
        durationValue: data.durationValue,
        hasHadBefore: data.hasHadBefore,
        weeklyFrequency: data.weeklyFrequency,
        functionalImpactPhysical: data.functionalImpactPhysical,
        functionalImpactWork: data.functionalImpactWork,
        functionalImpactSocial: data.functionalImpactSocial,
        phq2Answer1: data.phq2Answer1,
        phq2Answer2: data.phq2Answer2,
        gad2Answer1: data.gad2Answer1,
        gad2Answer2: data.gad2Answer2,
        tookMedication: data.tookMedication,
        medicationId: data.medicationId,
        medicationRelief: data.medicationRelief,
        recommendation: data.recommendation,
      }

      const res = await api.post('/patient/daily-records', {
        ...payload,
        painAreas: JSON.stringify([data.primaryPainArea, ...data.secondaryPainAreas]),
        painTypes: JSON.stringify(data.painQualities),
        painDurationUnit: data.durationUnit,
        painDurationValue: data.durationValue
      })
      return res.data
    },
    onSuccess: () => {
      setSaved(true)
      resetData()
      queryClient.invalidateQueries({ queryKey: ['patient-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['patient-daily-records'] })
      
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    }
  })

  const handleSave = () => {
    mutation.mutate()
  }

  if (saved) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="glass-effect rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-2xl text-center bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FaCheckCircle className="text-6xl sm:text-8xl text-green-500 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">¡Registro guardado exitosamente!</h2>
          <p className="text-gray-600 text-base sm:text-lg mb-6">Redirigiendo al dashboard...</p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-4">
          <span className="px-3 py-1 bg-medical-blue text-white rounded-full font-semibold">Paso 9 de 9</span>
          <span>Guardar</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-medical-blue to-medical-purple bg-clip-text text-transparent">
          2.9 Guardar Registro
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Revisa la información y guarda tu registro</p>
      </div>

      <div className="glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl mb-8">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Resumen del registro</h3>
        <div className="space-y-3 text-sm sm:text-base text-gray-700">
          <div className="flex justify-between">
            <span className="font-semibold">Zona principal:</span>
            <span>{data.primaryPainArea || 'No especificada'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Intensidad:</span>
            <span>{data.painIntensity.toFixed(1)} / 10</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Duración:</span>
            <span>{data.durationValue} {data.durationUnit}</span>
          </div>
          {data.recommendation && (
            <div className="flex justify-between">
              <span className="font-semibold">Recomendación:</span>
              <span className="capitalize">{data.recommendation.category}</span>
            </div>
          )}
        </div>
      </div>

      {/* Botón guardar */}
      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/daily-record/recommendation')}
          disabled={mutation.isPending}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-200 text-gray-700 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 disabled:opacity-50 touch-manipulation text-sm sm:text-base"
        >
          <FaArrowLeft />
          <span>Volver</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={mutation.isPending}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 flex items-center space-x-2 touch-manipulation"
        >
          {mutation.isPending ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Guardando...</span>
            </>
          ) : (
            <>
              <FaCheckCircle />
              <span>Guardar Registro</span>
            </>
          )}
        </motion.button>
      </div>

      {mutation.error && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mt-4 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base"
        >
          Error al guardar registro. Por favor, intenta nuevamente.
        </motion.div>
      )}
    </motion.div>
  )
}

