import { motion } from 'framer-motion'

export default function Tab04AI() {
  return (
    <div className="py-8">
      <div className="section-container">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-bold text-white bg-gray-900 px-3 py-1 rounded-full">04</span>
          <h2 className="text-2xl font-bold text-gray-900">AI and the stack</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-200/60 rounded-2xl p-12 shadow-sm text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
              <path d="M16 14h.01" />
              <path d="M8 14h.01" />
              <path d="M12 17v4" />
              <path d="M8 21h8" />
              <path d="M20 10a8 8 0 1 1-16 0" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-400 mb-2">Coming next</p>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">
            How AI fits into (and reshapes) each stage of the stack, from AI-assisted ingestion to agents that query your warehouse directly.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
