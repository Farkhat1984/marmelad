import { pitchDeckData } from '../../../../data/pitchDeckData';

export const SolutionSlide = () => (
  <div className="h-full px-16 py-16">
    <h2 className="text-6xl font-bold text-gray-900 mb-10 text-center">
      {pitchDeckData.solution.title}
    </h2>

    <div className="max-w-5xl mx-auto mb-10">
      <p className="text-2xl text-center text-gray-700 mb-4">
        {pitchDeckData.solution.mainText}
      </p>
      <p className="text-xl text-center text-marmelat-dark-pink font-medium">
        {pitchDeckData.solution.valueProposition}
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
      {pitchDeckData.solution.features.map((feature) => (
        <div
          key={feature.title}
          className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm"
        >
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-lg text-gray-600">{feature.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Product Categories */}
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Продуктовые категории</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {pitchDeckData.solution.productCategories.map((category) => (
          <span key={category} className="px-6 py-3 bg-marmelat-light-pink text-gray-800 rounded-xl text-lg font-medium">
            {category}
          </span>
        ))}
      </div>
    </div>
  </div>
);
