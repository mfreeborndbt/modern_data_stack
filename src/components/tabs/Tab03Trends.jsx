import { motion } from 'framer-motion'

export default function Tab03Trends() {
  return (
    <div className="py-8">
      <div className="section-container">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-bold text-white bg-gray-900 px-3 py-1 rounded-full">03</span>
          <h2 className="text-2xl font-bold text-gray-900">Trends</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-200/60 rounded-2xl p-12 shadow-sm text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-400 mb-2">Coming next</p>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">
            Where the stack is headed: convergence, real-time, governance, and the shift from tools to platforms.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
