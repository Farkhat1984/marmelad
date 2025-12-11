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

export const WebPitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
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
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, pitchSlides.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const CurrentSlideComponent = slideComponents[pitchSlides[currentSlide].id];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
        {pitchSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-marmelat-dark-pink scale-150' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            title={slide.title}
          />
        ))}
      </div>

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
      <div className="fixed bottom-6 left-6 text-gray-400 text-sm z-50 font-mono">
        {String(currentSlide + 1).padStart(2, '0')} / {String(pitchSlides.length).padStart(2, '0')}
      </div>

      {/* Navigation arrows */}
      <div className="fixed bottom-6 right-6 flex gap-2 z-50">
        <button
          onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
          disabled={currentSlide === 0}
          className="bg-white rounded-lg p-3 shadow-lg border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, pitchSlides.length - 1))}
          disabled={currentSlide === pitchSlides.length - 1}
          className="bg-white rounded-lg p-3 shadow-lg border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Back to site link and PDF download */}
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <a
          href="/"
          className="bg-white rounded-lg px-4 py-2 shadow-lg border border-gray-200 text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          На сайт
        </a>
        <button
          onClick={exportToPDF}
          disabled={isExporting}
          className="bg-white rounded-lg px-4 py-2 shadow-lg border border-gray-200 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {exportProgress}%
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Скачать PDF
            </>
          )}
        </button>
      </div>

      {/* Main slide area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`min-h-screen pt-8 pb-20 ${currentSlide !== 0 ? 'pitch-slide-system-font' : ''}`}
        >
          <CurrentSlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Hidden container for PDF export - uses PDF version slides */}
      <PDFPitchDeck ref={exportContainerRef} />

      {/* Export overlay */}
      {isExporting && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm">
            <svg className="w-12 h-12 animate-spin mx-auto mb-4 text-marmelat-dark-pink" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Экспорт в PDF</h3>
            <p className="text-gray-600 mb-4">Подождите, идёт генерация презентации...</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-marmelat-dark-pink h-3 rounded-full transition-all duration-300"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">{exportProgress}%</p>
          </div>
        </div>
      )}
    </div>
  );
};
