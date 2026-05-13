import { useEffect, useRef } from 'react';

/**
 * Observa a entrada de um elemento na viewport e define data-revealed="true"
 * quando ele cruza o threshold. A animação é então ativada via CSS.
 * Desconecta o observer após a primeira ativação (one-shot).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.revealed = 'true';
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
