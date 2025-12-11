import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';
import { DonutChart } from '../../shared/charts/DonutChart';

export const InvestmentSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-5xl font-bold text-gray-900 mb-12 text-center">
      {pitchDeckData.investment.title}
    </h2>

    {/* Key Terms */}
    <div className="flex justify-center gap-6 mb-12 flex-wrap">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center bg-marmelat-dark-pink text-white rounded-xl p-6 min-w-[150px]"
      >
        <div className="text-3xl font-bold">{pitchDeckData.investment.amount}</div>
        <div className="text-sm opacity-80">Raising</div>
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center bg-white rounded-xl p-6 border border-gray-200 min-w-[150px]"
      >
        <div className="text-3xl font-bold text-gray-900">{pitchDeckData.investment.equity}</div>
        <div className="text-sm text-gray-500">Equity</div>
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center bg-white rounded-xl p-6 border border-gray-200 min-w-[150px]"
      >
        <div className="text-3xl font-bold text-gray-900">{pitchDeckData.investment.preMoneyValuation}</div>
        <div className="text-sm text-gray-500">Pre-Money</div>
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center bg-green-100 rounded-xl p-6 border border-green-200 min-w-[150px]"
      >
        <div className="text-3xl font-bold text-green-700">{pitchDeckData.investment.exitStrategy.targetROI}</div>
        <div className="text-sm text-green-600">Target ROI</div>
      </motion.div>
    </div>

    <div className="grid grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Use of Funds */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Использование средств</h3>
        <DonutChart data={pitchDeckData.investment.useOfFunds} animated={true} />
      </div>

      {/* Milestones */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Milestones</h3>
        <div className="space-y-4">
          {pitchDeckData.investment.milestones.map((item, index) => (
            <motion.div
              key={item.milestone}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200"
            >
              <div className="w-20 h-10 bg-marmelat-light-pink rounded-lg flex items-center justify-center font-bold text-marmelat-dark-pink text-sm">
                {item.milestone}
              </div>
              <div className="text-gray-700">{item.target}</div>
            </motion.div>
          ))}
        </div>

        {/* Exit Strategy */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200"
        >
          <h4 className="font-bold text-gray-900 mb-3">Exit Strategy ({pitchDeckData.investment.exitStrategy.timeline})</h4>
          <ul className="space-y-2">
            {pitchDeckData.investment.exitStrategy.options.map((option) => (
              <li key={option} className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {option}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </div>
);
