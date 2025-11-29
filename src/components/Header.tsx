import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { id: 'about', label: 'О нас' },
  { id: 'catalog', label: 'Каталог' },
  { id: 'bundles', label: 'Наборы' },
  { id: 'partners', label: 'Партнёры' },
  { id: 'contacts', label: 'Контакты' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-marmelat-pink/95 backdrop-blur-md shadow-md py-3'
          : 'bg-marmelat-pink py-4'
      }`}
    >
      <nav className="container-custom flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="text-2xl sm:text-3xl font-display cursor-pointer text-black"
          onClick={() => scrollToSection('hero')}
        >
          MARMELAT<sup className="text-xs">®</sup>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => scrollToSection(item.id)}
              className="text-black hover:text-white transition-colors duration-300 font-medium"
            >
              {item.label}
            </motion.button>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05, backgroundColor: '#E8A5C4' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contacts')}
            className="bg-black text-white px-6 py-2.5 rounded-full transition-all duration-300 font-medium"
          >
            Заказать
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-black transition-all"
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-black transition-all"
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-black transition-all"
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-marmelat-pink border-t border-white/20 overflow-hidden"
          >
            <div className="container-custom py-4 flex flex-col gap-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-2 text-black hover:text-white transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contacts')}
                className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all duration-300 font-medium mt-2"
              >
                Заказать
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
