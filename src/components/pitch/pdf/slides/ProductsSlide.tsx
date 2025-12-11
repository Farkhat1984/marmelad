import { pitchDeckData } from '../../../../data/pitchDeckData';

export const ProductsSlide = () => (
  <div className="h-full px-16 py-16">
    <h2 className="text-6xl font-bold text-gray-900 mb-10 text-center">
      {pitchDeckData.products.title}
    </h2>

    {/* Key Metrics */}
    <div className="flex justify-center gap-16 mb-12">
      <div className="text-center">
        <div className="text-7xl font-bold text-gray-900">{pitchDeckData.products.skuCount}</div>
        <div className="text-xl text-gray-600">SKU</div>
      </div>
      <div className="w-px h-24 bg-gray-300" />
      <div className="text-center">
        <div className="text-7xl font-bold text-green-600">{pitchDeckData.products.avgMargin}%</div>
        <div className="text-xl text-gray-600">Avg. Margin</div>
      </div>
    </div>

    {/* Revenue by Category - Bar Chart */}
    <div className="max-w-5xl mx-auto mb-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Доля выручки по категориям</h3>
      <div className="space-y-6">
        {pitchDeckData.products.categories.map((category) => (
          <div
            key={category.name}
            className="bg-white rounded-2xl p-6 border-2 border-gray-200"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-bold text-gray-900">{category.name}</span>
              <span className="text-2xl font-bold text-marmelat-dark-pink">{category.revenue}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
              <div
                className="bg-marmelat-dark-pink h-4 rounded-full"
                style={{ width: `${category.revenue}%` }}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {category.items.map((item) => (
                <span key={item} className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Pipeline */}
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Product Pipeline</h3>
      <div className="flex flex-wrap justify-center gap-6">
        {pitchDeckData.products.pipeline.map((product) => (
          <div key={product.name} className="bg-blue-50 border-2 border-blue-200 rounded-xl px-6 py-4 text-center">
            <div className="text-lg font-medium text-blue-900">{product.name}</div>
            <div className="text-sm text-blue-600">{product.timeline}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
