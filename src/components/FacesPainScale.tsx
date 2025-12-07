'use client'

import { motion } from 'framer-motion'
import {
  MdSentimentVerySatisfied,
  MdSentimentSatisfied,
  MdSentimentNeutral,
  MdSentimentDissatisfied,
  MdSentimentVeryDissatisfied,
  MdSick
} from 'react-icons/md'

interface FacesPainScaleProps {
  value: number
  onChange?: (value: number) => void
  size?: 'sm' | 'md' | 'lg'
  readOnly?: boolean
}

const faceColors = {
  0: '#87CEEB',
  2: '#90EE90',
  4: '#FFD700',
  6: '#FF8C00',
  8: '#FF6347',
  10: '#DC143C',
}

const faces = [
  { 
    value: 0, 
    label: 'Sin dolor', 
    labelEn: 'NO PAIN',
    color: faceColors[0],
    description: 'Sin dolor',
    Icon: MdSentimentVerySatisfied
  },
  { 
    value: 2, 
    label: 'Dolor leve', 
    labelEn: 'MILD PAIN',
    color: faceColors[2],
    description: 'Duele un poco',
    Icon: MdSentimentSatisfied
  },
  { 
    value: 4, 
    label: 'Dolor moderado', 
    labelEn: 'MODERATE PAIN',
    color: faceColors[4],
    description: 'Duele un poco más',
    Icon: MdSentimentNeutral
  },
  { 
    value: 6, 
    label: 'Dolor severo', 
    labelEn: 'SEVERE PAIN',
    color: faceColors[6],
    description: 'Duele aún más',
    Icon: MdSentimentDissatisfied
  },
  { 
    value: 8, 
    label: 'Dolor muy severo', 
    labelEn: 'VERY SEVERE PAIN',
    color: faceColors[8],
    description: 'Duele mucho',
    Icon: MdSentimentVeryDissatisfied
  },
  { 
    value: 10, 
    label: 'Peor dolor imaginable', 
    labelEn: 'WORST PAIN IMAGINABLE',
    color: faceColors[10],
    description: 'Duele lo peor',
    Icon: MdSick
  },
]

const PainFace = ({ Icon, color, size, selected }: { Icon: React.ComponentType<any>; color: string; size: number; selected: boolean }) => {
  const iconSize = size * 0.7
  
  return (
    <div 
      className="flex items-center justify-center rounded-full transition-all duration-300 flex-shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: selected ? '#fff' : color,
        border: selected ? `3px solid ${color}` : '3px solid transparent',
      }}
    >
      <Icon 
        size={iconSize}
        style={{ 
          color: selected ? color : '#333',
          filter: selected ? 'none' : 'brightness(0.7)'
        }}
      />
    </div>
  )
}

const getScaleColor = (num: number): string => {
  const normalized = Math.max(1.0, Math.min(10.0, num))
  const normalized01 = (normalized - 1.0) / 9.0
  
  if (normalized01 <= 0.2) {
    const t = normalized01 / 0.2
    const r = Math.round(135 + (144 - 135) * t)
    const g = Math.round(206 + (238 - 206) * t)
    const b = Math.round(235 + (144 - 235) * t)
    return `rgb(${r}, ${g}, ${b})`
  } else if (normalized01 <= 0.4) {
    const t = (normalized01 - 0.2) / 0.2
    const r = Math.round(144 + (255 - 144) * t)
    const g = Math.round(238 + (215 - 238) * t)
    const b = Math.round(144 + (0 - 144) * t)
    return `rgb(${r}, ${g}, ${b})`
  } else if (normalized01 <= 0.6) {
    const t = (normalized01 - 0.4) / 0.2
    const r = Math.round(255 + (255 - 255) * t)
    const g = Math.round(215 + (140 - 215) * t)
    const b = Math.round(0)
    return `rgb(${r}, ${g}, ${b})`
  } else if (normalized01 <= 0.8) {
    const t = (normalized01 - 0.6) / 0.2
    const r = Math.round(255 + (255 - 255) * t)
    const g = Math.round(140 + (99 - 140) * t)
    const b = Math.round(0 + (71 - 0) * t)
    return `rgb(${r}, ${g}, ${b})`
  } else {
    const t = (normalized01 - 0.8) / 0.2
    const r = Math.round(255 + (220 - 255) * t)
    const g = Math.round(99 + (20 - 99) * t)
    const b = Math.round(71 + (60 - 71) * t)
    return `rgb(${r}, ${g}, ${b})`
  }
}

export default function FacesPainScale({ value, onChange, size = 'lg', readOnly = false }: FacesPainScaleProps) {
  const normalizedValue = Math.max(1.0, Math.min(10.0, value || 1.0))
  
  const getClosestFace = (val: number) => {
    const normalized = Math.max(1.0, Math.min(10.0, val))
    return faces.reduce((prev, curr) => 
      Math.abs(curr.value - normalized) < Math.abs(prev.value - normalized) ? curr : prev
    )
  }

  // Tamaños más pequeños en móvil para evitar solapamiento
  const mobileFaceSize = size === 'lg' ? 50 : size === 'md' ? 45 : 40
  const desktopFaceSize = size === 'lg' ? 90 : size === 'md' ? 70 : 50

  const isSelected = (faceValue: number) => {
    const closest = getClosestFace(normalizedValue)
    return closest.value === faceValue
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center">ESCALA DE MEDICIÓN DEL DOLOR</h3>
      
      <div className="flex items-end justify-center gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {faces.map((face) => {
          const selected = isSelected(face.value)
          
          return (
            <motion.button
              key={face.value}
              type="button"
              disabled={readOnly || !onChange}
              whileHover={!readOnly && onChange ? { scale: 1.05, y: -3 } : {}}
              whileTap={!readOnly && onChange ? { scale: 0.95 } : {}}
              onClick={() => onChange && onChange(face.value === 0 ? 1.0 : face.value)}
              className={`flex flex-col items-center p-1.5 sm:p-3 rounded-xl border-2 transition-all duration-300 touch-manipulation flex-shrink-0 ${
                selected
                  ? 'shadow-xl scale-105 border-transparent'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
              } ${readOnly || !onChange ? 'cursor-default' : 'cursor-pointer'}`}
              style={{
                backgroundColor: selected ? face.color : undefined,
              }}
            >
              <div className="mb-1 sm:mb-2">
                <div className="sm:hidden">
                  <PainFace 
                    Icon={face.Icon} 
                    color={face.color}
                    selected={selected}
                    size={mobileFaceSize}
                  />
                </div>
                <div className="hidden sm:block">
                  <PainFace 
                    Icon={face.Icon} 
                    color={face.color}
                    selected={selected}
                    size={desktopFaceSize}
                  />
                </div>
              </div>
              <span className={`text-[10px] sm:text-sm font-bold ${selected ? 'text-white' : 'text-gray-700'}`}>
                {face.value}
              </span>
              <span className={`text-[8px] sm:text-xs mt-0.5 sm:mt-1 text-center leading-tight ${selected ? 'text-white/90' : 'text-gray-600'}`}>
                {face.label}
              </span>
            </motion.button>
          )
        })}
      </div>

      <div className="space-y-2">
        <div 
          className="h-8 sm:h-10 rounded-lg overflow-hidden shadow-md"
          style={{
            background: `linear-gradient(to right, ${getScaleColor(1.0)}, ${getScaleColor(2.5)}, ${getScaleColor(4.0)}, ${getScaleColor(5.5)}, ${getScaleColor(7.0)}, ${getScaleColor(8.5)}, ${getScaleColor(10.0)})`
          }}
        />
        <div className="flex justify-between text-[10px] sm:text-xs text-gray-600">
          <span className="font-semibold">1.0</span>
          <span className="font-semibold">2.5</span>
          <span className="font-semibold">4.0</span>
          <span className="font-semibold">5.5</span>
          <span className="font-semibold">7.0</span>
          <span className="font-semibold">8.5</span>
          <span className="font-semibold">10.0</span>
        </div>
      </div>
      
      {!readOnly && onChange && (
        <div className="mt-4 sm:mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Ajuste fino:</span>
            <span 
              className="text-xl sm:text-2xl font-bold"
              style={{ color: getScaleColor(normalizedValue) }}
            >
              {normalizedValue.toFixed(1)} / 10.0
            </span>
          </div>
          <input
            type="range"
            min="1.0"
            max="10.0"
            step="0.1"
            value={normalizedValue}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer touch-manipulation"
            style={{
              background: `linear-gradient(to right, ${getScaleColor(1.0)} 0%, ${getScaleColor(3.0)} 20%, ${getScaleColor(5.0)} 40%, ${getScaleColor(7.0)} 60%, ${getScaleColor(9.0)} 80%, ${getScaleColor(10.0)} 100%)`
            }}
          />
          <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-1">
            <span>1.0 - Sin dolor</span>
            <span>10.0 - Dolor extremo</span>
          </div>
        </div>
      )}
      
      {readOnly && (
        <div className="mt-4 text-center">
          <span 
            className="text-xl sm:text-2xl font-bold"
            style={{ color: getScaleColor(normalizedValue) }}
          >
            {normalizedValue.toFixed(1)} / 10.0
          </span>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">{getClosestFace(normalizedValue).description}</p>
        </div>
      )}
      
    </div>
  )
}