import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FlowArrow from '../FlowArrow'

/* ------------------------------------------------------------------ */
/*  Stage data                                                         */
/* ------------------------------------------------------------------ */

const questionStages = [
  {
    key: 'ask',
    label: 'The question',
    color: '#6366f1',
    content: (
      <div className="text-center">
        <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          "How much revenue did we do last month?"
        </p>
        <p className="text-sm text-gray-500">Sounds simple. One number, one answer.</p>
      </div>
    ),
  },
  {
    key: 'ingest',
    label: 'Ingest',
    color: '#6366f1',
    content: null, // rendered separately
  },
  {
    key: 'store',
    label: 'Store',
    color: '#3b82f6',
    content: null,
  },
  {
    key: 'transform',
    label: 'Transform',
    color: '#f97316',
    content: null,
  },
  {
    key: 'analyze',
    label: 'Analyze',
    color: '#10b981',
    content: null,
  },
]

/* ------------------------------------------------------------------ */
/*  Source logos (no actual images, using colored badges)               */
/* ------------------------------------------------------------------ */

const dataSources = [
  { name: 'Salesforce', icon: 'SF', bg: '#00A1E0' },
  { name: 'Stripe', icon: '$', bg: '#635BFF' },
  { name: 'HubSpot', icon: 'HS', bg: '#FF7A59' },
  { name: 'Zendesk', icon: 'ZD', bg: '#03363D' },
  { name: 'Google Ads', icon: 'GA', bg: '#4285F4' },
  { name: 'App Database', icon: 'DB', bg: '#334155' },
]

/* ------------------------------------------------------------------ */
/*  Transform steps                                                    */
/* ------------------------------------------------------------------ */

const transformSteps = [
  { before: '$1,234.56', after: '1234.56', label: 'Strip formatting' },
  { before: 'NULL', after: '0.00', label: 'Fill missing values' },
  { before: 'Daily rows', after: 'Monthly total', label: 'Aggregate to monthly' },
  { before: 'Orders + Users', after: 'Revenue per customer', label: 'Join and compute' },
]

/* ------------------------------------------------------------------ */
/*  Analyze outputs                                                    */
/* ------------------------------------------------------------------ */

const analyzeOutputs = [
  { name: 'Dashboard', icon: 'D', desc: 'Monthly revenue chart', bg: '#10b981' },
  { name: 'Ad hoc query', icon: 'Q', desc: '"Break it down by region"', bg: '#3b82f6' },
  { name: 'ML model', icon: 'M', desc: 'Revenue forecast', bg: '#8b5cf6' },
  { name: 'Data app', icon: 'A', desc: 'Customer-facing metrics', bg: '#f59e0b' },
]

/* ------------------------------------------------------------------ */
/*  Pipeline mini-diagram (appears in the question flow)               */
/* ------------------------------------------------------------------ */

function PipelineBar({ activeStage }) {
  const stages = [
    { key: 'ingest', label: 'Ingest', color: '#6366f1' },
    { key: 'store', label: 'Store', color: '#3b82f6' },
    { key: 'transform', label: 'Transform', color: '#f97316' },
    { key: 'analyze', label: 'Analyze', color: '#10b981' },
  ]

  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {stages.map((s, i) => (
        <div key={s.key} className="flex items-center">
          <motion.div
            className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border-2 transition-all duration-500"
            animate={{
              backgroundColor: activeStage >= i ? s.color : 'transparent',
              borderColor: s.color,
              color: activeStage >= i ? '#fff' : s.color,
              scale: activeStage === i ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            {s.label}
          </motion.div>
          {i < stages.length - 1 && (
            <div className="mx-1">
              <FlowArrow
                direction="right"
                color={activeStage > i ? stages[i + 1].color : '#d1d5db'}
                length={36}
                thickness={2}
                animated={activeStage > i}
                delay={0}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Tab Component                                                 */
/* ------------------------------------------------------------------ */

export default function Tab00WhatIsADataStack() {
  const [activeStage, setActiveStage] = useState(-1)

  // Auto-advance the question through stages
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeStage < 4) setActiveStage(prev => prev + 1)
    }, activeStage === -1 ? 800 : 2200)
    return () => clearTimeout(timer)
  }, [activeStage])

  // Allow clicking to jump stages
  const stageLabels = ['Question', 'Ingest', 'Store', 'Transform', 'Analyze']

  return (
    <div className="py-8">
      {/* Header */}
      <div className="section-container mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-bold text-white bg-gray-900 px-3 py-1 rounded-full">00</span>
          <h2 className="text-2xl font-bold text-gray-900">What is a data stack?</h2>
        </div>
        <p className="text-sm text-gray-500">Four jobs, in order. Every data stack does these whether it knows it or not.</p>
      </div>

      <div className="section-container space-y-8">

        {/* ---- Question flow ---- */}
        <div className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 border border-gray-200/60 rounded-2xl p-6 md:p-8 shadow-sm">

          {/* Stage selector */}
          <div className="flex gap-1.5 justify-center mb-6">
            {stageLabels.map((label, i) => (
              <button
                key={label}
                onClick={() => setActiveStage(i - 1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeStage === i - 1
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Pipeline progress bar */}
          <PipelineBar activeStage={activeStage} />

          {/* Animated content area */}
          <AnimatePresence mode="wait">
            {/* Stage -1: The question */}
            {activeStage === -1 && (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-center py-8"
              >
                <motion.div
                  className="inline-block bg-white border-2 border-indigo-200 rounded-2xl px-8 py-6 shadow-lg"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <p className="text-xl md:text-2xl font-bold text-gray-900">
                    "How much revenue did we do last month?"
                  </p>
                  <p className="text-sm text-gray-400 mt-2">One question. Sounds like one query.</p>
                </motion.div>
              </motion.div>
            )}

            {/* Stage 0: Ingest */}
            {activeStage === 0 && (
              <motion.div
                key="ingest"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-5">
                  <p className="text-base font-semibold text-gray-700">
                    But the data lives in six different places.
                  </p>
                  <p className="text-sm text-gray-400">Someone has to pull it all into one spot.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {dataSources.map((src, i) => (
                    <motion.div
                      key={src.name}
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4, type: 'spring', stiffness: 200 }}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md"
                        style={{ backgroundColor: src.bg }}
                      >
                        {src.icon}
                      </div>
                      <span className="text-[10px] font-semibold text-gray-500">{src.name}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Funnel arrow */}
                <div className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col items-center"
                  >
                    <svg width="200" height="60" viewBox="0 0 200 60">
                      <motion.path
                        d="M 10 10 L 90 30 L 10 50"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                      />
                      <motion.path
                        d="M 190 10 L 110 30 L 190 50"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                      />
                      <motion.circle
                        cx="100"
                        cy="30"
                        r="4"
                        fill="#6366f1"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.3, 1] }}
                        transition={{ delay: 1.2 }}
                      />
                    </svg>
                    <span className="text-xs font-semibold text-indigo-500 mt-1">One destination</span>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Stage 1: Store */}
            {activeStage === 1 && (
              <motion.div
                key="store"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-5">
                  <p className="text-base font-semibold text-gray-700">
                    Two kinds of database, built for two different jobs.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {/* OLTP */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="border-2 border-blue-200 rounded-xl p-5 bg-blue-50/50"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white text-xs font-bold">OL</div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">OLTP</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Transactional</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Built for your app. Fast single-row reads and writes.</p>
                    <div className="space-y-1.5 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>One user places one order</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>Millisecond response time</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>Not designed for analytics</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* OLAP */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="border-2 border-indigo-200 rounded-xl p-5 bg-indigo-50/50"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">AP</div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">OLAP</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Analytical</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Built for questions. Scans millions of rows at once.</p>
                    <div className="space-y-1.5 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span>"Sum all orders this quarter"</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span>Column-oriented storage</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span>This is where analytics happens</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs text-gray-400 text-center mt-4"
                >
                  You would not run a monthly revenue query against your production app database. Different job, different tool.
                </motion.p>
              </motion.div>
            )}

            {/* Stage 2: Transform */}
            {activeStage === 2 && (
              <motion.div
                key="transform"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-5">
                  <p className="text-base font-semibold text-gray-700">
                    Raw data is messy. It needs work before anyone can trust it.
                  </p>
                </div>

                <div className="max-w-lg mx-auto space-y-3">
                  {transformSteps.map((step, i) => (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2, duration: 0.4 }}
                      className="flex items-center gap-3 bg-white rounded-xl border border-gray-200/80 p-3 shadow-sm"
                    >
                      <div className="w-24 shrink-0">
                        <div className="text-xs font-mono bg-red-50 text-red-600 px-2 py-1 rounded border border-red-100 text-center truncate">
                          {step.before}
                        </div>
                      </div>
                      <div className="shrink-0">
                        <FlowArrow direction="right" color="#f97316" length={32} thickness={2} delay={i * 0.3} />
                      </div>
                      <div className="w-28 shrink-0">
                        <div className="text-xs font-mono bg-green-50 text-green-600 px-2 py-1 rounded border border-green-100 text-center truncate">
                          {step.after}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 font-medium ml-auto">{step.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Stage 3: Analyze */}
            {activeStage === 3 && (
              <motion.div
                key="analyze"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-5">
                  <p className="text-base font-semibold text-gray-700">
                    The answer finally comes out. But not just as one number.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
                  {analyzeOutputs.map((output, i) => (
                    <motion.div
                      key={output.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
                      className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200/80 shadow-sm"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md"
                        style={{ backgroundColor: output.bg }}
                      >
                        {output.icon}
                      </div>
                      <p className="text-sm font-semibold text-gray-800">{output.name}</p>
                      <p className="text-[10px] text-gray-400 text-center leading-tight">{output.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-xs text-gray-400 text-center mt-5"
                >
                  That "simple" revenue question touched six source systems, two database paradigms, four cleaning steps, and four output formats.
                </motion.p>
              </motion.div>
            )}

            {/* Stage 4: complete */}
            {activeStage >= 4 && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-center py-6"
              >
                <p className="text-lg font-bold text-gray-900 mb-2">
                  That is a data stack.
                </p>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Four jobs, every time: ingest, store, transform, analyze.
                  The tools change. The shape does not.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ---- Four jobs summary cards ---- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              key: 'ingest',
              color: '#6366f1',
              title: 'Ingest',
              desc: 'Pull data from where it is generated into a central location.',
              detail: 'CRMs, payment processors, ad platforms, production databases, event streams.',
            },
            {
              key: 'store',
              color: '#3b82f6',
              title: 'Store',
              desc: 'Put it in a system designed for analytical queries.',
              detail: 'Column-oriented warehouses that can scan billions of rows in seconds.',
            },
            {
              key: 'transform',
              color: '#f97316',
              title: 'Transform',
              desc: 'Clean, join, and shape raw data into something trustworthy.',
              detail: 'Dedup, type casting, joins, business logic, testing, documentation.',
            },
            {
              key: 'analyze',
              color: '#10b981',
              title: 'Analyze',
              desc: 'Visualize, query, model, and build on top of trusted data.',
              detail: 'Dashboards, ad hoc SQL, ML pipelines, embedded analytics, data apps.',
            },
          ].map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-200/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: card.color }} />
                <h3 className="text-base font-bold text-gray-900">{card.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{card.desc}</p>
              <p className="text-xs text-gray-400">{card.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* ---- No tool names disclaimer ---- */}
        <div className="text-center pb-4">
          <p className="text-xs text-gray-400">
            Notice: no tool names yet. This tab is about the jobs, not the vendors.
          </p>
        </div>

      </div>
    </div>
  )
}
