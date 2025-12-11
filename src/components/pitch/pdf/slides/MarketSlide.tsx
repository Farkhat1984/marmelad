import { pitchDeckData } from '../../../../data/pitchDeckData';

export const MarketSlide = () => (
  <div className="h-full px-16 py-16">
    <h2 className="text-6xl font-bold text-gray-900 mb-12 text-center">
      {pitchDeckData.market.title}
    </h2>

    {/* TAM SAM SOM */}
    <div className="flex justify-center items-center gap-8 mb-12 max-w-5xl mx-auto">
      {Object.entries(pitchDeckData.market.data).map(([key, data]) => (
        <div
          key={key}
          className={`text-center p-8 rounded-3xl border-2 ${
            key === 'som' ? 'border-marmelat-dark-pink bg-marmelat-light-pink' : 'border-gray-200 bg-white'
          } ${key === 'tam' ? 'w-80' : key === 'sam' ? 'w-72' : 'w-64'}`}
        >
          <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">{key}</div>
          <div className="text-5xl font-bold text-gray-900 mb-2">{data.value}</div>
          <div className="text-lg text-gray-600 mb-3">{data.label}</div>
          {data.growth && (
            <div className="text-lg text-green-600 font-medium">{data.growth}</div>
          )}
        </div>
      ))}
    </div>

    {/* Key Insights */}
    <div className="grid grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
      {pitchDeckData.market.keyInsights.map((insight) => (
        <div
          key={insight.label}
          className="bg-white rounded-2xl p-6 border-2 border-gray-200 text-center"
        >
          <div className="text-3xl font-bold text-marmelat-dark-pink mb-2">{insight.metric}</div>
          <div className="text-sm text-gray-600">{insight.label}</div>
        </div>
      ))}
    </div>

    {/* Export Markets */}
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Экспортные рынки</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {pitchDeckData.market.exportMarkets.map((market) => (
          <div
            key={market.name}
            className={`px-6 py-3 rounded-xl text-lg font-medium ${
              market.status === 'priority'
                ? 'bg-green-100 text-green-700 border-2 border-green-200'
                : 'bg-gray-100 text-gray-600 border-2 border-gray-200'
            }`}
          >
            {market.name} ({market.population})
          </div>
        ))}
      </div>
    </div>
  </div>
);
