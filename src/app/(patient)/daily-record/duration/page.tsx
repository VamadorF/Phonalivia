'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaArrowRight, FaClock } from 'react-icons/fa'
import { useDailyRecordData } from '@/context/DailyRecordContext'

const durationOptions = [
  { value: 'hours' as const, label: 'Horas', max: 24 },
  { value: 'days' as const, label: 'Días', max: 30 },
  { value: 'weeks' as const, label: 'Semanas', max: 52 },
  { value: 'months' as const, label: 'Meses', max: 12 },
]

export default function DailyRecordDuration() {
  const router = useRouter()
  const { data, updateData } = useDailyRecordData()

  const handleContinue = () => {
    router.push('/daily-record/functional-impact')
  }

  const currentOption = durationOptions.find(opt => opt.value === data.durationUnit) || durationOptions[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-4">
          <span className="px-3 py-1 bg-medical-blue text-white rounded-full font-semibold">Paso 4 de 9</span>
          <span>Duración</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-medical-blue to-medical-purple bg-clip-text text-transparent">
          2.4 ¿Hace cuánto te duele?
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Indica la duración del dolor</p>
      </div>

      <div className="glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100">
        <div className="space-y-6">
          {/* Selector de unidad y valor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Unidad de tiempo
              </label>
              <select
                value={data.durationUnit}
                onChange={(e) => updateData({
                  durationUnit: e.target.value as 'hours' | 'days' | 'weeks' | 'months',
                  durationValue: 1
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm sm:text-base"
              >
                {durationOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cantidad: {data.durationValue} {currentOption.label.toLowerCase()}
              </label>
              <input
                type="range"
                min="1"
                max={currentOption.max}
                value={data.durationValue}
                onChange={(e) => updateData({ durationValue: parseInt(e.target.value) })}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer touch-manipulation bg-gradient-to-r from-blue-400 to-cyan-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>{currentOption.max}</span>
              </div>
            </div>
          </div>

          {/* Pregunta condicional: ¿Es un dolor que ya ha tenido antes? */}
          <div className="bg-white rounded-xl p-4 shadow-md">
            <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-4">
              ¿Es un dolor que ya ha tenido antes?
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => updateData({ hasHadBefore: true })}
                className={`flex-1 py-3 px-4 sm:px-6 rounded-xl font-semibold transition-all touch-manipulation text-sm sm:text-base ${
                  data.hasHadBefore === true
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sí
              </button>
              <button
                type="button"
                onClick={() => updateData({ hasHadBefore: false, weeklyFrequency: null })}
                className={`flex-1 py-3 px-4 sm:px-6 rounded-xl font-semibold transition-all touch-manipulation text-sm sm:text-base ${
                  data.hasHadBefore === false
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Si sí: frecuencia semanal (0-7) */}
          {data.hasHadBefore === true && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white rounded-xl p-4 shadow-md"
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ¿Con qué frecuencia semanal aparece este dolor? (0-7 días)
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="7"
                  value={data.weeklyFrequency || 0}
                  onChange={(e) => updateData({ weeklyFrequency: parseInt(e.target.value) })}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer touch-manipulation bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0 días/semana</span>
                  <span className="font-bold text-base sm:text-lg text-medical-blue">{data.weeklyFrequency || 0} días/semana</span>
                  <span>7 días/semana</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navegación */}
      <div className="mt-6 sm:mt-8 flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/daily-record/quality')}
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

