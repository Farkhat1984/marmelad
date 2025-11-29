import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pitchDeckData, pitchSlides } from '../data/pitchDeckData';
import { contactInfo } from '../data/brandData';

// ============================================
// CHART COMPONENTS
// ============================================

// Revenue Bar Chart
const RevenueChart = ({ data, maxValue }: { data: { year: string; revenue: number }[]; maxValue: number }) => {
  const chartHeight = 200;
  const barWidth = 60;
  const gap = 40;
  const chartWidth = data.length * (barWidth + gap);

  return (
    <svg viewBox={`0 0 ${chartWidth + 40} ${chartHeight + 60}`} className="w-full h-64">
      {/* Y-axis labels */}
      {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
        <g key={i}>
          <line
            x1="40"
            y1={chartHeight - ratio * chartHeight + 20}
            x2={chartWidth + 40}
            y2={chartHeight - ratio * chartHeight + 20}
            stroke="#e5e7eb"
            strokeDasharray="4"
          />
          <text
            x="35"
            y={chartHeight - ratio * chartHeight + 25}
            textAnchor="end"
            className="fill-gray-500 text-xs"
          >
            ${(maxValue * ratio / 1000000).toFixed(1)}M
          </text>
        </g>
      ))}

      {/* Bars */}
      {data.map((item, index) => {
        const barHeight = (item.revenue / maxValue) * chartHeight;
        const x = 50 + index * (barWidth + gap);
        const y = chartHeight - barHeight + 20;

        return (
          <g key={item.year}>
            <motion.rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx="4"
              initial={{ height: 0, y: chartHeight + 20 }}
              animate={{ height: barHeight, y }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="fill-marmelat-dark-pink"
            />
            <text
              x={x + barWidth / 2}
              y={chartHeight + 45}
              textAnchor="middle"
              className="fill-gray-700 text-sm font-medium"
            >
              {item.year}
            </text>
            <motion.text
              x={x + barWidth / 2}
              y={y - 8}
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="fill-gray-900 text-xs font-bold"
            >
              ${(item.revenue / 1000000).toFixed(1)}M
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
};

// Donut Chart for Use of Funds
const DonutChart = ({ data }: { data: { category: string; percentage: number; amount: string }[] }) => {
  const size = 200;
  const strokeWidth = 35;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const colors = ['#E8A5C4', '#F5BED7', '#fda4af', '#fb7185', '#f43f5e'];

  let currentOffset = 0;

  return (
    <div className="flex items-center gap-8">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f3f4f6" strokeWidth={strokeWidth} />
        {data.map((item, index) => {
          const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
          const strokeDashoffset = -currentOffset;
          currentOffset += (item.percentage / 100) * circumference;

          return (
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
          );
        })}
      </svg>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={item.category} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
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

// Competitive Matrix Scatter Plot
const CompetitiveMatrix = ({ data }: { data: { name: string; price: number; quality: number; localFocus: number; isMarmelat?: boolean }[] }) => {
  const size = 400;
  const padding = 60;
  const plotSize = size - padding * 2;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-md mx-auto">
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
            <motion.circle
              cx={x}
              cy={y}
              r={pointSize}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={item.isMarmelat ? 'fill-marmelat-dark-pink' : 'fill-gray-400'}
            />
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

// Unit Economics Dashboard
const UnitEconomicsDashboard = ({ data }: { data: { metric: string; value: string; benchmark?: string; isGood: boolean }[] }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {data.map((item, index) => (
      <motion.div
        key={item.metric}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
      >
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
      </motion.div>
    ))}
  </div>
);

// KPI Card
const KPICard = ({ value, label, growth, delay = 0 }: { value: string; label: string; growth?: string | null; delay?: number }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, duration: 0.4 }}
    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center"
  >
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
  </motion.div>
);

// ============================================
// SLIDE COMPONENTS
// ============================================

const CoverSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-8">
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-2"
    >
      <span className="inline-block px-4 py-1 bg-marmelat-dark-pink/10 text-marmelat-dark-pink text-sm font-medium rounded-full">
        {pitchDeckData.cover.fundingRound}
      </span>
    </motion.div>
    <motion.h1
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="font-display text-6xl md:text-8xl text-gray-900 mb-4"
    >
      MARMELAT
    </motion.h1>
    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-xl md:text-2xl text-gray-600 max-w-3xl mb-8"
    >
      {pitchDeckData.cover.tagline}
    </motion.p>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex items-center gap-6"
    >
      <div className="text-center">
        <div className="text-4xl font-bold text-marmelat-dark-pink">{pitchDeckData.cover.askAmount}</div>
        <div className="text-sm text-gray-500">Seed Round</div>
      </div>
      <div className="w-px h-12 bg-gray-300" />
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900">{pitchDeckData.cover.year}</div>
        <div className="text-sm text-gray-500">Год</div>
      </div>
    </motion.div>
  </div>
);

const ProblemSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
      {pitchDeckData.problem.title}
    </h2>

    {/* Main Stat */}
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="max-w-2xl mx-auto mb-12 text-center"
    >
      <div className="text-7xl md:text-8xl font-bold text-red-500 mb-2">
        {pitchDeckData.problem.mainStat.value}
      </div>
      <div className="text-xl text-gray-600">{pitchDeckData.problem.mainStat.label}</div>
    </motion.div>

    {/* Market Gap */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="max-w-3xl mx-auto mb-12 bg-red-50 border border-red-200 rounded-xl p-6 text-center"
    >
      <div className="text-lg font-bold text-red-700 mb-2">{pitchDeckData.problem.marketGap.title}</div>
      <div className="text-red-600">{pitchDeckData.problem.marketGap.description}</div>
    </motion.div>

    {/* Problem Points */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {pitchDeckData.problem.points.map((point, index) => (
        <motion.div
          key={point.title}
          initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-gray-900">{point.title}</h3>
            <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-lg">
              {point.metric}
            </span>
          </div>
          <p className="text-gray-600">{point.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const SolutionSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
      {pitchDeckData.solution.title}
    </h2>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-4xl mx-auto mb-8"
    >
      <p className="text-xl md:text-2xl text-center text-gray-700 mb-4">
        {pitchDeckData.solution.mainText}
      </p>
      <p className="text-lg text-center text-marmelat-dark-pink font-medium">
        {pitchDeckData.solution.valueProposition}
      </p>
    </motion.div>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
      {pitchDeckData.solution.features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Product Categories */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="max-w-3xl mx-auto"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Продуктовые категории</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {pitchDeckData.solution.productCategories.map((category) => (
          <span key={category} className="px-4 py-2 bg-marmelat-light-pink text-gray-800 rounded-lg text-sm font-medium">
            {category}
          </span>
        ))}
      </div>
    </motion.div>
  </div>
);

const MarketSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
      {pitchDeckData.market.title}
    </h2>

    {/* TAM SAM SOM */}
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 max-w-4xl mx-auto">
      {Object.entries(pitchDeckData.market.data).map(([key, data], index) => (
        <motion.div
          key={key}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.15 }}
          className={`text-center p-6 rounded-2xl border-2 ${
            key === 'som' ? 'border-marmelat-dark-pink bg-marmelat-light-pink' : 'border-gray-200 bg-white'
          } ${key === 'tam' ? 'w-64' : key === 'sam' ? 'w-56' : 'w-48'}`}
        >
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{key}</div>
          <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{data.value}</div>
          <div className="text-sm text-gray-600 mb-2">{data.label}</div>
          {data.growth && (
            <div className="text-sm text-green-600 font-medium">{data.growth}</div>
          )}
        </motion.div>
      ))}
    </div>

    {/* Key Insights */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
      {pitchDeckData.market.keyInsights.map((insight, index) => (
        <motion.div
          key={insight.label}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="bg-white rounded-xl p-4 border border-gray-200 text-center"
        >
          <div className="text-2xl font-bold text-marmelat-dark-pink mb-1">{insight.metric}</div>
          <div className="text-xs text-gray-600">{insight.label}</div>
        </motion.div>
      ))}
    </div>

    {/* Export Markets */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="max-w-3xl mx-auto"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Экспортные рынки</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {pitchDeckData.market.exportMarkets.map((market) => (
          <div
            key={market.name}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              market.status === 'priority'
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}
          >
            {market.name} ({market.population})
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

const ProductsSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
      {pitchDeckData.products.title}
    </h2>

    {/* Key Metrics */}
    <div className="flex justify-center gap-8 mb-12">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="text-5xl font-bold text-gray-900">{pitchDeckData.products.skuCount}</div>
        <div className="text-gray-600">SKU</div>
      </motion.div>
      <div className="w-px h-16 bg-gray-300" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center"
      >
        <div className="text-5xl font-bold text-green-600">{pitchDeckData.products.avgMargin}%</div>
        <div className="text-gray-600">Avg. Margin</div>
      </motion.div>
    </div>

    {/* Revenue by Category - Bar Chart */}
    <div className="max-w-4xl mx-auto mb-12">
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Доля выручки по категориям</h3>
      <div className="space-y-4">
        {pitchDeckData.products.categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.15 }}
            className="bg-white rounded-xl p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-900">{category.name}</span>
              <span className="text-xl font-bold text-marmelat-dark-pink">{category.revenue}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${category.revenue}%` }}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.8 }}
                className="bg-marmelat-dark-pink h-3 rounded-full"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span key={item} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Pipeline */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="max-w-3xl mx-auto"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Product Pipeline</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {pitchDeckData.products.pipeline.map((product) => (
          <div key={product.name} className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-center">
            <div className="text-sm font-medium text-blue-900">{product.name}</div>
            <div className="text-xs text-blue-600">{product.timeline}</div>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

const BusinessModelSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
      {pitchDeckData.businessModel.title}
    </h2>
    <p className="text-center text-gray-600 mb-12">{pitchDeckData.businessModel.model}</p>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Sales Channels */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Каналы продаж</h3>
        <div className="space-y-4">
          {pitchDeckData.businessModel.channels.map((channel, index) => (
            <motion.div
              key={channel.name}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{channel.name}</span>
                  {channel.trend === 'up' && (
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  )}
                </div>
                <span className="text-2xl font-bold text-marmelat-dark-pink">{channel.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${channel.percentage}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  className="bg-marmelat-dark-pink h-2 rounded-full"
                />
              </div>
              <p className="text-sm text-gray-600">{channel.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Unit Economics */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Unit Economics</h3>
        <UnitEconomicsDashboard data={pitchDeckData.businessModel.unitEconomics} />
      </div>
    </div>
  </div>
);

const TractionSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
      {pitchDeckData.traction.title}
    </h2>
    <p className="text-center text-gray-600 mb-12">{pitchDeckData.traction.highlight}</p>

    {/* KPIs */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
      {pitchDeckData.traction.kpis.map((kpi, index) => (
        <KPICard key={kpi.label} value={kpi.value} label={kpi.label} growth={kpi.growth} delay={index * 0.1} />
      ))}
    </div>

    {/* Timeline */}
    <div className="max-w-3xl mx-auto mb-12">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Ключевые этапы</h3>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300" />
        {pitchDeckData.traction.milestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.15 }}
            className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm inline-block">
                <div className="font-bold text-marmelat-dark-pink text-lg">{milestone.year}</div>
                <div className="text-gray-700">{milestone.event}</div>
              </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-marmelat-dark-pink rounded-full border-4 border-white shadow" />
          </motion.div>
        ))}
      </div>
    </div>

    {/* Retailers */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="max-w-3xl mx-auto"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Ритейл-партнёры</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pitchDeckData.traction.retailers.map((retailer) => (
          <div key={retailer.name} className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <div className="font-bold text-gray-900">{retailer.name}</div>
            <div className="text-xs text-gray-500">{retailer.type}</div>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

const CompetitionSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
      {pitchDeckData.competition.title}
    </h2>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Competitive Matrix */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Позиционирование</h3>
        <CompetitiveMatrix data={pitchDeckData.competition.matrix} />
      </div>

      {/* Advantages Table */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Конкурентные преимущества</h3>
        <div className="space-y-3">
          {pitchDeckData.competition.advantages.map((adv, index) => (
            <motion.div
              key={adv.title}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <div className="grid grid-cols-3">
                <div className="p-4 bg-gray-50 font-bold text-gray-900">{adv.title}</div>
                <div className="p-4 bg-green-50 text-green-700">{adv.marmelat}</div>
                <div className="p-4 text-gray-500">{adv.competitors}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TeamSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
      {pitchDeckData.team.title}
    </h2>
    <p className="text-center text-gray-600 mb-12">
      Совокупный опыт: <span className="font-bold">{pitchDeckData.team.totalExperience}</span> в индустрии
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
      {pitchDeckData.team.members.map((member, index) => (
        <motion.div
          key={member.role}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 text-center mb-1">{member.role}</h3>
          <p className="text-sm text-marmelat-dark-pink text-center mb-2">{member.focus}</p>
          <p className="text-xs text-gray-500 text-center">{member.experience}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const FinancialsSlide = () => {
  const allRevenue = [
    ...pitchDeckData.financials.historicalRevenue,
    ...pitchDeckData.financials.projections.map(p => ({ year: p.year, revenue: p.revenue })),
  ];
  const maxRevenue = Math.max(...allRevenue.map(r => r.revenue));

  return (
    <div className="h-full px-8 py-12 overflow-y-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
        {pitchDeckData.financials.title}
      </h2>

      {/* Key Metrics */}
      <div className="flex justify-center gap-8 mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="text-4xl font-bold text-green-600">{pitchDeckData.financials.keyMetrics.cagr}</div>
          <div className="text-gray-600">CAGR (2024-2028)</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="text-4xl font-bold text-gray-900">{pitchDeckData.financials.keyMetrics.breakeven}</div>
          <div className="text-gray-600">Breakeven</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="text-4xl font-bold text-marmelat-dark-pink">{pitchDeckData.financials.keyMetrics.targetValuation}</div>
          <div className="text-gray-600">Target Valuation</div>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <div className="max-w-4xl mx-auto mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Выручка и прогноз</h3>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <RevenueChart data={allRevenue} maxValue={maxRevenue} />
        </div>
      </div>

      {/* EBITDA Projections Table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">EBITDA Margin Projection</h3>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-left text-gray-600">Год</th>
                <th className="p-4 text-right text-gray-600">Выручка</th>
                <th className="p-4 text-right text-gray-600">EBITDA</th>
                <th className="p-4 text-right text-gray-600">Margin</th>
              </tr>
            </thead>
            <tbody>
              {pitchDeckData.financials.projections.map((proj) => (
                <tr key={proj.year} className="border-t border-gray-100">
                  <td className="p-4 font-bold text-gray-900">{proj.year}</td>
                  <td className="p-4 text-right text-gray-700">{proj.revenueFormatted}</td>
                  <td className="p-4 text-right text-gray-700">${(proj.ebitda / 1000).toFixed(0)}K</td>
                  <td className="p-4 text-right font-bold text-green-600">{proj.ebitdaMargin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

const InvestmentSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
      {pitchDeckData.investment.title}
    </h2>

    {/* Key Terms */}
    <div className="flex justify-center gap-6 mb-12 flex-wrap">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center bg-marmelat-dark-pink text-white rounded-xl p-6 min-w-[150px]"
      >
        <div className="text-3xl font-bold">{pitchDeckData.investment.amount}</div>
        <div className="text-sm opacity-80">Raising</div>
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center bg-white rounded-xl p-6 border border-gray-200 min-w-[150px]"
      >
        <div className="text-3xl font-bold text-gray-900">{pitchDeckData.investment.equity}</div>
        <div className="text-sm text-gray-500">Equity</div>
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center bg-white rounded-xl p-6 border border-gray-200 min-w-[150px]"
      >
        <div className="text-3xl font-bold text-gray-900">{pitchDeckData.investment.preMoneyValuation}</div>
        <div className="text-sm text-gray-500">Pre-Money</div>
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center bg-green-100 rounded-xl p-6 border border-green-200 min-w-[150px]"
      >
        <div className="text-3xl font-bold text-green-700">{pitchDeckData.investment.exitStrategy.targetROI}</div>
        <div className="text-sm text-green-600">Target ROI</div>
      </motion.div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Use of Funds */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Использование средств</h3>
        <DonutChart data={pitchDeckData.investment.useOfFunds} />
      </div>

      {/* Milestones */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Milestones</h3>
        <div className="space-y-4">
          {pitchDeckData.investment.milestones.map((item, index) => (
            <motion.div
              key={item.milestone}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200"
            >
              <div className="w-20 h-10 bg-marmelat-light-pink rounded-lg flex items-center justify-center font-bold text-marmelat-dark-pink text-sm">
                {item.milestone}
              </div>
              <div className="text-gray-700">{item.target}</div>
            </motion.div>
          ))}
        </div>

        {/* Exit Strategy */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200"
        >
          <h4 className="font-bold text-gray-900 mb-3">Exit Strategy ({pitchDeckData.investment.exitStrategy.timeline})</h4>
          <ul className="space-y-2">
            {pitchDeckData.investment.exitStrategy.options.map((option) => (
              <li key={option} className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {option}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </div>
);

const ContactSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-8">
    <motion.h2
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
    >
      {pitchDeckData.contact.cta}
    </motion.h2>

    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl p-8 shadow-xl max-w-lg w-full mt-8 border border-gray-200"
    >
      <h1 className="font-display text-4xl text-gray-900 mb-6">MARMELAT</h1>

      <div className="space-y-4 text-left mb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <a href={`mailto:${contactInfo.email}`} className="text-marmelat-dark-pink hover:underline">
            {contactInfo.email}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            {contactInfo.phones.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="block text-gray-700 hover:text-marmelat-dark-pink">
                {phone}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-bold text-gray-900 mb-3">Следующие шаги</h4>
        <div className="space-y-2">
          {pitchDeckData.contact.nextSteps.map((step, index) => (
            <div key={step} className="flex items-center gap-3 text-sm text-gray-600">
              <span className="w-6 h-6 bg-marmelat-light-pink rounded-full flex items-center justify-center text-xs font-bold text-marmelat-dark-pink">
                {index + 1}
              </span>
              {step}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

// ============================================
// SLIDE MAPPING
// ============================================

const slideComponents: Record<string, React.FC> = {
  cover: CoverSlide,
  problem: ProblemSlide,
  solution: SolutionSlide,
  market: MarketSlide,
  products: ProductsSlide,
  business: BusinessModelSlide,
  traction: TractionSlide,
  competition: CompetitionSlide,
  team: TeamSlide,
  financials: FinancialsSlide,
  investment: InvestmentSlide,
  contact: ContactSlide,
};

// ============================================
// MAIN COMPONENT
// ============================================

export const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, pitchSlides.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        setIsNavOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const CurrentSlideComponent = slideComponents[pitchSlides[currentSlide].id];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-2">
        {pitchSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-marmelat-dark-pink scale-150' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            title={slide.title}
          />
        ))}
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="fixed top-4 right-4 z-50 md:hidden bg-white rounded-lg p-3 shadow-lg border border-gray-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-40 md:hidden p-8 overflow-y-auto"
          >
            <h3 className="text-xl font-bold mb-6">Содержание</h3>
            <div className="space-y-2">
              {pitchSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsNavOpen(false);
                  }}
                  className={`w-full text-left p-4 rounded-xl transition-colors ${
                    currentSlide === index ? 'bg-marmelat-light-pink text-gray-900 font-medium' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-sm text-gray-400 mr-3">{String(index + 1).padStart(2, '0')}</span>
                  {slide.title}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-marmelat-dark-pink"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / pitchSlides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Slide counter */}
      <div className="fixed bottom-6 left-6 text-gray-400 text-sm z-50 font-mono">
        {String(currentSlide + 1).padStart(2, '0')} / {String(pitchSlides.length).padStart(2, '0')}
      </div>

      {/* Navigation arrows */}
      <div className="fixed bottom-6 right-6 flex gap-2 z-50">
        <button
          onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
          disabled={currentSlide === 0}
          className="bg-white rounded-lg p-3 shadow-lg border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, pitchSlides.length - 1))}
          disabled={currentSlide === pitchSlides.length - 1}
          className="bg-white rounded-lg p-3 shadow-lg border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Back to site link */}
      <a
        href="/"
        className="fixed top-4 left-4 z-50 bg-white rounded-lg px-4 py-2 shadow-lg border border-gray-200 text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        На сайт
      </a>

      {/* Main slide area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen pt-8 pb-20"
        >
          <CurrentSlideComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
