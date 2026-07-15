import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  AI Impact simulations                                              */
/* ------------------------------------------------------------------ */

const impactDemos = [
  {
    key: 'development',
    title: 'Development',
    subtitle: 'Build a data model from a plain-English request',
    prompt: '"Create a model that shows monthly revenue by region"',
    steps: [
      { type: 'thinking', text: 'Understanding your request...' },
      { type: 'context', text: 'Reading your project structure and existing models...' },
      { type: 'info', text: 'Found source table: raw.orders (columns: order_id, region, amount, order_date)' },
      { type: 'output', text: 'SELECT\n  region,\n  DATE_TRUNC(\'month\', order_date) AS month,\n  SUM(amount) AS total_revenue\nFROM {{ ref(\'stg_orders\') }}\nGROUP BY region, month\nORDER BY month DESC, total_revenue DESC' },
      { type: 'info', text: 'Saved as: models/marts/revenue_by_region.sql' },
      { type: 'success', text: 'Model created, documented, and ready to run. No SQL expertise required.' },
    ],
  },
  {
    key: 'deployment',
    title: 'Deployment',
    subtitle: 'Diagnose and fix a failing pipeline',
    prompt: '"My nightly pipeline failed. What happened?"',
    steps: [
      { type: 'thinking', text: 'Checking recent job runs...' },
      { type: 'issue', text: 'Job #4821 failed at 2:14 AM. Model fct_revenue errored.' },
      { type: 'context', text: 'Analyzing error log: "Column customer_id not found in source"' },
      { type: 'info', text: 'Root cause: upstream source renamed customer_id to cust_id at 11 PM.' },
      { type: 'output', text: '-- Fix: update the column reference\n-- In models/staging/stg_customers.sql\n-- Change: customer_id → cust_id' },
      { type: 'success', text: 'Fix applied. Pipeline re-run passed. Downstream models healthy.' },
    ],
  },
  {
    key: 'consumption',
    title: 'Consumption',
    subtitle: 'Ask your data a question in plain English',
    prompt: '"What were our top 3 regions by revenue last quarter?"',
    steps: [
      { type: 'thinking', text: 'Understanding your question...' },
      { type: 'context', text: 'Querying the semantic layer for "revenue" metric...' },
      { type: 'info', text: 'Using metric: total_revenue, filtered to Q1 2024, grouped by region' },
      { type: 'output', text: '  Region          Revenue\n  ─────────────   ─────────\n  North America   $4.2M\n  Europe          $2.8M\n  Asia Pacific    $1.9M' },
      { type: 'info', text: 'North America grew 24% vs prior quarter. Europe flat. APAC up 12%.' },
      { type: 'success', text: 'Answer delivered in seconds. No SQL written. No ticket filed.' },
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
    title: 'Use Agentic Skills',
    desc: 'Skills teach AI how to work with your context. Pre-built prompts and reusable skill definitions turn general-purpose models into domain-specific collaborators.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 8l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    visual: 'skills',
  },
  {
    id: 3,
    title: 'Automate Validation Of Standards',
    desc: 'Add AI-powered checks to your CI pipeline so bad code never reaches production. When someone submits a change, automated checks validate it against your standards before any human reviews it.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V6l7-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    visual: 'ci',
  },
  {
    id: 4,
    title: 'Monitor Token & Warehouse Usage',
    desc: 'AI costs scale with usage. A few habits keep them under control without sacrificing quality.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 17V9h3.5v8H3zM8.25 17V5h3.5v12h-3.5zM13.5 17V2H17v15h-3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    visual: 'tokens',
  },
]

/* ------------------------------------------------------------------ */
/*  Skills simulation                                                  */
/* ------------------------------------------------------------------ */

function SkillsSimulation() {
  const [mode, setMode] = useState('without')
  const [running, setRunning] = useState(false)
  const [step, setStep] = useState(0)

  const withoutSteps = [
    { type: 'thinking', text: 'Thinking...' },
    { type: 'output', text: 'models:\n  - name: stg_orders\n    columns:\n      - name: ship_mode\n        tests:\n          - accepted_values:\n              values: [\'First Class\']' },
    { type: 'issue', text: 'Only one value. Missing Standard Class, Second Class, Same Day. No description or config.' },
  ]

  const withSteps = [
    { type: 'skill', text: 'Loading skill: dbt-add-unit-test' },
    { type: 'context', text: 'Reading schema, pulling distinct values from warehouse...' },
    { type: 'output', text: 'models:\n  - name: stg_orders\n    columns:\n      - name: ship_mode\n        description: "Shipping method"\n        tests:\n          - accepted_values:\n              values:\n                - First Class\n                - Second Class\n                - Standard Class\n                - Same Day' },
    { type: 'success', text: 'All 4 values included. Description added. Follows project conventions.' },
  ]

  const steps = mode === 'without' ? withoutSteps : withSteps

  const runSim = () => {
    setStep(0)
    setRunning(true)
    let i = 0
    const interval = setInterval(() => {
      i++
      if (i >= steps.length) {
        clearInterval(interval)
        setRunning(false)
      }
      setStep(i)
    }, 900)
  }

  return (
    <div className="mt-5 space-y-4">
      {/* Toggle + Run */}
      <div className="flex items-center justify-between">
        <div className="inline-flex bg-gray-100 rounded-lg p-0.5">
          <button onClick={() => { setMode('without'); setStep(0) }} className={`px-3 py-1.5 rounded-md text-[10px] font-semibold transition-all duration-200 cursor-pointer ${mode === 'without' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400'}`}>Without skills</button>
          <button onClick={() => { setMode('with'); setStep(0) }} className={`px-3 py-1.5 rounded-md text-[10px] font-semibold transition-all duration-200 cursor-pointer ${mode === 'with' ? 'bg-indigo-500 text-white shadow-sm' : 'text-gray-400'}`}>With skills</button>
        </div>
        <button
          onClick={runSim}
          disabled={running}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${running ? 'bg-gray-200 text-gray-400' : 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm'}`}
        >
          {running ? 'Running...' : 'Run simulation'}
        </button>
      </div>

      {/* Prompt */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Prompt</p>
        <p className="text-sm font-mono text-gray-700">"Write an accepted_values test for ship_mode."</p>
      </div>

      {/* Output area */}
      <div className="bg-slate-900 rounded-xl p-4 min-h-[140px]">
        {step === 0 && !running && (
          <p className="text-xs text-slate-500 text-center pt-8">Press "Run simulation" to compare</p>
        )}
        <AnimatePresence>
          {steps.slice(0, step).map((s, i) => (
            <motion.div
              key={`${mode}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-3"
            >
              {s.type === 'thinking' && (
                <div className="flex items-center gap-2">
                  <motion.div className="w-2 h-2 rounded-full bg-amber-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                  <span className="text-xs text-amber-300 font-mono">{s.text}</span>
                </div>
              )}
              {s.type === 'skill' && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span className="text-xs text-indigo-300 font-mono">{s.text}</span>
                </div>
              )}
              {s.type === 'context' && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-xs text-blue-300 font-mono">{s.text}</span>
                </div>
              )}
              {s.type === 'output' && (
                <pre className="text-[10px] font-mono text-slate-300 bg-slate-800 rounded-lg p-3 whitespace-pre-wrap leading-relaxed">{s.text}</pre>
              )}
              {s.type === 'issue' && (
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
                  <span className="text-red-400 text-xs mt-0.5">&#x2717;</span>
                  <span className="text-xs text-red-300">{s.text}</span>
                </div>
              )}
              {s.type === 'success' && (
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-emerald-400 text-xs mt-0.5">&#x2713;</span>
                  <span className="text-xs text-emerald-300">{s.text}</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  CI simulation                                                      */
/* ------------------------------------------------------------------ */

function CISimulation() {
  const [running, setRunning] = useState(false)
  const [step, setStep] = useState(0)

  const steps = [
    { type: 'info', text: 'Developer submits PR: "Add revenue model"' },
    { type: 'context', text: 'CI pipeline triggered. Running automated checks...' },
    { type: 'check', pass: true, text: 'SQL compiles successfully' },
    { type: 'check', pass: true, text: 'Model has a description' },
    { type: 'check', pass: false, text: 'Column "rev" does not follow naming convention (expected: "revenue")' },
    { type: 'check', pass: false, text: 'No test defined for primary key' },
    { type: 'issue', text: 'PR blocked: 2 violations found. Fix before merging.' },
  ]

  const runSim = () => {
    setStep(0)
    setRunning(true)
    let i = 0
    const interval = setInterval(() => {
      i++
      if (i >= steps.length) { clearInterval(interval); setRunning(false) }
      setStep(i)
    }, 700)
  }

  return (
    <div className="mt-5 space-y-4">
      <div className="flex justify-end">
        <button onClick={runSim} disabled={running} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${running ? 'bg-gray-200 text-gray-400' : 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm'}`}>
          {running ? 'Running...' : 'Run CI check'}
        </button>
      </div>
      <div className="bg-slate-900 rounded-xl p-5 min-h-[140px]">
        {step === 0 && !running && (
          <p className="text-xs text-slate-500 text-center pt-8">Press "Run CI check" to simulate a code review</p>
        )}
        <AnimatePresence>
          {steps.slice(0, step).map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-2.5">
              {s.type === 'info' && (
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-400" /><span className="text-xs text-slate-300">{s.text}</span></div>
              )}
              {s.type === 'context' && (
                <div className="flex items-center gap-2"><motion.div className="w-2 h-2 rounded-full bg-amber-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} /><span className="text-xs text-amber-300 font-mono">{s.text}</span></div>
              )}
              {s.type === 'check' && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: s.pass ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)' }}>
                  <span className={`text-xs ${s.pass ? 'text-emerald-400' : 'text-red-400'}`}>{s.pass ? '\u2713' : '\u2717'}</span>
                  <span className={`text-xs ${s.pass ? 'text-emerald-300' : 'text-red-300'}`}>{s.text}</span>
                </div>
              )}
              {s.type === 'issue' && (
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 mt-1">
                  <span className="text-red-400 text-xs mt-0.5">&#x26D4;</span>
                  <span className="text-xs text-red-300 font-semibold">{s.text}</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Token tips visual                                                  */
/* ------------------------------------------------------------------ */

function TokenTips() {
  return (
    <div className="mt-5 space-y-3">
      {[
        { num: '01', title: 'Point AI At Cheap Compute For Development', desc: 'Use smaller datasets and dev warehouses for iterating. Save production-size runs for final validation.', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><ellipse cx="8" cy="5" rx="6" ry="2.5" stroke="#6366f1" strokeWidth="1.2"/><path d="M2 5v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V5" stroke="#6366f1" strokeWidth="1.2"/></svg> },
        { num: '02', title: 'Query Metadata Instead Of Running SELECT *', desc: 'AI can read column names, types, and descriptions from the catalog without scanning a single row of actual data.', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="#6366f1" strokeWidth="1.2"/><path d="M5 6h6M5 8h6M5 10h4" stroke="#6366f1" strokeWidth="0.8" strokeLinecap="round"/></svg> },
        { num: '03', title: 'Set Token Limits And Monitor Behavior', desc: 'Create guardrails so token usage does not spike above tolerable levels. Regularly review what developers are spending tokens on and redirect wasteful patterns.', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v4l3 2" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="8" r="6" stroke="#6366f1" strokeWidth="1.2"/></svg> },
      ].map((tip) => (
        <motion.div
          key={tip.num}
          whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.15 } }}
          className="flex items-start gap-4 px-5 py-4 bg-gray-50 rounded-xl border border-gray-100 cursor-default"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
            {tip.icon}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{tip.title}</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{tip.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Impact demo runner                                                 */
/* ------------------------------------------------------------------ */

function DemoRunner({ demo }) {
  const [running, setRunning] = useState(false)
  const [step, setStep] = useState(0)

  const runSim = () => {
    setStep(0)
    setRunning(true)
    let i = 0
    const interval = setInterval(() => {
      i++
      if (i >= demo.steps.length) {
        clearInterval(interval)
        setRunning(false)
      }
      setStep(i)
    }, 800)
  }

  return (
    <motion.div
      key={demo.key}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-gray-200/60 rounded-2xl p-6 md:p-8 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-0.5">{demo.title}</h3>
          <p className="text-sm text-gray-400">{demo.subtitle}</p>
        </div>
        <button
          onClick={runSim}
          disabled={running}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 ${running ? 'bg-gray-200 text-gray-400' : 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm'}`}
        >
          {running ? 'Running...' : 'Run simulation'}
        </button>
      </div>

      {/* Prompt */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-4">
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Prompt</p>
        <p className="text-sm font-mono text-gray-700">{demo.prompt}</p>
      </div>

      {/* Output */}
      <div className="bg-slate-900 rounded-xl p-5 min-h-[160px]">
        {step === 0 && !running && (
          <p className="text-xs text-slate-500 text-center pt-12">Press "Run simulation" to see AI in action</p>
        )}
        <AnimatePresence>
          {demo.steps.slice(0, step).map((s, i) => (
            <motion.div
              key={`${demo.key}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-3"
            >
              {s.type === 'thinking' && (
                <div className="flex items-center gap-2">
                  <motion.div className="w-2 h-2 rounded-full bg-amber-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                  <span className="text-xs text-amber-300 font-mono">{s.text}</span>
                </div>
              )}
              {s.type === 'context' && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-xs text-blue-300 font-mono">{s.text}</span>
                </div>
              )}
              {s.type === 'info' && (
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-400 mt-1 shrink-0" />
                  <span className="text-xs text-slate-300">{s.text}</span>
                </div>
              )}
              {s.type === 'output' && (
                <pre className="text-[11px] font-mono text-emerald-300 bg-slate-800 rounded-lg p-3 whitespace-pre-wrap leading-relaxed">{s.text}</pre>
              )}
              {s.type === 'issue' && (
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
                  <span className="text-red-400 text-xs mt-0.5">&#x2717;</span>
                  <span className="text-xs text-red-300">{s.text}</span>
                </div>
              )}
              {s.type === 'success' && (
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-emerald-400 text-xs mt-0.5">&#x2713;</span>
                  <span className="text-xs text-emerald-300">{s.text}</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Tab06AI() {
  const [view, setView] = useState('impact')
  const [activeDemo, setActiveDemo] = useState(0)
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
            <div className="flex items-center justify-center gap-0">
              {impactDemos.map((d, i) => (
                <div key={d.key} className="flex items-center">
                  <button
                    onClick={() => setActiveDemo(i)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border-2 transition-all duration-300 cursor-pointer ${
                      activeDemo === i
                        ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                        : 'bg-transparent border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {d.title}
                  </button>
                  {i < impactDemos.length - 1 && <div className="mx-2 w-6 h-px bg-gray-300" />}
                </div>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <DemoRunner key={impactDemos[activeDemo].key} demo={impactDemos[activeDemo]} />
            </AnimatePresence>
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
                {bestPractices[activePractice].visual === 'skills' && <SkillsSimulation />}
                {bestPractices[activePractice].visual === 'ci' && <CISimulation />}
                {bestPractices[activePractice].visual === 'tokens' && <TokenTips />}
                {bestPractices[activePractice].visual && typeof bestPractices[activePractice].visual !== 'string' && bestPractices[activePractice].visual}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  )
}
