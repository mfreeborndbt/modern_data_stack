import { motion } from 'framer-motion'

export default function FrictionMeter({ label, value, maxValue = 100, color = '#ef4444', delay = 0 }) {
  const pct = Math.min(100, (value / maxValue) * 100)

  const barColor = pct > 70 ? '#ef4444' : pct > 40 ? '#f59e0b' : '#22c55e'
  const finalColor = color !== '#ef4444' ? color : barColor

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-gray-600 w-28 shrink-0 text-right">{label}</span>
      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: finalColor }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="text-xs font-bold w-12 shrink-0" style={{ color: finalColor }}>
        {pct > 70 ? 'HIGH' : pct > 40 ? 'MED' : 'LOW'}
      </span>
    </div>
  )
}
