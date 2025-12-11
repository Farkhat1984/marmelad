import { motion } from 'framer-motion';
import type { CompetitorData, ChartProps } from '../types';

interface CompetitiveMatrixProps extends ChartProps {
  data: CompetitorData[];
  className?: string;
}

export const CompetitiveMatrix = ({ data, animated = true, className = '' }: CompetitiveMatrixProps) => {
  const size = 400;
  const padding = 60;
  const plotSize = size - padding * 2;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={`w-full max-w-md mx-auto ${className}`}>
      {/* Grid */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect x={padding} y={padding} width={plotSize} height={plotSize} fill="url(#grid)" />

      {/* Axes */}
      <line x1={padding} y1={size - padding} x2={size - padding} y2={size - padding} stroke="#374151" strokeWidth="2" />
      <line x1={padding} y1={padding} x2={padding} y2={size - padding} stroke="#374151" strokeWidth="2" />

      {/* Axis Labels */}
      <text x={size / 2} y={size - 15} textAnchor="middle" className="fill-gray-700 text-sm font-medium">
        Цена (ниже = лучше)
      </text>
      <text x={15} y={size / 2} textAnchor="middle" transform={`rotate(-90, 15, ${size / 2})`} className="fill-gray-700 text-sm font-medium">
        Качество
      </text>

      {/* Data Points */}
      {data.map((item, index) => {
        const x = padding + ((10 - item.price) / 10) * plotSize;
        const y = size - padding - (item.quality / 10) * plotSize;
        const pointSize = item.localFocus * 3 + 10;

        return (
          <g key={item.name}>
            {animated ? (
              <motion.circle
                cx={x}
                cy={y}
                r={pointSize}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={item.isMarmelat ? 'fill-marmelat-dark-pink' : 'fill-gray-400'}
              />
            ) : (
              <circle
                cx={x}
                cy={y}
                r={pointSize}
                opacity={0.8}
                className={item.isMarmelat ? 'fill-marmelat-dark-pink' : 'fill-gray-400'}
              />
            )}
            {animated ? (
              <motion.text
                x={x}
                y={y - pointSize - 5}
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`text-xs font-medium ${item.isMarmelat ? 'fill-marmelat-dark-pink' : 'fill-gray-600'}`}
              >
                {item.name}
              </motion.text>
            ) : (
              <text
                x={x}
                y={y - pointSize - 5}
                textAnchor="middle"
                className={`text-xs font-medium ${item.isMarmelat ? 'fill-marmelat-dark-pink' : 'fill-gray-600'}`}
              >
                {item.name}
              </text>
            )}
          </g>
        );
      })}

      {/* Legend for circle size */}
      <text x={size - 80} y={padding + 20} className="fill-gray-500 text-xs">
        Размер = локальный фокус
      </text>
    </svg>
  );
};
