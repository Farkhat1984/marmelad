import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCarousel } from '../hooks/useCarousel';
import { bundles, contactInfo } from '../data/brandData';
import type { Bundle } from '../types';

const BundleModal = ({
  bundle,
  onClose,
}: {
  bundle: Bundle;
  onClose: () => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = bundle.images.length > 1;

  const orderViaWhatsApp = () => {
    const message = encodeURIComponent(
      `Здравствуйте! Хочу заказать: ${bundle.name}`
    );
    window.open(
      `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`,
      '_blank'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative aspect-square bg-gray-50">
          <img
            src={bundle.images[currentImageIndex]}
            alt={bundle.name}
            className="w-full h-full object-contain p-4"
          />

          {hasMultipleImages && (
            <>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + bundle.images.length) % bundle.images.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % bundle.images.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {bundle.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === currentImageIndex ? 'bg-marmelat-pink w-6' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl sm:text-3xl font-display text-black mb-3">
            {bundle.name}
          </h3>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {bundle.fullDescription || bundle.description}
          </p>

          {/* Bundle Items */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Состав набора:</h4>
            <ul className="space-y-1">
              {bundle.items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600">
                  <span className="text-marmelat-pink">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500">Розничная цена:</span>
              <span className="text-2xl font-bold text-marmelat-pink">
                {bundle.priceRetail.toLocaleString('ru-KZ')} ₸
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Оптовая цена:</span>
              <span className="text-xl font-semibold text-marmelat-dark-pink">
                {bundle.priceWholesale.toLocaleString('ru-KZ')} ₸
              </span>
            </div>
          </div>

          {/* Order button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={orderViaWhatsApp}
            className="w-full bg-[#25D366] text-white py-4 rounded-full hover:bg-[#20BA5A] transition-colors duration-300 font-medium flex items-center justify-center gap-2"
          >
            <span className="text-xl">💬</span>
            Заказать в WhatsApp
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BundleCard = ({ bundle }: { bundle: Bundle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasMultipleImages = bundle.images.length > 1;

  const orderViaWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = encodeURIComponent(
      `Здравствуйте! Хочу заказать: ${bundle.name}`
    );
    window.open(
      `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`,
      '_blank'
    );
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % bundle.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + bundle.images.length) % bundle.images.length);
  };

  return (
    <>
      <div
        className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Bundle Image */}
        <div className="relative aspect-square bg-white overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={bundle.images[currentImageIndex]}
              alt={bundle.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-contain"
            />
          </AnimatePresence>

          {/* Navigation arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                aria-label="Предыдущее изображение"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                aria-label="Следующее изображение"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {bundle.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? 'bg-marmelat-pink w-4' : 'bg-white/70'
                    }`}
                    aria-label={`Изображение ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bundle Info */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl sm:text-2xl font-display text-black mb-2">
            {bundle.name}
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {bundle.description}
          </p>

          {/* Bundle Items */}
          <div className="mb-4 flex-grow">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Состав набора:
            </h4>
            <ul className="space-y-1">
              {bundle.items.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="text-marmelat-pink mr-2">✓</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
              {bundle.items.length > 3 && (
                <li className="text-sm text-marmelat-pink">
                  + ещё {bundle.items.length - 3} позиции
                </li>
              )}
            </ul>
          </div>

          {/* Pricing */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">РРЦ:</span>
              <span className="text-2xl font-bold text-marmelat-pink">
                {bundle.priceRetail.toLocaleString('ru-KZ')} ₸
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">ОПТ:</span>
              <span className="text-xl font-semibold text-marmelat-dark-pink">
                {bundle.priceWholesale.toLocaleString('ru-KZ')} ₸
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-full hover:bg-gray-200 transition-colors duration-300 font-medium"
            >
              Подробнее
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={orderViaWhatsApp}
              className="flex-1 bg-[#25D366] text-white py-3 rounded-full hover:bg-[#20BA5A] transition-colors duration-300 font-medium"
            >
              Заказать
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <BundleModal bundle={bundle} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export const Bundles = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { currentIndex, goToIndex, handleDragEnd } = useCarousel({
    totalItems: bundles.length,
  });

  return (
    <section id="bundles" ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-black mb-6">
            Наборы
          </h2>
          <div className="w-20 h-1 bg-marmelat-pink mx-auto mb-6" />
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Готовые наборы для идеального результата
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {bundles.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BundleCard bundle={bundle} />
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
                  <BundleCard bundle={bundles[currentIndex]} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {bundles.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-marmelat-pink w-8'
                    : 'bg-marmelat-pink/30'
                }`}
                aria-label={`Перейти к набору ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
