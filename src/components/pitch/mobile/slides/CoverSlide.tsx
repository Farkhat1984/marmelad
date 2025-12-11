import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';

export const CoverSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-4">
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-2"
    >
      <span className="inline-block px-3 py-1 bg-marmelat-dark-pink/10 text-marmelat-dark-pink text-xs font-medium rounded-full">
        {pitchDeckData.cover.fundingRound}
      </span>
    </motion.div>
    <motion.h1
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="text-5xl font-bold text-gray-900 mb-3"
    >
      MARMELAT
    </motion.h1>
    <motion.p
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-base text-gray-600 max-w-sm mb-6"
    >
      {pitchDeckData.cover.tagline}
    </motion.p>
    <motion.div
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex items-center gap-4"
    >
      <div className="text-center">
        <div className="text-2xl font-bold text-marmelat-dark-pink">{pitchDeckData.cover.askAmount}</div>
        <div className="text-xs text-gray-500">Seed Round</div>
      </div>
      <div className="w-px h-10 bg-gray-300" />
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900">{pitchDeckData.cover.year}</div>
        <div className="text-xs text-gray-500">Год</div>
      </div>
    </motion.div>
  </div>
);
