import { motion, AnimatePresence } from 'framer-motion'
import FlowArrow from './FlowArrow'

const STAGES = [
  { key: 'ingest', label: 'Ingest', color: '#6366f1', desc: 'Pull data in' },
  { key: 'store', label: 'Store', color: '#3b82f6', desc: 'Put it somewhere' },
  { key: 'transform', label: 'Transform', color: '#f97316', desc: 'Shape it' },
  { key: 'analyze', label: 'Analyze', color: '#10b981', desc: 'Use it' },
]

function StageNode({ stage, era, tools, children, index }) {
  const isLegacy = era === 'legacy'

  return (
    <motion.div
      layout
      className="flex-1 min-w-[160px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        layout
        className={`relative rounded-2xl p-5 h-full transition-colors duration-700 ${
          isLegacy
            ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-slate-600 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
            : 'bg-white border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
        }`}
        animate={{
          borderColor: isLegacy ? 'rgba(71,85,105,0.8)' : 'rgba(229,231,235,0.8)',
        }}
        transition={{ duration: 0.7 }}
      >
        {/* Stage label */}
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            layout
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: stage.color }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
          />
          <span className={`text-xs font-bold uppercase tracking-wider ${
            isLegacy ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {stage.label}
          </span>
        </div>

        {/* Tools */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${era}-${stage.key}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="space-y-2"
          >
            {tools && tools.map((tool) => (
              <div
                key={tool.name}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                  isLegacy
                    ? 'bg-slate-700/60 text-gray-300 border border-slate-600/50'
                    : 'bg-gray-50 text-gray-700 border border-gray-100'
                }`}
              >
                <span className="text-base">{tool.icon}</span>
                <span>{tool.name}</span>
              </div>
            ))}
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default function DiagramEngine({ era = 'neutral', stageTools = {}, stageContent = {}, className = '' }) {
  return (
    <div className={`flex flex-col lg:flex-row items-stretch gap-0 ${className}`}>
      {STAGES.map((stage, i) => (
        <div key={stage.key} className="flex flex-col lg:flex-row items-center flex-1">
          <StageNode
            stage={stage}
            era={era}
            tools={stageTools[stage.key]}
            index={i}
          >
            {stageContent[stage.key]}
          </StageNode>
          {i < STAGES.length - 1 && (
            <div className="py-2 lg:py-0 lg:px-1 flex items-center justify-center shrink-0">
              <div className="hidden lg:block">
                <FlowArrow
                  direction="right"
                  color={era === 'legacy' ? '#475569' : '#cbd5e1'}
                  length={48}
                  thickness={2}
                  delay={i * 0.4}
                />
              </div>
              <div className="lg:hidden">
                <FlowArrow
                  direction="down"
                  color={era === 'legacy' ? '#475569' : '#cbd5e1'}
                  length={32}
                  thickness={2}
                  delay={i * 0.4}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export { STAGES }
