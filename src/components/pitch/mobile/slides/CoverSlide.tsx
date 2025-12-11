import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';

export const CoverSlide = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-3"
    >
      <span className="inline-block px-4 py-1.5 bg-marmelat-dark-pink/10 text-marmelat-dark-pink text-base font-medium rounded-full">
        {pitchDeckData.cover.fundingRound}
      </span>
    </motion.div>
    <motion.h1
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="text-5xl font-bold text-gray-900 mb-4"
    >
      MARMELAT
    </motion.h1>
    <motion.p
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-lg text-gray-600 max-w-sm text-center"
    >
      {pitchDeckData.cover.tagline}
    </motion.p>
  </div>
);
