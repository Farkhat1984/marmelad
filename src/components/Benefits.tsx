import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCarousel } from '../hooks/useCarousel';
import { benefits } from '../data/brandData';
import type { Benefit } from '../types';

const BenefitCard = ({ benefit }: { benefit: Benefit }) => (
  <div className="group text-center p-8 rounded-2xl bg-white border-2 border-marmelat-pink/20 hover:border-marmelat-pink hover:shadow-xl transition-all duration-300">
    <div className="w-16 h-16 rounded-full border-2 border-marmelat-pink flex items-center justify-center mb-4 mx-auto group-hover:bg-marmelat-pink group-hover:text-white transition-all duration-300">
      <span className="text-2xl font-display text-marmelat-pink group-hover:text-white transition-colors duration-300">
        {benefit.icon}
      </span>
    </div>
    <h3 className="text-xl sm:text-2xl font-semibold text-black mb-3">
      {benefit.title}
    </h3>
    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
  </div>
);

export const Benefits = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { currentIndex, goToIndex, handleDragEnd } = useCarousel({
    totalItems: benefits.length,
  });

  return (
    <section id="benefits" ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-black mb-6">
            Преимущества
          </h2>
          <div className="w-20 h-1 bg-marmelat-pink mx-auto" />
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <BenefitCard benefit={benefit} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden">
          <div className="relative overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <BenefitCard benefit={benefits[currentIndex]} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {benefits.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-marmelat-pink w-8'
                    : 'bg-marmelat-pink/30'
                }`}
                aria-label={`Перейти к преимуществу ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
