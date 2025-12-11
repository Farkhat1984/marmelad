import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';

export const CoverSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-8">
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-2"
    >
      <span className="inline-block px-4 py-1 bg-marmelat-dark-pink/10 text-marmelat-dark-pink text-sm font-medium rounded-full">
        {pitchDeckData.cover.fundingRound}
      </span>
    </motion.div>
    <motion.h1
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="text-8xl font-bold text-gray-900 mb-4"
    >
      MARMELAT
    </motion.h1>
    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-2xl text-gray-600 max-w-3xl mb-8"
    >
      {pitchDeckData.cover.tagline}
    </motion.p>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex items-center gap-6"
    >
      <div className="text-center">
        <div className="text-4xl font-bold text-marmelat-dark-pink">{pitchDeckData.cover.askAmount}</div>
        <div className="text-sm text-gray-500">Seed Round</div>
      </div>
      <div className="w-px h-12 bg-gray-300" />
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900">{pitchDeckData.cover.year}</div>
        <div className="text-sm text-gray-500">Год</div>
      </div>
    </motion.div>
  </div>
);
