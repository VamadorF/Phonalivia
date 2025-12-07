// API Mock para desarrollo sin backend
// Simula todas las respuestas de la API real

import { mockDashboard, mockIndications, mockCommunities, mockUser, mockHealthPro } from './mockData'

// Simular delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const apiMock = {
  // Auth
  async post(url: string, data: any, method: string = 'POST') {
    await delay(500)
    
    if (url.includes('/auth/login')) {
      // Si el email contiene "profesional" o "health", devolver usuario HEALTH_PRO
      const isProfessional = data.email.toLowerCase().includes('profesional') || 
                            data.email.toLowerCase().includes('health') ||
                            data.email.toLowerCase().includes('doctor')
      
      return {
        data: {
          user: isProfessional ? {
            ...mockHealthPro,
            email: data.email,
            hasProfile: true
          } : {
            ...mockUser,
            email: data.email,
            hasProfile: true
          },
          token: 'mock-token-' + Date.now()
        }
      }
    }
    
    if (url.includes('/auth/register')) {
      // Si es profesional, usar rol HEALTH_PRO
      const role = data.role === 'DOCTOR' || data.role === 'PSYCHOLOGIST' || data.role === 'PHYSIOTHERAPIST' 
        ? 'HEALTH_PRO' 
        : data.role
      
      return {
        data: {
          user: {
            id: '1',
            ...data,
            role,
            hasProfile: true
          },
          token: 'mock-token-' + Date.now()
        }
      }
    }
    
    // Daily records
    if (url.includes('/patient/daily-records')) {
      return {
        data: {
          id: 'record-' + Date.now(),
          ...data,
          date: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          // Parse JSON fields back if needed
          symptoms: typeof data.symptoms === 'string' ? JSON.parse(data.symptoms) : data.symptoms,
          triggers: typeof data.triggers === 'string' ? JSON.parse(data.triggers) : data.triggers,
          medications: typeof data.medications === 'string' ? JSON.parse(data.medications) : data.medications,
          activities: typeof data.activities === 'string' ? JSON.parse(data.activities) : data.activities
        }
      }
    }

    // Recommendation endpoint
    if (url.includes('/patient/pain-record/recommendation')) {
      let category: 'autocuidado' | 'cesfam-ccr' | 'sapu-sar' | 'urgencia' = 'autocuidado'
      let message = 'Consulta con tu médico si el dolor persiste o empeora.'

      const painIntensity = data.painIntensity || 5
      const functionalImpact = data.functionalImpactPhysical || 0

      if (painIntensity >= 8) {
        category = 'urgencia'
        message = 'El dolor es muy intenso. Se recomienda acudir a urgencia hospitalaria para evaluación inmediata.'
      } else if (painIntensity >= 6) {
        category = 'sapu-sar'
        message = 'El dolor es moderado a severo. Se recomienda consultar en SAPU o llamar al SAR (600 360 7777) para evaluación.'
      } else if (painIntensity >= 4 || functionalImpact >= 6) {
        category = 'cesfam-ccr'
        message = 'Se recomienda programar una consulta en CESFAM o CCR para evaluación y seguimiento.'
      } else {
        category = 'autocuidado'
        message = 'El dolor es leve. Puedes manejarlo con autocuidado, pero si persiste o empeora, consulta con tu médico.'
      }

      return {
        data: {
          category,
          message
        }
      }
    }
    
    return { data: {} }
  },
  
  async delete(url: string) {
    await delay(500)
    return { data: { success: true } }
  },
  
  async get(url: string) {
    await delay(500)
    
    // Auth me
    if (url.includes('/auth/me')) {
      if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          try {
            return {
              data: JSON.parse(savedUser)
            }
          } catch (e) {
            return {
              data: {
                ...mockUser,
                patientProfile: {
                  id: '1',
                  diagnosis: 'Dolor Crónico'
                }
              }
            }
          }
        }
      }
      return {
        data: null
      }
    }
    
    // Patient dashboard
    if (url.includes('/patient/dashboard')) {
      return { data: mockDashboard }
    }
    
    // Patient daily records
    if (url.includes('/patient/daily-records')) {
      return {
        data: {
          records: mockDashboard.chartData.map((item, idx) => ({
            id: `record-${idx}`,
            date: item.date,
            painIntensity: item.painIntensity,
            dayType: item.dayType,
            symptoms: ['Fatiga', 'Náuseas'],
            triggers: ['Estrés', 'Clima frío'],
            medications: [
              { name: 'Ibuprofeno', dose: '400mg', effects: 'Alivio moderado' }
            ],
            notes: 'Día difícil, dolor más intenso por la mañana',
            painAreas: ['head', 'neck', 'back-upper'],
            painDurationUnit: idx % 3 === 0 ? 'chronic' : 'hours',
            painDurationValue: idx % 3 === 0 ? null : (idx % 24) + 1,
            painTypes: ['stabbing', 'burning'],
            activities: ['Trabajo', 'Lectura', 'Caminata', 'Ejercicio']
          })),
          stats: mockDashboard.stats
        }
      }
    }
    
    // Patient indications
    if (url.includes('/patient/medical-indications')) {
      return { data: mockIndications }
    }
    
    // Communities
    if (url.includes('/community/my-communities')) {
      return { data: [mockCommunities[0]] }
    }
    
    if (url.includes('/community') && !url.includes('/posts') && !url.includes('/comments')) {
      return { data: mockCommunities }
    }
    
    return { data: [] }
  },
  
  async patch(url: string, data?: any) {
    await delay(500)
    return { data: { ...data, isResolved: true, resolvedAt: new Date().toISOString() } }
  }
}

export default apiMock

