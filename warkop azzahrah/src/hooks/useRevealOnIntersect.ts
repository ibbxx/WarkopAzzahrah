import { RefObject, useEffect, useState } from 'react';

export const useRevealOnIntersect = <T extends Element>(
  ref: RefObject<T | null>,
  threshold = 0.1,
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentElement = ref.current;

    if (!currentElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(currentElement);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return isVisible;
};
