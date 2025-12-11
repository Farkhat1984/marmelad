import { pitchDeckData } from '../../../../data/pitchDeckData';
import { RevenueChart } from '../../shared/charts/RevenueChart';

export const FinancialsSlide = () => {
  const allRevenue = [
    ...pitchDeckData.financials.historicalRevenue,
    ...pitchDeckData.financials.projections.map(p => ({ year: p.year, revenue: p.revenue })),
  ];

  return (
    <div className="h-full px-16 py-12">
      <h2 className="text-5xl font-bold text-gray-900 mb-8 text-center">
        {pitchDeckData.financials.title}
      </h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
        <div className="text-center bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="text-4xl font-bold" style={{ color: '#16a34a' }}>{pitchDeckData.financials.keyMetrics.cagr}</div>
          <div className="text-lg text-gray-600">CAGR (2025-2029)</div>
        </div>
        <div className="text-center bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="text-4xl font-bold text-gray-900">{pitchDeckData.financials.keyMetrics.breakeven}</div>
          <div className="text-lg text-gray-600">Breakeven</div>
        </div>
        <div className="text-center bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="text-4xl font-bold" style={{ color: '#E8A5C4' }}>{pitchDeckData.financials.keyMetrics.targetValuation}</div>
          <div className="text-lg text-gray-600">Target Valuation</div>
        </div>
      </div>

      {/* Two column layout for chart and table */}
      <div className="grid grid-cols-2 gap-10 max-w-7xl mx-auto">
        {/* Revenue Chart */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Выручка и прогноз</h3>
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <RevenueChart data={allRevenue} animated={false} />
          </div>
        </div>

        {/* EBITDA Projections Table */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">EBITDA Margin Projection</h3>
          <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left text-gray-600 text-lg">Год</th>
                  <th className="p-4 text-right text-gray-600 text-lg">Выручка</th>
                  <th className="p-4 text-right text-gray-600 text-lg">EBITDA</th>
                  <th className="p-4 text-right text-gray-600 text-lg">Margin</th>
                </tr>
              </thead>
              <tbody>
                {pitchDeckData.financials.projections.map((proj) => (
                  <tr key={proj.year} className="border-t border-gray-100">
                    <td className="p-4 font-bold text-gray-900 text-lg">{proj.year}</td>
                    <td className="p-4 text-right text-gray-700 text-lg">{proj.revenueFormatted}</td>
                    <td className="p-4 text-right text-gray-700 text-lg">${(proj.ebitda / 1000000).toFixed(proj.ebitda >= 1000000 ? 1 : 2)}M</td>
                    <td className="p-4 text-right font-bold text-lg" style={{ color: '#16a34a' }}>{proj.ebitdaMargin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
