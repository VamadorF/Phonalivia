'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface DailyRecordData {
  // Paso 2.1: Localización
  primaryPainArea: string
  secondaryPainAreas: string[]
  isUsualPlace: boolean
  
  // Paso 2.2: Intensidad
  painIntensity: number // 0-10
  
  // Paso 2.3: Cualidad
  painQualities: string[]
  painQualityOther: string
  
  // Paso 2.4: Duración
  durationUnit: 'hours' | 'days' | 'weeks' | 'months'
  durationValue: number
  hasHadBefore: boolean | null
  weeklyFrequency: number | null // 0-7
  
  // Paso 2.5: Impacto funcional
  functionalImpactPhysical: number // 0-10
  functionalImpactWork: number // 0-10
  functionalImpactSocial: number // 0-10
  
  // Paso 2.6: Estado emocional (PHQ-2 + GAD-2)
  phq2Answer1: number | null // 0-3
  phq2Answer2: number | null // 0-3
  gad2Answer1: number | null // 0-3
  gad2Answer2: number | null // 0-3
  
  // Paso 2.7: Medicación
  tookMedication: boolean | null
  medicationId: string | null
  medicationRelief: number | null // 0-10
  
  // Paso 2.8: Recomendación (se obtiene del backend)
  recommendation: {
    category: 'autocuidado' | 'cesfam-ccr' | 'sapu-sar' | 'urgencia'
    message: string
  } | null
}

interface DailyRecordContextType {
  data: DailyRecordData
  updateData: (updates: Partial<DailyRecordData>) => void
  resetData: () => void
}

const DailyRecordContext = createContext<DailyRecordContextType | null>(null)

const initialData: DailyRecordData = {
  primaryPainArea: '',
  secondaryPainAreas: [],
  isUsualPlace: false,
  painIntensity: 5,
  painQualities: [],
  painQualityOther: '',
  durationUnit: 'hours',
  durationValue: 1,
  hasHadBefore: null,
  weeklyFrequency: null,
  functionalImpactPhysical: 0,
  functionalImpactWork: 0,
  functionalImpactSocial: 0,
  phq2Answer1: null,
  phq2Answer2: null,
  gad2Answer1: null,
  gad2Answer2: null,
  tookMedication: null,
  medicationId: null,
  medicationRelief: null,
  recommendation: null,
}

export function DailyRecordProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DailyRecordData>(initialData)

  const updateData = (updates: Partial<DailyRecordData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const resetData = () => {
    setData(initialData)
  }

  return (
    <DailyRecordContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </DailyRecordContext.Provider>
  )
}

export function useDailyRecordData() {
  const context = useContext(DailyRecordContext)
  if (!context) {
    throw new Error('useDailyRecordData must be used within DailyRecordProvider')
  }
  return context
}

