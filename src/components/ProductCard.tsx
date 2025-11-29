import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../types';
import { contactInfo } from '../data/brandData';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductModal = ({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = product.images.length > 1;

  const orderViaWhatsApp = () => {
    const message = encodeURIComponent(
      `Здравствуйте! Хочу заказать: ${product.name}`
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
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-contain p-4"
          />

          {hasMultipleImages && (
            <>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % product.images.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, idx) => (
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
            {product.name}
          </h3>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {product.fullDescription || product.description}
          </p>

          {product.features && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Характеристики:</h4>
              <ul className="space-y-1">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-marmelat-pink rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pricing */}
          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500">Розничная цена:</span>
              <span className="text-2xl font-bold text-marmelat-pink">
                {product.priceRetail.toLocaleString('ru-KZ')} ₸
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Оптовая цена:</span>
              <span className="text-xl font-semibold text-marmelat-dark-pink">
                {product.priceWholesale.toLocaleString('ru-KZ')} ₸
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

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasMultipleImages = product.images.length > 1;

  const orderViaWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = encodeURIComponent(
      `Здравствуйте! Хочу заказать: ${product.name}`
    );
    window.open(
      `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`,
      '_blank'
    );
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Product Image */}
        <div className="relative aspect-square bg-white overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={product.images[currentImageIndex]}
              alt={product.name}
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
                {product.images.map((_, idx) => (
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

        {/* Product Info */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl sm:text-2xl font-display text-black mb-2">
            {product.name}
          </h3>

          <p className="text-gray-600 mb-4 flex-grow leading-relaxed">
            {product.description}
          </p>

          {/* Pricing */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">РРЦ:</span>
              <span className="text-2xl font-bold text-marmelat-pink">
                {product.priceRetail.toLocaleString('ru-KZ')} ₸
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">ОПТ:</span>
              <span className="text-xl font-semibold text-marmelat-dark-pink">
                {product.priceWholesale.toLocaleString('ru-KZ')} ₸
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
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ProductModal product={product} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};
