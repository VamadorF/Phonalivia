'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useDailyRecordData } from '@/context/DailyRecordContext'

// PHQ-2: Depresión (2 preguntas, cada una 0-3)
const phq2Questions = [
  {
    id: 1,
    question: 'Durante las últimas 2 semanas, ¿con qué frecuencia te ha molestado sentirse deprimido, sin esperanzas o sin interés o placer en hacer las cosas?',
    options: [
      { value: 0, label: 'Nada en absoluto' },
      { value: 1, label: 'Varios días' },
      { value: 2, label: 'Más de la mitad de los días' },
      { value: 3, label: 'Casi todos los días' },
    ]
  },
  {
    id: 2,
    question: 'Durante las últimas 2 semanas, ¿con qué frecuencia te ha molestado sentirse desanimado, deprimido o sin esperanza?',
    options: [
      { value: 0, label: 'Nada en absoluto' },
      { value: 1, label: 'Varios días' },
      { value: 2, label: 'Más de la mitad de los días' },
      { value: 3, label: 'Casi todos los días' },
    ]
  }
]

// GAD-2: Ansiedad (2 preguntas, cada una 0-3)
const gad2Questions = [
  {
    id: 1,
    question: 'Durante las últimas 2 semanas, ¿con qué frecuencia te ha molestado sentirse nervioso, ansioso o muy inquieto?',
    options: [
      { value: 0, label: 'Nada en absoluto' },
      { value: 1, label: 'Varios días' },
      { value: 2, label: 'Más de la mitad de los días' },
      { value: 3, label: 'Casi todos los días' },
    ]
  },
  {
    id: 2,
    question: 'Durante las últimas 2 semanas, ¿con qué frecuencia te ha molestado no poder dejar de preocuparte o controlar tus preocupaciones?',
    options: [
      { value: 0, label: 'Nada en absoluto' },
      { value: 1, label: 'Varios días' },
      { value: 2, label: 'Más de la mitad de los días' },
      { value: 3, label: 'Casi todos los días' },
    ]
  }
]

export default function DailyRecordEmotionalState() {
  const router = useRouter()
  const { data, updateData } = useDailyRecordData()

  const handleContinue = () => {
    if (
      data.phq2Answer1 === null ||
      data.phq2Answer2 === null ||
      data.gad2Answer1 === null ||
      data.gad2Answer2 === null
    ) {
      alert('Por favor, responde todas las preguntas')
      return
    }
    router.push('/daily-record/medication')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-4">
          <span className="px-3 py-1 bg-medical-blue text-white rounded-full font-semibold">Paso 6 de 9</span>
          <span>Estado Emocional</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-medical-blue to-medical-purple bg-clip-text text-transparent">
          2.6 Estado Emocional
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">PHQ-2 (Depresión) y GAD-2 (Ansiedad) - Escalas de evaluación</p>
      </div>

      <div className="glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-6 sm:space-y-8">
        {/* PHQ-2: Depresión */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 sm:p-6 border-2 border-blue-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">PHQ-2 - Evaluación de Depresión</h2>
          <div className="space-y-6">
            {phq2Questions.map((q, idx) => {
              const answerKey = idx === 0 ? 'phq2Answer1' : 'phq2Answer2'
              const currentAnswer = idx === 0 ? data.phq2Answer1 : data.phq2Answer2
              
              return (
                <div key={q.id} className="bg-white rounded-xl p-4 shadow-md">
                  <p className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all touch-manipulation ${
                          currentAnswer === option.value
                            ? 'bg-blue-100 border-2 border-blue-500'
                            : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`phq2-${q.id}`}
                          value={option.value}
                          checked={currentAnswer === option.value}
                          onChange={() => updateData({ [answerKey]: option.value } as any)}
                          className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-gray-700 text-sm sm:text-base">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* GAD-2: Ansiedad */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 border-2 border-purple-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">GAD-2 - Evaluación de Ansiedad</h2>
          <div className="space-y-6">
            {gad2Questions.map((q, idx) => {
              const answerKey = idx === 0 ? 'gad2Answer1' : 'gad2Answer2'
              const currentAnswer = idx === 0 ? data.gad2Answer1 : data.gad2Answer2
              
              return (
                <div key={q.id} className="bg-white rounded-xl p-4 shadow-md">
                  <p className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all touch-manipulation ${
                          currentAnswer === option.value
                            ? 'bg-purple-100 border-2 border-purple-500'
                            : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`gad2-${q.id}`}
                          value={option.value}
                          checked={currentAnswer === option.value}
                          onChange={() => updateData({ [answerKey]: option.value } as any)}
                          className="w-5 h-5 text-purple-600 focus:ring-2 focus:ring-purple-500"
                        />
                        <span className="text-gray-700 text-sm sm:text-base">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Navegación */}
      <div className="mt-6 sm:mt-8 flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/daily-record/functional-impact')}
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

