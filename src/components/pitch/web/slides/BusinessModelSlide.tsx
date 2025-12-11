import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';
import { UnitEconomicsDashboard } from '../../shared/charts/UnitEconomicsDashboard';

export const BusinessModelSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-5xl font-bold text-gray-900 mb-4 text-center">
      {pitchDeckData.businessModel.title}
    </h2>
    <p className="text-center text-gray-600 mb-12">{pitchDeckData.businessModel.model}</p>

    <div className="grid grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Sales Channels */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Каналы продаж</h3>
        <div className="space-y-4">
          {pitchDeckData.businessModel.channels.map((channel, index) => (
            <motion.div
              key={channel.name}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{channel.name}</span>
                  {channel.trend === 'up' && (
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  )}
                </div>
                <span className="text-2xl font-bold text-marmelat-dark-pink">{channel.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${channel.percentage}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  className="bg-marmelat-dark-pink h-2 rounded-full"
                />
              </div>
              <p className="text-sm text-gray-600">{channel.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Unit Economics */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Unit Economics</h3>
        <UnitEconomicsDashboard data={pitchDeckData.businessModel.unitEconomics} animated={true} />
      </div>
    </div>
  </div>
);
