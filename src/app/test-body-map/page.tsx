'use client'

import BodyMap from '@/components/BodyMap'
import { useState } from 'react'

export default function TestBodyMapPage() {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'frontal' | 'posterior'>('frontal')

  const handleAreaClick = (areaId: string) => {
    setSelectedAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Test Body Map - {viewMode}</h1>
        
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setViewMode('frontal')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Frontal
          </button>
          <button
            onClick={() => setViewMode('posterior')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Posterior
          </button>
          {/* Vista Lateral - COMENTADA TEMPORALMENTE */}
          {/* <button
            onClick={() => setViewMode('lateral')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Lateral
          </button> */}
          <button
            onClick={() => setSelectedAreas([])}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Limpiar Selección
          </button>
        </div>

        <BodyMap
          selectedAreas={selectedAreas}
          onAreaClick={handleAreaClick}
          viewMode={viewMode}
        />

        <div className="mt-4 bg-white p-4 rounded">
          <h2 className="font-bold mb-2">Áreas seleccionadas:</h2>
          <ul className="list-disc list-inside">
            {selectedAreas.map(area => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

