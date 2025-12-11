import { pitchDeckData } from '../../../../data/pitchDeckData';

export const BusinessModelSlide = () => (
  <div className="h-full px-16 py-16">
    <h2 className="text-6xl font-bold text-gray-900 mb-4 text-center">
      {pitchDeckData.businessModel.title}
    </h2>
    <p className="text-xl text-center text-gray-600 mb-12">{pitchDeckData.businessModel.model}</p>

    <div className="grid grid-cols-2 gap-16 max-w-7xl mx-auto">
      {/* Sales Channels */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Каналы продаж</h3>
        <div className="space-y-6">
          {pitchDeckData.businessModel.channels.map((channel) => (
            <div
              key={channel.name}
              className="bg-white rounded-2xl p-6 border-2 border-gray-200"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-gray-900">{channel.name}</span>
                  {channel.trend === 'up' && (
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  )}
                </div>
                <span className="text-3xl font-bold text-marmelat-dark-pink">{channel.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div
                  className="bg-marmelat-dark-pink h-3 rounded-full"
                  style={{ width: `${channel.percentage}%` }}
                />
              </div>
              <p className="text-lg text-gray-600">{channel.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Unit Economics */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Unit Economics</h3>
        <div className="grid grid-cols-2 gap-6">
          {pitchDeckData.businessModel.unitEconomics.map((item) => (
            <div
              key={item.metric}
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm"
            >
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">{item.metric}</div>
              <div className={`text-3xl font-bold ${item.isGood ? 'text-green-600' : 'text-gray-900'}`}>
                {item.value}
              </div>
              {item.benchmark && (
                <div className="text-sm text-gray-400 mt-2">{item.benchmark}</div>
              )}
              {item.isGood && (
                <div className="flex items-center gap-2 mt-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-green-600">Above benchmark</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
