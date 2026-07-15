import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  Trend 1 — Consolidation of vendors                                 */
/* ------------------------------------------------------------------ */

function ConsolidationVisual({ era }) {
  const isPast = era === 'past'
  const [path, setPath] = useState('platform')
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Path toggle (Present only) */}
      {!isPast && (
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-gray-100 rounded-lg p-0.5">
            <button onClick={() => setPath('platform')} className={`px-4 py-1.5 rounded-md text-[10px] font-semibold transition-all duration-200 cursor-pointer ${path === 'platform' ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-400'}`}>Into the data platform</button>
            <button onClick={() => setPath('control')} className={`px-4 py-1.5 rounded-md text-[10px] font-semibold transition-all duration-200 cursor-pointer ${path === 'control' ? 'bg-indigo-500 text-white shadow-sm' : 'text-gray-400'}`}>Into a control plane</button>
          </div>
        </div>
      )}

      {/* Main pipeline */}
      <div className="flex items-center justify-center gap-2">
        {[
          { label: 'Ingestion', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v8M4 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
          { label: 'Data Platform', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><ellipse cx="7" cy="4" rx="5" ry="2" stroke="currentColor" strokeWidth="1.2"/><path d="M2 4v4c0 1.1 2.2 2 5 2s5-.9 5-2V4" stroke="currentColor" strokeWidth="1.2"/></svg> },
          { label: 'Transformations', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h4l2 3H4L2 4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><path d="M8 7h4l-2 3H6l2-3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg> },
          { label: 'BI', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="8" width="2.5" height="4" rx="0.5" stroke="currentColor" strokeWidth="1"/><rect x="5.75" y="5" width="2.5" height="7" rx="0.5" stroke="currentColor" strokeWidth="1"/><rect x="9.5" y="2" width="2.5" height="10" rx="0.5" stroke="currentColor" strokeWidth="1"/></svg> },
        ].map((item, i) => (
          <div key={item.label} className="flex items-center gap-2">
            <motion.div
              layout
              className="relative px-4 py-3 rounded-xl border-2 text-[10px] font-bold uppercase tracking-wider text-center"
              style={{
                borderColor: i === 1 ? '#3b82f6' : '#d1d5db',
                backgroundColor: i === 1 ? '#eff6ff' : '#f9fafb',
                color: i === 1 ? '#3b82f6' : '#6b7280',
                minWidth: isPast ? 90 : (i === 1 ? 160 : 90),
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-center gap-1.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {/* Absorbed tiles inside platform in Present */}
              <AnimatePresence>
                {!isPast && i === 1 && path === 'platform' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex gap-1.5 mt-2 justify-center"
                  >
                    {['Catalog', 'Observability', 'Orchestration'].map((t) => (
                      <motion.div
                        key={t}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="px-1.5 py-1 rounded bg-blue-100 border border-blue-200 text-[7px] font-semibold text-blue-600"
                      >
                        {t}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            {i < 3 && (
              <svg width="16" height="8"><path d="M0 4h10M8 2l2 2-2 2" stroke="#d1d5db" strokeWidth="1" fill="none" /></svg>
            )}
          </div>
        ))}
      </div>

      {/* Standalone tools row (Past only) */}
      <AnimatePresence>
        {isPast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-1">
              {[0,1,2].map((i) => (
                <svg key={i} width="8" height="16"><path d="M4 0v12M2 10l2 2 2-2" stroke="#d1d5db" strokeWidth="1" fill="none" /></svg>
              ))}
            </div>
            <div className="flex gap-3">
              {['Catalog', 'Observability', 'Orchestration'].map((t) => (
                <div key={t} className="px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 text-[9px] font-semibold text-gray-500">
                  {t}
                </div>
              ))}
            </div>
            <span className="text-[9px] text-gray-400">Separate vendors, separate contracts</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Present: control plane box when that path is selected */}
      <AnimatePresence>
        {!isPast && path === 'control' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="px-6 py-3 rounded-xl bg-indigo-50 border-2 border-dashed border-indigo-300 text-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mx-auto mb-1"><rect x="2" y="2" width="12" height="12" rx="2" stroke="#6366f1" strokeWidth="1.2"/><path d="M5 6h6M5 8h6M5 10h4" stroke="#6366f1" strokeWidth="0.8" strokeLinecap="round"/></svg>
              <p className="text-[10px] font-bold text-indigo-600 mb-1.5">Control Plane</p>
              <div className="flex gap-1.5 justify-center">
                {['Catalog', 'Observability', 'Orchestration'].map((t) => (
                  <span key={t} className="px-1.5 py-0.5 rounded bg-indigo-100 border border-indigo-200 text-[7px] font-semibold text-indigo-600">{t}</span>
                ))}
              </div>
            </div>
            <span className="text-[9px] text-indigo-500 font-semibold">Standalone tools merge into one unified product</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Trend 2 — Multi-cloud strategies                                   */
/* ------------------------------------------------------------------ */

function MultiCloudVisual({ era }) {
  const isPast = era === 'past'
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-6">
        {/* Company node */}
        <div className="px-4 py-3 rounded-xl bg-slate-100 border-2 border-slate-300 text-xs font-bold text-slate-700">
          Company
        </div>

        {/* Arrows */}
        <div className="flex flex-col gap-2">
          <svg width="30" height="8"><path d="M0 4h24M22 2l2 2-2 2" stroke="#6b7280" strokeWidth="1.5" fill="none" /></svg>
          <AnimatePresence>
            {!isPast && (
              <>
                <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} width="30" height="8"><path d="M0 4h24M22 2l2 2-2 2" stroke="#6b7280" strokeWidth="1.5" fill="none" /></motion.svg>
                <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.1 }} width="30" height="8"><path d="M0 4h24M22 2l2 2-2 2" stroke="#6b7280" strokeWidth="1.5" fill="none" /></motion.svg>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Platform boxes */}
        <div className="flex flex-col gap-2">
          <motion.div layout className="px-4 py-2 rounded-lg bg-blue-50 border-2 border-blue-300 text-[10px] font-bold text-blue-600">
            Snowflake
          </motion.div>
          <AnimatePresence>
            {!isPast && (
              <>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.4 }} className="px-4 py-2 rounded-lg bg-orange-50 border-2 border-orange-300 text-[10px] font-bold text-orange-600">
                  Databricks
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.4, delay: 0.1 }} className="px-4 py-2 rounded-lg bg-emerald-50 border-2 border-emerald-300 text-[10px] font-bold text-emerald-600">
                  BigQuery
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Driver chips */}
      <AnimatePresence>
        {!isPast && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.3 }} className="flex gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-[9px] text-amber-700 font-medium">Politics: new leaders bring preferred tools</div>
            <div className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-[9px] text-indigo-700 font-medium">Leverage: multiple platforms strengthen negotiation</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Trend 3 — Compute cost optimization                                */
/* ------------------------------------------------------------------ */

function CostVisual({ era }) {
  const isPast = era === 'past'
  const licenseH = isPast ? 75 : 25
  const computeH = isPast ? 25 : 85
  const licenseVal = isPast ? '$3M' : '$1M'
  const computeVal = isPast ? '$1M' : '$10M'

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-end gap-8 h-28">
        {/* Licenses bar */}
        <div className="flex flex-col items-center gap-1">
          <motion.div
            className="w-20 rounded-t-lg bg-slate-300 flex items-end justify-center pb-1"
            animate={{ height: licenseH }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-bold text-slate-600">{licenseVal}</span>
          </motion.div>
          <span className="text-[9px] font-semibold text-gray-500">Licenses</span>
        </div>
        {/* Compute bar */}
        <div className="flex flex-col items-center gap-1">
          <motion.div
            className="w-20 rounded-t-lg flex items-end justify-center pb-1"
            style={{ backgroundColor: isPast ? '#a5b4fc' : '#f97316' }}
            animate={{ height: computeH }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-bold text-white">{computeVal}</span>
          </motion.div>
          <span className="text-[9px] font-semibold text-gray-500">Compute</span>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={era} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[10px] text-gray-400 text-center max-w-xs">
          {isPast
            ? 'Licensing dominated spend. Compute was a rounding error.'
            : 'When compute became the biggest line item, optimizing it became the job.'}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Trend 4 — Metrics defined in the warehouse                         */
/* ------------------------------------------------------------------ */

function MetricsVisual({ era }) {
  const isPast = era === 'past'
  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatePresence mode="wait">
        {isPast ? (
          <motion.div key="past" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="flex flex-col items-center gap-3">
            {/* Data platform */}
            <div className="px-6 py-2.5 rounded-xl bg-gray-50 border-2 border-gray-200 text-center">
              <p className="text-[9px] font-bold text-gray-500">Data Platform</p>
            </div>
            {/* Arrows down to each BI tool */}
            <div className="flex gap-12">
              {[0,1,2].map((i) => (
                <svg key={i} width="8" height="16"><path d="M4 0v12M2 10l2 2 2-2" stroke="#d1d5db" strokeWidth="1" fill="none" /></svg>
              ))}
            </div>
            {/* Each BI tool defines its own metric */}
            <div className="flex gap-4">
              {[
                { tool: 'Looker', formula: 'SUM(amount)', val: '$2.41M' },
                { tool: 'Tableau', formula: 'SUM(revenue)', val: '$2.38M' },
                { tool: 'Power BI', formula: 'TOTAL(sales)', val: '$2.44M' },
              ].map((t) => (
                <div key={t.tool} className="px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-center">
                  <p className="text-[9px] font-bold text-gray-500 mb-1">{t.tool}</p>
                  <p className="text-[8px] font-mono text-gray-400 mb-1">{t.formula}</p>
                  <p className="text-xs font-mono font-bold text-gray-700">{t.val}</p>
                </div>
              ))}
            </div>
            <div className="px-3 py-1 rounded-full bg-red-50 border border-red-200">
              <span className="text-[9px] text-red-500 font-semibold">Each tool defines its own metric. Which number is right?</span>
            </div>
          </motion.div>
        ) : (
          <motion.div key="present" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="flex flex-col items-center gap-3">
            {/* Data platform with semantic layer inside */}
            <div className="px-6 py-3 rounded-xl bg-blue-50 border-2 border-blue-300 text-center">
              <p className="text-[8px] font-bold text-gray-400 mb-1">Data Platform</p>
              <div className="px-4 py-2 rounded-lg bg-white border border-blue-200">
                <p className="text-[9px] font-bold text-blue-500 mb-0.5">Semantic Layer</p>
                <p className="text-[8px] font-mono text-blue-400 mb-0.5">SUM(amount)</p>
                <p className="text-xs font-mono font-bold text-blue-700">Revenue = $2.41M</p>
              </div>
            </div>
            {/* Arrows out */}
            <div className="flex gap-12">
              {[0,1,2].map((i) => (
                <svg key={i} width="8" height="16"><path d="M4 0v12M2 10l2 2 2-2" stroke="#3b82f6" strokeWidth="1" fill="none" /></svg>
              ))}
            </div>
            {/* BI tools reading same number */}
            <div className="flex gap-4">
              {['Looker', 'Tableau', 'Power BI'].map((tool) => (
                <div key={tool} className="px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
                  <p className="text-[9px] font-bold text-gray-500">{tool}</p>
                  <p className="text-[10px] font-mono font-bold text-emerald-600">$2.41M</p>
                </div>
              ))}
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="text-[9px] text-emerald-600 font-semibold">One definition, every tool agrees</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Trend 5 — Open data infrastructure                                 */
/* ------------------------------------------------------------------ */

function OpenInfraVisual({ era }) {
  const isPast = era === 'past'
  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatePresence mode="wait">
        {isPast ? (
          <motion.div key="past" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="flex flex-col items-center gap-5">
            <div className="flex items-center gap-6">
              {/* Platform A */}
              <div className="w-36 rounded-2xl bg-slate-800 border border-slate-700 p-4 text-center shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto mb-2">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="#94a3b8" strokeWidth="1.5" />
                  <path d="M3 9h18M9 9v12" stroke="#94a3b8" strokeWidth="1" />
                </svg>
                <p className="text-xs font-bold text-white">Platform A</p>
                <p className="text-[9px] text-slate-400 mt-1">Proprietary format</p>
                <div className="mt-2 flex gap-1 justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-600" />
                  <div className="w-2 h-2 rounded-full bg-slate-600" />
                  <div className="w-2 h-2 rounded-full bg-slate-600" />
                </div>
              </div>

              {/* Migration arrow */}
              <div className="flex flex-col items-center gap-1">
                <svg width="60" height="16">
                  <path d="M4 8h44M44 4l5 4-5 4" stroke="#ef4444" strokeWidth="2" fill="none" strokeDasharray="5 3" />
                </svg>
                <div className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-200">
                  <span className="text-[8px] font-bold text-red-500">PAINFUL MIGRATION</span>
                </div>
                <span className="text-[7px] text-red-300">Copy everything, hope nothing breaks</span>
              </div>

              {/* Platform B */}
              <div className="w-36 rounded-2xl bg-slate-800 border border-slate-700 p-4 text-center shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto mb-2">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="#94a3b8" strokeWidth="1.5" />
                  <path d="M3 9h18M9 9v12" stroke="#94a3b8" strokeWidth="1" />
                </svg>
                <p className="text-xs font-bold text-white">Platform B</p>
                <p className="text-[9px] text-slate-400 mt-1">Proprietary format</p>
                <div className="mt-2 flex gap-1 justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-600" />
                  <div className="w-2 h-2 rounded-full bg-slate-600" />
                  <div className="w-2 h-2 rounded-full bg-slate-600" />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="present" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="flex flex-col items-center gap-4">
            {/* Engines */}
            <div className="flex gap-4">
              {[
                { name: 'Snowflake', color: '#3b82f6' },
                { name: 'Databricks', color: '#f97316' },
                { name: 'Spark', color: '#10b981' },
              ].map((e) => (
                <div key={e.name} className="px-4 py-2.5 rounded-xl bg-white border-2 shadow-sm text-center" style={{ borderColor: `${e.color}60` }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mx-auto mb-1">
                    <ellipse cx="8" cy="5" rx="6" ry="2.5" stroke={e.color} strokeWidth="1.2" />
                    <path d={`M2 5v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V5`} stroke={e.color} strokeWidth="1.2" />
                  </svg>
                  <p className="text-[10px] font-bold" style={{ color: e.color }}>{e.name}</p>
                </div>
              ))}
            </div>

            {/* Bi-directional arrows */}
            <div className="flex gap-6">
              {[0,1,2].map((i) => (
                <svg key={i} width="12" height="20" viewBox="0 0 12 20">
                  <path d="M6 2v16" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M3 5l3-3 3 3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M3 15l3 3 3-3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              ))}
            </div>

            {/* Open table format */}
            <div className="w-full max-w-sm px-6 py-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto mb-2">
                <rect x="2" y="4" width="20" height="16" rx="3" stroke="#10b981" strokeWidth="1.5" />
                <path d="M2 10h20M8 10v10M15 10v10" stroke="#10b981" strokeWidth="1" />
              </svg>
              <p className="text-sm font-bold text-emerald-700">Open table format</p>
              <p className="text-[10px] text-emerald-500 mt-0.5">e.g. Apache Iceberg, Delta Lake</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Trend data                                                         */
/* ------------------------------------------------------------------ */

const trends = [
  { id: 1, title: 'Consolidation of vendors', oneliner: 'Standalone tools are being absorbed into the platform.', Visual: ConsolidationVisual },
  { id: 2, title: 'Multi-cloud strategies', oneliner: 'Companies now run on more than one platform on purpose.', Visual: MultiCloudVisual },
  { id: 3, title: 'Compute cost optimization', oneliner: 'Spend flipped from licensing to consumption.', Visual: CostVisual },
  { id: 4, title: 'Metrics in the warehouse', oneliner: 'One definition, read by every tool.', Visual: MetricsVisual },
  { id: 5, title: 'Open data infrastructure', oneliner: 'Open table formats end the migration tax.', Visual: OpenInfraVisual },
]

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Tab05Trends() {
  const [activeTrend, setActiveTrend] = useState(0)
  const [era, setEra] = useState('past')

  return (
    <div className="py-8">
      <div className="section-container mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-bold text-white bg-gray-900 px-3 py-1 rounded-full">05</span>
          <h2 className="text-2xl font-bold text-gray-900">Trends</h2>
        </div>
        <p className="text-sm text-gray-500">
          Where the stack is heading right now.
        </p>
      </div>

      <div className="section-container space-y-6">
        {/* Sub-tabs */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {trends.map((t, i) => (
            <button
              key={t.id}
              onClick={() => { setActiveTrend(i); setEra('past') }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTrend === i
                  ? 'bg-purple-500 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* Trend panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrend}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl border-2 border-purple-200 p-8 shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-1">
              <span className="text-sm font-bold text-white bg-purple-500 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                {String(trends[activeTrend].id).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-bold text-gray-900">{trends[activeTrend].title}</h3>
            </div>
            <p className="text-sm text-gray-400 mb-6 ml-11">{trends[activeTrend].oneliner}</p>

            {/* Past / Present toggle */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setEra('past')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    era === 'past' ? 'bg-gray-500 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Past
                </button>
                <button
                  onClick={() => setEra('present')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    era === 'present' ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Present
                </button>
              </div>
            </div>

            {/* Visual */}
            {(() => {
              const Visual = trends[activeTrend].Visual
              return <Visual era={era} />
            })()}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  )
}
