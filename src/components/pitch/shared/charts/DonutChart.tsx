import { motion } from 'framer-motion';
import type { DonutDataItem, ChartProps } from '../types';

interface DonutChartProps extends ChartProps {
  data: DonutDataItem[];
  className?: string;
  layout?: 'horizontal' | 'vertical';
}

export const DonutChart = ({ data, animated = true, className = '', layout = 'horizontal' }: DonutChartProps) => {
  const size = 200;
  const strokeWidth = 35;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const colors = ['#E8A5C4', '#F5BED7', '#fda4af', '#fb7185', '#f43f5e'];

  let currentOffset = 0;

  const layoutClass = layout === 'horizontal'
    ? 'flex flex-row items-center gap-8'
    : 'flex flex-col items-center gap-6';

  return (
    <div className={`${layoutClass} ${className}`}>
      <div className="flex-shrink-0 w-[200px] h-[200px]">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f3f4f6" strokeWidth={strokeWidth} />
          {data.map((item, index) => {
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -currentOffset;
            currentOffset += (item.percentage / 100) * circumference;

            return animated ? (
              <motion.circle
                key={item.category}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={colors[index % colors.length]}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={{ strokeDasharray }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              />
            ) : (
              <circle
                key={item.category}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={colors[index % colors.length]}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
              />
            );
          })}
        </svg>
      </div>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={item.category} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: colors[index % colors.length] }} />
            <div>
              <div className="text-sm font-medium text-gray-900">{item.percentage}% — {item.category}</div>
              <div className="text-xs text-gray-500">{item.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
