import { style, keyframes } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

const entradaSuave = keyframes({
  from: { opacity: 0, transform: 'translateY(12px) scale(0.92)' },
  to: { opacity: 1, transform: 'translateY(0) scale(1)' },
});

export const fabLink = style({
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  zIndex: 200,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '68px',
  height: '68px',
  borderRadius: '50%',

  backgroundColor: tokens.color.primaria,
  color: tokens.color.texto.invertido,

  boxShadow: '0 4px 20px rgba(107, 26, 26, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)',
  textDecoration: 'none',
  lineHeight: 0,

  transition: `transform ${tokens.motion.fast} ease, box-shadow ${tokens.motion.fast} ease, background-color ${tokens.motion.fast} ease`,

  animation: `${entradaSuave} ${tokens.motion.slow} ease both`,
  animationDelay: '0.8s',

  selectors: {
    '&:hover': {
      backgroundColor: tokens.color.brand.primaryHover,
      transform: 'translateY(-3px) scale(1.06)',
      boxShadow: '0 8px 28px rgba(107, 26, 26, 0.6), 0 4px 12px rgba(0, 0, 0, 0.35)',
      textDecoration: 'none',
      color: tokens.color.texto.invertido,
    },
    '&:focus-visible': {
      outline: `3px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '3px',
    },
    '&:active': {
      transform: 'scale(0.96)',
    },
  },

  '@media': {
    'screen and (max-width: 768px)': {
      width: '52px',
      height: '52px',
      bottom: '20px',
      right: '16px',
    },
    'screen and (min-width: 1280px)': {
      width: '76px',
      height: '76px',
      bottom: '32px',
      right: '32px',
    },
  },
});
