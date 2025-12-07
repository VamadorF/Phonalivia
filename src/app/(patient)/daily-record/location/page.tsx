'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa'
import BodyMap from '@/components/BodyMap'
import { useDailyRecordData } from '@/context/DailyRecordContext'

export default function DailyRecordLocation() {
  const router = useRouter()
  const { data, updateData } = useDailyRecordData()
  const [viewMode, setViewMode] = useState<'frontal' | 'posterior'>('frontal')

  const handleAreaClick = (areaId: string) => {
    if (data.primaryPainArea === areaId) {
      updateData({ primaryPainArea: '' })
    } else if (data.secondaryPainAreas.includes(areaId)) {
      updateData({ 
        secondaryPainAreas: data.secondaryPainAreas.filter(a => a !== areaId) 
      })
    } else {
      if (!data.primaryPainArea) {
        updateData({ primaryPainArea: areaId })
      } else {
        updateData({ 
          secondaryPainAreas: [...data.secondaryPainAreas, areaId] 
        })
      }
    }
  }

  const handleContinue = () => {
    if (!data.primaryPainArea) {
      alert('Por favor, selecciona al menos una zona principal donde sientes dolor')
      return
    }
    router.push('/daily-record/intensity')
  }

  const selectedAreas = [data.primaryPainArea, ...data.secondaryPainAreas].filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-4">
          <span className="px-3 py-1 bg-medical-blue text-white rounded-full font-semibold">Paso 1 de 9</span>
          <span>Localización</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-medical-blue to-medical-purple bg-clip-text text-transparent">
          2.1 ¿Dónde te duele?
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Selecciona las zonas del cuerpo donde sientes dolor</p>
      </div>

      <div className="glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-100">
        {/* Selector de vista (Frontal, Posterior) */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="inline-flex rounded-xl bg-white p-1 shadow-md overflow-x-auto">
            <button
              type="button"
              onClick={() => setViewMode('frontal')}
              className={`px-3 sm:px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm whitespace-nowrap touch-manipulation ${
                viewMode === 'frontal'
                  ? 'bg-gradient-to-r from-medical-blue to-medical-purple text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Frontal
            </button>
            <button
              type="button"
              onClick={() => setViewMode('posterior')}
              className={`px-3 sm:px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm whitespace-nowrap touch-manipulation ${
                viewMode === 'posterior'
                  ? 'bg-gradient-to-r from-medical-blue to-medical-purple text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Posterior
            </button>
            {/* Vista Lateral - COMENTADA TEMPORALMENTE */}
            {/* <button
              type="button"
              onClick={() => setViewMode('lateral')}
              className={`px-3 sm:px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm whitespace-nowrap touch-manipulation ${
                viewMode === 'lateral'
                  ? 'bg-gradient-to-r from-medical-blue to-medical-purple text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Lateral
            </button> */}
          </div>
        </div>

        {/* BodyMap con vista seleccionada */}
        <BodyMap
          selectedAreas={selectedAreas}
          onAreaClick={handleAreaClick}
          viewMode={viewMode}
        />

        {/* Información de selección */}
        {data.primaryPainArea && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 sm:mt-6 bg-white rounded-xl p-3 sm:p-4 shadow-lg border-2 border-green-200"
          >
            <div className="flex items-center space-x-2 mb-2">
              <FaMapMarkerAlt className="text-green-600" />
              <span className="font-semibold text-gray-800 text-sm sm:text-base">Zona Principal:</span>
              <span className="text-green-700 font-bold text-sm sm:text-base">
                {bodyAreasLabels[data.primaryPainArea] || data.primaryPainArea}
              </span>
            </div>
            {data.secondaryPainAreas.length > 0 && (
              <div className="mt-2">
                <span className="font-semibold text-gray-800 text-sm sm:text-base">Zonas Secundarias: </span>
                <span className="text-gray-700 text-sm sm:text-base">
                  {data.secondaryPainAreas.map(area => bodyAreasLabels[area] || area).join(', ')}
                </span>
              </div>
            )}
          </motion.div>
        )}

        {/* Toggle "Es el mismo lugar habitual" */}
        <div className="mt-4 sm:mt-6 flex items-center space-x-3 bg-white rounded-xl p-3 sm:p-4 shadow-md">
          <input
            type="checkbox"
            id="usualPlace"
            checked={data.isUsualPlace}
            onChange={(e) => updateData({ isUsualPlace: e.target.checked })}
            className="w-5 h-5 text-medical-blue rounded focus:ring-2 focus:ring-medical-blue touch-manipulation"
          />
          <label htmlFor="usualPlace" className="text-gray-700 font-medium cursor-pointer text-sm sm:text-base">
            Es el mismo lugar habitual donde suele doler
          </label>
        </div>
      </div>

      {/* Botón continuar */}
      <div className="mt-6 sm:mt-8 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinue}
          disabled={!data.primaryPainArea}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-medical-blue to-medical-purple text-white rounded-xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 touch-manipulation"
        >
          <span>Continuar</span>
          <FaArrowRight />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Mapeo de IDs de áreas a labels legibles - Áreas simplificadas
const bodyAreasLabels: Record<string, string> = {
  // Cara
  'face': 'Cara',
  'head': 'Cabeza',
  
  // Cuello
  'neck': 'Cuello',
  
  // Hombros
  'shoulder': 'Hombro',
  'shoulder-left': 'Hombro izquierdo',
  'shoulder-right': 'Hombro derecho',
  
  // Pecho
  'chest': 'Pecho',
  
  // Abdomen
  'abdomen': 'Abdomen',
  
  // Espalda
  'back-upper': 'Espalda alta',
  'back-lower': 'Espalda baja',
  
  // Caderas
  'hip': 'Cadera',
  'hip-left': 'Cadera izquierda',
  'hip-right': 'Cadera derecha',
  
  // Brazos
  'arm': 'Brazo',
  'arm-left': 'Brazo izquierdo',
  'arm-right': 'Brazo derecho',
  
  // Codos
  'elbow': 'Codo',
  'elbow-left': 'Codo izquierdo',
  'elbow-right': 'Codo derecho',
  
  // Antebrazos
  'forearm': 'Antebrazo',
  'forearm-left': 'Antebrazo izquierdo',
  'forearm-right': 'Antebrazo derecho',
  
  // Manos
  'hand': 'Mano',
  'hand-left': 'Mano izquierda',
  'hand-right': 'Mano derecha',
  
  // Piernas
  'leg': 'Pierna',
  'leg-left': 'Pierna izquierda',
  'leg-right': 'Pierna derecha',
  
  // Rodillas
  'knee': 'Rodilla',
  'knee-left': 'Rodilla izquierda',
  'knee-right': 'Rodilla derecha',
  
  // Pantorrillas
  'calf': 'Pantorrilla',
  'calf-left': 'Pantorrilla izquierda',
  'calf-right': 'Pantorrilla derecha',
  
  // Pies
  'foot': 'Pie',
  'foot-left': 'Pie izquierdo',
  'foot-right': 'Pie derecho',
}
