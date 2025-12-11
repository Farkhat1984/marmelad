import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';

export const MarketSlide = () => (
  <div className="h-full px-4 py-6 overflow-y-auto">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
      {pitchDeckData.market.title}
    </h2>

    {/* TAM SAM SOM - vertical on mobile */}
    <div className="space-y-3 mb-6">
      {Object.entries(pitchDeckData.market.data).map(([key, data], index) => (
        <motion.div
          key={key}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`text-center p-4 rounded-xl border-2 ${
            key === 'som' ? 'border-marmelat-dark-pink bg-marmelat-light-pink' : 'border-gray-200 bg-white'
          }`}
        >
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{key}</div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{data.value}</div>
          <div className="text-xs text-gray-600 mb-1">{data.label}</div>
          {data.growth && (
            <div className="text-xs text-green-600 font-medium">{data.growth}</div>
          )}
        </motion.div>
      ))}
    </div>

    {/* Key Insights - 2x2 grid */}
    <div className="grid grid-cols-2 gap-2 mb-6">
      {pitchDeckData.market.keyInsights.map((insight, index) => (
        <motion.div
          key={insight.label}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.05 }}
          className="bg-white rounded-lg p-3 border border-gray-200 text-center"
        >
          <div className="text-lg font-bold text-marmelat-dark-pink mb-0.5">{insight.metric}</div>
          <div className="text-[10px] text-gray-600">{insight.label}</div>
        </motion.div>
      ))}
    </div>

    {/* Export Markets */}
    <motion.div
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <h3 className="text-sm font-bold text-gray-900 mb-3 text-center">Экспортные рынки</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {pitchDeckData.market.exportMarkets.map((market) => (
          <div
            key={market.name}
            className={`px-2 py-1 rounded text-xs font-medium ${
              market.status === 'priority'
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}
          >
            {market.name}
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);
