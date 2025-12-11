import { pitchDeckData } from '../../../../data/pitchDeckData';
import { CompetitiveMatrix } from '../../shared/charts/CompetitiveMatrix';

export const CompetitionSlide = () => (
  <div className="h-full px-16 py-16">
    <h2 className="text-6xl font-bold text-gray-900 mb-12 text-center">
      {pitchDeckData.competition.title}
    </h2>

    <div className="grid grid-cols-2 gap-16 max-w-7xl mx-auto">
      {/* Competitive Matrix */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Позиционирование</h3>
        <CompetitiveMatrix data={pitchDeckData.competition.matrix} animated={false} />
      </div>

      {/* Advantages Table */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Конкурентные преимущества</h3>
        <div className="space-y-4">
          {pitchDeckData.competition.advantages.map((adv) => (
            <div
              key={adv.title}
              className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden"
            >
              <div className="grid grid-cols-3">
                <div className="p-5 bg-gray-50 font-bold text-lg text-gray-900">{adv.title}</div>
                <div className="p-5 bg-green-50 text-lg text-green-700">{adv.marmelat}</div>
                <div className="p-5 text-lg text-gray-500">{adv.competitors}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
