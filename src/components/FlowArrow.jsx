import { motion } from 'framer-motion'

const REDUCED_MOTION = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function FlowArrow({ direction = 'right', color = '#94a3b8', length = 80, thickness = 2, delay = 0, animated = true }) {
  const isVertical = direction === 'down'
  const w = isVertical ? 20 : length
  const h = isVertical ? length : 20
  const arrowSize = 6

  if (isVertical) {
    const cx = w / 2
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
        <line x1={cx} y1={0} x2={cx} y2={h - arrowSize} stroke={color} strokeWidth={thickness} strokeLinecap="round" />
        <polygon
          points={`${cx},${h} ${cx - arrowSize},${h - arrowSize * 1.5} ${cx + arrowSize},${h - arrowSize * 1.5}`}
          fill={color}
        />
        {animated && !REDUCED_MOTION && (
          <motion.circle
            cx={cx}
            r={3}
            fill={color}
            initial={{ cy: 0, opacity: 0 }}
            animate={{ cy: [0, h - arrowSize], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay, ease: 'easeInOut' }}
          />
        )}
      </svg>
    )
  }

  const cy = h / 2
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <line x1={0} y1={cy} x2={w - arrowSize} y2={cy} stroke={color} strokeWidth={thickness} strokeLinecap="round" />
      <polygon
        points={`${w},${cy} ${w - arrowSize * 1.5},${cy - arrowSize} ${w - arrowSize * 1.5},${cy + arrowSize}`}
        fill={color}
      />
      {animated && !REDUCED_MOTION && (
        <motion.circle
          cy={cy}
          r={3}
          fill={color}
          initial={{ cx: 0, opacity: 0 }}
          animate={{ cx: [0, w - arrowSize], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay, ease: 'easeInOut' }}
        />
      )}
    </svg>
  )
}
