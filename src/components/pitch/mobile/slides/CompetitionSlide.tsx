import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';

export const CompetitionSlide = () => (
  <div className="h-full px-4 py-6 overflow-y-auto">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
      {pitchDeckData.competition.title}
    </h2>

    {/* Simplified Competitive Position - just show competitors list */}
    <div className="mb-6">
      <h3 className="text-sm font-bold text-gray-900 mb-3 text-center">Позиционирование</h3>
      <div className="grid grid-cols-2 gap-2">
        {pitchDeckData.competition.matrix.map((competitor, index) => (
          <motion.div
            key={competitor.name}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-lg p-3 text-center border-2 ${
              competitor.isMarmelat
                ? 'border-marmelat-dark-pink bg-marmelat-light-pink'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className={`text-sm font-bold ${competitor.isMarmelat ? 'text-marmelat-dark-pink' : 'text-gray-700'}`}>
              {competitor.name}
            </div>
            <div className="text-[10px] text-gray-500 mt-1">
              Качество: {competitor.quality}/10 | Цена: {competitor.price}/10
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Advantages - vertical list */}
    <div>
      <h3 className="text-sm font-bold text-gray-900 mb-3">Конкурентные преимущества</h3>
      <div className="space-y-2">
        {pitchDeckData.competition.advantages.map((adv, index) => (
          <motion.div
            key={adv.title}
            initial={{ x: 15, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="p-3 bg-gray-50 font-bold text-sm text-gray-900">{adv.title}</div>
            <div className="grid grid-cols-2">
              <div className="p-2 bg-green-50 text-xs text-green-700">{adv.marmelat}</div>
              <div className="p-2 text-xs text-gray-500">{adv.competitors}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);
