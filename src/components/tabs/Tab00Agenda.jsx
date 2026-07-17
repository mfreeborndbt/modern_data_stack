import { motion } from 'framer-motion'

const agenda = [
  {
    number: '01',
    title: 'Making A Great Data Org',
    desc: 'Ingredients to building data driven companies',
    color: '#6366f1',
  },
  {
    number: '02',
    title: 'What Is A Data Stack',
    desc: 'The 4 step architecture',
    color: '#3b82f6',
  },
  {
    number: '03',
    title: 'Pitfalls of Legacy Stack',
    desc: 'How companies used to process data',
    color: '#f97316',
  },
  {
    number: '04',
    title: 'Benefits of Modern Stack',
    desc: 'How companies have evolved to meet changing and more complex needs',
    color: '#10b981',
  },
  {
    number: '05',
    title: 'Emerging Trends',
    desc: 'How the modern data stack is changing',
    color: '#8b5cf6',
  },
  {
    number: '06',
    title: 'AI',
    desc: 'How AI impacts development, deployment, consumption, migrations and beyond',
    color: '#ec4899',
  },
]

export default function Tab00Agenda() {
  return (
    <div className="py-8">
      <div className="section-container mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-bold text-white bg-gray-900 px-3 py-1 rounded-full">00</span>
          <h2 className="text-2xl font-bold text-gray-900">Today's Agenda</h2>
        </div>
        <p className="text-sm text-gray-500">
          The Modern Data Stack: what it is, where it came from, and where it is going.
        </p>
      </div>

      <div className="section-container">
        <div className="space-y-4 max-w-3xl mx-auto">
          {agenda.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.15 } }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center gap-5 px-6 py-5 bg-white rounded-2xl border border-gray-200/60 shadow-sm cursor-default"
            >
              <span
                className="text-sm font-bold text-white px-3 py-1 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              >
                {item.number}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color, opacity: 0.4 }} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
