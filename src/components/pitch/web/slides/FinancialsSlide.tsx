import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';
import { RevenueChart } from '../../shared/charts/RevenueChart';

export const FinancialsSlide = () => {
  const allRevenue = [
    ...pitchDeckData.financials.historicalRevenue,
    ...pitchDeckData.financials.projections.map(p => ({ year: p.year, revenue: p.revenue })),
  ];

  return (
    <div className="h-full px-8 py-6 overflow-y-auto">
      <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        {pitchDeckData.financials.title}
      </h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white rounded-xl p-4 border border-gray-200"
        >
          <div className="text-3xl font-bold" style={{ color: '#16a34a' }}>{pitchDeckData.financials.keyMetrics.cagr}</div>
          <div className="text-sm text-gray-600">CAGR (2025-2029)</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center bg-white rounded-xl p-4 border border-gray-200"
        >
          <div className="text-3xl font-bold text-gray-900">{pitchDeckData.financials.keyMetrics.breakeven}</div>
          <div className="text-sm text-gray-600">Breakeven</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center bg-white rounded-xl p-4 border border-gray-200"
        >
          <div className="text-3xl font-bold" style={{ color: '#E8A5C4' }}>{pitchDeckData.financials.keyMetrics.targetValuation}</div>
          <div className="text-sm text-gray-600">Target Valuation</div>
        </motion.div>
      </div>

      {/* Two column layout for chart and table */}
      <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Revenue Chart */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Выручка и прогноз</h3>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <RevenueChart data={allRevenue} animated={true} />
          </div>
        </div>

        {/* EBITDA Projections Table */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">EBITDA Margin Projection</h3>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
            <table className="w-full min-w-[300px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left text-gray-600 text-sm">Год</th>
                  <th className="p-3 text-right text-gray-600 text-sm">Выручка</th>
                  <th className="p-3 text-right text-gray-600 text-sm">EBITDA</th>
                  <th className="p-3 text-right text-gray-600 text-sm">Margin</th>
                </tr>
              </thead>
              <tbody>
                {pitchDeckData.financials.projections.map((proj) => (
                  <tr key={proj.year} className="border-t border-gray-100">
                    <td className="p-3 font-bold text-gray-900 text-sm">{proj.year}</td>
                    <td className="p-3 text-right text-gray-700 text-sm">{proj.revenueFormatted}</td>
                    <td className="p-3 text-right text-gray-700 text-sm">${(proj.ebitda / 1000000).toFixed(proj.ebitda >= 1000000 ? 1 : 2)}M</td>
                    <td className="p-3 text-right font-bold text-sm" style={{ color: '#16a34a' }}>{proj.ebitdaMargin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
