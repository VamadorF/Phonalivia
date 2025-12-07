'use client'

import Layout from '@/components/Layout'
import { ReactNode } from 'react'

export default function PatientLayout({ children }: { children: ReactNode }) {
  return <Layout>{children}</Layout>
}

