import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';

export const ProblemSlide = () => (
  <div className="h-full px-4 py-6 overflow-y-auto">
    <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
      {pitchDeckData.problem.title}
    </h2>

    {/* Main Stat */}
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="mx-auto mb-6 text-center"
    >
      <div className="text-6xl font-bold text-red-500 mb-1">
        {pitchDeckData.problem.mainStat.value}
      </div>
      <div className="text-sm text-gray-600">{pitchDeckData.problem.mainStat.label}</div>
    </motion.div>

    {/* Market Gap */}
    <motion.div
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-center"
    >
      <div className="text-sm font-bold text-red-700 mb-1">{pitchDeckData.problem.marketGap.title}</div>
      <div className="text-xs text-red-600">{pitchDeckData.problem.marketGap.description}</div>
    </motion.div>

    {/* Problem Points - vertical list on mobile */}
    <div className="space-y-3">
      {pitchDeckData.problem.points.map((point, index) => (
        <motion.div
          key={point.title}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-gray-900">{point.title}</h3>
            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">
              {point.metric}
            </span>
          </div>
          <p className="text-xs text-gray-600">{point.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);
