import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Tab00WhatIsADataStack from './components/tabs/Tab00WhatIsADataStack'
import Tab01LegacyStack from './components/tabs/Tab01LegacyStack'
import Tab02ModernStack from './components/tabs/Tab02ModernStack'
import Tab03Trends from './components/tabs/Tab03Trends'
import Tab04AI from './components/tabs/Tab04AI'

const tabs = [
  { key: '00', label: '00', title: 'What is a data stack', component: Tab00WhatIsADataStack },
  { key: '01', label: '01', title: 'The legacy stack', component: Tab01LegacyStack },
  { key: '02', label: '02', title: 'The modern stack', component: Tab02ModernStack },
  { key: '03', label: '03', title: 'Trends', component: Tab03Trends, stub: true },
  { key: '04', label: '04', title: 'AI and the stack', component: Tab04AI, stub: true },
]

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
}

export default function App() {
  const [activeTab, setActiveTab] = useState('00')

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      const idx = tabs.findIndex(t => t.key === activeTab)
      if (e.key === 'ArrowRight' && idx < tabs.length - 1) {
        e.preventDefault()
        setActiveTab(tabs[idx + 1].key)
      }
      if (e.key === 'ArrowLeft' && idx > 0) {
        e.preventDefault()
        setActiveTab(tabs[idx - 1].key)
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
                    : tab.stub
                    ? 'text-gray-400 hover:text-gray-500 hover:bg-gray-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={`font-bold ${
                  activeTab === tab.key ? 'text-white' : tab.stub ? 'text-gray-300' : 'text-gray-400'
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
