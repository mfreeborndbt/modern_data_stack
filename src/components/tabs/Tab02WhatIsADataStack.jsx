import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FlowArrow from '../FlowArrow'

/* ------------------------------------------------------------------ */
/*  Source logos                                                        */
/* ------------------------------------------------------------------ */

const BASE = import.meta.env.BASE_URL

const dataSources = [
  {
    name: 'Salesforce', logo: `${BASE}logos/salesforce.png`, bg: '#ffffff',
    tables: [
      { name: 'accounts', cols: ['id', 'name', 'industry', 'annual_revenue', 'created_date'] },
      { name: 'opportunities', cols: ['id', 'account_id', 'stage', 'amount', 'close_date'] },
      { name: 'contacts', cols: ['id', 'account_id', 'email', 'title', 'last_activity'] },
    ],
  },
  {
    name: 'Stripe', logo: `${BASE}logos/stripe.png`, bg: '#635BFF',
    tables: [
      { name: 'charges', cols: ['id', 'customer_id', 'amount', 'currency', 'status'] },
      { name: 'subscriptions', cols: ['id', 'customer_id', 'plan_id', 'status', 'current_period_end'] },
      { name: 'invoices', cols: ['id', 'customer_id', 'total', 'paid', 'due_date'] },
    ],
  },
  {
    name: 'HubSpot', logo: `${BASE}logos/hubspot.jpg`, bg: '#FF7A59',
    tables: [
      { name: 'contacts', cols: ['id', 'email', 'lifecycle_stage', 'lead_source', 'created_at'] },
      { name: 'deals', cols: ['id', 'contact_id', 'deal_stage', 'amount', 'close_date'] },
      { name: 'email_events', cols: ['id', 'contact_id', 'type', 'subject', 'timestamp'] },
    ],
  },
  {
    name: 'Zendesk', logo: `${BASE}logos/zendesk.png`, bg: '#ffffff',
    tables: [
      { name: 'tickets', cols: ['id', 'requester_id', 'subject', 'priority', 'status'] },
      { name: 'users', cols: ['id', 'name', 'email', 'role', 'created_at'] },
      { name: 'satisfaction_ratings', cols: ['id', 'ticket_id', 'score', 'comment', 'created_at'] },
    ],
  },
  {
    name: 'Google Ads', logo: `${BASE}logos/google-ads.png`, bg: '#ffffff',
    tables: [
      { name: 'campaigns', cols: ['id', 'name', 'status', 'budget', 'start_date'] },
      { name: 'ad_groups', cols: ['id', 'campaign_id', 'name', 'cpc_bid', 'status'] },
      { name: 'ad_performance', cols: ['date', 'ad_group_id', 'impressions', 'clicks', 'cost'] },
    ],
  },
  {
    name: 'App Database', icon: 'DB', bg: '#334155',
    tables: [
      { name: 'users', cols: ['id', 'email', 'plan', 'signed_up_at', 'last_login'] },
      { name: 'orders', cols: ['id', 'user_id', 'total', 'status', 'created_at'] },
      { name: 'events', cols: ['id', 'user_id', 'event_type', 'properties', 'timestamp'] },
    ],
  },
]



/* ------------------------------------------------------------------ */
/*  Pipeline bar                                                       */
/* ------------------------------------------------------------------ */

const pipelineStages = [
  { key: 'sources', label: 'Sources', color: '#6366f1' },
  { key: 'storage', label: 'Storage', color: '#3b82f6' },
  { key: 'transformation', label: 'Transformation', color: '#f97316' },
  { key: 'analyze', label: 'Analyze', color: '#10b981' },
]

function PipelineBar({ activeStage, onSelect }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {pipelineStages.map((s, i) => (
        <div key={s.key} className="flex items-center">
          <motion.button
            onClick={() => onSelect(i)}
            className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border-2 transition-all duration-500 cursor-pointer"
            animate={{
              backgroundColor: activeStage >= i ? s.color : 'transparent',
              borderColor: s.color,
              color: activeStage >= i ? '#fff' : s.color,
              scale: activeStage === i ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            {s.label}
          </motion.button>
          {i < pipelineStages.length - 1 && (
            <div className="mx-1 relative">
              <FlowArrow
                direction="right"
                color={activeStage > i ? pipelineStages[i + 1].color : '#d1d5db'}
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
/*  Transformation stage — 3-tab view                                  */
/* ------------------------------------------------------------------ */

const rawData = [
  { col: 'amount', values: ['$1,234.56', '$987.00', 'NULL', '$2,100.50'] },
  { col: 'date', values: ['01/15/2024', '2024-01-16', 'Jan 17, 2024', '01-18-2024'] },
  { col: 'customer', values: ['Acme Corp', 'acme corp', 'ACME CORP', 'Acme Corp.'] },
  { col: 'status', values: ['completed', 'COMPLETED', 'Complete', null] },
]

const transformSteps = [
  { before: '$1,234.56', after: '1234.56', label: 'Strip formatting' },
  { before: 'NULL', after: '0.00', label: 'Fill missing values' },
  { before: 'acme corp', after: 'Acme Corp', label: 'Normalize casing' },
  { before: '01/15/2024', after: '2024-01-15', label: 'Standardize dates' },
]

const cleanData = [
  { col: 'amount', values: ['1234.56', '987.00', '0.00', '2100.50'] },
  { col: 'order_date', values: ['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18'] },
  { col: 'customer_name', values: ['Acme Corp', 'Acme Corp', 'Acme Corp', 'Acme Corp'] },
  { col: 'status', values: ['completed', 'completed', 'completed', 'unknown'] },
  { col: 'revenue', values: ['1234.56', '987.00', '0.00', '2100.50'] },
]

function TransformationStage() {
  const [tab, setTab] = useState('raw')
  const tabs = [
    { key: 'raw', label: 'Raw data' },
    { key: 'transforms', label: 'Transformations' },
    { key: 'clean', label: 'Clean data' },
  ]

  return (
    <motion.div
      key="transformation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      {/* Sub-tabs */}
      <div className="flex justify-center gap-1 mb-6">
        {tabs.map((t, i) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              tab === t.key
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center text-[8px] font-bold" style={{
              borderColor: tab === t.key ? 'rgba(255,255,255,0.5)' : '#d1d5db',
              color: tab === t.key ? 'white' : '#9ca3af',
            }}>
              {i + 1}
            </span>
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Raw data tab */}
        {tab === 'raw' && (
          <motion.div
            key="raw"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-4">
              <p className="text-base font-semibold text-gray-700">This is what raw data looks like</p>
              <p className="text-sm text-gray-400">Inconsistent formats, missing values, duplicate records.</p>
            </div>
            <div className="max-w-2xl mx-auto bg-white rounded-xl border border-red-200 shadow-sm overflow-hidden">
              <div className="px-4 py-2 bg-red-50 border-b border-red-100 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-xs font-bold text-red-600">raw_orders</span>
                <span className="text-[10px] text-red-300 ml-auto">Messy, untrusted</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      {rawData.map(c => (
                        <th key={c.col} className="px-4 py-2 text-left font-mono font-semibold text-gray-500">{c.col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[0, 1, 2, 3].map(row => (
                      <tr key={row} className="border-b border-gray-50">
                        {rawData.map(c => {
                          const val = c.values[row]
                          const isNull = val === null || val === 'NULL'
                          return (
                            <td key={c.col} className={`px-4 py-2 font-mono ${isNull ? 'text-red-400 italic' : 'text-gray-600'}`}>
                              {val || 'NULL'}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Transformations tab */}
        {tab === 'transforms' && (
          <motion.div
            key="transforms"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-4">
              <p className="text-base font-semibold text-gray-700">What transformation does</p>
              <p className="text-sm text-gray-400">Clean, standardize, deduplicate, and apply business logic.</p>
            </div>
            <div className="max-w-lg mx-auto space-y-3">
              {transformSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.03, y: -2, transition: { duration: 0.15 } }}
                  transition={{ delay: i * 0.12, duration: 0.4 }}
                  className="flex items-center gap-3 bg-white rounded-xl border border-gray-200/80 p-3 shadow-sm cursor-default"
                >
                  <div className="w-24 shrink-0">
                    <div className="text-xs font-mono bg-red-50 text-red-600 px-2 py-1 rounded border border-red-100 text-center truncate">
                      {step.before}
                    </div>
                  </div>
                  <div className="shrink-0">
                    <FlowArrow direction="right" color="#f97316" length={32} thickness={2} delay={i * 0.2} />
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

        {/* Clean data tab */}
        {tab === 'clean' && (
          <motion.div
            key="clean"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-4">
              <p className="text-base font-semibold text-gray-700">Now it is ready to use</p>
              <p className="text-sm text-gray-400">Consistent, complete, documented, and tested.</p>
            </div>
            <div className="max-w-2xl mx-auto bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden">
              <div className="px-4 py-2 bg-green-50 border-b border-green-100 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-xs font-bold text-green-600">fct_orders</span>
                <span className="text-[10px] text-green-300 ml-auto">Clean, trusted</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      {cleanData.map(c => (
                        <th key={c.col} className="px-4 py-2 text-left font-mono font-semibold text-gray-500">{c.col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[0, 1, 2, 3].map(row => (
                      <tr key={row} className="border-b border-gray-50">
                        {cleanData.map(c => (
                          <td key={c.col} className="px-4 py-2 font-mono text-gray-600">{c.values[row]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Analyze stage — 3-tab view                                         */
/* ------------------------------------------------------------------ */

function AnalyzeStage() {
  const [tab, setTab] = useState('dashboard')
  const tabs = [
    { key: 'dashboard', label: 'Dashboards' },
    { key: 'report', label: 'Reporting' },
    { key: 'data-science', label: 'Data Science' },
  ]

  return (
    <motion.div
      key="analyze"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      {/* Sub-tabs */}
      <div className="flex justify-center gap-1 mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              tab === t.key
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Dashboard tab */}
        {tab === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-gray-50/80">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-xs font-semibold text-gray-500 ml-2">Monthly revenue dashboard</span>
              <span className="ml-auto text-[10px] text-gray-400">Last updated: just now</span>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Total revenue', value: '$2.4M', change: '+12.3%', up: true },
                  { label: 'Active customers', value: '8,429', change: '+4.1%', up: true },
                  { label: 'Avg. order value', value: '$284', change: '-1.7%', up: false },
                ].map((kpi, i) => (
                  <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">{kpi.label}</p>
                    <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
                    <span className={`text-xs font-semibold ${kpi.up ? 'text-emerald-500' : 'text-red-400'}`}>{kpi.change}</span>
                  </motion.div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Revenue by month</p>
                  <svg viewBox="0 0 280 100" className="w-full" preserveAspectRatio="xMidYEnd meet">
                    {[42,55,48,62,58,70,65,72,80,68,78,88].map((h, i) => {
                      const months = ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun']
                      return (
                        <g key={i}>
                          <motion.rect x={6+i*23} width={16} rx={3} fill={i===11?'#10b981':'#a5b4fc'} initial={{y:85,height:0}} animate={{y:85-h,height:h}} transition={{delay:0.3+i*0.04,duration:0.5,ease:[0.16,1,0.3,1]}} />
                          <text x={14+i*23} y={97} textAnchor="middle" fontSize="6" fill="#9ca3af" fontWeight="500">{months[i]}</text>
                        </g>
                      )
                    })}
                  </svg>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">By region</p>
                  <div className="space-y-2.5">
                    {[{r:'North America',p:42,c:'#6366f1'},{r:'Europe',p:28,c:'#3b82f6'},{r:'Asia Pacific',p:19,c:'#f97316'},{r:'Other',p:11,c:'#10b981'}].map((row,i) => (
                      <div key={row.r}>
                        <div className="flex justify-between mb-1">
                          <span className="text-[10px] font-medium text-gray-600">{row.r}</span>
                          <span className="text-[10px] font-bold text-gray-500">{row.p}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div className="h-full rounded-full" style={{backgroundColor:row.c}} initial={{width:0}} animate={{width:`${row.p}%`}} transition={{delay:0.5+i*0.1,duration:0.8,ease:[0.16,1,0.3,1]}} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Report tab */}
        {tab === 'report' && (
          <motion.div
            key="report"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-gray-50/80">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-xs font-semibold text-gray-500 ml-2">Q2 2024 revenue report</span>
              <span className="ml-auto text-[10px] text-gray-400">Generated: Jul 1, 2024</span>
            </div>
            <div className="p-5 space-y-5">
              {/* Executive summary */}
              <div>
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Executive summary</p>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2">
                  <div className="flex gap-3">
                    <div className="w-1 rounded-full bg-emerald-400 shrink-0" />
                    <p className="text-xs text-gray-600">Q2 revenue reached <span className="font-bold">$7.2M</span>, up 18% YoY. Growth driven primarily by North America (+24%) and enterprise segment (+31%).</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 rounded-full bg-blue-400 shrink-0" />
                    <p className="text-xs text-gray-600">Customer count grew to <span className="font-bold">8,429</span> active accounts. Net revenue retention at <span className="font-bold">112%</span>.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 rounded-full bg-amber-400 shrink-0" />
                    <p className="text-xs text-gray-600">Average order value declined 1.7% to <span className="font-bold">$284</span>, offset by higher order volume.</p>
                  </div>
                </div>
              </div>
              {/* Detail table */}
              <div>
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Revenue by segment</p>
                <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-100/50">
                        <th className="px-4 py-2.5 text-left font-semibold text-gray-500">Segment</th>
                        <th className="px-4 py-2.5 text-right font-semibold text-gray-500">Q2 revenue</th>
                        <th className="px-4 py-2.5 text-right font-semibold text-gray-500">YoY</th>
                        <th className="px-4 py-2.5 text-right font-semibold text-gray-500">% of total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { seg: 'Enterprise', rev: '$3.8M', yoy: '+31%', pct: '53%', up: true },
                        { seg: 'Mid-market', rev: '$2.1M', yoy: '+12%', pct: '29%', up: true },
                        { seg: 'SMB', rev: '$1.0M', yoy: '+4%', pct: '14%', up: true },
                        { seg: 'Self-serve', rev: '$0.3M', yoy: '-2%', pct: '4%', up: false },
                      ].map((row) => (
                        <tr key={row.seg} className="border-b border-gray-50">
                          <td className="px-4 py-2.5 font-medium text-gray-700">{row.seg}</td>
                          <td className="px-4 py-2.5 text-right font-mono text-gray-600">{row.rev}</td>
                          <td className={`px-4 py-2.5 text-right font-semibold ${row.up ? 'text-emerald-500' : 'text-red-400'}`}>{row.yoy}</td>
                          <td className="px-4 py-2.5 text-right text-gray-500">{row.pct}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td className="px-4 py-2.5 font-bold text-gray-800">Total</td>
                        <td className="px-4 py-2.5 text-right font-mono font-bold text-gray-800">$7.2M</td>
                        <td className="px-4 py-2.5 text-right font-bold text-emerald-500">+18%</td>
                        <td className="px-4 py-2.5 text-right font-bold text-gray-800">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Data science tab */}
        {tab === 'data-science' && (
          <motion.div
            key="data-science"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-gray-50/80">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-xs font-semibold text-gray-500 ml-2">churn_model.ipynb</span>
              <span className="ml-auto text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Python 3.11</span>
            </div>
            <div className="p-5 space-y-4">
              {/* Code cell */}
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-[11px] leading-relaxed overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded">In [3]</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-purple-400">from</span> sklearn.ensemble <span className="text-purple-400">import</span> RandomForestClassifier<br/>
                  <span className="text-purple-400">from</span> sklearn.metrics <span className="text-purple-400">import</span> classification_report<br/>
                  <br/>
                  model = RandomForestClassifier(n_estimators=<span className="text-amber-300">200</span>)<br/>
                  model.fit(X_train, y_train)<br/>
                  <br/>
                  <span className="text-slate-500"># Predict on holdout set</span><br/>
                  y_pred = model.predict(X_test)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Scatter plot */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Churn probability vs. usage</p>
                  <svg viewBox="0 0 200 120" className="w-full">
                    <line x1="25" y1="100" x2="190" y2="100" stroke="#e5e7eb" strokeWidth="0.5" />
                    <line x1="25" y1="100" x2="25" y2="10" stroke="#e5e7eb" strokeWidth="0.5" />
                    <text x="105" y="115" textAnchor="middle" fontSize="6" fill="#9ca3af">Monthly active days</text>
                    <text x="8" y="55" textAnchor="middle" fontSize="6" fill="#9ca3af" transform="rotate(-90,8,55)">P(churn)</text>
                    {/* Churned cluster — top-left */}
                    {[[40,25],[50,30],[35,35],[55,20],[45,40],[38,28],[52,22],[42,18],[48,32],[36,38]].map(([x,y],i) => (
                      <motion.circle key={`c${i}`} cx={x} cy={y} r="3" fill="#ef4444" fillOpacity={0.6}
                        initial={{scale:0}} animate={{scale:1}} transition={{delay:0.2+i*0.03}} />
                    ))}
                    {/* Retained cluster — bottom-right */}
                    {[[120,75],[140,80],[130,85],[150,70],[160,78],[135,90],[145,72],[125,88],[155,82],[165,76],[110,82],[170,85]].map(([x,y],i) => (
                      <motion.circle key={`r${i}`} cx={x} cy={y} r="3" fill="#10b981" fillOpacity={0.6}
                        initial={{scale:0}} animate={{scale:1}} transition={{delay:0.4+i*0.03}} />
                    ))}
                    {/* Decision boundary */}
                    <motion.line x1="30" y1="95" x2="180" y2="15" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 3"
                      initial={{pathLength:0}} animate={{pathLength:1}} transition={{delay:0.8,duration:0.6}} />
                  </svg>
                  <div className="flex justify-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-[9px] text-gray-500"><span className="w-2 h-2 rounded-full bg-red-400" /> Churned</span>
                    <span className="flex items-center gap-1 text-[9px] text-gray-500"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Retained</span>
                  </div>
                </div>

                {/* Model metrics */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Model performance</p>
                  <div className="space-y-3">
                    {[
                      { metric: 'Accuracy', value: 0.89 },
                      { metric: 'Precision', value: 0.85 },
                      { metric: 'Recall', value: 0.82 },
                      { metric: 'F1 score', value: 0.83 },
                    ].map((m, i) => (
                      <div key={m.metric}>
                        <div className="flex justify-between mb-1">
                          <span className="text-[10px] font-medium text-gray-600">{m.metric}</span>
                          <span className="text-[10px] font-bold font-mono text-gray-700">{m.value.toFixed(2)}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div className="h-full rounded-full bg-indigo-400" initial={{width:0}} animate={{width:`${m.value*100}%`}} transition={{delay:0.3+i*0.1,duration:0.8,ease:[0.16,1,0.3,1]}} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 px-3 py-2 bg-indigo-50 rounded-lg border border-indigo-100">
                    <p className="text-[10px] text-indigo-600 font-medium">Top predictors: days_since_login, support_tickets, monthly_usage</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Example data stacks                                                */
/* ------------------------------------------------------------------ */

function ExampleCard({ icon, label, color, children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3, transition: { duration: 0.15 } }}
      className="flex-1 min-w-[140px] rounded-2xl border-2 p-4 cursor-default"
      style={{ borderColor: `${color}40`, backgroundColor: `${color}06` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>{label}</span>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
        {icon}
        {children}
      </div>
    </motion.div>
  )
}

function ExampleDataStacks() {
  const [exampleTab, setExampleTab] = useState('excel')
  const examples = [
    { key: 'excel', label: 'Excel' },
    { key: 'bi', label: 'BI' },
    { key: 'warehouse', label: 'Data warehouse' },
  ]

  return (
    <div>
      <div className="flex justify-center gap-1 mb-6">
        {examples.map((t) => (
          <button
            key={t.key}
            onClick={() => setExampleTab(t.key)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              exampleTab === t.key
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Excel */}
        {exampleTab === 'excel' && (
          <motion.div key="excel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
            <div className="flex flex-col md:flex-row items-stretch gap-2">
              <ExampleCard label="Ingestion" color="#6366f1" icon={
                <svg viewBox="0 0 48 36" className="w-10 h-7 mx-auto mb-2">
                  <rect x="2" y="2" width="44" height="32" rx="3" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.2" />
                  <path d="M24 8v12M18 14l6 6 6-6" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="12" y="24" width="24" height="3" rx="1" fill="#c7d2fe" />
                </svg>
              }>
                <p className="text-xs font-semibold text-gray-700 text-center">Download files</p>
                <p className="text-[10px] text-gray-400 text-center mt-1">Export from each source app</p>
              </ExampleCard>
              <div className="flex items-center justify-center shrink-0 py-1 md:py-0">
                <div className="hidden md:block"><FlowArrow direction="right" color="#cbd5e1" length={24} thickness={2} delay={0} animated={false} /></div>
                <div className="md:hidden"><FlowArrow direction="down" color="#cbd5e1" length={20} thickness={2} delay={0} animated={false} /></div>
              </div>
              <ExampleCard label="Storage" color="#3b82f6" icon={
                <svg viewBox="0 0 48 40" className="w-10 h-8 mx-auto mb-2">
                  <rect x="4" y="2" width="16" height="20" rx="2" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.2" />
                  <rect x="14" y="8" width="16" height="20" rx="2" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.2" />
                  <rect x="24" y="14" width="16" height="20" rx="2" fill="#d1fae5" stroke="#10b981" strokeWidth="1.2" />
                  <text x="32" y="28" textAnchor="middle" fontSize="6" fill="#10b981" fontWeight="600">.csv</text>
                </svg>
              }>
                <p className="text-xs font-semibold text-gray-700 text-center">Files on a computer</p>
                <p className="text-[10px] text-gray-400 text-center mt-1">CSVs, exports, downloads</p>
              </ExampleCard>
              <div className="flex items-center justify-center shrink-0 py-1 md:py-0">
                <div className="hidden md:block"><FlowArrow direction="right" color="#cbd5e1" length={24} thickness={2} delay={0} animated={false} /></div>
                <div className="md:hidden"><FlowArrow direction="down" color="#cbd5e1" length={20} thickness={2} delay={0} animated={false} /></div>
              </div>
              <ExampleCard label="Transformation" color="#f97316" icon={
                <svg viewBox="0 0 48 36" className="w-10 h-7 mx-auto mb-2">
                  <rect x="2" y="2" width="44" height="32" rx="3" fill="#fff7ed" stroke="#f97316" strokeWidth="1.2" />
                  <rect x="6" y="7" width="14" height="8" rx="1" fill="#fed7aa" />
                  <rect x="22" y="7" width="14" height="8" rx="1" fill="#fed7aa" />
                  <text x="13" y="13" textAnchor="middle" fontSize="5" fill="#9a3412" fontWeight="600">A1</text>
                  <text x="29" y="13" textAnchor="middle" fontSize="5" fill="#9a3412" fontWeight="600">B1</text>
                  <rect x="6" y="18" width="30" height="6" rx="1" fill="#ffedd5" />
                  <text x="21" y="23" textAnchor="middle" fontSize="4.5" fill="#c2410c">=VLOOKUP(...)</text>
                  <rect x="6" y="26" width="30" height="6" rx="1" fill="#ffedd5" />
                  <text x="21" y="31" textAnchor="middle" fontSize="4.5" fill="#c2410c">=SUMIFS(...)</text>
                </svg>
              }>
                <p className="text-xs font-semibold text-gray-700 text-center">Formulas</p>
                <p className="text-[10px] text-gray-400 text-center mt-1">VLOOKUPs, SUMIFS, IF statements</p>
              </ExampleCard>
              <div className="flex items-center justify-center shrink-0 py-1 md:py-0">
                <div className="hidden md:block"><FlowArrow direction="right" color="#cbd5e1" length={24} thickness={2} delay={0} animated={false} /></div>
                <div className="md:hidden"><FlowArrow direction="down" color="#cbd5e1" length={20} thickness={2} delay={0} animated={false} /></div>
              </div>
              <ExampleCard label="Analyze" color="#10b981" icon={
                <svg viewBox="0 0 48 36" className="w-10 h-7 mx-auto mb-2">
                  <rect x="2" y="2" width="44" height="32" rx="3" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.2" />
                  <rect x="5" y="5" width="10" height="5" rx="1" fill="#bbf7d0" />
                  <rect x="17" y="5" width="10" height="5" rx="1" fill="#bbf7d0" />
                  <rect x="29" y="5" width="10" height="5" rx="1" fill="#bbf7d0" />
                  <rect x="5" y="12" width="10" height="18" rx="1" fill="#dcfce7" />
                  <rect x="17" y="16" width="10" height="14" rx="1" fill="#d1fae5" />
                  <rect x="29" y="20" width="10" height="10" rx="1" fill="#bbf7d0" />
                  <text x="10" y="25" textAnchor="middle" fontSize="5" fill="#166534">$2.4M</text>
                </svg>
              }>
                <p className="text-xs font-semibold text-gray-700 text-center">Pivot table</p>
                <p className="text-[10px] text-gray-400 text-center mt-1">Slice and summarize</p>
              </ExampleCard>
            </div>
          </motion.div>
        )}

        {/* BI */}
        {exampleTab === 'bi' && (
          <motion.div key="bi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
            <div className="flex flex-col md:flex-row items-stretch gap-2">
              <ExampleCard label="Ingestion" color="#6366f1" icon={
                <div className="bg-slate-700 rounded-lg p-2.5 mb-1">
                  <p className="text-[7px] font-bold text-blue-300 uppercase tracking-wider mb-1.5">Connect</p>
                  <div className="space-y-1">
                    {['Salesforce', 'Google Sheets', 'SQL Server', 'Excel'].map((s, i) => (
                      <div key={s} className={`text-[8px] px-1.5 py-0.5 rounded ${i === 0 ? 'bg-blue-500/30 text-blue-200' : 'text-slate-400'}`}>{s}</div>
                    ))}
                  </div>
                </div>
              }>
                <p className="text-xs font-semibold text-gray-700 text-center">Data connector</p>
                <p className="text-[10px] text-gray-400 text-center mt-1">Pick a source to sync</p>
              </ExampleCard>
              <div className="flex items-center justify-center shrink-0 py-1 md:py-0">
                <div className="hidden md:block"><FlowArrow direction="right" color="#cbd5e1" length={24} thickness={2} delay={0} animated={false} /></div>
                <div className="md:hidden"><FlowArrow direction="down" color="#cbd5e1" length={20} thickness={2} delay={0} animated={false} /></div>
              </div>
              <ExampleCard label="Storage" color="#3b82f6" icon={
                <svg viewBox="0 0 48 36" className="w-10 h-7 mx-auto mb-2">
                  <rect x="2" y="2" width="44" height="32" rx="3" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
                  <rect x="6" y="6" width="36" height="4" rx="1" fill="#bfdbfe" />
                  <rect x="6" y="12" width="36" height="4" rx="1" fill="#dbeafe" />
                  <rect x="6" y="18" width="36" height="4" rx="1" fill="#bfdbfe" />
                  <rect x="6" y="24" width="36" height="4" rx="1" fill="#dbeafe" />
                  <text x="24" y="33" textAnchor="middle" fontSize="4.5" fill="#3b82f6" fontWeight="600">.hyper extract</text>
                </svg>
              }>
                <p className="text-xs font-semibold text-gray-700 text-center">Create extract</p>
                <p className="text-[10px] text-gray-400 text-center mt-1">Snapshot of source data</p>
              </ExampleCard>
              <div className="flex items-center justify-center shrink-0 py-1 md:py-0">
                <div className="hidden md:block"><FlowArrow direction="right" color="#cbd5e1" length={24} thickness={2} delay={0} animated={false} /></div>
                <div className="md:hidden"><FlowArrow direction="down" color="#cbd5e1" length={20} thickness={2} delay={0} animated={false} /></div>
              </div>
              <ExampleCard label="Transformation" color="#f97316" icon={
                <div className="bg-white rounded-lg border border-orange-100 p-2.5 mb-1">
                  <div className="flex items-center justify-center gap-1">
                    <div className="flex flex-col gap-1">
                      <div className="w-10 h-5 rounded bg-blue-100 border border-blue-200 flex items-center justify-center">
                        <span className="text-[6px] font-bold text-blue-500">Orders</span>
                      </div>
                      <div className="w-10 h-5 rounded bg-blue-100 border border-blue-200 flex items-center justify-center">
                        <span className="text-[6px] font-bold text-blue-500">Users</span>
                      </div>
                    </div>
                    <svg width="10" height="8"><path d="M0 4h6M4 2l2 2-2 2" stroke="#d1d5db" strokeWidth="1" fill="none" /></svg>
                    <div className="w-10 h-5 rounded bg-orange-100 border border-orange-200 flex items-center justify-center">
                      <span className="text-[6px] font-bold text-orange-500">Filter</span>
                    </div>
                    <svg width="10" height="8"><path d="M0 4h6M4 2l2 2-2 2" stroke="#d1d5db" strokeWidth="1" fill="none" /></svg>
                    <div className="w-10 h-5 rounded bg-purple-100 border border-purple-200 flex items-center justify-center">
                      <span className="text-[6px] font-bold text-purple-600">Output</span>
                    </div>
                  </div>
                </div>
              }>
                <p className="text-xs font-semibold text-gray-700 text-center">Data prep flow</p>
                <p className="text-[10px] text-gray-400 text-center mt-1">Visual drag-and-drop</p>
              </ExampleCard>
              <div className="flex items-center justify-center shrink-0 py-1 md:py-0">
                <div className="hidden md:block"><FlowArrow direction="right" color="#cbd5e1" length={24} thickness={2} delay={0} animated={false} /></div>
                <div className="md:hidden"><FlowArrow direction="down" color="#cbd5e1" length={20} thickness={2} delay={0} animated={false} /></div>
              </div>
              <ExampleCard label="Analyze" color="#10b981" icon={
                <div className="bg-white rounded-lg border border-green-100 p-2.5 mb-1">
                  <div className="grid grid-cols-2 gap-1.5 mb-2">
                    <div className="bg-emerald-50 rounded p-1 text-center">
                      <p className="text-[7px] text-gray-400 uppercase">Revenue</p>
                      <p className="text-[10px] font-bold text-gray-800">$2.4M</p>
                    </div>
                    <div className="bg-emerald-50 rounded p-1 text-center">
                      <p className="text-[7px] text-gray-400 uppercase">Customers</p>
                      <p className="text-[10px] font-bold text-gray-800">8,429</p>
                    </div>
                  </div>
                  <div className="flex items-end gap-0.5 h-8 px-1">
                    {[5,7,6,8,7.5,9,8,9.5,10.5,9,10,12].map((h,i) => (
                      <div key={i} className="flex-1 rounded-t" style={{ height: `${h*2.8}px`, backgroundColor: i === 11 ? '#10b981' : '#a5b4fc' }} />
                    ))}
                  </div>
                </div>
              }>
                <p className="text-xs font-semibold text-gray-700 text-center">Dashboard</p>
                <p className="text-[10px] text-gray-400 text-center mt-1">Interactive charts and KPIs</p>
              </ExampleCard>
            </div>
          </motion.div>
        )}

        {/* Data warehouse */}
        {exampleTab === 'warehouse' && (
          <motion.div key="warehouse" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
            <div className="flex flex-col md:flex-row items-stretch gap-2">
              <ExampleCard label="Ingestion" color="#6366f1" icon={
                <div className="bg-slate-900 rounded-lg p-2 mb-1">
                  <div className="font-mono text-[8px] leading-relaxed text-slate-300">
                    <span className="text-purple-400">import</span> requests<br/>
                    <br/>
                    data = requests.<span className="text-amber-300">get</span>(<br/>
                    &nbsp;&nbsp;api_url<br/>
                    )
                  </div>
                </div>
              }>
                <p className="text-xs font-semibold text-gray-700 text-center">Python script</p>
                <p className="text-[10px] text-gray-400 text-center mt-1">Pull data from APIs</p>
              </ExampleCard>
              <div className="flex items-center justify-center shrink-0 py-1 md:py-0">
                <div className="hidden md:block"><FlowArrow direction="right" color="#cbd5e1" length={24} thickness={2} delay={0} animated={false} /></div>
                <div className="md:hidden"><FlowArrow direction="down" color="#cbd5e1" length={20} thickness={2} delay={0} animated={false} /></div>
              </div>
              <ExampleCard label="Storage" color="#3b82f6" icon={
                <svg viewBox="0 0 48 36" className="w-10 h-7 mx-auto mb-2">
                  <ellipse cx="24" cy="10" rx="18" ry="5" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
                  <path d="M6 10v12c0 2.8 8 5 18 5s18-2.2 18-5V10" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
                  <path d="M6 16c0 2.8 8 5 18 5s18-2.2 18-5" fill="none" stroke="#3b82f6" strokeWidth="0.6" strokeDasharray="3 2" />
                  <text x="24" y="23" textAnchor="middle" fontSize="4.5" fill="#3b82f6" fontWeight="600">raw.orders</text>
                </svg>
              }>
                <p className="text-xs font-semibold text-gray-700 text-center">Lives On A Server</p>
                <p className="text-[10px] text-gray-400 text-center mt-1">Data stored on disc</p>
              </ExampleCard>
              <div className="flex items-center justify-center shrink-0 py-1 md:py-0">
                <div className="hidden md:block"><FlowArrow direction="right" color="#cbd5e1" length={24} thickness={2} delay={0} animated={false} /></div>
                <div className="md:hidden"><FlowArrow direction="down" color="#cbd5e1" length={20} thickness={2} delay={0} animated={false} /></div>
              </div>
              <ExampleCard label="Transformation" color="#f97316" icon={
                <div className="bg-slate-900 rounded-lg p-2 mb-1">
                  <div className="font-mono text-[8px] leading-relaxed text-slate-300">
                    <span className="text-purple-400">CREATE PROC</span> sp_rev<br/>
                    <span className="text-blue-300">SELECT</span> region,<br/>
                    &nbsp;&nbsp;<span className="text-amber-300">SUM</span>(amount)<br/>
                    <span className="text-blue-300">FROM</span> raw.orders<br/>
                    <span className="text-blue-300">GROUP BY</span> region;
                  </div>
                </div>
              }>
                <p className="text-xs font-semibold text-gray-700 text-center">Stored procedure</p>
                <p className="text-[10px] text-gray-400 text-center mt-1">SQL logic in the database</p>
              </ExampleCard>
              <div className="flex items-center justify-center shrink-0 py-1 md:py-0">
                <div className="hidden md:block"><FlowArrow direction="right" color="#cbd5e1" length={24} thickness={2} delay={0} animated={false} /></div>
                <div className="md:hidden"><FlowArrow direction="down" color="#cbd5e1" length={20} thickness={2} delay={0} animated={false} /></div>
              </div>
              <ExampleCard label="Analyze" color="#10b981" icon={
                <div className="bg-slate-900 rounded-lg p-2 mb-1">
                  <div className="font-mono text-[8px] leading-relaxed text-slate-300">
                    <span className="text-blue-300">SELECT</span><br/>
                    &nbsp;&nbsp;region,<br/>
                    &nbsp;&nbsp;total_revenue<br/>
                    <span className="text-blue-300">FROM</span> analytics.rev<br/>
                    <span className="text-blue-300">ORDER BY</span> 2 <span className="text-amber-300">DESC</span>;
                  </div>
                </div>
              }>
                <p className="text-xs font-semibold text-gray-700 text-center">SQL query</p>
                <p className="text-[10px] text-gray-400 text-center mt-1">Ad hoc analysis</p>
              </ExampleCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Tab02WhatIsADataStack() {
  const [activeStage, setActiveStage] = useState(0)
  const [selectedSource, setSelectedSource] = useState(null)
  const [view, setView] = useState('architecture')

  return (
    <div className="py-8">
      <div className="section-container mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-bold text-white bg-gray-900 px-3 py-1 rounded-full">02</span>
          <h2 className="text-2xl font-bold text-gray-900">What Is A Data Stack?</h2>
        </div>
        <p className="text-sm text-gray-500">Four jobs, in order. Every data stack does these whether it knows it or not.</p>
      </div>

      <div className="section-container space-y-8">

        {/* Top-level toggle */}
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setView('architecture')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                view === 'architecture'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              General architecture
            </button>
            <button
              onClick={() => setView('examples')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                view === 'examples'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Example data stacks
            </button>
          </div>
        </div>

        {view === 'examples' && (
          <div className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 border border-gray-200/60 rounded-2xl p-6 md:p-8 shadow-sm">
            <ExampleDataStacks />
          </div>
        )}

        {view === 'architecture' && (
        <div className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 border border-gray-200/60 rounded-2xl p-6 md:p-8 shadow-sm">

          <PipelineBar activeStage={activeStage} onSelect={setActiveStage} />

          <AnimatePresence mode="wait">

            {/* Sources */}
            {activeStage === 0 && (
              <motion.div
                key="sources"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-5">
                  <p className="text-base font-semibold text-gray-700">
                    Data comes from operational systems
                  </p>
                  <p className="text-sm text-gray-400">Business apps create the data that we want to analyze.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {dataSources.map((src, i) => {
                    const isSelected = selectedSource === i
                    return (
                      <motion.button
                        key={src.name}
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        whileHover={{ scale: 1.15, y: -4, transition: { duration: 0.15 } }}
                        transition={{ delay: i * 0.1, duration: 0.4, type: 'spring', stiffness: 200 }}
                        className="flex flex-col items-center gap-1.5 cursor-pointer"
                        onClick={() => setSelectedSource(isSelected ? null : i)}
                      >
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md overflow-hidden transition-all duration-200"
                          style={{
                            backgroundColor: src.bg,
                            outline: isSelected ? '3px solid #6366f1' : '3px solid transparent',
                            outlineOffset: '2px',
                          }}
                        >
                          {src.logo
                            ? <img src={src.logo} alt={src.name} className="w-full h-full object-contain p-1" />
                            : src.icon
                          }
                        </div>
                        <span className={`text-[10px] font-semibold ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`}>{src.name}</span>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Mock tables for selected source */}
                <AnimatePresence>
                  {selectedSource !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
                        {dataSources[selectedSource].tables.map((table, ti) => (
                          <motion.div
                            key={table.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: ti * 0.08 }}
                            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                          >
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <rect x="1" y="1" width="10" height="10" rx="2" stroke="#9ca3af" strokeWidth="1.2" />
                                <line x1="1" y1="4.5" x2="11" y2="4.5" stroke="#9ca3af" strokeWidth="0.8" />
                                <line x1="4.5" y1="4.5" x2="4.5" y2="11" stroke="#9ca3af" strokeWidth="0.8" />
                              </svg>
                              <span className="text-xs font-bold font-mono text-gray-700">{table.name}</span>
                            </div>
                            <div className="px-3 py-2 flex flex-wrap gap-x-3 gap-y-1">
                              {table.cols.map((col) => (
                                <span key={col} className="text-[10px] font-mono text-gray-400">{col}</span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}

            {/* Storage */}
            {activeStage === 1 && (
              <motion.div
                key="storage"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-6">
                  <p className="text-base font-semibold text-gray-700">
                    Data gets copied from operational systems into a central analytical platform.
                  </p>
                </div>

                {/* Flow: OLTP sources → OLAP platform */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 max-w-4xl mx-auto mb-8">

                  {/* OLTP side — source apps */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.03, y: -3, transition: { duration: 0.15 } }}
                    transition={{ delay: 0.15 }}
                    className="border-2 border-blue-200 rounded-2xl p-5 bg-blue-50/30 flex-1 max-w-sm cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold">OL</div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">OLTP</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Analytics databases</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {dataSources.map((src, i) => (
                        <motion.div
                          key={src.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.15, y: -3, transition: { duration: 0.15 } }}
                          transition={{ delay: 0.25 + i * 0.06 }}
                          className="flex flex-col items-center gap-1 cursor-default"
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-[10px] shadow-sm overflow-hidden"
                            style={{ backgroundColor: src.bg }}
                          >
                            {src.logo
                              ? <img src={src.logo} alt={src.name} className="w-full h-full object-contain p-0.5" />
                              : src.icon
                            }
                          </div>
                          <span className="text-[8px] font-medium text-gray-400 text-center leading-tight">{src.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Arrow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="hidden md:block">
                      <FlowArrow direction="right" color="#6366f1" length={60} thickness={2} delay={0.2} />
                    </div>
                    <div className="md:hidden">
                      <FlowArrow direction="down" color="#6366f1" length={40} thickness={2} delay={0.2} />
                    </div>
                  </motion.div>

                  {/* OLAP side — data platform */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.03, y: -3, transition: { duration: 0.15 } }}
                    transition={{ delay: 0.3 }}
                    className="border-2 border-indigo-300 rounded-2xl p-5 bg-indigo-50/30 flex-1 max-w-sm cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">AP</div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">OLAP</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Analytical database</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border border-indigo-100 p-4 text-center">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mx-auto mb-2">
                        <ellipse cx="20" cy="10" rx="16" ry="5" stroke="#6366f1" strokeWidth="1.5" fill="#eef2ff" />
                        <path d="M4 10v10c0 2.8 7.2 5 16 5s16-2.2 16-5V10" stroke="#6366f1" strokeWidth="1.5" fill="none" />
                        <path d="M4 20v10c0 2.8 7.2 5 16 5s16-2.2 16-5V20" stroke="#6366f1" strokeWidth="1.5" fill="none" />
                        <ellipse cx="20" cy="20" rx="16" ry="5" stroke="#6366f1" strokeWidth="0.5" strokeDasharray="3 2" fill="none" />
                      </svg>
                      <p className="text-sm font-bold text-gray-800">Data platform</p>
                      <p className="text-[10px] text-gray-400 mt-1">All source data in one place,<br/>optimized for analytical queries</p>
                    </div>
                  </motion.div>

                </div>

              </motion.div>
            )}

            {/* Transformation — 3-tab view */}
            {activeStage === 2 && (
              <TransformationStage />
            )}

            {/* Analyze — 3-tab view */}
            {activeStage === 3 && (
              <AnalyzeStage />
            )}

          </AnimatePresence>
        </div>
        )}

      </div>
    </div>
  )
}
