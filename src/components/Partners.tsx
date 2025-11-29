import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { partners } from '../data/brandData';

export const Partners = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="partners" ref={ref} className="section-padding bg-marmelat-light-pink">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-black mb-6">
            Наши партнёры
          </h2>
          <div className="w-20 h-1 bg-marmelat-pink mx-auto mb-6" />
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Продукцию MARMELAT можно найти в ведущих магазинах Казахстана
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center hover:shadow-2xl transition-all duration-300 aspect-square"
            >
              <div className="text-center w-full">
                <div className="w-full h-24 mb-4 flex items-center justify-center">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-marmelat-pink/20 to-marmelat-dark-pink/20 rounded-lg flex items-center justify-center">
                      <p className="text-xs text-gray-400 px-2">{partner.logoPlaceholder}</p>
                    </div>
                  )}
                </div>
                <p className="font-semibold text-gray-800 text-sm group-hover:text-marmelat-pink transition-colors">
                  {partner.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
