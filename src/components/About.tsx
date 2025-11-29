import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { missionText } from '../data/brandData';

const aboutImages = [
  '/images/hero/hero.jpg',
  '/images/hero/hero2.jpg',
  '/images/hero/hero3.jpg',
  '/images/hero/hero4.jpg',
  '/images/hero/hero5.jpg',
  '/images/hero/hero6.jpg',
];

export const About = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % aboutImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-gradient-to-b from-marmelat-light-pink to-white"
    >
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-black mb-6">
              Наша миссия
            </h2>
            <div className="w-20 h-1 bg-marmelat-pink mb-8" />
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              {missionText}
            </p>
          </motion.div>

          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={aboutImages[currentIndex]}
                alt="MARMELAT"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {aboutImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                  aria-label={`Слайд ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
