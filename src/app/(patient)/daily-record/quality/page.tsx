'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaArrowRight, FaBolt, FaSnowflake, FaFire, FaExclamationCircle, FaHeartbeat } from 'react-icons/fa'
import { useDailyRecordData } from '@/context/DailyRecordContext'

const painTypes = [
  { id: 'electric', label: 'Eléctrico', icon: FaBolt, color: 'from-yellow-400 to-orange-500' },
  { id: 'cold', label: 'Frío', icon: FaSnowflake, color: 'from-blue-400 to-cyan-500' },
  { id: 'stabbing', label: 'Punzante', icon: FaExclamationCircle, color: 'from-red-400 to-pink-500' },
  { id: 'burning', label: 'Quemante', icon: FaFire, color: 'from-orange-400 to-red-500' },
  { id: 'throbbing', label: 'Pulsante', icon: FaHeartbeat, color: 'from-purple-400 to-pink-500' },
  { id: 'aching', label: 'Dolorido', icon: FaHeartbeat, color: 'from-gray-400 to-gray-600' },
  { id: 'pressure', label: 'Presión', icon: FaExclamationCircle, color: 'from-indigo-400 to-purple-500' },
  { id: 'sharp', label: 'Agudo', icon: FaExclamationCircle, color: 'from-red-500 to-red-700' }
]

export default function DailyRecordQuality() {
  const router = useRouter()
  const { data, updateData } = useDailyRecordData()

  const togglePainType = (typeId: string) => {
    if (data.painQualities.includes(typeId)) {
      updateData({ 
        painQualities: data.painQualities.filter(t => t !== typeId) 
      })
    } else {
      updateData({ 
        painQualities: [...data.painQualities, typeId] 
      })
    }
  }

  const handleContinue = () => {
    router.push('/daily-record/duration')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-4">
          <span className="px-3 py-1 bg-medical-blue text-white rounded-full font-semibold">Paso 3 de 9</span>
          <span>Cualidad</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-medical-blue to-medical-purple bg-clip-text text-transparent">
          2.3 ¿Cómo te duele?
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Selecciona uno o más tipos de dolor que describes mejor lo que sientes</p>
      </div>

      <div className="glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {painTypes.map((type) => {
            const Icon = type.icon
            const isSelected = data.painQualities.includes(type.id)
            return (
              <motion.button
                key={type.id}
                type="button"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => togglePainType(type.id)}
                className={`p-3 sm:p-4 rounded-2xl border-2 transition-all touch-manipulation min-h-[80px] ${
                  isSelected
                    ? `bg-gradient-to-br ${type.color} text-white shadow-xl scale-105 border-transparent`
                    : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <Icon className="text-2xl sm:text-3xl mx-auto mb-2" />
                <div className="font-bold text-xs sm:text-sm">{type.label}</div>
              </motion.button>
            )
          })}
        </div>

        {/* Campo "Otro" */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow-md">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Otro (describe el tipo de dolor)
          </label>
          <input
            type="text"
            value={data.painQualityOther}
            onChange={(e) => updateData({ painQualityOther: e.target.value })}
            placeholder="Ej: Ardor, Hormigueo, Opresión..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Navegación */}
      <div className="mt-6 sm:mt-8 flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/daily-record/intensity')}
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

