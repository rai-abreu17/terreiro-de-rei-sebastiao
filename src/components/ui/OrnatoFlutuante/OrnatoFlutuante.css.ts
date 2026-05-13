import { style, styleVariants } from '@vanilla-extract/css';
import { flutuarA, flutuarB, flutuarC } from '../../../design-system/animations.css';

/*
 * Container do ornamento — gerencia a animação de entrada (opacity 0 → 1).
 * A opacidade alvo não está no CSS: é controlada pelo elemento filho interno
 * (div com opacity inline), mantendo type-safety estrito no vanilla-extract.
 *
 * Camadas de animação:
 *   1. opacity (este elemento): CSS transition, ativado pelo IntersectionObserver
 *      que define data-revealed="true" via useReveal hook.
 *   2. transform (flutuação infinita): CSS @keyframes na variante abaixo.
 *
 * Framer Motion não é usado — respeita a diretriz do projeto que restringe
 * framer-motion a transições de página e modais.
 */
export const ornato = style({
  position: 'absolute',
  pointerEvents: 'none',
  userSelect: 'none',
  zIndex: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  /* Estado inicial invisível — revelado pelo useReveal hook */
  opacity: 0,
  transition: `opacity 2.4s cubic-bezier(0.22, 1, 0.36, 1)`,

  selectors: {
    '&[data-revealed="true"]': {
      opacity: 1, /* O elemento filho define a opacidade visual final */
    },
  },

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      opacity: 1,     /* Visível imediatamente, sem animação de entrada */
      transition: 'none',
    },
  },
});

/*
 * Variantes de flutuação — marcha real lenta e majestosa.
 * direction: 'alternate' faz o símbolo descer suavemente ao ponto de origem,
 * criando a respiração ambiental perpétua.
 */
export const variante = styleVariants({
  a: {
    animation: `${flutuarA} 9s ease-in-out infinite alternate`,
    '@media': { '(prefers-reduced-motion: reduce)': { animation: 'none' } },
  },
  b: {
    animation: `${flutuarB} 13s ease-in-out infinite alternate`,
    '@media': { '(prefers-reduced-motion: reduce)': { animation: 'none' } },
  },
  c: {
    animation: `${flutuarC} 7s ease-in-out infinite alternate`,
    '@media': { '(prefers-reduced-motion: reduce)': { animation: 'none' } },
  },
});
