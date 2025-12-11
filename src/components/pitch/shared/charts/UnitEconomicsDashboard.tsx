import { motion } from 'framer-motion';
import type { UnitEconomicsItem, ChartProps } from '../types';

interface UnitEconomicsDashboardProps extends ChartProps {
  data: UnitEconomicsItem[];
  className?: string;
  columns?: 2 | 3;
}

export const UnitEconomicsDashboard = ({
  data,
  animated = true,
  className = '',
  columns = 3
}: UnitEconomicsDashboardProps) => {
  const gridCols = columns === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3';

  return (
    <div className={`grid ${gridCols} gap-4 ${className}`}>
      {data.map((item, index) => {
        const content = (
          <>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{item.metric}</div>
            <div className={`text-2xl font-bold ${item.isGood ? 'text-green-600' : 'text-gray-900'}`}>
              {item.value}
            </div>
            {item.benchmark && (
              <div className="text-xs text-gray-400 mt-1">{item.benchmark}</div>
            )}
            {item.isGood && (
              <div className="flex items-center gap-1 mt-2">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs text-green-600">Above benchmark</span>
              </div>
            )}
          </>
        );

        return animated ? (
          <motion.div
            key={item.metric}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
          >
            {content}
          </motion.div>
        ) : (
          <div
            key={item.metric}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};
