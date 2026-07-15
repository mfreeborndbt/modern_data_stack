import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  Five dimensions: legacy constraint → modern solution               */
/* ------------------------------------------------------------------ */

const dimensions = [
  {
    legacy: {
      title: 'On-premise  - fixed capacity',
      desc: 'You bought a server sized for your busiest day and paid for it every day. Growing meant buying more hardware  - a months-long purchase.',
    },
    modern: {
      title: 'Cloud first',
      desc: 'Unlimited scalability. Capacity is a setting, not a purchase. Pay for what you use, scale in seconds.',
    },
  },
  {
    legacy: {
      title: 'Monolithic  - locked-in suites',
      desc: 'One vendor sold you everything. Swapping any piece meant replacing the whole stack.',
    },
    modern: {
      title: 'Modularity',
      desc: 'Flexible integrations. Swap any layer without ripping out the rest.',
    },
  },
  {
    legacy: {
      title: 'Centralized  - IT gatekeeper',
      desc: 'Every question went through a ticket to a specialist team. Business users waited weeks.',
    },
    modern: {
      title: 'Self-service minded',
      desc: 'Every persona can answer their own questions  - analysts, engineers, and business users alike.',
    },
  },
  {
    legacy: {
      title: 'Proprietary and GUI-driven',
      desc: 'Logic built in drag-and-drop tools only that tool could read. When the builder left, it became a black box.',
    },
    modern: {
      title: 'Declarative and SQL-centric',
      desc: 'Logic in readable, testable, version-controlled SQL anyone can pick up.',
    },
  },
  {
    legacy: {
      title: 'ETL  - transform before load',
      desc: 'Data was reshaped before it landed. The original was thrown away. No going back.',
    },
    modern: {
      title: 'ELT instead of ETL',
      desc: 'Load the raw data first, transform in place. The source of truth is always recoverable.',
    },
  },
]

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Tab04ModernStack() {
  const [revealed, setRevealed] = useState(new Set())
  const allRevealed = revealed.size === dimensions.length

  const toggleReveal = (idx) => {
    setRevealed(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const revealAll = () => {
    if (allRevealed) {
      setRevealed(new Set())
    } else {
      setRevealed(new Set(dimensions.map((_, i) => i)))
    }
  }

  return (
    <div className="py-8">
      {/* Header */}
      <div className="section-container mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-bold text-white bg-gray-900 px-3 py-1 rounded-full">04</span>
          <h2 className="text-2xl font-bold text-gray-900">The Modern Stack</h2>
        </div>
        <p className="text-sm text-gray-500">
          Each modern solution is the direct antidote to a legacy constraint. Five problems, five answers, one for one.
        </p>
      </div>

      <div className="section-container space-y-6">

        {/* Reveal all toggle */}
        <div className="flex justify-center">
          <button
            onClick={revealAll}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer border-2"
            style={{
              backgroundColor: allRevealed ? '#f0fdf4' : '#fef2f2',
              borderColor: allRevealed ? '#86efac' : '#fecaca',
              color: allRevealed ? '#166534' : '#991b1b',
            }}
          >
            <motion.div
              animate={{ rotate: allRevealed ? 180 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            {allRevealed ? 'Reset to constraints' : 'Reveal all solutions'}
          </button>
        </div>

        {/* Column headers */}
        <div className="hidden md:grid md:grid-cols-[1fr_40px_1fr] gap-4 px-2">
          <div className="text-center">
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Legacy constraint</span>
          </div>
          <div />
          <div className="text-center">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Modern solution</span>
          </div>
        </div>

        {/* Dimension rows */}
        <div className="space-y-4">
          {dimensions.map((dim, i) => {
            const isRevealed = revealed.has(i)
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] gap-3 md:gap-4 items-stretch"
              >
                {/* Legacy card */}
                <button
                  onClick={() => toggleReveal(i)}
                  className="text-left rounded-xl p-5 border-2 transition-all duration-300 cursor-pointer hover:shadow-md"
                  style={{
                    borderColor: isRevealed ? '#fca5a5' : '#fecaca',
                    backgroundColor: isRevealed ? '#fef2f2' : '#fff5f5',
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-red-300 bg-red-50 border border-red-200 w-6 h-6 rounded-lg flex items-center justify-center shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900">{dim.legacy.title}</h4>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{dim.legacy.desc}</p>
                </button>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {isRevealed ? (
                      <motion.div
                        key="arrow"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <circle cx="14" cy="14" r="13" fill="#dcfce7" stroke="#86efac" strokeWidth="1.5" />
                          <path d="M9 14h10M16 11l3 3-3 3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="dot"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        className="w-2 h-2 rounded-full bg-gray-300"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile arrow */}
                <div className="md:hidden flex justify-center">
                  {isRevealed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 3v14M7 14l3 3 3-3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </div>

                {/* Modern card */}
                <AnimatePresence>
                  {isRevealed ? (
                    <motion.div
                      initial={{ opacity: 0, x: 30, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 30, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="rounded-xl p-5 border-2 border-emerald-300 bg-emerald-50/80"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-100 border border-emerald-200 w-6 h-6 rounded-lg flex items-center justify-center shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900">{dim.modern.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{dim.modern.desc}</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hidden md:flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 min-h-[80px]"
                    >
                      <span className="text-xs text-gray-300 font-medium">Click to reveal</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Summary */}
        <AnimatePresence>
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-emerald-50 to-blue-50 border border-emerald-200/60 rounded-2xl p-6 md:p-8 text-center"
            >
              <p className="text-lg font-bold text-gray-900 mb-2">
                Same five dimensions. Every one inverted.
              </p>
              <p className="text-sm text-gray-500 max-w-lg mx-auto">
                The modern stack is not a different shape  - it is the legacy stack with every constraint removed.
                What used to take months and millions now takes an afternoon and a credit card.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Closing */}
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
