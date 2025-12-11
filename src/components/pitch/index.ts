// Export main components with namespaced imports to avoid conflicts
export * from './shared';
export { WebPitchDeck } from './web';
export { MobilePitchDeck } from './mobile';
export { PDFPitchDeck } from './pdf';

// Namespaced exports for slides
export * as WebSlides from './web/slides';
export * as MobileSlides from './mobile/slides';
export * as PDFSlides from './pdf/slides';
