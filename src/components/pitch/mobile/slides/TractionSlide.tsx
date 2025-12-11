import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';

export const TractionSlide = () => (
  <div className="h-full px-4 py-6 overflow-y-auto">
    <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">
      {pitchDeckData.traction.title}
    </h2>
    <p className="text-xs text-center text-gray-600 mb-4">{pitchDeckData.traction.highlight}</p>

    {/* KPIs - 2x2 grid */}
    <div className="grid grid-cols-2 gap-2 mb-4">
      {pitchDeckData.traction.kpis.map((kpi, index) => (
        <motion.div
          key={kpi.label}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg p-3 border border-gray-200 text-center"
        >
          <div className="text-xl font-bold text-gray-900 mb-0.5">{kpi.value}</div>
          <div className="text-[10px] text-gray-600">{kpi.label}</div>
          {kpi.growth && (
            <div className="flex items-center justify-center gap-0.5 mt-1 text-green-600">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="text-[10px] font-medium">{kpi.growth}</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>

    {/* Timeline - vertical layout */}
    <div className="mb-4">
      <h3 className="text-sm font-bold text-gray-900 mb-3 text-center">Ключевые этапы</h3>
      <div className="space-y-2">
        {pitchDeckData.traction.milestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            initial={{ x: -15, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-white rounded-lg p-3 border border-gray-200 flex items-center gap-3"
          >
            <div className="font-bold text-sm min-w-[50px]" style={{ color: '#E8A5C4' }}>{milestone.year}</div>
            <div className="text-xs text-gray-700">{milestone.event}</div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Retailers - 2 column grid */}
    <motion.div
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      <h3 className="text-sm font-bold text-gray-900 mb-2 text-center">Ритейл-партнёры</h3>
      <div className="grid grid-cols-2 gap-2">
        {pitchDeckData.traction.retailers.map((retailer) => (
          <div key={retailer.name} className="bg-white rounded-lg p-2 border border-gray-200 text-center">
            <div className="text-xs font-bold text-gray-900">{retailer.name}</div>
            <div className="text-[10px] text-gray-500">{retailer.type}</div>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);
