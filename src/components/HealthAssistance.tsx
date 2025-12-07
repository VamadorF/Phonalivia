'use client'

import { motion } from 'framer-motion'
import { 
  FaHeart, 
  FaLungs, 
  FaHospital,
  FaExclamationTriangle,
  FaInfoCircle,
  FaPhone
} from 'react-icons/fa'

interface HealthAssistanceProps {
  moodPattern?: 'positive' | 'neutral' | 'negative'
  painLevel?: number
}

const motivationalPhrases = {
  positive: [
    "Cada día es una oportunidad de mejorar 💪",
    "Estás haciendo un gran trabajo cuidándote 🌟",
    "Tu bienestar es importante, sigue así ✨",
    "Pequeños pasos llevan a grandes cambios 🌈"
  ],
  neutral: [
    "Recuerda que el autocuidado es fundamental 🧘",
    "Tu salud es una prioridad, tómate tu tiempo 💙",
    "Cada registro te acerca a entender mejor tu dolor 📊",
    "Estás en el camino correcto 🌱"
  ],
  negative: [
    "Es válido sentirte así, no estás solo 🤗",
    "Los días difíciles también pasan 🌅",
    "Tu fortaleza es admirable, sigue adelante 💪",
    "Recuerda que hay ayuda disponible cuando la necesites 🆘"
  ]
}

const healthCenters = [
  {
    name: 'SAR (Servicio de Atención Remota)',
    description: 'Atención telefónica 24/7 para consultas no urgentes',
    phone: '600 360 7777',
    when: 'Consultas médicas generales, dudas sobre medicamentos',
    icon: FaPhone,
    color: 'from-blue-400 to-blue-600'
  },
  {
    name: 'SAPU (Servicio de Atención Primaria de Urgencia)',
    description: 'Atención de urgencia ambulatoria',
    phone: 'Consultar en tu comuna',
    when: 'Urgencias que no requieren hospitalización',
    icon: FaHospital,
    color: 'from-yellow-400 to-orange-600'
  },
  {
    name: 'URGENCIA Hospitalaria',
    description: 'Atención de emergencias graves',
    phone: '131',
    when: 'Emergencias graves, dolor intenso, síntomas severos',
    icon: FaExclamationTriangle,
    color: 'from-red-400 to-red-600'
  },
  {
    name: 'CESFAM (Centro de Salud Familiar)',
    description: 'Atención primaria programada',
    phone: 'Consultar en tu comuna',
    when: 'Controles, seguimiento, recetas',
    icon: FaInfoCircle,
    color: 'from-green-400 to-green-600'
  }
]

export default function HealthAssistance({ moodPattern = 'neutral', painLevel = 5 }: HealthAssistanceProps) {
  const phrases = motivationalPhrases[moodPattern]
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]

  const getRecommendedCenter = () => {
    if (painLevel >= 8) return healthCenters[2] // URGENCIA
    if (painLevel >= 6) return healthCenters[1] // SAPU
    if (painLevel >= 4) return healthCenters[0] // SAR
    return healthCenters[3] // CESFAM
  }

  const recommendedCenter = getRecommendedCenter()
  const RecommendedIcon = recommendedCenter.icon

  return (
    <div className="space-y-4 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-2xl p-4 sm:p-6 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200"
      >
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <FaHeart className="text-white text-lg sm:text-xl" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Mensaje del día</h3>
        </div>
        <p className="text-base sm:text-lg text-gray-700 italic">"{randomPhrase}"</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-2xl p-4 sm:p-6 shadow-xl bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg">
            <FaLungs className="text-white text-lg sm:text-xl" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Ejercicio Respiratorio</h3>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Respiración 4-7-8</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
              <li>Inhala por la nariz contando hasta 4</li>
              <li>Mantén la respiración contando hasta 7</li>
              <li>Exhala por la boca contando hasta 8</li>
              <li>Repite 4 veces</li>
            </ol>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all touch-manipulation"
          >
            Iniciar ejercicio
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-effect rounded-2xl p-4 sm:p-6 shadow-xl"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-medical-blue to-medical-purple rounded-lg">
            <FaHospital className="text-white text-lg sm:text-xl" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">¿Dónde acudir?</h3>
        </div>

        <div className={`mb-6 p-4 rounded-xl bg-gradient-to-r ${recommendedCenter.color} text-white`}>
          <div className="flex items-center space-x-3 mb-2">
            <RecommendedIcon className="text-xl sm:text-2xl" />
            <h4 className="text-base sm:text-lg font-bold">Recomendación para ti</h4>
          </div>
          <p className="font-semibold mb-1 text-sm sm:text-base">{recommendedCenter.name}</p>
          <p className="text-xs sm:text-sm opacity-90">{recommendedCenter.description}</p>
          <p className="text-xs sm:text-sm mt-2">
            <strong>Cuándo:</strong> {recommendedCenter.when}
          </p>
          {recommendedCenter.phone && (
            <p className="text-xs sm:text-sm mt-1">
              <strong>Teléfono:</strong> {recommendedCenter.phone}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Todos los centros disponibles:</h4>
          {healthCenters.map((center, idx) => {
            const Icon = center.icon
            return (
              <motion.div
                key={center.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className={`p-3 sm:p-4 rounded-xl border-2 ${
                  center.name === recommendedCenter.name
                    ? `bg-gradient-to-r ${center.color} text-white border-transparent`
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Icon className={`text-xl sm:text-2xl mt-1 ${
                    center.name === recommendedCenter.name ? 'text-white' : `text-transparent bg-clip-text bg-gradient-to-r ${center.color}`
                  }`} />
                  <div className="flex-1">
                    <h5 className={`font-bold text-sm sm:text-base ${center.name === recommendedCenter.name ? 'text-white' : 'text-gray-800'}`}>
                      {center.name}
                    </h5>
                    <p className={`text-xs sm:text-sm mt-1 ${center.name === recommendedCenter.name ? 'text-white/90' : 'text-gray-600'}`}>
                      {center.description}
                    </p>
                    <p className={`text-[10px] sm:text-xs mt-2 ${center.name === recommendedCenter.name ? 'text-white/80' : 'text-gray-500'}`}>
                      <strong>Cuándo:</strong> {center.when}
                    </p>
                    {center.phone && (
                      <p className={`text-[10px] sm:text-xs mt-1 ${center.name === recommendedCenter.name ? 'text-white/80' : 'text-gray-500'}`}>
                        <strong>Teléfono:</strong> {center.phone}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

