import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';

export const BusinessModelSlide = () => (
  <div className="h-full px-4 py-6 overflow-y-auto">
    <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
      {pitchDeckData.businessModel.title}
    </h2>
    <p className="text-xs text-center text-gray-600 mb-6">{pitchDeckData.businessModel.model}</p>

    {/* Sales Channels */}
    <div className="mb-6">
      <h3 className="text-sm font-bold text-gray-900 mb-3">Каналы продаж</h3>
      <div className="space-y-3">
        {pitchDeckData.businessModel.channels.map((channel, index) => (
          <motion.div
            key={channel.name}
            initial={{ x: -15, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-3 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-gray-900">{channel.name}</span>
                {channel.trend === 'up' && (
                  <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
              </div>
              <span className="text-lg font-bold text-marmelat-dark-pink">{channel.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${channel.percentage}%` }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                className="bg-marmelat-dark-pink h-1.5 rounded-full"
              />
            </div>
            <p className="text-[10px] text-gray-600">{channel.description}</p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Unit Economics - 2 column grid */}
    <div>
      <h3 className="text-sm font-bold text-gray-900 mb-3">Unit Economics</h3>
      <div className="grid grid-cols-2 gap-2">
        {pitchDeckData.businessModel.unitEconomics.map((item, index) => (
          <motion.div
            key={item.metric}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.05 }}
            className="bg-white rounded-lg p-3 border border-gray-200"
          >
            <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">{item.metric}</div>
            <div className={`text-lg font-bold ${item.isGood ? 'text-green-600' : 'text-gray-900'}`}>
              {item.value}
            </div>
            {item.isGood && (
              <div className="flex items-center gap-1 mt-1">
                <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[10px] text-green-600">Above benchmark</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);
