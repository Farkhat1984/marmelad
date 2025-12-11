import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pitchSlides } from '../../../data/pitchDeckData';
import { PDFPitchDeck } from '../pdf/PDFPitchDeck';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  CoverSlide,
  ProblemSlide,
  SolutionSlide,
  MarketSlide,
  ProductsSlide,
  BusinessModelSlide,
  TractionSlide,
  CompetitionSlide,
  TeamSlide,
  FinancialsSlide,
  InvestmentSlide,
  ContactSlide,
} from './slides';

// Slide components mapping
const slideComponents: Record<string, React.FC> = {
  cover: CoverSlide,
  problem: ProblemSlide,
  solution: SolutionSlide,
  market: MarketSlide,
  products: ProductsSlide,
  business: BusinessModelSlide,
  traction: TractionSlide,
  competition: CompetitionSlide,
  team: TeamSlide,
  financials: FinancialsSlide,
  investment: InvestmentSlide,
  contact: ContactSlide,
};

export const MobilePitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const exportContainerRef = useRef<HTMLDivElement>(null);

  const exportToPDF = useCallback(async () => {
    if (isExporting || !exportContainerRef.current) return;

    setIsExporting(true);
    setExportProgress(0);

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1920, 1080]
    });

    try {
      const slideElements = exportContainerRef.current.querySelectorAll('[data-export-slide]');

      for (let i = 0; i < slideElements.length; i++) {
        setExportProgress(Math.round(((i + 1) / slideElements.length) * 100));

        const slideEl = slideElements[i] as HTMLElement;

        const canvas = await html2canvas(slideEl, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#f9fafb',
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        if (i > 0) {
          pdf.addPage([1920, 1080], 'landscape');
        }

        pdf.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);
      }

      pdf.save('MARMELAT_Pitch_Deck.pdf');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Ошибка при экспорте PDF. Попробуйте ещё раз.');
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  }, [isExporting]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsNavOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const CurrentSlideComponent = slideComponents[pitchSlides[currentSlide].id];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="fixed top-3 right-3 z-50 bg-white rounded-lg p-2.5 shadow-lg border border-gray-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-40 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Содержание</h3>
              <button onClick={() => setIsNavOpen(false)} className="p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2 mb-6">
              {pitchSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsNavOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-colors text-sm ${
                    currentSlide === index ? 'bg-marmelat-light-pink text-gray-900 font-medium' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xs text-gray-400 mr-2">{String(index + 1).padStart(2, '0')}</span>
                  {slide.title}
                </button>
              ))}
            </div>
            {/* Actions */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <a
                href="/"
                className="block w-full text-center bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-600"
              >
                На сайт
              </a>
              <button
                onClick={() => {
                  setIsNavOpen(false);
                  exportToPDF();
                }}
                disabled={isExporting}
                className="block w-full text-center bg-marmelat-dark-pink text-white rounded-lg px-4 py-3 text-sm disabled:opacity-50"
              >
                Скачать PDF
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-marmelat-dark-pink"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / pitchSlides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Slide counter */}
      <div className="fixed bottom-4 left-4 text-gray-400 text-xs z-50 font-mono">
        {String(currentSlide + 1).padStart(2, '0')} / {String(pitchSlides.length).padStart(2, '0')}
      </div>

      {/* Navigation arrows */}
      <div className="fixed bottom-4 right-4 flex gap-2 z-50">
        <button
          onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
          disabled={currentSlide === 0}
          className="bg-white rounded-lg p-2.5 shadow-lg border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, pitchSlides.length - 1))}
          disabled={currentSlide === pitchSlides.length - 1}
          className="bg-white rounded-lg p-2.5 shadow-lg border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Back to site link (small) */}
      <div className="fixed top-3 left-3 z-50">
        <a
          href="/"
          className="bg-white rounded-lg p-2.5 shadow-lg border border-gray-200 flex items-center"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </a>
      </div>

      {/* Main slide area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className={`min-h-screen pt-12 pb-16 ${currentSlide !== 0 ? 'pitch-slide-system-font' : ''}`}
        >
          <CurrentSlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Hidden container for PDF export - uses PDF version slides */}
      <PDFPitchDeck ref={exportContainerRef} />

      {/* Export overlay */}
      {isExporting && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 shadow-2xl text-center max-w-xs w-full">
            <svg className="w-10 h-10 animate-spin mx-auto mb-3 text-marmelat-dark-pink" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Экспорт в PDF</h3>
            <p className="text-sm text-gray-600 mb-3">Генерация презентации...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-marmelat-dark-pink h-2 rounded-full transition-all duration-300"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{exportProgress}%</p>
          </div>
        </div>
      )}
    </div>
  );
};
