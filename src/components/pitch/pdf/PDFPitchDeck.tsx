import { forwardRef } from 'react';
import { pitchSlides } from '../../../data/pitchDeckData';
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

interface PDFPitchDeckProps {
  className?: string;
}

// PDF version - renders all slides without animations for export
export const PDFPitchDeck = forwardRef<HTMLDivElement, PDFPitchDeckProps>(
  ({ className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`fixed ${className}`}
        style={{ left: '-9999px', top: 0, width: 1920 }}
        aria-hidden="true"
      >
        {pitchSlides.map((slide, index) => {
          const SlideComponent = slideComponents[slide.id];
          return (
            <div
              key={slide.id}
              data-export-slide={index}
              className={`bg-gray-50 ${index !== 0 ? 'pitch-slide-system-font' : ''}`}
              style={{ width: 1920, height: 1080, padding: '32px 0 80px 0' }}
            >
              <SlideComponent />
            </div>
          );
        })}
      </div>
    );
  }
);

PDFPitchDeck.displayName = 'PDFPitchDeck';
