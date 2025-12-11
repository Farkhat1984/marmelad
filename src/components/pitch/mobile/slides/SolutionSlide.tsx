import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';

export const SolutionSlide = () => (
  <div className="h-full px-4 py-6 overflow-y-auto">
    <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
      {pitchDeckData.solution.title}
    </h2>

    <motion.div
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-6"
    >
      <p className="text-sm text-center text-gray-700 mb-2">
        {pitchDeckData.solution.mainText}
      </p>
      <p className="text-xs text-center text-marmelat-dark-pink font-medium">
        {pitchDeckData.solution.valueProposition}
      </p>
    </motion.div>

    {/* Features - vertical list on mobile */}
    <div className="space-y-3 mb-6">
      {pitchDeckData.solution.features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-xs text-gray-600">{feature.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Product Categories */}
    <motion.div
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <h3 className="text-sm font-bold text-gray-900 mb-3 text-center">Продуктовые категории</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {pitchDeckData.solution.productCategories.map((category) => (
          <span key={category} className="px-3 py-1 bg-marmelat-light-pink text-gray-800 rounded text-xs font-medium">
            {category}
          </span>
        ))}
      </div>
    </motion.div>
  </div>
);
