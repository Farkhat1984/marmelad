import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';

export const ProductsSlide = () => (
  <div className="h-full px-4 py-6 overflow-y-auto">
    <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
      {pitchDeckData.products.title}
    </h2>

    {/* Key Metrics */}
    <div className="flex justify-center gap-6 mb-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="text-3xl font-bold text-gray-900">{pitchDeckData.products.skuCount}</div>
        <div className="text-xs text-gray-600">SKU</div>
      </motion.div>
      <div className="w-px h-12 bg-gray-300" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center"
      >
        <div className="text-3xl font-bold text-green-600">{pitchDeckData.products.avgMargin}%</div>
        <div className="text-xs text-gray-600">Avg. Margin</div>
      </motion.div>
    </div>

    {/* Revenue by Category */}
    <div className="mb-6">
      <h3 className="text-sm font-bold text-gray-900 mb-3 text-center">Доля выручки по категориям</h3>
      <div className="space-y-3">
        {pitchDeckData.products.categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ x: -15, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-3 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-900">{category.name}</span>
              <span className="text-base font-bold text-marmelat-dark-pink">{category.revenue}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${category.revenue}%` }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                className="bg-marmelat-dark-pink h-2 rounded-full"
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {category.items.slice(0, 3).map((item) => (
                <span key={item} className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                  {item}
                </span>
              ))}
              {category.items.length > 3 && (
                <span className="text-[10px] text-gray-400">+{category.items.length - 3}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Pipeline */}
    <motion.div
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="text-sm font-bold text-gray-900 mb-3 text-center">Product Pipeline</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {pitchDeckData.products.pipeline.map((product) => (
          <div key={product.name} className="bg-blue-50 border border-blue-200 rounded px-3 py-2 text-center">
            <div className="text-xs font-medium text-blue-900">{product.name}</div>
            <div className="text-[10px] text-blue-600">{product.timeline}</div>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);
