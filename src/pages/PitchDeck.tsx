import { useState, useEffect } from 'react';
import { WebPitchDeck } from '../components/pitch/web';
import { MobilePitchDeck } from '../components/pitch/mobile';

// Custom hook for responsive detection
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check initial value
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    // Listen for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export const PitchDeck = () => {
  const isMobile = useIsMobile();

  // Render appropriate version based on screen size
  // Both versions use PDFPitchDeck internally for PDF export
  return isMobile ? <MobilePitchDeck /> : <WebPitchDeck />;
};
