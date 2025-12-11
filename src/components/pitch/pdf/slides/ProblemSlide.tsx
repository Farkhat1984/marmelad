import { pitchDeckData } from '../../../../data/pitchDeckData';

export const ProblemSlide = () => (
  <div className="h-full px-16 py-16">
    <h2 className="text-6xl font-bold text-gray-900 mb-8 text-center">
      {pitchDeckData.problem.title}
    </h2>

    {/* Main Stat */}
    <div className="max-w-3xl mx-auto mb-12 text-center">
      <div className="text-[120px] font-bold text-red-500 leading-none mb-4">
        {pitchDeckData.problem.mainStat.value}
      </div>
      <div className="text-2xl text-gray-600">{pitchDeckData.problem.mainStat.label}</div>
    </div>

    {/* Market Gap */}
    <div className="max-w-4xl mx-auto mb-12 bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
      <div className="text-2xl font-bold text-red-700 mb-3">{pitchDeckData.problem.marketGap.title}</div>
      <div className="text-xl text-red-600">{pitchDeckData.problem.marketGap.description}</div>
    </div>

    {/* Problem Points */}
    <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
      {pitchDeckData.problem.points.map((point) => (
        <div
          key={point.title}
          className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900">{point.title}</h3>
            <span className="px-4 py-2 bg-red-100 text-red-700 text-lg font-bold rounded-xl">
              {point.metric}
            </span>
          </div>
          <p className="text-lg text-gray-600">{point.description}</p>
        </div>
      ))}
    </div>
  </div>
);
