import { useEffect, useRef, useMemo } from 'react';

export const useScrollFadeIn = (options = {}) => {
  const ref = useRef<HTMLDivElement>(null);

  const observerOptions = useMemo(() => ({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options,
  }), [options]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class with small delay to ensure animation plays
          setTimeout(() => {
            entry.target.classList.add('fade-in-visible');
          }, 50);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [observerOptions]);

  return ref;
};

