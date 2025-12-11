import { pitchDeckData } from '../../../../data/pitchDeckData';
import { DonutChart } from '../../shared/charts/DonutChart';

export const InvestmentSlide = () => (
  <div className="h-full px-16 py-12">
    <h2 className="text-5xl font-bold text-gray-900 mb-10 text-center">
      {pitchDeckData.investment.title}
    </h2>

    {/* Key Terms */}
    <div className="flex justify-center gap-8 mb-10 flex-wrap">
      <div className="text-center bg-marmelat-dark-pink text-white rounded-2xl p-6 min-w-[180px]">
        <div className="text-4xl font-bold">{pitchDeckData.investment.amount}</div>
        <div className="text-lg opacity-80">Raising</div>
      </div>
      <div className="text-center bg-white rounded-2xl p-6 border-2 border-gray-200 min-w-[180px]">
        <div className="text-4xl font-bold text-gray-900">{pitchDeckData.investment.equity}</div>
        <div className="text-lg text-gray-500">Equity</div>
      </div>
      <div className="text-center bg-white rounded-2xl p-6 border-2 border-gray-200 min-w-[180px]">
        <div className="text-4xl font-bold text-gray-900">{pitchDeckData.investment.preMoneyValuation}</div>
        <div className="text-lg text-gray-500">Pre-Money</div>
      </div>
      <div className="text-center bg-green-100 rounded-2xl p-6 border-2 border-green-200 min-w-[180px]">
        <div className="text-4xl font-bold text-green-700">{pitchDeckData.investment.exitStrategy.targetROI}</div>
        <div className="text-lg text-green-600">Target ROI</div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-12 max-w-7xl mx-auto">
      {/* Use of Funds */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Использование средств</h3>
        <DonutChart data={pitchDeckData.investment.useOfFunds} animated={false} />
      </div>

      {/* Milestones */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Milestones</h3>
        <div className="space-y-4">
          {pitchDeckData.investment.milestones.map((item) => (
            <div
              key={item.milestone}
              className="flex items-center gap-6 bg-white rounded-2xl p-5 border-2 border-gray-200"
            >
              <div className="w-24 h-12 bg-marmelat-light-pink rounded-xl flex items-center justify-center font-bold text-marmelat-dark-pink text-lg">
                {item.milestone}
              </div>
              <div className="text-lg text-gray-700">{item.target}</div>
            </div>
          ))}
        </div>

        {/* Exit Strategy */}
        <div className="mt-6 bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
          <h4 className="font-bold text-lg text-gray-900 mb-4">Exit Strategy ({pitchDeckData.investment.exitStrategy.timeline})</h4>
          <ul className="space-y-3">
            {pitchDeckData.investment.exitStrategy.options.map((option) => (
              <li key={option} className="flex items-center gap-3 text-lg text-gray-600">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);
