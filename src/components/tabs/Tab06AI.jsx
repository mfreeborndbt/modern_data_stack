import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  AI Impact stages                                                   */
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
/*  AI Best Practices                                                  */
/* ------------------------------------------------------------------ */

const bestPractices = [
  {
    id: 1,
    title: 'Use MCP Servers',
    desc: 'Connect AI tools to your actual data context. MCP servers feed live schema, documentation, and lineage into the model so it generates accurate, project-aware output instead of guessing.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 2v3M10 15v3M18 10h-3M5 10H2M15.5 4.5l-2 2M6.5 13.5l-2 2M15.5 15.5l-2-2M6.5 6.5l-2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    visual: (
      <div className="flex flex-col items-center gap-3 mt-4">
        {/* VS Code */}
        <div className="px-5 py-2.5 rounded-xl bg-blue-50 border-2 border-blue-200 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11 1l3 2v10l-3 2-7-5.5L1.5 12 0 11V5l1.5-1L4 6.5 11 1z" fill="#3b82f6" fillOpacity="0.7"/></svg>
          <span className="text-xs font-bold text-blue-600">VS Code / IDE</span>
        </div>

        <svg width="12" height="20"><path d="M6 2v16" stroke="#6366f1" strokeWidth="1.5" /><path d="M3 15l3 3 3-3" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M3 5l3-3 3 3" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>

        {/* MCP Server layer */}
        <div className="px-6 py-3 rounded-xl bg-indigo-50 border-2 border-indigo-300 text-center">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mx-auto mb-1"><circle cx="9" cy="9" r="4" stroke="#6366f1" strokeWidth="1.5" /><path d="M9 1v3M9 14v3M17 9h-3M4 9H1" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" /></svg>
          <p className="text-[10px] font-bold text-indigo-600">MCP Server Layer</p>
          <p className="text-[8px] text-indigo-400">Routes context to the right source</p>
        </div>

        <div className="flex gap-4">
          {[0,1,2].map((i) => (
            <svg key={i} width="12" height="20"><path d="M6 2v16" stroke="#6366f1" strokeWidth="1.5" /><path d="M3 15l3 3 3-3" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M3 5l3-3 3 3" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
          ))}
        </div>

        {/* MCP sources */}
        <div className="flex gap-3">
          {[
            { name: 'Snowflake', color: '#3b82f6' },
            { name: 'dbt', color: '#f97316' },
            { name: 'GitHub', color: '#1f2937' },
          ].map((mcp) => (
            <div key={mcp.name} className="px-3 py-2 rounded-lg border-2 text-center" style={{ borderColor: `${mcp.color}40`, backgroundColor: `${mcp.color}08` }}>
              <p className="text-[9px] font-bold" style={{ color: mcp.color }}>{mcp.name}</p>
              <p className="text-[7px] text-gray-400">MCP</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Use Skills And Prompts',
    desc: 'Skills teach AI how to work with your context. Pre-built prompts and reusable skill definitions turn general-purpose models into domain-specific collaborators.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 8l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Automate Validation Of Standards',
    desc: 'Use AI-powered checks to enforce naming conventions, coding guidelines, and best practices automatically. Easier to adhere to standards when the tooling catches violations before review.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V6l7-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Monitor And Optimize Token Usage',
    desc: 'Not every task needs the most expensive model. Use templates and scaffolding so tools do not start from scratch, and match the right model to the right job to control costs.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 17V9h3.5v8H3zM8.25 17V5h3.5v12h-3.5zM13.5 17V2H17v15h-3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
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
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span className="text-sm text-gray-600 leading-relaxed">{pro}</span>
              </motion.li>
            ))}
          </ul>
        </div>

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
              <motion.li key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-start gap-2">
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
  const [view, setView] = useState('impact')
  const [activeStage, setActiveStage] = useState(0)
  const [activePractice, setActivePractice] = useState(0)

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

        {/* Top toggle */}
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setView('impact')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                view === 'impact' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              AI Impact
            </button>
            <button
              onClick={() => setView('practices')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                view === 'practices' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              AI Best Practices
            </button>
          </div>
        </div>

        {/* AI Impact view */}
        {view === 'impact' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-6">
            <LifecycleBar activeStage={activeStage} onSelect={setActiveStage} />
            <AnimatePresence mode="wait">
              <ProConCard key={stages[activeStage].key} stage={stages[activeStage]} />
            </AnimatePresence>
            <div className="flex justify-center gap-2 pt-2">
              {stages.map((s, i) => (
                <button key={s.key} onClick={() => setActiveStage(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${activeStage === i ? 'bg-gray-900 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`} />
              ))}
            </div>
          </motion.div>
        )}

        {/* AI Best Practices view */}
        {view === 'practices' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            {/* Sub-tabs */}
            <div className="flex flex-wrap justify-center gap-1.5 mb-6">
              {bestPractices.map((bp, i) => (
                <button
                  key={bp.id}
                  onClick={() => setActivePractice(i)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activePractice === i
                      ? 'bg-indigo-500 text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {bp.title}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePractice}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto bg-white rounded-2xl border-2 border-indigo-200 p-8 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    {bestPractices[activePractice].icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-400">{String(bestPractices[activePractice].id).padStart(2, '0')}</span>
                      <h3 className="text-lg font-bold text-gray-900">{bestPractices[activePractice].title}</h3>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{bestPractices[activePractice].desc}</p>
                {bestPractices[activePractice].visual && bestPractices[activePractice].visual}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  )
}
