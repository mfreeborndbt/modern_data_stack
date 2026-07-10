import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DiagramEngine from '../DiagramEngine'
import FrictionMeter from '../FrictionMeter'

const legacyTools = {
  ingest: [
    { name: 'Informatica', icon: 'I' },
    { name: 'Custom ETL scripts', icon: '{' },
    { name: 'SSIS', icon: 'S' },
  ],
  store: [
    { name: 'Oracle', icon: 'O' },
    { name: 'Teradata', icon: 'T' },
    { name: 'Hadoop / HDFS', icon: 'H' },
  ],
  transform: [
    { name: 'Informatica', icon: 'I' },
    { name: 'Trifacta', icon: 'T' },
    { name: 'Stored procedures', icon: 'P' },
  ],
  analyze: [
    { name: 'MicroStrategy', icon: 'M' },
    { name: 'Business Objects', icon: 'B' },
    { name: 'Excel exports', icon: 'X' },
  ],
}

const frictionItems = [
  { label: 'Setup time', value: 90, detail: '3 to 6 months to stand up' },
  { label: 'Config complexity', value: 85, detail: 'Dedicated admin teams required' },
  { label: 'Maintenance burden', value: 95, detail: 'Hardware, patches, capacity planning' },
  { label: 'Cost', value: 88, detail: 'Seven-figure license agreements, common' },
]

export default function Tab01LegacyStack() {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <div className="py-8">
      {/* Header */}
      <div className="section-container mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-bold text-white bg-gray-900 px-3 py-1 rounded-full">01</span>
          <h2 className="text-2xl font-bold text-gray-900">The legacy stack</h2>
        </div>
        <p className="text-sm text-gray-500">
          Before the cloud existed, this is what a data stack looked like. Heavy, expensive, and reserved for organizations that could afford it.
        </p>
      </div>

      <div className="section-container space-y-8">

        {/* ---- Era badge ---- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 py-1.5 bg-gray-100 rounded-full">
            Roughly 1990 to 2012
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </motion.div>

        {/* ---- Data center motif frame ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.3)] border border-slate-700/50 overflow-hidden"
        >
          {/* Background texture: server rack lines */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 21px)',
          }} />

          {/* Status LEDs */}
          <div className="absolute top-4 right-4 flex gap-1.5">
            <motion.div
              className="w-2 h-2 rounded-full bg-amber-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-red-500"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="w-2 h-2 rounded-full bg-green-500/40" />
          </div>

          <div className="relative z-10">
            <DiagramEngine era="legacy" stageTools={legacyTools} />
          </div>
        </motion.div>

        {/* ---- Friction meters ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-200/60 rounded-2xl p-6 md:p-8 shadow-sm"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-1">Friction</h3>
          <p className="text-sm text-gray-500 mb-5">What it actually cost to run this stack.</p>

          <div className="space-y-4 max-w-xl mx-auto">
            {frictionItems.map((item, i) => (
              <div key={item.label}>
                <FrictionMeter
                  label={item.label}
                  value={item.value}
                  delay={i * 0.15}
                />
                <p className="text-[10px] text-gray-400 text-right mt-0.5 pr-12">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ---- Who got to do analytics ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-200/60 rounded-2xl p-6 md:p-8 shadow-sm"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Who got to do analytics?</h3>

          <div className="flex items-center justify-center gap-6 mb-4">
            {/* The gate */}
            <div className="flex flex-col items-center gap-2">
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: i < 3 ? 1 : 0.15 }}
                    transition={{ delay: i * 0.05 }}
                    className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="3" y="2" width="10" height="12" rx="1" stroke={i < 3 ? '#334155' : '#cbd5e1'} strokeWidth="1.5" fill="none" />
                      <line x1="5" y1="6" x2="11" y2="6" stroke={i < 3 ? '#334155' : '#cbd5e1'} strokeWidth="1" />
                      <line x1="5" y1="9" x2="11" y2="9" stroke={i < 3 ? '#334155' : '#cbd5e1'} strokeWidth="1" />
                    </svg>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-gray-500 font-medium">Companies</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-16 bg-red-300" />
              <span className="text-[10px] font-bold text-red-400 uppercase">Gate</span>
              <div className="w-px h-16 bg-red-300" />
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex gap-2">
                {['Banks', 'Insurers', 'Fortune 500'].map((label) => (
                  <div key={label} className="px-3 py-2 bg-slate-100 rounded-lg border border-slate-200">
                    <span className="text-xs font-semibold text-slate-700">{label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 font-medium">Could actually afford it</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center max-w-md mx-auto">
            Real data infrastructure required dedicated teams and multi-year budgets.
            Most companies simply went without.
          </p>
        </motion.div>

        {/* ---- Fair caption ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pb-4"
        >
          <p className="text-sm text-gray-500 max-w-lg mx-auto italic">
            The old stack was not bad because anyone wanted it to be.
            The technology just had not caught up yet.
          </p>
        </motion.div>

      </div>
    </div>
  )
}
