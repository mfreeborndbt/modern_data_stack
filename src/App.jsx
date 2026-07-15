import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Tab00Agenda from './components/tabs/Tab00Agenda'
import Tab01GreatDataOrg from './components/tabs/Tab01GreatDataOrg'
import Tab02WhatIsADataStack from './components/tabs/Tab02WhatIsADataStack'
import Tab03LegacyStack from './components/tabs/Tab03LegacyStack'
import Tab04ModernStack from './components/tabs/Tab04ModernStack'
import Tab05Trends from './components/tabs/Tab05Trends'
import Tab06AI from './components/tabs/Tab06AI'

const tabs = [
  { key: '00', label: '00', title: 'Agenda', component: Tab00Agenda },
  { key: '01', label: '01', title: 'Making A Great Data Org', component: Tab01GreatDataOrg },
  { key: '02', label: '02', title: 'What Is A Data Stack', component: Tab02WhatIsADataStack },
  { key: '03', label: '03', title: 'The Legacy Stack', component: Tab03LegacyStack },
  { key: '04', label: '04', title: 'The Modern Stack', component: Tab04ModernStack },
  { key: '05', label: '05', title: 'Trends', component: Tab05Trends },
  { key: '06', label: '06', title: 'AI And The Stack', component: Tab06AI },
]

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
}

export default function App() {
  const [activeTab, setActiveTab] = useState('00')

  // Keyboard navigation: arrows + number keys
  useEffect(() => {
    const handler = (e) => {
      // Skip if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      const idx = tabs.findIndex(t => t.key === activeTab)

      if (e.key === 'ArrowRight' && idx < tabs.length - 1) {
        e.preventDefault()
        setActiveTab(tabs[idx + 1].key)
      }
      if (e.key === 'ArrowLeft' && idx > 0) {
        e.preventDefault()
        setActiveTab(tabs[idx - 1].key)
      }
      // Number keys 0-6
      const num = parseInt(e.key, 10)
      if (num >= 0 && num < tabs.length) {
        e.preventDefault()
        setActiveTab(String(num).padStart(2, '0'))
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeTab])

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activeTab])

  const ActiveComponent = tabs.find(t => t.key === activeTab)?.component

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero bar */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.08)_0%,_transparent_60%)]" />
        <div className="section-container py-6 md:py-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-white font-bold text-2xl md:text-3xl mb-1">
              The Modern Data Stack
            </h1>
            <p className="text-white/40 text-sm">
              What it is, where it came from, and where it is going.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="section-container py-2">
          <div className="flex gap-1 justify-center">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`group flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={`font-bold ${
                  activeTab === tab.key ? 'text-white' : 'text-gray-400'
                }`}>
                  {tab.label}
                </span>
                <span className="hidden md:inline">{tab.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} {...pageTransition}>
          {ActiveComponent && <ActiveComponent />}
        </motion.div>
      </AnimatePresence>

    </div>
  )
}
