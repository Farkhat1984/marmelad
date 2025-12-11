import { pitchDeckData } from '../../../../data/pitchDeckData';

export const TractionSlide = () => (
  <div className="h-full px-16 py-12">
    <h2 className="text-5xl font-bold text-gray-900 mb-3 text-center">
      {pitchDeckData.traction.title}
    </h2>
    <p className="text-xl text-center text-gray-600 mb-8">{pitchDeckData.traction.highlight}</p>

    {/* KPIs */}
    <div className="grid grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
      {pitchDeckData.traction.kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm text-center"
        >
          <div className="text-4xl font-bold text-gray-900 mb-2">{kpi.value}</div>
          <div className="text-sm text-gray-600">{kpi.label}</div>
          {kpi.growth && (
            <div className="flex items-center justify-center gap-1 mt-3 text-green-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="text-sm font-medium">{kpi.growth}</span>
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Timeline - horizontal */}
    <div className="max-w-5xl mx-auto mb-10">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Ключевые этапы</h3>
      <div className="flex justify-center items-center gap-6">
        {pitchDeckData.traction.milestones.map((milestone, index) => (
          <div key={milestone.year} className="flex items-center">
            <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-sm text-center min-w-[200px]">
              <div className="font-bold text-xl" style={{ color: '#E8A5C4' }}>{milestone.year}</div>
              <div className="text-gray-700">{milestone.event}</div>
            </div>
            {index < pitchDeckData.traction.milestones.length - 1 && (
              <div className="w-10 h-1 bg-gray-300 mx-3" />
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Retailers */}
    <div className="max-w-5xl mx-auto">
      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Ритейл-партнёры</h3>
      <div className="grid grid-cols-6 gap-4">
        {pitchDeckData.traction.retailers.map((retailer) => (
          <div key={retailer.name} className="bg-white rounded-xl p-4 border-2 border-gray-200 text-center">
            <div className="font-bold text-gray-900">{retailer.name}</div>
            <div className="text-xs text-gray-500">{retailer.type}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
