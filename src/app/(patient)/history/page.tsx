'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { FaFilter, FaCalendarAlt } from 'react-icons/fa'
import { format, parseISO, subDays } from 'date-fns'
import { es } from 'date-fns/locale'
import api from '@/lib/api'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type TimeFilter = '7days' | '30days' | '90days' | 'all'

export default function HistoryPage() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('30days')

  const { data, isLoading } = useQuery({
    queryKey: ['patient-daily-records', timeFilter],
    queryFn: async () => {
      const res = await api.get('/patient/daily-records')
      return res.data
    }
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-medical-blue border-t-transparent rounded-full"
        />
      </div>
    )
  }

  const records = data?.records || []

  // Filtrar por tiempo
  const filteredRecords = records.filter((record: any) => {
    if (timeFilter === 'all') return true
    const recordDate = parseISO(record.date)
    const now = new Date()
    const daysAgo = timeFilter === '7days' ? 7 : timeFilter === '30days' ? 30 : 90
    return recordDate >= subDays(now, daysAgo)
  })

  // Preparar datos para gráfico
  const chartData = filteredRecords
    .slice()
    .reverse()
    .map((record: any) => ({
      date: format(parseISO(record.date), 'dd/MM'),
      pain: record.painIntensity || 0
    }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 sm:space-y-8"
    >
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-medical-blue to-medical-purple bg-clip-text text-transparent mb-2">
          Historial
        </h1>
        <p className="text-base sm:text-lg text-gray-600">Revisa tus registros de dolor y evolución</p>
      </div>

      {/* Filtros temporales */}
      <div className="glass-effect rounded-2xl p-4 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-600" />
            <span className="font-semibold text-gray-700 text-sm sm:text-base">Filtrar por:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['7days', '30days', '90days', 'all'] as TimeFilter[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all touch-manipulation text-xs sm:text-sm ${
                  timeFilter === filter
                    ? 'bg-gradient-to-r from-medical-blue to-medical-purple text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter === '7days' ? '7 días' : filter === '30days' ? '30 días' : filter === '90days' ? '90 días' : 'Todo'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gráfico de evolución */}
      {chartData.length > 0 && (
        <div className="glass-effect rounded-2xl p-4 sm:p-6 shadow-xl">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Evolución del Dolor</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="pain" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Timeline */}
      <div className="glass-effect rounded-2xl p-4 sm:p-6 shadow-xl">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Timeline de Registros</h2>
        {filteredRecords.length === 0 ? (
          <div className="text-center py-12">
            <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-sm sm:text-base">No hay registros en el período seleccionado</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecords.map((record: any, idx: number) => {
              const date = parseISO(record.date)
              const painAreas = Array.isArray(record.painAreas) ? record.painAreas : 
                              typeof record.painAreas === 'string' ? JSON.parse(record.painAreas) : []
              const primaryArea = painAreas[0] || 'N/A'
              
              const recommendationCategory = record.recommendation?.category || 'autocuidado'
              const getRecommendationColor = (cat: string) => {
                switch (cat) {
                  case 'autocuidado': return 'bg-green-100 text-green-800'
                  case 'cesfam-ccr': return 'bg-blue-100 text-blue-800'
                  case 'sapu-sar': return 'bg-orange-100 text-orange-800'
                  case 'urgencia': return 'bg-red-100 text-red-800'
                  default: return 'bg-gray-100 text-gray-800'
                }
              }

              return (
                <motion.div
                  key={record.id || idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all border-l-4 border-medical-blue"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start mb-4 space-y-2 sm:space-y-0">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-800">
                        {format(date, 'dd MMMM yyyy', { locale: es })}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {format(date, 'HH:mm', { locale: es })}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-xl sm:text-2xl font-bold text-red-600">
                        {record.painIntensity?.toFixed(1) || 'N/A'} / 10
                      </div>
                      <p className="text-xs text-gray-500">Intensidad</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4">
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-600">Zona:</span>
                      <p className="text-gray-800 text-sm sm:text-base">{primaryArea}</p>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-600">Duración:</span>
                      <p className="text-gray-800 text-sm sm:text-base">
                        {record.painDurationValue} {record.painDurationUnit}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-600">Recomendación:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getRecommendationColor(recommendationCategory)}`}>
                        {recommendationCategory}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </motion.div>
  )
}
