'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaArrowRight, FaPills } from 'react-icons/fa'
import { useDailyRecordData } from '@/context/DailyRecordContext'

interface Medication {
  id: string
  name: string
  dose: string
}

export default function DailyRecordMedication() {
  const router = useRouter()
  const { data, updateData } = useDailyRecordData()
  const [localMedications, setLocalMedications] = useState<Medication[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('patient-medications')
      if (stored) {
        try {
          setLocalMedications(JSON.parse(stored))
        } catch (e) {
          // Si falla, lista vacía
        }
      }
    }
  }, [])

  const handleContinue = () => {
    if (data.tookMedication === null) {
      alert('Por favor, indica si tomaste medicación')
      return
    }
    if (data.tookMedication && !data.medicationId) {
      alert('Por favor, selecciona el medicamento que tomaste')
      return
    }
    if (data.tookMedication && data.medicationRelief === null) {
      alert('Por favor, indica cuánto alivió el medicamento')
      return
    }
    
    router.push('/daily-record/recommendation')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-4">
          <span className="px-3 py-1 bg-medical-blue text-white rounded-full font-semibold">Paso 7 de 9</span>
          <span>Medicación</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-medical-blue to-medical-purple bg-clip-text text-transparent">
          2.7 Medicación Tomada
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Indica si tomaste medicación para el dolor</p>
      </div>

      <div className="glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-100">
        {/* Botón sí/no */}
        <div className="mb-6">
          <label className="block text-base sm:text-lg font-bold text-gray-800 mb-4">
            ¿Tomaste medicación para el dolor?
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => updateData({ tookMedication: true })}
              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold transition-all touch-manipulation text-sm sm:text-base ${
                data.tookMedication === true
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() => updateData({ 
                tookMedication: false, 
                medicationId: null, 
                medicationRelief: null 
              })}
              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold transition-all touch-manipulation text-sm sm:text-base ${
                data.tookMedication === false
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              No
            </button>
          </div>
        </div>

        {/* Si sí: selector de medicamento y slider de alivio */}
        {data.tookMedication === true && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-6"
          >
            {/* Selector de medicamento */}
            {localMedications.length > 0 ? (
              <div className="bg-white rounded-xl p-4 shadow-md">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Selecciona el medicamento que tomaste:
                </label>
                <div className="space-y-2">
                  {localMedications.map((med) => (
                    <label
                      key={med.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all touch-manipulation ${
                        data.medicationId === med.id
                          ? 'bg-green-100 border-2 border-green-500'
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="medication"
                        value={med.id}
                        checked={data.medicationId === med.id}
                        onChange={() => updateData({ medicationId: med.id })}
                        className="w-5 h-5 text-green-600 focus:ring-2 focus:ring-green-500"
                      />
                      <FaPills className="text-gray-600" />
                      <span className="text-gray-700 font-medium text-sm sm:text-base">{med.name} - {med.dose}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                <p className="text-yellow-800 text-sm sm:text-base">
                  No tienes medicamentos registrados. Puedes agregarlos en &quot;Mis Medicamentos&quot;.
                </p>
              </div>
            )}

            {/* Campo "¿Cuánto alivió?" slider 0-10 */}
            {data.medicationId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-md"
              >
                <label className="block text-base sm:text-lg font-bold text-gray-800 mb-4">
                  ¿Cuánto alivió el medicamento?
                </label>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-700">0 - No alivió</span>
                    <span className="text-xl sm:text-2xl font-bold text-medical-blue">
                      {data.medicationRelief !== null ? data.medicationRelief : 0} / 10
                    </span>
                    <span className="text-gray-700">10 - Alivió completamente</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={data.medicationRelief !== null ? data.medicationRelief : 0}
                    onChange={(e) => updateData({ medicationRelief: parseInt(e.target.value) })}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer touch-manipulation bg-gradient-to-r from-red-400 via-yellow-400 to-green-500"
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Navegación */}
      <div className="mt-6 sm:mt-8 flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/daily-record/emotional-state')}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-200 text-gray-700 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 touch-manipulation text-sm sm:text-base"
        >
          <FaArrowLeft />
          <span>Volver</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinue}
          disabled={data.tookMedication === null}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-medical-blue to-medical-purple text-white rounded-xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 touch-manipulation"
        >
          <span>Continuar</span>
          <FaArrowRight />
        </motion.button>
      </div>
    </motion.div>
  )
}

