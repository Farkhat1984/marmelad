import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';

export const SolutionSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-5xl font-bold text-gray-900 mb-8 text-center">
      {pitchDeckData.solution.title}
    </h2>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-4xl mx-auto mb-8"
    >
      <p className="text-2xl text-center text-gray-700 mb-4">
        {pitchDeckData.solution.mainText}
      </p>
      <p className="text-lg text-center text-marmelat-dark-pink font-medium">
        {pitchDeckData.solution.valueProposition}
      </p>
    </motion.div>

    {/* Features Grid */}
    <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
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
