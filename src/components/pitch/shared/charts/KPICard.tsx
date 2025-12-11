import { motion } from 'framer-motion';
import type { KPIData, ChartProps } from '../types';

interface KPICardProps extends KPIData, ChartProps {
  delay?: number;
  className?: string;
}

export const KPICard = ({
  value,
  label,
  growth,
  animated = true,
  delay = 0,
  className = ''
}: KPICardProps) => {
  const content = (
    <>
      <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
      {growth && (
        <div className="flex items-center justify-center gap-1 mt-2 text-green-600">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="text-sm font-medium">{growth}</span>
        </div>
      )}
    </>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay, duration: 0.4 }}
        className={`bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center ${className}`}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className={`bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center ${className}`}>
      {content}
    </div>
  );
};
