import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DiagramEngine from '../DiagramEngine'
import FrictionMeter from '../FrictionMeter'

/* ------------------------------------------------------------------ */
/*  Tool configs for both eras                                         */
/* ------------------------------------------------------------------ */

const legacyTools = {
  ingest: [
    { name: 'Informatica', icon: 'I' },
    { name: 'Custom scripts', icon: '{' },
  ],
  store: [
    { name: 'Oracle', icon: 'O' },
    { name: 'Teradata', icon: 'T' },
  ],
  transform: [
    { name: 'Informatica', icon: 'I' },
    { name: 'Stored procs', icon: 'P' },
  ],
  analyze: [
    { name: 'MicroStrategy', icon: 'M' },
    { name: 'Excel', icon: 'X' },
  ],
}

const modernTools = {
  ingest: [
    { name: 'Fivetran', icon: 'F' },
    { name: 'Airbyte (OSS)', icon: 'A' },
  ],
  store: [
    { name: 'Snowflake', icon: 'S' },
    { name: 'BigQuery', icon: 'B' },
    { name: 'Redshift', icon: 'R' },
  ],
  transform: [
    { name: 'dbt', icon: 'd' },
  ],
  analyze: [
    { name: 'Hex', icon: 'H' },
    { name: 'Sigma', icon: 'S' },
  ],
}

/* ------------------------------------------------------------------ */
/*  Friction data for both eras                                        */
/* ------------------------------------------------------------------ */

const legacyFriction = [
  { label: 'Setup time', value: 90 },
  { label: 'Config complexity', value: 85 },
  { label: 'Maintenance', value: 95 },
  { label: 'Cost', value: 88 },
]

const modernFriction = [
  { label: 'Setup time', value: 15 },
  { label: 'Config complexity', value: 20 },
  { label: 'Maintenance', value: 10 },
  { label: 'Cost', value: 25 },
]

/* ------------------------------------------------------------------ */
/*  Tool detail cards for the modern stack                             */
/* ------------------------------------------------------------------ */

const modernDetails = [
  {
    stage: 'Ingest',
    color: '#6366f1',
    tools: [
      { name: 'Fivetran', desc: 'Connect a source, connect a destination, set your syncs. No servers to run.', tag: 'Managed' },
      { name: 'Airbyte', desc: 'Open-source alternative. Same idea, self-hosted or cloud.', tag: 'Open source' },
    ],
  },
  {
    stage: 'Store',
    color: '#3b82f6',
    tools: [
      { name: 'Snowflake', desc: 'Sign up on a website, start querying.', tag: null },
      { name: 'BigQuery', desc: 'Serverless. Pay per query.', tag: null },
      { name: 'Redshift', desc: 'AWS-native. Columnar storage.', tag: null },
    ],
  },
  {
    stage: 'Transform',
    color: '#f97316',
    tools: [
      { name: 'dbt', desc: 'Version-controlled, tested, documented SQL. Transformation as code.', tag: 'dbt Labs' },
    ],
  },
  {
    stage: 'Analyze',
    color: '#10b981',
    tools: [
      { name: 'Hex', desc: 'Cloud-based notebooks and dashboards. Collaborative, quick to start.', tag: null },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Tab02ModernStack() {
  const [era, setEra] = useState('legacy')
  const [morphComplete, setMorphComplete] = useState(false)

  // Auto-morph on mount after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setEra('modern')
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  // Track when morph completes for friction meter animation
  useEffect(() => {
    if (era === 'modern') {
      const timer = setTimeout(() => setMorphComplete(true), 800)
      return () => clearTimeout(timer)
    } else {
      setMorphComplete(false)
    }
  }, [era])

  const isModern = era === 'modern'
  const friction = isModern ? modernFriction : legacyFriction

  return (
    <div className="py-8">
      {/* Header */}
      <div className="section-container mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-bold text-white bg-gray-900 px-3 py-1 rounded-full">02</span>
          <h2 className="text-2xl font-bold text-gray-900">The modern stack</h2>
        </div>
        <p className="text-sm text-gray-500">
          The cloud changed the economics. What used to take months and millions now takes an afternoon and a credit card.
        </p>
      </div>

      <div className="section-container space-y-8">

        {/* ---- Era toggle (the centerpiece) ---- */}
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setEra('legacy')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                !isModern
                  ? 'bg-slate-800 text-white shadow-lg'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Legacy
            </button>
            <button
              onClick={() => setEra('modern')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isModern
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Modern
            </button>
          </div>
        </div>

        {/* ---- The morphing diagram ---- */}
        <motion.div
          layout
          className={`relative rounded-2xl p-6 md:p-8 shadow-lg border overflow-hidden transition-all duration-700 ${
            isModern
              ? 'bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 border-gray-200/60'
              : 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-slate-700/50'
          }`}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Legacy texture */}
          <AnimatePresence>
            {!isModern && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.03 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 21px)',
                }}
              />
            )}
          </AnimatePresence>

          {/* Cloud motif for modern */}
          <AnimatePresence>
            {isModern && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute top-4 right-8 w-32 h-16 bg-blue-100/30 rounded-full blur-2xl" />
                <div className="absolute bottom-8 left-12 w-24 h-12 bg-indigo-100/20 rounded-full blur-xl" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* One-liner */}
          <AnimatePresence mode="wait">
            <motion.p
              key={era}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className={`text-center text-sm font-medium mb-6 ${
                isModern ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              {isModern
                ? 'Cloud-first tools. Opinionated defaults. Get working in a single sitting.'
                : 'On-prem hardware. Months of setup. Dedicated teams to keep it running.'
              }
            </motion.p>
          </AnimatePresence>

          <div className="relative z-10">
            <DiagramEngine
              era={era}
              stageTools={isModern ? modernTools : legacyTools}
            />
          </div>
        </motion.div>

        {/* ---- Friction meters ---- */}
        <motion.div
          layout
          className="bg-white border border-gray-200/60 rounded-2xl p-6 md:p-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-0.5">Friction</h3>
              <p className="text-sm text-gray-500">Toggle above to compare.</p>
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={era}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                  isModern
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {isModern ? 'Modern' : 'Legacy'}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="space-y-4 max-w-xl mx-auto">
            {friction.map((item, i) => (
              <FrictionMeter
                key={`${era}-${item.label}`}
                label={item.label}
                value={item.value}
                delay={i * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* ---- Modern tool detail cards ---- */}
        <AnimatePresence>
          {isModern && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-900">What changed at each stage</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modernDetails.map((detail, i) => (
                  <motion.div
                    key={detail.stage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-white border border-gray-200/60 rounded-2xl p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: detail.color }} />
                      <span className="text-sm font-bold text-gray-900">{detail.stage}</span>
                    </div>
                    <div className="space-y-2.5">
                      {detail.tools.map((tool) => (
                        <div key={tool.name} className="flex items-start gap-2">
                          <div className="mt-0.5">
                            <div className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center">
                              <span className="text-[10px] font-bold text-gray-500">{tool.name[0]}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-semibold text-gray-800">{tool.name}</span>
                              {tool.tag && (
                                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                                  {tool.tag}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{tool.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- Honest closing note ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pb-4"
        >
          <p className="text-sm text-gray-500 max-w-lg mx-auto italic">
            "Modern data stack" became a marketing term and got applied to everything.
            We are focused on what actually helps data teams, not the label.
          </p>
        </motion.div>

      </div>
    </div>
  )
}
