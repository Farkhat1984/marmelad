import { useState, useCallback } from 'react';

interface UseCarouselOptions {
  totalItems: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const useCarousel = ({ totalItems }: UseCarouselOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      const swipeThreshold = 50;
      const velocityThreshold = 500;

      if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
        goToNext();
      } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
        goToPrev();
      }
    },
    [goToNext, goToPrev]
  );

  return {
    currentIndex,
    goToNext,
    goToPrev,
    goToIndex,
    handleDragEnd,
  };
};
