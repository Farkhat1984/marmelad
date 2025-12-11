import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';

export const MarketSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-5xl font-bold text-gray-900 mb-12 text-center">
      {pitchDeckData.market.title}
    </h2>

    {/* TAM SAM SOM */}
    <div className="flex justify-center items-center gap-4 mb-12 max-w-4xl mx-auto">
      {Object.entries(pitchDeckData.market.data).map(([key, data], index) => (
        <motion.div
          key={key}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.15 }}
          className={`text-center p-6 rounded-2xl border-2 ${
            key === 'som' ? 'border-marmelat-dark-pink bg-marmelat-light-pink' : 'border-gray-200 bg-white'
          } ${key === 'tam' ? 'w-64' : key === 'sam' ? 'w-56' : 'w-48'}`}
        >
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{key}</div>
          <div className="text-4xl font-bold text-gray-900 mb-1">{data.value}</div>
          <div className="text-sm text-gray-600 mb-2">{data.label}</div>
          {data.growth && (
            <div className="text-sm text-green-600 font-medium">{data.growth}</div>
          )}
        </motion.div>
      ))}
    </div>

    {/* Key Insights */}
    <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
      {pitchDeckData.market.keyInsights.map((insight, index) => (
        <motion.div
          key={insight.label}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="bg-white rounded-xl p-4 border border-gray-200 text-center"
        >
          <div className="text-2xl font-bold text-marmelat-dark-pink mb-1">{insight.metric}</div>
          <div className="text-xs text-gray-600">{insight.label}</div>
        </motion.div>
      ))}
    </div>

    {/* Export Markets */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="max-w-3xl mx-auto"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Экспортные рынки</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {pitchDeckData.market.exportMarkets.map((market) => (
          <div
            key={market.name}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              market.status === 'priority'
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}
          >
            {market.name} ({market.population})
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);
