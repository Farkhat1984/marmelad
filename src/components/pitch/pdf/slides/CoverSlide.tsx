import { pitchDeckData } from '../../../../data/pitchDeckData';

export const CoverSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-16">
    <div className="mb-4">
      <span className="inline-block px-6 py-2 bg-marmelat-dark-pink/10 text-marmelat-dark-pink text-lg font-medium rounded-full">
        {pitchDeckData.cover.fundingRound}
      </span>
    </div>
    <h1 className="text-[140px] font-bold text-gray-900 mb-8 leading-none">
      MARMELAT
    </h1>
    <p className="text-3xl text-gray-600 max-w-4xl mb-16">
      {pitchDeckData.cover.tagline}
    </p>
    <div className="flex items-center gap-12">
      <div className="text-center">
        <div className="text-6xl font-bold text-marmelat-dark-pink">{pitchDeckData.cover.askAmount}</div>
        <div className="text-xl text-gray-500 mt-2">Seed Round</div>
      </div>
      <div className="w-px h-20 bg-gray-300" />
      <div className="text-center">
        <div className="text-6xl font-bold text-gray-900">{pitchDeckData.cover.year}</div>
        <div className="text-xl text-gray-500 mt-2">Год</div>
      </div>
    </div>
  </div>
);
