import { style } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

const baseCardContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  /*
   * Glassmorphism etéreo:
   * — Fundo levemente translúcido, deixando o pontilhado dourado da seção "respirar" por baixo
   * — Borda dourada fina e suave — o contorno da coroa
   * — Sombra dupla: externa para profundidade, interna branca para o efeito de vidro facetado
   */
  backgroundColor: 'rgba(255, 255, 255, 0.72)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  borderRadius: '24px',
  padding: tokens.spacing.xl,
  border: `1px solid rgba(201, 168, 76, 0.28)`,
  borderTop: `2px solid rgba(201, 168, 76, 0.55)`,
  boxShadow: [
    `0 8px 32px rgba(13, 31, 60, 0.07)`,
    `0 1px 0 rgba(255, 255, 255, 0.90) inset`,
  ].join(', '),
  transition: `transform ${tokens.motion.base} ease, box-shadow ${tokens.motion.base} ease, border-color ${tokens.motion.base} ease`,
  height: '100%',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',

  selectors: {
    /* Reflexo superior — como a luz incidindo na faceta superior de um cristal */
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      background: `linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, transparent 100%)`,
      borderRadius: '24px 24px 0 0',
      pointerEvents: 'none',
    },
    '&:hover, &:focus-within': {
      transform: 'translateY(-8px)',
      boxShadow: [
        `0 20px 48px rgba(107, 26, 26, 0.12)`,
        `0 1px 0 rgba(255, 255, 255, 0.90) inset`,
      ].join(', '),
      borderColor: `rgba(201, 168, 76, 0.55)`,
      borderTopColor: `rgba(201, 168, 76, 0.85)`,
    },
  },

  '@media': {
    'screen and (min-width: 768px)': {
      padding: '2.5rem',
    },
  },
});

export const cardContainer = baseCardContainer;

export const cardContainerSelecionado = style([
  baseCardContainer,
  {
    borderColor: `rgba(107, 26, 26, 0.35)`,
    borderTopColor: `rgba(107, 26, 26, 0.7)`,
    boxShadow: [
      `0 20px 48px rgba(107, 26, 26, 0.14)`,
      `0 1px 0 rgba(255, 255, 255, 0.90) inset`,
    ].join(', '),
    transform: 'translateY(-4px)',
  },
]);

export const iconPlaceholder = style({
  marginBottom: tokens.spacing.lg,
  position: 'relative',
  zIndex: 1,
});

export const iconPlaceholderInner = style({
  width: '110px',
  height: '110px',
  borderRadius: '50%',
  background: `radial-gradient(circle at 35% 35%, color-mix(in srgb, ${tokens.color.acento.dourado} 18%, ${tokens.color.secundaria}), ${tokens.color.secundaria})`,
  border: `2px solid color-mix(in srgb, ${tokens.color.acento.dourado} 50%, transparent)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: tokens.color.acento.dourado,
  boxShadow: `0 8px 24px color-mix(in srgb, ${tokens.color.secundaria} 30%, transparent), inset 0 1px 0 color-mix(in srgb, ${tokens.color.acento.dourado} 20%, transparent)`,

  '@media': {
    'screen and (min-width: 768px)': {
      width: '130px',
      height: '130px',
    },
  },
});

export const cardTitle = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: '1.5rem',
  color: tokens.color.secundaria,
  marginBottom: tokens.spacing.sm,
  fontWeight: tokens.font.weight.bold,
  position: 'relative',
  zIndex: 1,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: '1.7rem',
    },
  },
});

export const cardDescription = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.texto.secundario,
  marginBottom: tokens.spacing.lg,
  lineHeight: 1.65,
  flexGrow: 1,
  position: 'relative',
  zIndex: 1,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.base,
    },
  },
});

export const cardMeta = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  marginBottom: tokens.spacing.lg,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.primaria,
  fontWeight: tokens.font.weight.semibold,
  position: 'relative',
  zIndex: 1,
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  borderRadius: '999px',
  backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 7%, transparent)`,
  border: `1px solid color-mix(in srgb, ${tokens.color.primaria} 15%, transparent)`,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.base,
    },
  },
});

export const cardButton = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.semibold,
  color: tokens.color.secundaria,
  backgroundColor: tokens.color.acento.dourado,
  padding: `${tokens.spacing.sm} ${tokens.spacing.xl}`,
  minHeight: '48px',
  borderRadius: tokens.radius.md,
  border: 'none',
  cursor: 'pointer',
  transition: `background-color ${tokens.motion.fast} ease, transform ${tokens.motion.fast} ease`,
  width: '100%',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  position: 'relative',
  zIndex: 1,

  '@media': {
    'screen and (min-width: 768px)': {
      padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
    },
  },

  selectors: {
    '&:hover': {
      backgroundColor: `color-mix(in srgb, ${tokens.color.acento.dourado} 80%, ${tokens.color.primaria})`,
      transform: 'translateY(-1px)',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.primaria}`,
      outlineOffset: '2px',
    },
  },
});
