import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';
import { CompetitiveMatrix } from '../../shared/charts/CompetitiveMatrix';

export const CompetitionSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-5xl font-bold text-gray-900 mb-12 text-center">
      {pitchDeckData.competition.title}
    </h2>

    <div className="grid grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Competitive Matrix */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Позиционирование</h3>
        <CompetitiveMatrix data={pitchDeckData.competition.matrix} animated={true} />
      </div>

      {/* Advantages Table */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Конкурентные преимущества</h3>
        <div className="space-y-3">
          {pitchDeckData.competition.advantages.map((adv, index) => (
            <motion.div
              key={adv.title}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <div className="grid grid-cols-3">
                <div className="p-4 bg-gray-50 font-bold text-gray-900">{adv.title}</div>
                <div className="p-4 bg-green-50 text-green-700">{adv.marmelat}</div>
                <div className="p-4 text-gray-500">{adv.competitors}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
