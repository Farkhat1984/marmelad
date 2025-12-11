import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';
import { DonutChart } from '../../shared/charts/DonutChart';

export const InvestmentSlide = () => (
  <div className="h-full px-4 py-6 overflow-y-auto">
    <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
      {pitchDeckData.investment.title}
    </h2>

    {/* Key Terms - 2x2 grid */}
    <div className="grid grid-cols-2 gap-2 mb-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center bg-marmelat-dark-pink text-white rounded-lg p-3"
      >
        <div className="text-xl font-bold">{pitchDeckData.investment.amount}</div>
        <div className="text-xs opacity-80">Raising</div>
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center bg-white rounded-lg p-3 border border-gray-200"
      >
        <div className="text-xl font-bold text-gray-900">{pitchDeckData.investment.equity}</div>
        <div className="text-xs text-gray-500">Equity</div>
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center bg-white rounded-lg p-3 border border-gray-200"
      >
        <div className="text-xl font-bold text-gray-900">{pitchDeckData.investment.preMoneyValuation}</div>
        <div className="text-xs text-gray-500">Pre-Money</div>
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center bg-green-100 rounded-lg p-3 border border-green-200"
      >
        <div className="text-xl font-bold text-green-700">{pitchDeckData.investment.exitStrategy.targetROI}</div>
        <div className="text-xs text-green-600">Target ROI</div>
      </motion.div>
    </div>

    {/* Use of Funds - vertical layout */}
    <div className="mb-6">
      <h3 className="text-sm font-bold text-gray-900 mb-3">Использование средств</h3>
      <DonutChart data={pitchDeckData.investment.useOfFunds} animated={true} layout="vertical" className="items-start" />
    </div>

    {/* Milestones - simplified */}
    <div className="mb-4">
      <h3 className="text-sm font-bold text-gray-900 mb-3">Milestones</h3>
      <div className="space-y-2">
        {pitchDeckData.investment.milestones.map((item, index) => (
          <motion.div
            key={item.milestone}
            initial={{ x: 15, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200"
          >
            <div className="w-14 h-8 bg-marmelat-light-pink rounded flex items-center justify-center font-bold text-marmelat-dark-pink text-xs">
              {item.milestone}
            </div>
            <div className="text-xs text-gray-700">{item.target}</div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Exit Strategy - simplified */}
    <motion.div
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
    >
      <h4 className="font-bold text-sm text-gray-900 mb-2">Exit ({pitchDeckData.investment.exitStrategy.timeline})</h4>
      <ul className="space-y-1">
        {pitchDeckData.investment.exitStrategy.options.map((option) => (
          <li key={option} className="flex items-center gap-2 text-xs text-gray-600">
            <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {option}
          </li>
        ))}
      </ul>
    </motion.div>
  </div>
);
