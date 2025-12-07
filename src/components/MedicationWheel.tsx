'use client'

import { motion } from 'framer-motion'
import { FaPills, FaClock, FaTimes } from 'react-icons/fa'
import { differenceInHours, differenceInMinutes } from 'date-fns'

interface Medication {
  id: string
  name: string
  type: 'analgesic' | 'antiinflammatory' | 'muscle-relaxant' | 'other'
  dose: string
  frequency: number
  lastTaken?: string
  nextDose?: string
}

interface MedicationWheelProps {
  medications: Medication[]
  onRemove: (id: string) => void
  onTake: (id: string) => void
}

const typeColors = {
  analgesic: { bg: 'from-blue-400 to-blue-600', border: 'border-blue-500', text: 'text-blue-700' },
  antiinflammatory: { bg: 'from-green-400 to-green-600', border: 'border-green-500', text: 'text-green-700' },
  'muscle-relaxant': { bg: 'from-purple-400 to-purple-600', border: 'border-purple-500', text: 'text-purple-700' },
  other: { bg: 'from-gray-400 to-gray-600', border: 'border-gray-500', text: 'text-gray-700' }
}

const typeLabels = {
  analgesic: 'Analgésico',
  antiinflammatory: 'Antiinflamatorio',
  'muscle-relaxant': 'Relajante Muscular',
  other: 'Otro'
}

export default function MedicationWheel({ medications, onRemove, onTake }: MedicationWheelProps) {
  const getTimeUntilNextDose = (med: Medication) => {
    if (!med.nextDose) return null
    const now = new Date()
    const next = new Date(med.nextDose)
    if (next <= now) return { overdue: true, hours: 0, minutes: 0 }
    
    const hours = differenceInHours(next, now)
    const minutes = differenceInMinutes(next, now) % 60
    return { overdue: false, hours, minutes }
  }

  const groupedByType = medications.reduce((acc, med) => {
    if (!acc[med.type]) acc[med.type] = []
    acc[med.type].push(med)
    return acc
  }, {} as Record<string, Medication[]>)

  if (medications.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-2xl">
        <FaPills className="text-6xl text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No hay medicamentos registrados</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedByType).map(([type, meds]) => (
        <div key={type} className="space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${typeColors[type as keyof typeof typeColors].bg}`} />
            <span>{typeLabels[type as keyof typeof typeLabels]}</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {meds.map((med) => {
              const timeInfo = getTimeUntilNextDose(med)
              const colors = typeColors[med.type]
              
              return (
                <motion.div
                  key={med.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`relative bg-gradient-to-br ${colors.bg} rounded-2xl p-4 sm:p-6 shadow-xl border-2 ${colors.border} text-white`}
                >
                  <button
                    type="button"
                    onClick={() => onRemove(med.id)}
                    className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors touch-manipulation"
                    title="Eliminar medicamento"
                  >
                    <FaTimes />
                  </button>

                  <div className="mb-4">
                    <h4 className="text-lg sm:text-xl font-bold mb-1">{med.name}</h4>
                    <p className="text-white/90 text-sm">Dosis: {med.dose}</p>
                    <p className="text-white/80 text-xs mt-1">Cada {med.frequency} horas</p>
                  </div>

                  {timeInfo && (
                    <div className={`mt-4 p-3 rounded-xl ${
                      timeInfo.overdue 
                        ? 'bg-red-500/30 border-2 border-red-300' 
                        : timeInfo.hours < 2
                        ? 'bg-yellow-500/30 border-2 border-yellow-300'
                        : 'bg-white/20 border-2 border-white/30'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <FaClock />
                        {timeInfo.overdue ? (
                          <span className="font-bold">¡Debes tomarlo ya!</span>
                        ) : (
                          <div>
                            <div className="font-bold text-base sm:text-lg">
                              {timeInfo.hours > 0 ? `${timeInfo.hours}h ` : ''}
                              {timeInfo.minutes > 0 ? `${timeInfo.minutes}m` : 'Pronto'}
                            </div>
                            <div className="text-xs opacity-90">Próxima dosis</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => onTake(med.id)}
                    className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 rounded-lg transition-all border-2 border-white/30 touch-manipulation"
                  >
                    Marcar como tomado
                  </motion.button>
                </motion.div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

