import { motion } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  Mini visuals for each trend                                        */
/* ------------------------------------------------------------------ */

function ConsolidationVisual() {
  const satellites = [0, 60, 120, 180, 240, 300]
  return (
    <svg width="80" height="60" viewBox="0 0 80 60">
      {satellites.map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x = 40 + 22 * Math.cos(rad)
        const y = 30 + 18 * Math.sin(rad)
        return (
          <motion.circle
            key={i}
            r="4"
            fill="#6366f1"
            fillOpacity={0.5}
            initial={{ cx: x, cy: y }}
            animate={{ cx: 40, cy: 30, r: 0 }}
            transition={{ duration: 1.5, delay: 0.6 + i * 0.15, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
          />
        )
      })}
      <motion.circle
        cx="40" cy="30" fill="#6366f1"
        initial={{ r: 6 }}
        animate={{ r: [6, 12, 6] }}
        transition={{ duration: 1.5, delay: 1.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  )
}

function MultiCloudVisual() {
  return (
    <svg width="80" height="60" viewBox="0 0 80 60">
      {[18, 40, 62].map((cx, i) => (
        <g key={i}>
          <motion.ellipse
            cx={cx} cy={30} rx="12" ry="9"
            fill="none" stroke="#3b82f6" strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.2 }}
          />
          <motion.ellipse
            cx={cx} cy={27} rx="8" ry="6"
            fill="none" stroke="#3b82f6" strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.2 }}
          />
        </g>
      ))}
      <motion.line x1="30" y1="30" x2="50" y2="30" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.5 }} />
    </svg>
  )
}

function CostVisual() {
  return (
    <svg width="80" height="60" viewBox="0 0 80 60">
      <motion.path
        d="M 8 15 Q 25 18 40 30 Q 55 42 72 48"
        fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
      <motion.path
        d="M 64 42 L 72 48 L 62 49"
        fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
      />
      <line x1="8" y1="52" x2="72" y2="52" stroke="#94a3b8" strokeWidth="0.5" />
      <line x1="8" y1="10" x2="8" y2="52" stroke="#94a3b8" strokeWidth="0.5" />
      <text x="4" y="8" fontSize="7" fill="#94a3b8">$</text>
    </svg>
  )
}

function ConvergenceVisual() {
  return (
    <svg width="80" height="60" viewBox="0 0 80 60">
      <motion.rect
        rx="4" y="15" width="24" height="30" fill="none" stroke="#3b82f6" strokeWidth="1.5"
        initial={{ x: 6 }} animate={{ x: [6, 20] }}
        transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.rect
        rx="4" y="15" width="24" height="30" fill="none" stroke="#10b981" strokeWidth="1.5"
        initial={{ x: 50 }} animate={{ x: [50, 36] }}
        transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.rect
        rx="4" x="24" y="15" width="32" height="30" fill="none" stroke="#6366f1" strokeWidth="2"
        initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
      />
      <text x="10" y="56" fontSize="6" fill="#94a3b8">WH</text>
      <text x="56" y="56" fontSize="6" fill="#94a3b8">Lake</text>
    </svg>
  )
}

function MetricsVisual() {
  return (
    <svg width="80" height="60" viewBox="0 0 80 60">
      {/* BI tools at top */}
      <rect x="15" y="2" width="50" height="14" rx="3" fill="none" stroke="#94a3b8" strokeWidth="1" />
      <text x="27" y="12" fontSize="7" fill="#94a3b8">BI tools</text>
      {/* Warehouse at bottom */}
      <rect x="15" y="44" width="50" height="14" rx="3" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="22" y="54" fontSize="7" fill="#3b82f6">Warehouse</text>
      {/* Metrics block sliding down */}
      <motion.g
        initial={{ y: 0 }}
        animate={{ y: [0, 26] }}
        transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
      >
        <rect x="25" y="16" width="30" height="10" rx="2" fill="#f97316" fillOpacity={0.15} stroke="#f97316" strokeWidth="1.5" />
        <text x="29" y="24" fontSize="6" fill="#f97316" fontWeight="600">metrics</text>
      </motion.g>
    </svg>
  )
}

const visuals = [ConsolidationVisual, MultiCloudVisual, CostVisual, ConvergenceVisual, MetricsVisual]

/* ------------------------------------------------------------------ */
/*  Trend data                                                         */
/* ------------------------------------------------------------------ */

const trends = [
  {
    title: 'Consolidation of vendors',
    desc: 'The outside technologies — catalogs, observability, orchestration, semantics — are being absorbed by either the data platform or the strongest of the original ISVs.',
  },
  {
    title: 'Multi-cloud strategies',
    desc: 'Organizations increasingly run across more than one cloud provider rather than betting on a single one.',
  },
  {
    title: 'Compute cost optimization is being prioritized',
    desc: 'As consumption pricing bites, teams actively engineer for efficient compute instead of treating it as free.',
  },
  {
    title: 'No distinction between a data warehouse and a data lake',
    desc: 'The two have converged; the lakehouse is just "the store."',
  },
  {
    title: 'Metrics are defined in the warehouse, not the BI tool',
    desc: 'Business definitions live in a semantic layer close to the data, so every tool reads the same numbers.',
  },
]

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Tab05Trends() {
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

      <div className="section-container space-y-4">
        {trends.map((trend, i) => {
          const Visual = visuals[i]
          return (
            <motion.div
              key={trend.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-5">
                <div className="hidden sm:flex shrink-0 w-20 h-[60px] items-center justify-center rounded-xl bg-gray-50 border border-gray-100">
                  <Visual />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-gray-300">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-base font-bold text-gray-900">{trend.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{trend.desc}</p>
                </div>
              </div>
            </motion.div>
          )
        })}

        <div className="text-center pt-4 pb-2">
          <p className="text-sm text-gray-500 max-w-lg mx-auto italic">
            The stack is not getting more complex — it is consolidating around fewer, more capable pieces.
          </p>
        </div>
      </div>
    </div>
  )
}
