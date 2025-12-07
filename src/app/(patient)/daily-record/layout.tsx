'use client'

import { DailyRecordProvider } from '@/context/DailyRecordContext'
import { ReactNode } from 'react'

export default function DailyRecordLayout({ children }: { children: ReactNode }) {
  return (
    <DailyRecordProvider>
      {children}
    </DailyRecordProvider>
  )
}

