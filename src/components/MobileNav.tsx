'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  FaHeartbeat, 
  FaChartLine, 
  FaPills,
  FaHistory
} from 'react-icons/fa'

export default function MobileNav() {
  const pathname = usePathname()

  const navLinks = [
    { to: '/dashboard', label: 'Inicio', icon: FaChartLine },
    { to: '/daily-record/location', label: 'Registrar', icon: FaHeartbeat },
    { to: '/medications', label: 'Medicamentos', icon: FaPills },
    { to: '/history', label: 'Historial', icon: FaHistory },
  ]

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/'
    }
    return pathname?.startsWith(path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl sm:hidden">
      <div className="flex justify-around items-center h-16">
        {navLinks.map((link) => {
          const Icon = link.icon
          const active = isActive(link.to)
          
          return (
            <Link
              key={link.to}
              href={link.to}
              className={`flex flex-col items-center justify-center flex-1 h-full relative transition-colors ${
                active ? 'text-medical-blue' : 'text-gray-500'
              }`}
            >
              {active && (
                <motion.div
                  layoutId="activeTabMobile"
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-medical-blue to-medical-purple"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <Icon className={`text-xl mb-1 ${active ? 'scale-110' : ''} transition-transform`} />
              <span className={`text-[10px] font-medium ${active ? 'font-bold' : ''}`}>
                {link.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

