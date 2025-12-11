import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';
import { KPICard } from '../../shared/charts/KPICard';

export const TractionSlide = () => (
  <div className="h-full px-8 py-6 overflow-y-auto">
    <h2 className="text-4xl font-bold text-gray-900 mb-2 text-center">
      {pitchDeckData.traction.title}
    </h2>
    <p className="text-center text-gray-600 mb-6 text-sm">{pitchDeckData.traction.highlight}</p>

    {/* KPIs */}
    <div className="grid grid-cols-4 gap-3 max-w-4xl mx-auto mb-6">
      {pitchDeckData.traction.kpis.map((kpi, index) => (
        <KPICard key={kpi.label} value={kpi.value} label={kpi.label} growth={kpi.growth} delay={index * 0.1} animated={true} />
      ))}
    </div>

    {/* Timeline - horizontal layout */}
    <div className="max-w-4xl mx-auto mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Ключевые этапы</h3>
      <div className="flex justify-center items-center gap-4">
        {pitchDeckData.traction.milestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.15 }}
            className="flex items-center"
          >
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm text-center min-w-[180px]">
              <div className="font-bold text-lg" style={{ color: '#E8A5C4' }}>{milestone.year}</div>
              <div style={{ color: '#374151' }}>{milestone.event}</div>
            </div>
            {index < pitchDeckData.traction.milestones.length - 1 && (
              <div className="w-8 h-0.5 bg-gray-300 mx-2" />
            )}
          </motion.div>
        ))}
      </div>
    </div>

    {/* Retailers */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Ритейл-партнёры</h3>
      <div className="grid grid-cols-6 gap-3">
        {pitchDeckData.traction.retailers.map((retailer) => (
          <div key={retailer.name} className="bg-white rounded-xl p-3 border border-gray-200 text-center">
            <div className="font-bold text-gray-900 text-sm">{retailer.name}</div>
            <div className="text-xs text-gray-500">{retailer.type}</div>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);
