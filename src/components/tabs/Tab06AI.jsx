import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  Stage data — add a 4th entry here when ready                       */
/* ------------------------------------------------------------------ */

const stages = [
  {
    key: 'development',
    title: 'Development',
    subtitle: 'Building and writing data code',
    pros: [
      'Lower barrier to entry for new practitioners.',
      'A real chance to finally improve the neglected parts of analytics: naming conventions, coding standards, documentation.',
    ],
    cons: [
      "Significant token costs; it's not uncommon for a developer to spend $1,000+ per month.",
    ],
  },
  {
    key: 'deployment',
    title: 'Deployment',
    subtitle: 'Shipping changes to production',
    pros: [
      'Greater visibility and immediate impact analysis of changes.',
    ],
    cons: [
      'Changes shipped without adequate approval processes in place.',
    ],
  },
  {
    key: 'consumption',
    title: 'Consumption',
    subtitle: 'Using data to make decisions',
    pros: [
      'Faster time to insight; more self-service.',
      'BI becomes more of an FAQ, with more questions answered by chatbots.',
    ],
    cons: [
      "Huge risk of incorrect answers, misunderstanding what's being asked, and gaps in access controls.",
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Lifecycle bar                                                      */
/* ------------------------------------------------------------------ */

function LifecycleBar({ activeStage, onSelect }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {stages.map((s, i) => (
        <div key={s.key} className="flex items-center">
          <button
            onClick={() => onSelect(i)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border-2 transition-all duration-300 cursor-pointer ${
              activeStage === i
                ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                : 'bg-transparent border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400'
            }`}
          >
            {s.title}
          </button>
          {i < stages.length - 1 && (
            <div className="mx-2 w-6 h-px bg-gray-300" />
          )}
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Pros/cons card                                                     */
/* ------------------------------------------------------------------ */

function ProConCard({ stage }) {
  return (
    <motion.div
      key={stage.key}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-gray-200/60 rounded-2xl p-6 md:p-8 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{stage.title}</h3>
        <p className="text-sm text-gray-400">{stage.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pros */}
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-sm font-bold text-emerald-700">Upside</span>
          </div>
          <ul className="space-y-3">
            {stage.pros.map((pro, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span className="text-sm text-gray-600 leading-relaxed">{pro}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="rounded-xl border-2 border-red-200 bg-red-50/50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-sm font-bold text-red-700">Risk</span>
          </div>
          <ul className="space-y-3">
            {stage.cons.map((con, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <span className="text-sm text-gray-600 leading-relaxed">{con}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Tab06AI() {
  const [activeStage, setActiveStage] = useState(0)

  return (
    <div className="py-8">
      <div className="section-container mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-bold text-white bg-gray-900 px-3 py-1 rounded-full">06</span>
          <h2 className="text-2xl font-bold text-gray-900">AI And The Stack</h2>
        </div>
        <p className="text-sm text-gray-500">
          AI is a tool across the data lifecycle, with real upside and real risk at every stage.
        </p>
      </div>

      <div className="section-container space-y-6">
        <LifecycleBar activeStage={activeStage} onSelect={setActiveStage} />

        <AnimatePresence mode="wait">
          <ProConCard key={stages[activeStage].key} stage={stages[activeStage]} />
        </AnimatePresence>

        {/* Stage indicators */}
        <div className="flex justify-center gap-2 pt-2">
          {stages.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setActiveStage(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeStage === i ? 'bg-gray-900 scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <div className="text-center pt-4 pb-2">
          <p className="text-sm text-gray-500 max-w-lg mx-auto italic">
            AI does not remove the need for good data practices. It raises the stakes on having them.
          </p>
        </div>
      </div>
    </div>
  )
}
