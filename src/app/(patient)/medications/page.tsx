'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaSave, FaTimes } from 'react-icons/fa'
import MedicationWheel from '@/components/MedicationWheel'
import { addHours } from 'date-fns'

interface Medication {
  id: string
  name: string
  type: 'analgesic' | 'antiinflammatory' | 'muscle-relaxant' | 'other'
  dose: string
  frequency: number
  schedule?: string
  lastTaken?: string
  nextDose?: string
}

export default function MedicationsPage() {
  const [medications, setMedications] = useState<Medication[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'analgesic' as Medication['type'],
    dose: '',
    frequency: 8,
    schedule: ''
  })
  const [removingId, setRemovingId] = useState<string | null>(null)

  // Cargar medicamentos desde localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('patient-medications')
      if (stored) {
        try {
          setMedications(JSON.parse(stored))
        } catch (e) {
          console.error('Error loading medications:', e)
        }
      }
    }
  }, [])

  // Guardar medicamentos en localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && medications.length >= 0) {
      localStorage.setItem('patient-medications', JSON.stringify(medications))
    }
  }, [medications])

  const handleAdd = () => {
    if (!formData.name || !formData.dose) return

    const now = new Date()
    const newMed: Medication = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      dose: formData.dose,
      frequency: formData.frequency,
      schedule: formData.schedule,
      lastTaken: undefined,
      nextDose: addHours(now, formData.frequency).toISOString()
    }

    setMedications([...medications, newMed])
    setFormData({ name: '', type: 'analgesic', dose: '', frequency: 8, schedule: '' })
    setShowForm(false)
  }

  const handleEdit = (id: string) => {
    const med = medications.find(m => m.id === id)
    if (med) {
      setFormData({
        name: med.name,
        type: med.type,
        dose: med.dose,
        frequency: med.frequency,
        schedule: med.schedule || ''
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleSaveEdit = () => {
    if (!formData.name || !formData.dose || !editingId) return

    setMedications(medications.map(med => {
      if (med.id === editingId) {
        return {
          ...med,
          name: formData.name,
          type: formData.type,
          dose: formData.dose,
          frequency: formData.frequency,
          schedule: formData.schedule
        }
      }
      return med
    }))

    setFormData({ name: '', type: 'analgesic', dose: '', frequency: 8, schedule: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleCancelEdit = () => {
    setFormData({ name: '', type: 'analgesic', dose: '', frequency: 8, schedule: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleTake = (id: string) => {
    setMedications(medications.map(med => {
      if (med.id === id) {
        const now = new Date()
        return {
          ...med,
          lastTaken: now.toISOString(),
          nextDose: addHours(now, med.frequency).toISOString()
        }
      }
      return med
    }))
  }

  const handleRemove = (id: string) => {
    setRemovingId(id)
  }

  const confirmRemove = () => {
    if (removingId) {
      setMedications(medications.filter(med => med.id !== removingId))
      setRemovingId(null)
    }
  }

  const cancelRemove = () => {
    setRemovingId(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-medical-blue to-medical-purple bg-clip-text text-transparent">
            Gestión de Medicamentos
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Organiza y controla tus medicamentos</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (showForm && editingId) {
              handleCancelEdit()
            } else {
              setShowForm(!showForm)
            }
          }}
          className="px-4 sm:px-6 py-3 bg-gradient-to-r from-medical-blue to-medical-purple text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 touch-manipulation w-full sm:w-auto"
        >
          <FaPlus />
          <span>{showForm ? 'Cancelar' : 'Agregar Medicamento'}</span>
        </motion.button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl"
        >
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
            {editingId ? 'Editar Medicamento' : 'Nuevo Medicamento'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 text-sm sm:text-base"
                placeholder="Ej: Ibuprofeno"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 text-sm sm:text-base"
              >
                <option value="analgesic">Analgésico</option>
                <option value="antiinflammatory">Antiinflamatorio</option>
                <option value="muscle-relaxant">Relajante Muscular</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Dosis</label>
                <input
                  type="text"
                  value={formData.dose}
                  onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 text-sm sm:text-base"
                  placeholder="Ej: 400mg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Frecuencia: Cada {formData.frequency} horas
                </label>
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: parseInt(e.target.value) })}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer touch-manipulation bg-gradient-to-r from-blue-400 to-cyan-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1h</span>
                  <span>24h</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Horario (opcional)</label>
              <input
                type="time"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 text-sm sm:text-base"
              />
            </div>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={editingId ? handleSaveEdit : handleAdd}
                className="flex-1 bg-gradient-to-r from-medical-blue to-medical-purple text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all touch-manipulation"
              >
                {editingId ? 'Guardar Cambios' : 'Agregar Medicamento'}
              </motion.button>
              {editingId && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancelEdit}
                  className="px-4 sm:px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all touch-manipulation"
                >
                  Cancelar
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      <MedicationWheel
        medications={medications}
        onRemove={handleRemove}
        onTake={handleTake}
      />

      {/* Modal de confirmación de eliminación */}
      {removingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Confirmar eliminación</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              ¿Estás seguro de que quieres eliminar este medicamento? Esta acción no se puede deshacer.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={cancelRemove}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors touch-manipulation"
              >
                Cancelar
              </button>
              <button
                onClick={confirmRemove}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors touch-manipulation"
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
