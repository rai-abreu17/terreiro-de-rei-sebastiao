import { keyframes } from '@vanilla-extract/css';

/* ─── Entrada de conteúdo (one-shot) ──────────────────────────────────── */

export const fadeInUp = keyframes({
  from: { opacity: 0, transform: 'translateY(28px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

/* ─── Flutuação ambiental infinita (ornamentos pervasivos) ────────────── */

/**
 * Variante A — ascende com leve giro para a direita.
 * Uso: elementos a direita, espada, escudo.
 */
export const flutuarA = keyframes({
  '0%': { transform: 'translateY(0px) rotate(-0.8deg)' },
  '100%': { transform: 'translateY(-18px) rotate(1.2deg)' },
});

/**
 * Variante B — ascende com leve inclinação para a esquerda, mais lento.
 * Uso: elementos à esquerda, guarda-sol, toalha.
 */
export const flutuarB = keyframes({
  '0%': { transform: 'translateY(-6px) rotate(0.5deg)' },
  '100%': { transform: 'translateY(-22px) rotate(-1deg)' },
});

/**
 * Variante C — flutuação minimal, praticamente imóvel — "presença".
 * Uso: marcas d'água de fundo muito grandes.
 */
export const flutuarC = keyframes({
  '0%': { transform: 'translateY(0px) rotate(0deg)' },
  '100%': { transform: 'translateY(-10px) rotate(0.4deg)' },
});
