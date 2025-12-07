'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'

interface AliviaAlert {
  id: string
  patientId: string
  patientName: string
  type: 'risk' | 'pattern' | 'text'
  level: 'low' | 'medium' | 'high' | 'critical'
  message: string
  recommendation: string
  source: string
  createdAt: string
}

export function useAliviaAlerts(patientId?: string) {
  const [alerts, setAlerts] = useState<AliviaAlert[]>([])

  // Obtener registros del paciente
  const { data: patientRecords } = useQuery({
    queryKey: ['patient-records-for-alerts', patientId],
    queryFn: async () => {
      if (!patientId) return null
      const res = await api.get(`/professional/patients/${patientId}/evolution`)
      return res.data?.records || []
    },
    enabled: !!patientId,
    refetchInterval: 300000 // Cada 5 minutos
  })

  // Analizar registros y generar alertas
  useEffect(() => {
    if (!patientRecords || patientRecords.length < 3) return

    // En modo mock, no analizar realmente
    // En producción, aquí se haría el análisis real
  }, [patientRecords, patientId])

  return { alerts, setAlerts }
}

export default useAliviaAlerts

