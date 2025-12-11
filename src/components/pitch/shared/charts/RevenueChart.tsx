import { motion } from 'framer-motion';
import type { RevenueDataPoint, ChartProps } from '../types';

// Format revenue for display
const formatRevenue = (revenue: number): string => {
  if (revenue >= 1000000) {
    return `$${(revenue / 1000000).toFixed(1)}M`;
  } else if (revenue >= 1000) {
    return `$${(revenue / 1000).toFixed(0)}K`;
  }
  return `$${revenue}`;
};

interface RevenueChartProps extends ChartProps {
  data: RevenueDataPoint[];
  className?: string;
}

export const RevenueChart = ({ data, animated = true, className = '' }: RevenueChartProps) => {
  const chartHeight = 180;
  const chartWidth = 500;
  const padding = { top: 40, right: 20, bottom: 40, left: 20 };

  // Fixed visual Y positions (from bottom, as percentage)
  const visualYPercents = [85, 70, 55, 40, 25, 10];

  const points = data.map((item, index) => {
    const x = padding.left + (index / (data.length - 1)) * (chartWidth - padding.left - padding.right);
    const yPercent = visualYPercents[index] || 50;
    const y = padding.top + (yPercent / 100) * (chartHeight - padding.top - padding.bottom);
    return { x, y, ...item };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className={`w-full h-56 ${className}`}>
      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((ratio) => (
        <line
          key={ratio}
          x1={padding.left}
          y1={padding.top + ratio * (chartHeight - padding.top - padding.bottom)}
          x2={chartWidth - padding.right}
          y2={padding.top + ratio * (chartHeight - padding.top - padding.bottom)}
          stroke="#e5e7eb"
          strokeDasharray="4"
        />
      ))}

      {/* Line */}
      {animated ? (
        <motion.path
          d={linePath}
          fill="none"
          stroke="#E8A5C4"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      ) : (
        <path
          d={linePath}
          fill="none"
          stroke="#E8A5C4"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Points and labels */}
      {points.map((point, index) => {
        const isProjection = parseInt(point.year) >= 2026;
        return (
          <g key={point.year}>
            {animated ? (
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                fill={isProjection ? "#22c55e" : "#E8A5C4"}
                stroke="white"
                strokeWidth="2"
              />
            ) : (
              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                fill={isProjection ? "#22c55e" : "#E8A5C4"}
                stroke="white"
                strokeWidth="2"
              />
            )}
            {/* Value label */}
            {animated ? (
              <motion.text
                x={point.x}
                y={point.y - 15}
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                fill="#111827"
                style={{ fontSize: '11px', fontWeight: 'bold' }}
              >
                {formatRevenue(point.revenue)}
              </motion.text>
            ) : (
              <text
                x={point.x}
                y={point.y - 15}
                textAnchor="middle"
                fill="#111827"
                style={{ fontSize: '11px', fontWeight: 'bold' }}
              >
                {formatRevenue(point.revenue)}
              </text>
            )}
            {/* Year label */}
            <text
              x={point.x}
              y={chartHeight - 10}
              textAnchor="middle"
              fill="#4b5563"
              style={{ fontSize: '11px' }}
            >
              {point.year}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <g>
        <circle cx={30} cy={15} r="5" fill="#E8A5C4" />
        <text x={40} y={18} fill="#4b5563" style={{ fontSize: '11px' }}>Факт</text>
        <circle cx={90} cy={15} r="5" fill="#22c55e" />
        <text x={100} y={18} fill="#4b5563" style={{ fontSize: '11px' }}>Прогноз</text>
      </g>
    </svg>
  );
};
