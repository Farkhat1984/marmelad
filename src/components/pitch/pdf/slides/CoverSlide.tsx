import { pitchDeckData } from '../../../../data/pitchDeckData';

export const CoverSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-16">
    <div className="mb-6">
      <span className="inline-block px-8 py-3 bg-marmelat-dark-pink/10 text-marmelat-dark-pink text-2xl font-medium rounded-full">
        {pitchDeckData.cover.fundingRound}
      </span>
    </div>
    <h1 className="text-[140px] font-bold text-gray-900 mb-10 leading-none">
      MARMELAT
    </h1>
    <p className="text-4xl text-gray-600 max-w-4xl text-center">
      {pitchDeckData.cover.tagline}
    </p>
  </div>
);
