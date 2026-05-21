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

    let ativo = true;
    const revelar = () => {
      if (!ativo) return;
      el.dataset.revealed = 'true';
    };

    if (!('IntersectionObserver' in window)) {
      revelar();
      return () => {
        ativo = false;
      };
    }

    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < viewportHeight && rect.bottom > 0) {
      revelar();
      return () => {
        ativo = false;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revelar();
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px 96px 0px' }
    );

    observer.observe(el);

    const fallback = window.setTimeout(() => {
      revelar();
      observer.disconnect();
    }, 1600);

    return () => {
      ativo = false;
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return ref;
}
