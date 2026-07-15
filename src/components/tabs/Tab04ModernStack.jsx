import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FlowArrow from '../FlowArrow'

const BASE = import.meta.env.BASE_URL

/* ------------------------------------------------------------------ */
/*  Modern architecture data                                           */
/* ------------------------------------------------------------------ */

const modernStages = [
  {
    label: 'SaaS Apps',
    color: '#6366f1',
    tools: [
      { name: 'Salesforce', logo: `${BASE}logos/salesforce.png` },
      { name: 'Stripe', logo: `${BASE}logos/stripe.png` },
      { name: 'HubSpot', logo: `${BASE}logos/hubspot.jpg` },
      { name: 'Zendesk', logo: `${BASE}logos/zendesk.png` },
      { name: 'Google Ads', logo: `${BASE}logos/google-ads.jpg` },
    ],
  },
  {
    label: 'Ingestion',
    color: '#8b5cf6',
    tools: [
      { name: 'Fivetran', logo: `${BASE}logos/fivetran.png` },
      { name: 'Airbyte', logo: `${BASE}logos/airbyte.png` },
    ],
  },
  {
    label: 'Data Platform',
    color: '#3b82f6',
    tools: [
      { name: 'Snowflake', logo: `${BASE}logos/snowflake.png` },
      { name: 'Databricks', logo: `${BASE}logos/databricks.png` },
      { name: 'BigQuery', logo: `${BASE}logos/bigquery.png` },
      { name: 'Redshift', logo: `${BASE}logos/redshift.png` },
    ],
  },
  {
    label: 'Transformations',
    color: '#f97316',
    tools: [
      { name: 'dbt', logo: `${BASE}logos/dbt.png` },
      { name: 'SQLMesh', logo: `${BASE}logos/sqlmesh.png` },
    ],
  },
  {
    label: 'Analytics',
    color: '#10b981',
    tools: [
      { name: 'Tableau', logo: `${BASE}logos/tableau.png` },
      { name: 'Looker', logo: `${BASE}logos/looker.png` },
      { name: 'Sigma', logo: `${BASE}logos/sigma.png` },
      { name: 'Power BI', logo: `${BASE}logos/powerbi.png` },
    ],
  },
]

const controlPlane = [
  {
    label: 'Orchestration',
    tools: [
      { name: 'Airflow', logo: `${BASE}logos/airflow.png` },
      { name: 'Dagster', logo: `${BASE}logos/dagster.png` },
    ],
  },
  {
    label: 'Cataloging',
    tools: [
      { name: 'Alation', logo: `${BASE}logos/alation.png` },
      { name: 'Atlan', logo: `${BASE}logos/atlan.png` },
    ],
  },
  {
    label: 'Observability',
    tools: [
      { name: 'Monte Carlo', logo: `${BASE}logos/montecarlo.png` },
      { name: 'Elementary', logo: `${BASE}logos/elementary.png` },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Cloud capacity visual                                              */
/* ------------------------------------------------------------------ */

/* no separate CloudCapacityVisual component needed */

/* ------------------------------------------------------------------ */
/*  Modern solutions data                                              */
/* ------------------------------------------------------------------ */

const solutions = [
  {
    id: 1,
    title: 'Cloud Data Platforms',
    visual: (
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-3 max-w-xs">
          {[
            { name: 'Snowflake', logo: `${BASE}logos/snowflake.png` },
            { name: 'Databricks', logo: `${BASE}logos/databricks.png` },
            { name: 'BigQuery', logo: `${BASE}logos/bigquery.png` },
            { name: 'Redshift', logo: `${BASE}logos/redshift.png` },
          ].map((p) => (
            <motion.div
              key={p.name}
              whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 cursor-default"
            >
              <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                <img src={p.logo} alt={p.name} className="w-full h-full object-contain p-0.5" />
              </div>
              <span className="text-xs font-semibold text-gray-700">{p.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    ),
    cards: [
      { num: '01', title: 'From Data Warehouse To Data Platform', desc: 'A data platform is broader than a warehouse. It supports data lakes, machine learning, custom apps, and more, not just structured analytics.' },
      { num: '02', title: 'Compute Scales To The Work', desc: 'Spin up as much as a job needs, then spin it down. No fixed ceiling, no idle servers you paid for anyway.' },
      { num: '03', title: 'Storage Is An Afterthought', desc: 'Cheap object storage means you keep everything without rationing. What to store stops being a budget decision.' },
      { num: '04', title: 'The Platform Handles The Rest', desc: 'Disaster recovery, high availability, backups, and scaling move to the provider.' },
      { num: '05', title: 'Start For Almost Nothing', desc: 'No seven-figure license, no multi-year contract. Provision an account and build today.' },
    ],
  },
  {
    id: 2,
    title: 'Integrations',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          {/* SaaS Apps */}
          <div className="flex flex-col gap-2">
            {[
              { name: 'SaaS Apps', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="#6366f1" strokeWidth="1.2"/><rect x="3" y="3" width="3" height="3" rx="0.5" fill="#6366f1" fillOpacity="0.4"/><rect x="8" y="3" width="3" height="3" rx="0.5" fill="#6366f1" fillOpacity="0.4"/><rect x="3" y="8" width="3" height="3" rx="0.5" fill="#6366f1" fillOpacity="0.4"/><rect x="8" y="8" width="3" height="3" rx="0.5" fill="#6366f1" fillOpacity="0.4"/></svg>, color: 'indigo' },
              { name: 'Databases', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><ellipse cx="7" cy="4" rx="5" ry="2" stroke="#3b82f6" strokeWidth="1.2"/><path d="M2 4v4c0 1.1 2.2 2 5 2s5-.9 5-2V4" stroke="#3b82f6" strokeWidth="1.2"/></svg>, color: 'blue' },
              { name: 'Event Streams', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10l3-3 2 2 5-6" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, color: 'violet' },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200">
                {s.icon}
                <span className="text-[10px] font-semibold text-indigo-600">{s.name}</span>
              </div>
            ))}
          </div>
          {/* Connectors in */}
          <div className="flex flex-col gap-2">
            {[0,1,2].map((i) => (
              <svg key={i} width="24" height="12"><path d="M2 6h16M16 3l3 3-3 3" stroke="#10b981" strokeWidth="1.5" fill="none" /><circle cx="2" cy="6" r="2" fill="#10b981"/></svg>
            ))}
          </div>
          {/* Central hub */}
          <div className="w-24 h-24 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center">
            <div className="text-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mx-auto mb-1">
                <ellipse cx="10" cy="6" rx="8" ry="3" stroke="#059669" strokeWidth="1.5" fill="#d1fae5" />
                <path d="M2 6v5c0 1.7 3.6 3 8 3s8-1.3 8-3V6" stroke="#059669" strokeWidth="1.5" />
              </svg>
              <p className="text-[8px] font-bold text-emerald-700">DATA PLATFORM</p>
            </div>
          </div>
          {/* Connectors out */}
          <div className="flex flex-col gap-2">
            {[0,1,2].map((i) => (
              <svg key={i} width="24" height="12"><path d="M2 6h16M16 3l3 3-3 3" stroke="#10b981" strokeWidth="1.5" fill="none" /><circle cx="2" cy="6" r="2" fill="#10b981"/></svg>
            ))}
          </div>
          {/* Output spokes */}
          <div className="flex flex-col gap-2">
            {[
              { name: 'BI', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="8" width="3" height="4" rx="0.5" fill="#f97316" fillOpacity="0.5"/><rect x="5.5" y="5" width="3" height="7" rx="0.5" fill="#f97316" fillOpacity="0.7"/><rect x="9" y="2" width="3" height="10" rx="0.5" fill="#f97316"/></svg> },
              { name: 'Orchestration', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="3" r="2" stroke="#f97316" strokeWidth="1"/><circle cx="3" cy="11" r="2" stroke="#f97316" strokeWidth="1"/><circle cx="11" cy="11" r="2" stroke="#f97316" strokeWidth="1"/><path d="M7 5v2L3 9M7 7l4 2" stroke="#f97316" strokeWidth="0.8"/></svg> },
              { name: 'Observability', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#f97316" strokeWidth="1.2"/><path d="M7 4v3l2 2" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round"/></svg> },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200">
                {s.icon}
                <span className="text-[10px] font-semibold text-orange-600">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    cards: [
      { num: '01', title: 'Extraction Is A Solved Problem', desc: 'Modern SaaS apps expose clean, standard APIs, so off-the-shelf tools handle extraction and loading.' },
      { num: '02', title: 'Everything Plugs In', desc: 'Open, well-documented interfaces let you snap in specialized tools for each job, most on low, usage-based pricing.' },
    ],
  },
  {
    id: 3,
    title: 'Data Democratization',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-5">
          {/* BU asks questions */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1.5">
              {[1,2,3,4,5].map((u) => (
                <div key={u} className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="2.5" stroke="#6ee7b7" strokeWidth="1"/><path d="M1 11c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="#6ee7b7" strokeWidth="1"/></svg>
                </div>
              ))}
            </div>
            <span className="text-[10px] text-gray-500">Business users</span>
          </div>

          <svg width="24" height="12"><path d="M2 6h16M16 3l3 3-3 3" stroke="#10b981" strokeWidth="1.5" fill="none" /></svg>

          {/* Specialists (embedded DAs) */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col gap-1.5">
              {[
                { team: 'Marketing DA', color: '#8b5cf6' },
                { team: 'Sales DA', color: '#3b82f6' },
                { team: 'Finance DA', color: '#f97316' },
              ].map((role) => (
                <div key={role.team} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${role.color}20`, border: `1px solid ${role.color}40` }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="2.5" stroke={role.color} strokeWidth="1"/><path d="M1 11c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke={role.color} strokeWidth="1"/></svg>
                  </div>
                  <span className="text-[9px] font-medium" style={{ color: role.color }}>{role.team}</span>
                </div>
              ))}
            </div>
            <span className="text-[10px] text-gray-400">Specialists</span>
          </div>

          <svg width="24" height="12"><path d="M2 6h16M16 3l3 3-3 3" stroke="#10b981" strokeWidth="1.5" fill="none" /><path d="M18 6H4M4 3l-3 3 3 3" stroke="#10b981" strokeWidth="1" fill="none" strokeDasharray="2 2" /></svg>

          {/* Generalists (central data team) */}
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-3">
              <div className="flex flex-col gap-1.5">
                {['Analytics Engineer', 'Data Engineer'].map((role) => (
                  <div key={role} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-200 border border-emerald-300 flex items-center justify-center shrink-0">
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="2.5" stroke="#059669" strokeWidth="1"/><path d="M1 11c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="#059669" strokeWidth="1"/></svg>
                    </div>
                    <span className="text-[8px] font-semibold text-emerald-700">{role}</span>
                  </div>
                ))}
              </div>
            </div>
            <span className="text-[10px] text-gray-400">Generalists</span>
          </div>
        </div>
      </div>
    ),
    cards: [
      { num: '01', title: 'One Language, Everywhere', desc: 'Tools standardize on SQL or clean visual builders, so skills transfer across the whole stack.' },
      { num: '02', title: 'Every Persona Self-Serves', desc: 'Analysts, engineers, and business users query the same platform directly. No ticket queue in the middle.' },
      { num: '03', title: 'Self-Serve, Still Governed', desc: 'Shared definitions and clear access rules mean open access does not cost you trust in the numbers.' },
    ],
  },
  {
    id: 4,
    title: 'ELT Instead Of ETL',
    visual: (
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          <div className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border-2 text-indigo-500 border-indigo-400">
            Sources
          </div>
          <svg width="16" height="8"><path d="M0 4h10M8 2l2 2-2 2" stroke="#d1d5db" strokeWidth="1" fill="none" /></svg>
          {/* Data platform boundary */}
          <div className="px-2 py-1 rounded border-2 border-dashed border-emerald-400 flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1">
              <div className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-blue-500 text-white border-2 border-blue-500">
                Load / Store
              </div>
              <svg width="16" height="8"><path d="M0 4h10M8 2l2 2-2 2" stroke="#d1d5db" strokeWidth="1" fill="none" /></svg>
              <div className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-orange-500 text-white border-2 border-orange-500">
                Transform
              </div>
              <svg width="16" height="8"><path d="M0 4h10M8 2l2 2-2 2" stroke="#d1d5db" strokeWidth="1" fill="none" /></svg>
              <div className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white border-2 border-emerald-500">
                Analyze
              </div>
            </div>
            <span className="text-[9px] text-emerald-500 font-semibold">All inside the data platform</span>
          </div>
        </div>
      </div>
    ),
    cards: [
      { num: '01', title: 'Transform Where The Data Lives', desc: 'Transformation runs inside the platform on elastic compute. The separate, fixed-size transform server is gone.' },
      { num: '02', title: 'Load Everything, Build Fast', desc: 'Raw data lands first, so a new question is just new SQL against data you already have.' },
      { num: '03', title: 'Any Shape Of Data', desc: 'Structured, semi-structured, or unstructured. Modern platforms ingest and transform it all.' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Tab04ModernStack() {
  const [view, setView] = useState('architecture')
  const [activeSolution, setActiveSolution] = useState(0)

  return (
    <div className="py-8">
      <div className="section-container mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-bold text-white bg-gray-900 px-3 py-1 rounded-full">04</span>
          <h2 className="text-2xl font-bold text-gray-900">The Modern Stack</h2>
        </div>
        <p className="text-sm text-gray-500">
          Cloud-first tools, modular by design, and built for self-service.
        </p>
      </div>

      <div className="section-container space-y-8">

        {/* Toggle */}
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
              onClick={() => setView('solutions')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                view === 'solutions' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Modern Solutions
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  Architecture view                                            */}
        {/* ============================================================ */}
        {view === 'architecture' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.3)] border border-slate-700/50 overflow-hidden"
          >
            {/* Main pipeline */}
            <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-0 mb-6">
              {modernStages.map((stage, si) => (
                <div key={stage.label} className="flex flex-col lg:flex-row items-center flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.03, y: -3, transition: { duration: 0.15 } }}
                    transition={{ delay: si * 0.1 }}
                    className="flex-1 min-w-[120px] bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-slate-600 rounded-2xl p-4 shadow-[0_4px_24px_rgba(0,0,0,0.4)] cursor-default"
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
                          <div className="w-8 h-8 rounded-lg bg-white border border-slate-500 overflow-hidden shrink-0 flex items-center justify-center">
                            <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain p-0.5" />
                          </div>
                          <span className="text-sm font-medium text-gray-300">{tool.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  {si < modernStages.length - 1 && (
                    <div className="py-2 lg:py-0 lg:px-1 flex items-center justify-center shrink-0">
                      <div className="hidden lg:block">
                        <FlowArrow direction="right" color="#475569" length={36} thickness={2} delay={si * 0.3} />
                      </div>
                      <div className="lg:hidden">
                        <FlowArrow direction="down" color="#475569" length={24} thickness={2} delay={si * 0.3} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Control plane */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="border-2 border-dashed border-slate-600 rounded-2xl p-5 bg-slate-800/50"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Control Plane</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {controlPlane.map((section) => (
                  <motion.div
                    key={section.label}
                    whileHover={{ scale: 1.03, y: -3, transition: { duration: 0.15 } }}
                    className="bg-slate-800 rounded-xl p-4 border border-slate-600 shadow-sm cursor-default"
                  >
                    <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-3">{section.label}</p>
                    <div className="space-y-2">
                      {section.tools.map((tool) => (
                        <motion.div
                          key={tool.name}
                          whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-700/60 border border-slate-600/50 cursor-default"
                        >
                          <div className="w-6 h-6 rounded bg-white flex items-center justify-center overflow-hidden shrink-0">
                            <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain p-0.5" />
                          </div>
                          <span className="text-xs font-medium text-gray-300">{tool.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/*  Modern Solutions view                                        */}
        {/* ============================================================ */}
        {view === 'solutions' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex flex-wrap justify-center gap-1.5 mb-6">
              {solutions.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSolution(i)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeSolution === i
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSolution}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto bg-white rounded-2xl border-2 border-emerald-200 p-8 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-sm font-bold text-white bg-emerald-500 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                    {String(solutions[activeSolution].id).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">{solutions[activeSolution].title}</h3>
                </div>

                {/* Visual */}
                <div className="mb-6">
                  {solutions[activeSolution].visual}
                </div>

                {/* Cards */}
                <div className="space-y-3">
                  {solutions[activeSolution].cards.map((card) => (
                    <motion.div
                      key={card.num}
                      whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.15 } }}
                      className="flex items-start gap-4 px-5 py-4 bg-gray-50 rounded-xl border border-gray-100 cursor-default"
                    >
                      <span className="text-sm font-bold text-emerald-500 shrink-0 mt-0.5">{card.num}</span>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{card.title}</p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{card.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  )
}
