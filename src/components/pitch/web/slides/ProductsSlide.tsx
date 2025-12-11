import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';

export const ProductsSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-5xl font-bold text-gray-900 mb-8 text-center">
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
