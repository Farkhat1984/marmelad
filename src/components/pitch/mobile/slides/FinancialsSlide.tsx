import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';
import { RevenueChart } from '../../shared/charts/RevenueChart';

export const FinancialsSlide = () => {
  const allRevenue = [
    ...pitchDeckData.financials.historicalRevenue,
    ...pitchDeckData.financials.projections.map(p => ({ year: p.year, revenue: p.revenue })),
  ];

  return (
    <div className="h-full px-4 py-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        {pitchDeckData.financials.title}
      </h2>

      {/* Key Metrics - 3 column */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white rounded-lg p-2 border border-gray-200"
        >
          <div className="text-lg font-bold" style={{ color: '#16a34a' }}>{pitchDeckData.financials.keyMetrics.cagr}</div>
          <div className="text-[10px] text-gray-600">CAGR</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center bg-white rounded-lg p-2 border border-gray-200"
        >
          <div className="text-lg font-bold text-gray-900">{pitchDeckData.financials.keyMetrics.breakeven}</div>
          <div className="text-[10px] text-gray-600">Breakeven</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center bg-white rounded-lg p-2 border border-gray-200"
        >
          <div className="text-lg font-bold" style={{ color: '#E8A5C4' }}>{pitchDeckData.financials.keyMetrics.targetValuation}</div>
          <div className="text-[10px] text-gray-600">Valuation</div>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-gray-900 mb-2 text-center">Выручка и прогноз</h3>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <RevenueChart data={allRevenue} animated={true} className="h-40" />
        </div>
      </div>

      {/* EBITDA Table - simplified */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-sm font-bold text-gray-900 mb-2 text-center">EBITDA Projection</h3>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left text-gray-600">Год</th>
                <th className="p-2 text-right text-gray-600">Выручка</th>
                <th className="p-2 text-right text-gray-600">Margin</th>
              </tr>
            </thead>
            <tbody>
              {pitchDeckData.financials.projections.map((proj) => (
                <tr key={proj.year} className="border-t border-gray-100">
                  <td className="p-2 font-bold text-gray-900">{proj.year}</td>
                  <td className="p-2 text-right text-gray-700">{proj.revenueFormatted}</td>
                  <td className="p-2 text-right font-bold" style={{ color: '#16a34a' }}>{proj.ebitdaMargin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
