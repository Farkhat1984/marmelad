import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCarousel } from '../hooks/useCarousel';
import { products } from '../data/brandData';
import { ProductCard } from './ProductCard';

export const Products = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });
  const { currentIndex, goToIndex, handleDragEnd } = useCarousel({
    totalItems: products.length,
  });

  return (
    <section id="catalog" ref={ref} className="section-padding bg-marmelat-light-pink">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-black mb-6">
            Каталог продукции
          </h2>
          <div className="w-20 h-1 bg-marmelat-pink mx-auto mb-6" />
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Профессиональные средства для создания идеальных укладок
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
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
                  <ProductCard
                    product={products[currentIndex]}
                    index={0}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-marmelat-pink w-8'
                    : 'bg-marmelat-pink/30'
                }`}
                aria-label={`Перейти к продукту ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
