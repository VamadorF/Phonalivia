'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import FacesPainScale from '@/components/FacesPainScale'
import { useDailyRecordData } from '@/context/DailyRecordContext'

export default function DailyRecordIntensity() {
  const router = useRouter()
  const { data, updateData } = useDailyRecordData()

  const handleContinue = () => {
    router.push('/daily-record/quality')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-4">
          <span className="px-3 py-1 bg-medical-blue text-white rounded-full font-semibold">Paso 2 de 9</span>
          <span>Intensidad</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-medical-blue to-medical-purple bg-clip-text text-transparent">
          2.2 ¿Cuánto te duele?
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Escala Visual Analógica (EVA) / Escala Numérica (ENA) de 0 a 10</p>
      </div>

      <div className="glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-100">
        <FacesPainScale
          value={data.painIntensity}
          onChange={(value) => updateData({ painIntensity: value })}
          size="lg"
        />
      </div>

      {/* Navegación */}
      <div className="mt-6 sm:mt-8 flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/daily-record/location')}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-200 text-gray-700 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 touch-manipulation"
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

