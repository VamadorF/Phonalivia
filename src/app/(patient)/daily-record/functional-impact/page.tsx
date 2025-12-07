'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useDailyRecordData } from '@/context/DailyRecordContext'

export default function DailyRecordFunctionalImpact() {
  const router = useRouter()
  const { data, updateData } = useDailyRecordData()

  const handleContinue = () => {
    router.push('/daily-record/emotional-state')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-4">
          <span className="px-3 py-1 bg-medical-blue text-white rounded-full font-semibold">Paso 5 de 9</span>
          <span>Impacto Funcional</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-medical-blue to-medical-purple bg-clip-text text-transparent">
          2.5 Impacto Funcional
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Indica cómo el dolor afecta tu capacidad funcional (0 = no afecta, 10 = afecta completamente)</p>
      </div>

      <div className="glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-6 sm:space-y-8">
        {/* Impacto Físico */}
        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-4 sm:p-6 border-2 border-red-100">
          <label className="block text-base sm:text-lg font-bold text-gray-800 mb-4">
            Impacto en Actividades Físicas
          </label>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-gray-700">0 - No afecta</span>
              <span className="text-xl sm:text-2xl font-bold text-medical-blue">{data.functionalImpactPhysical} / 10</span>
              <span className="text-gray-700">10 - Afecta completamente</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={data.functionalImpactPhysical}
              onChange={(e) => updateData({ functionalImpactPhysical: parseInt(e.target.value) })}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer touch-manipulation bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
            />
          </div>
        </div>

        {/* Impacto en Trabajo */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-4 sm:p-6 border-2 border-orange-100">
          <label className="block text-base sm:text-lg font-bold text-gray-800 mb-4">
            Impacto en Trabajo/Actividades Diarias
          </label>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-gray-700">0 - No afecta</span>
              <span className="text-xl sm:text-2xl font-bold text-medical-blue">{data.functionalImpactWork} / 10</span>
              <span className="text-gray-700">10 - Afecta completamente</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={data.functionalImpactWork}
              onChange={(e) => updateData({ functionalImpactWork: parseInt(e.target.value) })}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer touch-manipulation bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
            />
          </div>
        </div>

        {/* Impacto Social */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 border-2 border-purple-100">
          <label className="block text-base sm:text-lg font-bold text-gray-800 mb-4">
            Impacto en Vida Social/Relaciones
          </label>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-gray-700">0 - No afecta</span>
              <span className="text-xl sm:text-2xl font-bold text-medical-blue">{data.functionalImpactSocial} / 10</span>
              <span className="text-gray-700">10 - Afecta completamente</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={data.functionalImpactSocial}
              onChange={(e) => updateData({ functionalImpactSocial: parseInt(e.target.value) })}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer touch-manipulation bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
            />
          </div>
        </div>
      </div>

      {/* Navegación */}
      <div className="mt-6 sm:mt-8 flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/daily-record/duration')}
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

