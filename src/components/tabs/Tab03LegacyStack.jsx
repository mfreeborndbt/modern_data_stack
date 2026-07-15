import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FlowArrow from '../FlowArrow'

const BASE = import.meta.env.BASE_URL

const legacyStages = [
  {
    label: 'Sources',
    color: '#6366f1',
    tools: [
      { name: 'On-prem apps', type: 'text' },
    ],
  },
  {
    label: 'Extract & Transform',
    color: '#f97316',
    tools: [
      { name: 'Informatica', logo: `${BASE}logos/informatica.jpg` },
      { name: 'SSIS', logo: `${BASE}logos/ssis.svg` },
      { name: 'Trifacta', logo: `${BASE}logos/trifacta.png` },
    ],
  },
  {
    label: 'Store',
    color: '#3b82f6',
    tools: [
      { name: 'Oracle', logo: `${BASE}logos/oracle.png` },
      { name: 'Teradata', logo: `${BASE}logos/teradata.png` },
      { name: 'Hadoop', logo: `${BASE}logos/hadoop.png` },
    ],
  },
  {
    label: 'Analyze',
    color: '#10b981',
    tools: [
      { name: 'MicroStrategy', logo: `${BASE}logos/microstrategy.png` },
      { name: 'Business Objects', logo: `${BASE}logos/business-objects.png` },
      { name: 'Cognos', logo: `${BASE}logos/cognos.png` },
    ],
  },
]


/* ------------------------------------------------------------------ */
/*  Five defining constraints                                          */
/* ------------------------------------------------------------------ */

function OnPremVisual() {
  const [mode, setMode] = useState('compute')
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="inline-flex bg-gray-100 rounded-lg p-0.5">
        <button onClick={() => setMode('compute')} className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer ${mode === 'compute' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>Compute</button>
        <button onClick={() => setMode('storage')} className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer ${mode === 'storage' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>Storage</button>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'compute' ? (
          <motion.div key="compute" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col items-center gap-4">
            <div className="flex items-end gap-3">
              {[
                { label: 'Mon', usage: 30 },
                { label: 'Tue', usage: 45 },
                { label: 'Wed', usage: 60 },
                { label: 'Thu', usage: 85 },
                { label: 'Fri', usage: 95 },
                { label: 'Sat', usage: 20 },
                { label: 'Sun', usage: 15 },
              ].map((d) => (
                <div key={d.label} className="flex flex-col items-center gap-1">
                  <div className="w-12 rounded-lg overflow-hidden relative border-2 border-gray-200" style={{ height: 100, backgroundColor: '#f3f4f6' }}>
                    <div className="absolute bottom-0 w-full" style={{ height: `${Math.min(d.usage, 80)}%`, backgroundColor: '#94a3b8' }} />
                    {d.usage > 80 && (
                      <div className="absolute w-full" style={{ bottom: '80%', height: `${d.usage - 80}%`, backgroundColor: '#ef4444' }} />
                    )}
                    <div className="absolute w-full border-b-2 border-dashed border-amber-400" style={{ bottom: '80%' }} />
                  </div>
                  <span className="text-[9px] text-gray-400">{d.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-300" /> Actual usage</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-400" /> Degraded</span>
              <span className="flex items-center gap-1.5"><span className="w-6 border-t-2 border-dashed border-amber-400" /> 80% threshold</span>
            </div>
          </motion.div>
        ) : (
          <motion.div key="storage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col items-center gap-4">
            <div className="flex items-end gap-3">
              {[
                { label: 'Raw', kept: false },
                { label: 'Logs', kept: false },
                { label: 'History', kept: false },
                { label: 'Current', kept: true },
                { label: 'Summary', kept: true },
              ].map((d) => (
                <div key={d.label} className="flex flex-col items-center gap-1.5">
                  <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center ${d.kept ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200 border-dashed'}`}>
                    {d.kept ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 10l3 3 5-5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/></svg>
                    )}
                  </div>
                  <span className={`text-[9px] font-medium ${d.kept ? 'text-blue-500' : 'text-red-400'}`}>{d.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-100 border border-blue-200" /> Kept</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-50 border border-red-200 border-dashed" /> Discarded</span>
            </div>
            <p className="text-[10px] text-gray-400 text-center">Storage was expensive, so teams only kept what was immediately needed.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const constraints = [
  {
    id: 1,
    title: 'On-Premise - Fixed Capacity',
    visual: <OnPremVisual />,
  },
  {
    id: 2,
    title: 'Vendor Challenges',
    visual: (
      <div className="max-w-md mx-auto space-y-3">
        {[
          { num: '01', title: 'Large Upfront Investments', desc: 'Multi-year contracts and seven-figure license fees before seeing any value.' },
          { num: '02', title: 'Challenging For Integrations', desc: 'Connecting tools from different vendors required custom middleware and constant maintenance.' },
          { num: '03', title: 'Proprietary And Untransferrable Logic', desc: 'Built in a language only that tool spoke. When the builder left, it became a black box.' },
        ].map((item) => (
          <motion.div
            key={item.num}
            whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.15 } }}
            className="flex items-start gap-4 px-5 py-4 bg-gray-50 rounded-xl border border-gray-100 cursor-default"
          >
            <span className="text-sm font-bold text-red-400 shrink-0 mt-0.5">{item.num}</span>
            <div>
              <p className="text-sm font-bold text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    id: 3,
    title: 'Centralized IT As A Gatekeeper',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          {/* Business users */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1.5">
              {[1,2,3,4,5].map((u) => (
                <div key={u} className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="2.5" stroke="#93c5fd" strokeWidth="1"/><path d="M1 11c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="#93c5fd" strokeWidth="1"/></svg>
                </div>
              ))}
            </div>
            <span className="text-[10px] text-gray-500">Business users with questions</span>
          </div>

          {/* Gate */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-8 bg-red-300" />
            <div className="px-3 py-1.5 bg-red-100 border border-red-200 rounded-lg">
              <span className="text-[10px] font-bold text-red-500">TICKET QUEUE</span>
            </div>
            <div className="text-[9px] text-red-400">2-6 weeks</div>
            <div className="w-px h-8 bg-red-300" />
          </div>

          {/* Specialized IT roles */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col gap-1.5">
              {['DBA', 'QA', 'Network', 'SysAdmin'].map((role) => (
                <div key={role} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="2.5" stroke="#64748b" strokeWidth="1"/><path d="M1 11c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="#64748b" strokeWidth="1"/></svg>
                  </div>
                  <span className="text-[9px] font-medium text-gray-500">{role}</span>
                </div>
              ))}
            </div>
            <span className="text-[10px] text-gray-400">Specialized roles</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'ETL - Operational Bottlenecks',
    visual: (
      <div className="space-y-6">
        {/* Pipeline diagram with E and T highlighted */}
        <div className="flex items-center justify-center gap-2">
          {[
            { label: 'Sources', color: '#6366f1', highlight: false },
            { label: 'Extract, Transform, Load', color: '#f97316', highlight: true },
            { label: 'Store', color: '#3b82f6', highlight: false },
            { label: 'Analyze', color: '#10b981', highlight: false },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div
                className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border-2"
                style={{
                  borderColor: s.color,
                  backgroundColor: s.highlight ? s.color : 'transparent',
                  color: s.highlight ? '#fff' : s.color,
                }}
              >
                {s.label}
              </div>
              {i < 3 && <svg width="16" height="8"><path d="M0 4h10M8 2l2 2-2 2" stroke="#d1d5db" strokeWidth="1" fill="none" /></svg>}
            </div>
          ))}
        </div>

        {/* Three concise points */}
        <div className="max-w-lg mx-auto space-y-3">
          {[
            { num: '01', title: 'You Lose What You Didn\'t Keep', desc: 'You decide up front what matters and discard the rest. When requirements change, that data is gone.' },
            { num: '02', title: 'The Transform Engine Is A Bottleneck', desc: 'Runs on a separate, fixed-size server that doesn\'t scale elastically. It becomes the choke point as data grows.' },
            { num: '03', title: 'Slow To Change And Locked In', desc: 'Logic lives in specialized tools with their own licensing and skills. A fix means re-extracting from source.' },
          ].map((item) => (
            <motion.div
              key={item.num}
              whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.15 } }}
              className="flex items-start gap-4 px-5 py-4 bg-gray-50 rounded-xl border border-gray-100 cursor-default"
            >
              <span className="text-sm font-bold text-red-400 shrink-0 mt-0.5">{item.num}</span>
              <div>
                <p className="text-sm font-bold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
]

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Tab03LegacyStack() {
  const [view, setView] = useState('architecture')
  const [activeConstraint, setActiveConstraint] = useState(0)

  return (
    <div className="py-8">
      {/* Header */}
      <div className="section-container mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-bold text-white bg-gray-900 px-3 py-1 rounded-full">03</span>
          <h2 className="text-2xl font-bold text-gray-900">The Legacy Stack</h2>
        </div>
        <p className="text-sm text-gray-500">
          Before the cloud existed, this is what a data stack looked like. Heavy, expensive, and reserved for organizations that could afford it.
        </p>
      </div>

      <div className="section-container space-y-8">

        {/* Era badge */}
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

        {/* Top-level toggle */}
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setView('architecture')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                view === 'architecture' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Architecture
            </button>
            <button
              onClick={() => setView('constraints')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                view === 'constraints' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Defining Constraints
            </button>
          </div>
        </div>

        {/* Constraints view */}
        {view === 'constraints' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex flex-wrap justify-center gap-1.5 mb-6">
              {constraints.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setActiveConstraint(i)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeConstraint === i
                      ? 'bg-red-500 text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeConstraint}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto bg-white rounded-2xl border-2 border-red-200 p-8 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-sm font-bold text-white bg-red-500 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                    {String(constraints[activeConstraint].id).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">{constraints[activeConstraint].title}</h3>
                </div>
                {constraints[activeConstraint].visual}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Architecture view */}
        {view === 'architecture' && (
        <>
        {/* Legacy stack visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.3)] border border-slate-700/50 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 21px)',
          }} />

          <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-0">
            {legacyStages.map((stage, si) => (
              <div key={stage.label} className="flex flex-col lg:flex-row items-center flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03, y: -3, transition: { duration: 0.15 } }}
                  transition={{ delay: si * 0.1 }}
                  className="flex-1 min-w-[140px] bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-slate-600 rounded-2xl p-4 shadow-[0_4px_24px_rgba(0,0,0,0.4)] cursor-default"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{stage.label}</span>
                  </div>
                  <div className="space-y-2">
                    {stage.tools.map((tool) => (
                      <motion.div
                        key={tool.name}
                        whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-700/60 border border-slate-600/50 cursor-default"
                      >
                        {tool.logo ? (
                          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0">
                            <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain p-0.5" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-slate-600 flex items-center justify-center shrink-0">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <rect x="1" y="1" width="12" height="12" rx="2" stroke="#94a3b8" strokeWidth="1.2" />
                              <rect x="3" y="3" width="3" height="3" rx="0.5" fill="#94a3b8" />
                              <rect x="8" y="3" width="3" height="3" rx="0.5" fill="#94a3b8" />
                              <rect x="3" y="8" width="3" height="3" rx="0.5" fill="#94a3b8" />
                              <rect x="8" y="8" width="3" height="3" rx="0.5" fill="#94a3b8" />
                            </svg>
                          </div>
                        )}
                        <span className="text-sm font-medium text-gray-300">{tool.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                {si < legacyStages.length - 1 && (
                  <div className="py-2 lg:py-0 lg:px-1 flex items-center justify-center shrink-0">
                    <div className="hidden lg:block">
                      <FlowArrow direction="right" color="#475569" length={48} thickness={2} delay={si * 0.4} />
                    </div>
                    <div className="lg:hidden">
                      <FlowArrow direction="down" color="#475569" length={32} thickness={2} delay={si * 0.4} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        </>
        )}

      </div>
    </div>
  )
}
