import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const items = [
  {
    outcome: { title: 'Answer valuable business questions', desc: 'Turn raw data into decisions that move the business forward.' },
    enabler: { title: 'Enable all personas', desc: 'Analysts, engineers, and business users can all self-serve.' },
    color: '#8b5cf6',
  },
  {
    outcome: { title: 'Quick speed to insight', desc: 'How fast a question becomes an answer.' },
    enabler: { title: 'Build with standards for reusability', desc: 'Model and componentize once, reuse everywhere.' },
    color: '#6366f1',
  },
  {
    outcome: { title: 'Verified and trusted data', desc: 'Answers you can actually trust and act on.' },
    enabler: { title: 'Automate validation processes', desc: 'Tests and checks that catch errors before people do.' },
    color: '#3b82f6',
  },
  {
    outcome: { title: 'Low cost per insight', desc: 'Hard costs (software + infra) and soft costs (people needed to get answers).' },
    enabler: { title: 'Load & refresh only net new changes', desc: 'Process only what changed, not everything from scratch.' },
    color: '#10b981',
  },
]

const outcomeIcons = [
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 16l4-4 3 3 5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/></svg>,
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="2"/><circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/></svg>,
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 17V9h4v8H3zM8 17V5h4v12H8zM13 17V2h4v15h-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
]

const enablerIcons = [
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="7" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="3" width="7" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="6.5" y="11" width="7" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M5.5 9v2M14.5 9v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/></svg>,
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="4" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="16" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M7.5 8l-2 5M12.5 8l2 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 10h4l2-6 4 12 2-6h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
]

const BASE = import.meta.env.BASE_URL

function DataRealities() {
  const [side, setSide] = useState('perception')

  return (
    <motion.div
      key="realities"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-5"
    >
      <div className="flex justify-center">
        <div className="inline-flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setSide('perception')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
              side === 'perception'
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Perception
          </button>
          <button
            onClick={() => setSide('reality')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
              side === 'reality'
                ? 'bg-red-500 text-white shadow-lg'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Reality
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={side}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center"
        >
          <div className="max-w-2xl w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <img
              src={`${BASE}logos/${side === 'perception' ? 'perception' : 'reality'}.png`}
              alt={side === 'perception' ? 'Perception: answering a basic business question' : 'Reality: what it actually takes'}
              className="w-full h-auto block"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default function Tab01GreatDataOrg() {
  const [view, setView] = useState('realities')

  const viewButtons = [
    { key: 'realities', label: 'Data realities' },
    { key: 'outcomes', label: 'What good looks like' },
    { key: 'enablers', label: 'What makes it possible' },
  ]

  return (
    <div className="py-8">
      <div className="section-container mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-bold text-white bg-gray-900 px-3 py-1 rounded-full">01</span>
          <h2 className="text-2xl font-bold text-gray-900">Making A Great Data Org</h2>
        </div>
        <p className="text-sm text-gray-500">
          A great data organization is defined by three outcomes, made possible by three enabling practices.
        </p>
      </div>

      <div className="section-container space-y-6">

        {/* Toggle */}
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            {viewButtons.map((v) => (
              <button
                key={v.key}
                onClick={() => setView(v.key)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  view === v.key
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          {/* Data realities */}
          {view === 'realities' && (
            <DataRealities />
          )}

          {/* Outcomes / Enablers */}
          {(view === 'outcomes' || view === 'enablers') && (
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            {items.map((item, i) => {
              const card = view === 'outcomes' ? item.outcome : item.enabler
              const icons = view === 'outcomes' ? outcomeIcons : enablerIcons
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.04, y: -3, transition: { duration: 0.15 } }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="rounded-2xl p-6 border-2 bg-white shadow-sm hover:shadow-md cursor-default"
                  style={{ borderColor: `${item.color}30` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${item.color}12`, color: item.color }}
                  >
                    {icons[i]}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
