'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { FaTimes } from 'react-icons/fa'

interface BodyMapProps {
  selectedAreas: string[]
  onAreaClick: (area: string) => void
  viewMode?: 'frontal' | 'posterior' // 'lateral' comentado temporalmente
}

interface BodyArea {
  id: string
  label: string
  position: { top: string; left: string }
  size: { width: string; height: string }
  shape: 'circle' | 'rounded'
}

// Áreas simplificadas para VISTA FRONTAL
const bodyAreasFrontal: BodyArea[] = [
  // Cara
  { id: 'face', label: 'Cara', position: { top: '5%', left: '50%' }, size: { width: '20%', height: '15%' }, shape: 'rounded' },
  
  // Cuello
  { id: 'neck', label: 'Cuello', position: { top: '20%', left: '50%' }, size: { width: '16%', height: '6%' }, shape: 'rounded' },
  
  // Hombros
  { id: 'shoulder-right', label: 'Hombro derecho', position: { top: '24%', left: '70%' }, size: { width: '14%', height: '8%' }, shape: 'rounded' },
  { id: 'shoulder-left', label: 'Hombro izquierdo', position: { top: '24%', left: '30%' }, size: { width: '14%', height: '8%' }, shape: 'rounded' },
  
  // Pecho
  { id: 'chest', label: 'Pecho', position: { top: '28%', left: '50%' }, size: { width: '32%', height: '16%' }, shape: 'rounded' },
  
  // Abdomen
  { id: 'abdomen', label: 'Abdomen', position: { top: '44%', left: '50%' }, size: { width: '28%', height: '18%' }, shape: 'rounded' },
  
  // Caderas
  { id: 'hip-right', label: 'Cadera derecha', position: { top: '60%', left: '56%' }, size: { width: '14%', height: '8%' }, shape: 'rounded' },
  { id: 'hip-left', label: 'Cadera izquierda', position: { top: '60%', left: '44%' }, size: { width: '14%', height: '8%' }, shape: 'rounded' },
  
  // Brazos
  { id: 'arm-right', label: 'Brazo derecho', position: { top: '30%', left: '76%' }, size: { width: '12%', height: '22%' }, shape: 'rounded' },
  { id: 'arm-left', label: 'Brazo izquierdo', position: { top: '30%', left: '12%' }, size: { width: '12%', height: '22%' }, shape: 'rounded' },
  
  // Codos
  { id: 'elbow-right', label: 'Codo derecho', position: { top: '50%', left: '78%' }, size: { width: '8%', height: '6%' }, shape: 'circle' },
  { id: 'elbow-left', label: 'Codo izquierdo', position: { top: '50%', left: '14%' }, size: { width: '8%', height: '6%' }, shape: 'circle' },
  
  // Antebrazos
  { id: 'forearm-right', label: 'Antebrazo derecho', position: { top: '55%', left: '76%' }, size: { width: '10%', height: '16%' }, shape: 'rounded' },
  { id: 'forearm-left', label: 'Antebrazo izquierdo', position: { top: '55%', left: '14%' }, size: { width: '10%', height: '16%' }, shape: 'rounded' },
  
  // Manos
  { id: 'hand-right', label: 'Mano derecha', position: { top: '70%', left: '76%' }, size: { width: '10%', height: '8%' }, shape: 'rounded' },
  { id: 'hand-left', label: 'Mano izquierda', position: { top: '70%', left: '14%' }, size: { width: '10%', height: '8%' }, shape: 'rounded' },
  
  // Piernas
  { id: 'leg-right', label: 'Pierna derecha', position: { top: '68%', left: '54%' }, size: { width: '14%', height: '32%' }, shape: 'rounded' },
  { id: 'leg-left', label: 'Pierna izquierda', position: { top: '68%', left: '46%' }, size: { width: '14%', height: '32%' }, shape: 'rounded' },
  
  // Rodillas
  { id: 'knee-right', label: 'Rodilla derecha', position: { top: '85%', left: '54%' }, size: { width: '12%', height: '7%' }, shape: 'circle' },
  { id: 'knee-left', label: 'Rodilla izquierda', position: { top: '85%', left: '46%' }, size: { width: '12%', height: '7%' }, shape: 'circle' },
  
  // Pantorrillas
  { id: 'calf-right', label: 'Pantorrilla derecha', position: { top: '92%', left: '54%' }, size: { width: '13%', height: '14%' }, shape: 'rounded' },
  { id: 'calf-left', label: 'Pantorrilla izquierda', position: { top: '92%', left: '46%' }, size: { width: '13%', height: '14%' }, shape: 'rounded' },
  
  // Pies
  { id: 'foot-right', label: 'Pie derecho', position: { top: '105%', left: '54%' }, size: { width: '12%', height: '8%' }, shape: 'rounded' },
  { id: 'foot-left', label: 'Pie izquierdo', position: { top: '105%', left: '46%' }, size: { width: '12%', height: '8%' }, shape: 'rounded' },
]

// Áreas simplificadas para VISTA POSTERIOR
const bodyAreasPosterior: BodyArea[] = [
  // Cara (no visible en posterior, pero manteniendo estructura)
  { id: 'head', label: 'Cabeza', position: { top: '5%', left: '50%' }, size: { width: '20%', height: '15%' }, shape: 'rounded' },
  
  // Cuello
  { id: 'neck', label: 'Cuello', position: { top: '20%', left: '50%' }, size: { width: '16%', height: '6%' }, shape: 'rounded' },
  
  // Hombros
  { id: 'shoulder-right', label: 'Hombro derecho', position: { top: '24%', left: '70%' }, size: { width: '14%', height: '8%' }, shape: 'rounded' },
  { id: 'shoulder-left', label: 'Hombro izquierdo', position: { top: '24%', left: '30%' }, size: { width: '14%', height: '8%' }, shape: 'rounded' },
  
  // Espalda alta
  { id: 'back-upper', label: 'Espalda alta', position: { top: '28%', left: '50%' }, size: { width: '32%', height: '18%' }, shape: 'rounded' },
  
  // Espalda baja
  { id: 'back-lower', label: 'Espalda baja', position: { top: '46%', left: '50%' }, size: { width: '28%', height: '14%' }, shape: 'rounded' },
  
  // Caderas
  { id: 'hip-right', label: 'Cadera derecha', position: { top: '60%', left: '56%' }, size: { width: '14%', height: '8%' }, shape: 'rounded' },
  { id: 'hip-left', label: 'Cadera izquierda', position: { top: '60%', left: '44%' }, size: { width: '14%', height: '8%' }, shape: 'rounded' },
  
  // Brazos
  { id: 'arm-right', label: 'Brazo derecho', position: { top: '30%', left: '76%' }, size: { width: '12%', height: '22%' }, shape: 'rounded' },
  { id: 'arm-left', label: 'Brazo izquierdo', position: { top: '30%', left: '12%' }, size: { width: '12%', height: '22%' }, shape: 'rounded' },
  
  // Codos
  { id: 'elbow-right', label: 'Codo derecho', position: { top: '50%', left: '78%' }, size: { width: '8%', height: '6%' }, shape: 'circle' },
  { id: 'elbow-left', label: 'Codo izquierdo', position: { top: '50%', left: '14%' }, size: { width: '8%', height: '6%' }, shape: 'circle' },
  
  // Antebrazos
  { id: 'forearm-right', label: 'Antebrazo derecho', position: { top: '55%', left: '76%' }, size: { width: '10%', height: '16%' }, shape: 'rounded' },
  { id: 'forearm-left', label: 'Antebrazo izquierdo', position: { top: '55%', left: '14%' }, size: { width: '10%', height: '16%' }, shape: 'rounded' },
  
  // Manos
  { id: 'hand-right', label: 'Mano derecha', position: { top: '70%', left: '76%' }, size: { width: '10%', height: '8%' }, shape: 'rounded' },
  { id: 'hand-left', label: 'Mano izquierda', position: { top: '70%', left: '14%' }, size: { width: '10%', height: '8%' }, shape: 'rounded' },
  
  // Piernas
  { id: 'leg-right', label: 'Pierna derecha', position: { top: '74%', left: '54%' }, size: { width: '14%', height: '32%' }, shape: 'rounded' },
  { id: 'leg-left', label: 'Pierna izquierda', position: { top: '74%', left: '46%' }, size: { width: '14%', height: '32%' }, shape: 'rounded' },
  
  // Rodillas
  { id: 'knee-right', label: 'Rodilla derecha', position: { top: '91%', left: '54%' }, size: { width: '12%', height: '7%' }, shape: 'circle' },
  { id: 'knee-left', label: 'Rodilla izquierda', position: { top: '91%', left: '46%' }, size: { width: '12%', height: '7%' }, shape: 'circle' },
  
  // Pantorrillas
  { id: 'calf-right', label: 'Pantorrilla derecha', position: { top: '98%', left: '54%' }, size: { width: '13%', height: '14%' }, shape: 'rounded' },
  { id: 'calf-left', label: 'Pantorrilla izquierda', position: { top: '98%', left: '46%' }, size: { width: '13%', height: '14%' }, shape: 'rounded' },
  
  // Pies
  { id: 'foot-right', label: 'Pie derecho', position: { top: '111%', left: '54%' }, size: { width: '12%', height: '8%' }, shape: 'rounded' },
  { id: 'foot-left', label: 'Pie izquierdo', position: { top: '111%', left: '46%' }, size: { width: '12%', height: '8%' }, shape: 'rounded' },
]

// Áreas simplificadas para VISTA LATERAL - COMENTADO TEMPORALMENTE
/* const bodyAreasLateral: BodyArea[] = [
  // Cara
  { id: 'face', label: 'Cara', position: { top: '5%', left: '54%' }, size: { width: '18%', height: '15%' }, shape: 'rounded' },
  
  // Cuello
  { id: 'neck', label: 'Cuello', position: { top: '20%', left: '52%' }, size: { width: '14%', height: '6%' }, shape: 'rounded' },
  
  // Hombros
  { id: 'shoulder', label: 'Hombro', position: { top: '26%', left: '56%' }, size: { width: '16%', height: '8%' }, shape: 'rounded' },
  
  // Pecho
  { id: 'chest', label: 'Pecho', position: { top: '30%', left: '54%' }, size: { width: '20%', height: '18%' }, shape: 'rounded' },
  
  // Abdomen
  { id: 'abdomen', label: 'Abdomen', position: { top: '48%', left: '52%' }, size: { width: '18%', height: '16%' }, shape: 'rounded' },
  
  // Espalda alta
  { id: 'back-upper', label: 'Espalda alta', position: { top: '30%', left: '44%' }, size: { width: '18%', height: '18%' }, shape: 'rounded' },
  
  // Espalda baja
  { id: 'back-lower', label: 'Espalda baja', position: { top: '60%', left: '48%' }, size: { width: '16%', height: '12%' }, shape: 'rounded' },
  
  // Caderas
  { id: 'hip', label: 'Cadera', position: { top: '70%', left: '52%' }, size: { width: '16%', height: '10%' }, shape: 'rounded' },
  
  // Brazo
  { id: 'arm', label: 'Brazo', position: { top: '34%', left: '64%' }, size: { width: '14%', height: '24%' }, shape: 'rounded' },
  
  // Codo
  { id: 'elbow', label: 'Codo', position: { top: '57%', left: '62%' }, size: { width: '9%', height: '7%' }, shape: 'circle' },
  
  // Antebrazo
  { id: 'forearm', label: 'Antebrazo', position: { top: '63%', left: '60%' }, size: { width: '12%', height: '16%' }, shape: 'rounded' },
  
  // Mano
  { id: 'hand', label: 'Mano', position: { top: '78%', left: '56%' }, size: { width: '11%', height: '9%' }, shape: 'rounded' },
  
  // Pierna
  { id: 'leg', label: 'Pierna', position: { top: '80%', left: '52%' }, size: { width: '16%', height: '38%' }, shape: 'rounded' },
  
  // Rodilla
  { id: 'knee', label: 'Rodilla', position: { top: '97%', left: '52%' }, size: { width: '14%', height: '8%' }, shape: 'circle' },
  
  // Pantorrilla
  { id: 'calf', label: 'Pantorrilla', position: { top: '105%', left: '52%' }, size: { width: '15%', height: '16%' }, shape: 'rounded' },
  
  // Pie
  { id: 'foot', label: 'Pie', position: { top: '120%', left: '52%' }, size: { width: '14%', height: '9%' }, shape: 'rounded' },
] */

export default function BodyMap({ selectedAreas, onAreaClick, viewMode = 'frontal' }: BodyMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Determinar qué áreas y qué imagen usar según la vista
  const getBodyAreas = () => {
    switch (viewMode) {
      case 'posterior':
        return bodyAreasPosterior
      // case 'lateral':
      //   return bodyAreasLateral
      default:
        return bodyAreasFrontal
    }
  }

  const getImageUrl = () => {
    switch (viewMode) {
      case 'posterior':
        return '/images/body-posterior.png'
      // case 'lateral':
      //   return '/images/body-lateral.png'
      default:
        return '/images/body-frontal.png'
    }
  }

  const bodyAreas = getBodyAreas()
  const bodyImageUrl = getImageUrl()

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImageLoaded(true)
    }
    img.onerror = () => {
      setImageLoaded(false)
    }
    img.src = bodyImageUrl
  }, [bodyImageUrl])

  return (
    <div className="relative w-full bg-gradient-to-br from-gray-50 to-white rounded-2xl p-3 sm:p-6 border-2 border-gray-200 shadow-lg">
      <div 
        ref={containerRef}
        className="relative w-full max-w-md mx-auto"
        style={{ aspectRatio: '1/2', minHeight: '500px' }}
      >
        <div className="relative w-full h-full bg-white rounded-xl overflow-hidden shadow-inner">
          <Image
            src={bodyImageUrl}
            alt={`Cuerpo humano - Vista ${viewMode === 'frontal' ? 'frontal' : viewMode === 'posterior' ? 'posterior' : 'lateral'}`}
            fill
            className={`object-contain transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            style={{ filter: 'brightness(1.05) contrast(1.1)' }}
            sizes="(max-width: 768px) 100vw, 500px"
          />
          
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm">Cargando imagen...</p>
              </div>
            </div>
          )}

          {/* Áreas interactivas - siempre visibles */}
          {bodyAreas.map((area) => {
            const isSelected = selectedAreas.includes(area.id)
            
            return (
              <button
                key={`${viewMode}-${area.id}`}
                type="button"
                onClick={() => onAreaClick(area.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 border-2 transition-colors touch-manipulation ${
                  area.shape === 'circle' ? 'rounded-full' : 'rounded-lg'
                } cursor-pointer ${
                  isSelected
                    ? 'bg-red-500/50 border-red-600 z-10'
                    : 'bg-blue-200/30 border-blue-400/60 hover:bg-blue-300/40'
                }`}
                style={{
                  top: area.position.top,
                  left: area.position.left,
                  width: area.size.width,
                  height: area.size.height,
                  minWidth: '40px',
                  minHeight: '40px',
                }}
                title={area.label}
              />
            )
          })}
        </div>
      </div>

      {/* Lista de áreas seleccionadas */}
      {selectedAreas.length > 0 && (
        <div className="mt-4 sm:mt-6 bg-white rounded-xl p-3 sm:p-4 shadow-lg border-2 border-red-200">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              Áreas con dolor seleccionadas:
            </div>
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-semibold">
              {selectedAreas.length} {selectedAreas.length === 1 ? 'área' : 'áreas'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
            {selectedAreas.map((areaId) => {
              const area = bodyAreasFrontal.find(a => a.id === areaId) || 
                          bodyAreasPosterior.find(a => a.id === areaId)
                          // bodyAreasLateral.find(a => a.id === areaId) // Comentado: vista lateral deshabilitada temporalmente
              return (
                <span
                  key={areaId}
                  className="px-3 sm:px-4 py-2 bg-gradient-to-r from-red-100 to-pink-100 text-red-800 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2 shadow-sm border border-red-200"
                >
                  {area?.label || areaId}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAreaClick(areaId)
                    }}
                    className="text-red-600 hover:text-red-800 hover:bg-red-200 rounded-full p-1 transition-colors touch-manipulation"
                    title="Quitar área"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              )
            })}
          </div>
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 italic">
          💡 Toca las áreas del cuerpo donde sientes dolor
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {bodyAreas.length} áreas anatómicas disponibles
        </p>
      </div>
    </div>
  )
}
