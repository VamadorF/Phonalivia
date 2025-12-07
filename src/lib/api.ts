'use client'

import axios from 'axios'
import apiMock from './apiMock'

// Frontend independiente - Siempre usar modo MOCK
// Para usar backend real, configurar NEXT_PUBLIC_USE_MOCK=false y NEXT_PUBLIC_API_URL en .env
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false' // Por defecto siempre MOCK

// Si USE_MOCK es true, usar datos mock en lugar de axios
let api: any

if (USE_MOCK || typeof window === 'undefined') {
  if (typeof window !== 'undefined') {
    console.log('🔧 Modo MOCK activado - Frontend independiente sin backend')
    console.log('📊 Todos los datos son simulados. Funciona completamente offline.')
  }
  
  api = {
    post: (url: string, data?: any) => apiMock.post(url, data, 'POST'),
    get: (url: string) => apiMock.get(url),
    patch: (url: string, data?: any) => apiMock.patch(url, data),
    put: (url: string, data?: any) => apiMock.patch(url, data),
    delete: (url: string) => apiMock.delete(url)
  }
} else {
  api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Interceptor para agregar token
  api.interceptors.request.use((config: any) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  })

  // Interceptor para manejar errores
  api.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error.response?.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )
}

export default api

