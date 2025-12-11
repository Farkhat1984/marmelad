import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';

export const ProblemSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-5xl font-bold text-gray-900 mb-4 text-center">
      {pitchDeckData.problem.title}
    </h2>

    {/* Main Stat */}
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="max-w-2xl mx-auto mb-12 text-center"
    >
      <div className="text-8xl font-bold text-red-500 mb-2">
        {pitchDeckData.problem.mainStat.value}
      </div>
      <div className="text-xl text-gray-600">{pitchDeckData.problem.mainStat.label}</div>
    </motion.div>

    {/* Market Gap */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="max-w-3xl mx-auto mb-12 bg-red-50 border border-red-200 rounded-xl p-6 text-center"
    >
      <div className="text-lg font-bold text-red-700 mb-2">{pitchDeckData.problem.marketGap.title}</div>
      <div className="text-red-600">{pitchDeckData.problem.marketGap.description}</div>
    </motion.div>

    {/* Problem Points */}
    <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
      {pitchDeckData.problem.points.map((point, index) => (
        <motion.div
          key={point.title}
          initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-gray-900">{point.title}</h3>
            <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-lg">
              {point.metric}
            </span>
          </div>
          <p className="text-gray-600">{point.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);
