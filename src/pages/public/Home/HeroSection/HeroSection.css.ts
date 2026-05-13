import { style } from '@vanilla-extract/css';
import { tokens } from '../../../../design-system/tokens.css';
import { fadeInUp } from '../../../../design-system/animations.css';

export const heroContainer = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 64px)',
  padding: `80px ${tokens.spacing.xl} 64px`,
  backgroundColor: tokens.color.secundaria,
  textAlign: 'center',
  overflow: 'hidden',

  /* Borda dourada no topo — assinatura visual da realeza */
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(90deg, transparent 0%, ${tokens.color.acento.dourado} 30%, ${tokens.color.acento.dourado} 70%, transparent 100%)`,
  },

  '@media': {
    'screen and (max-width: 768px)': {
      padding: `48px ${tokens.spacing.md} 48px`,
      minHeight: 'calc(100vh - 64px)',
    },
  },
});

/* Gradiente radial sutil — profundidade de câmara escura */
export const heroOverlay = style({
  position: 'absolute',
  inset: 0,
  background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201, 168, 76, 0.07) 0%, transparent 70%)`,
  pointerEvents: 'none',
  zIndex: 0,
});

export const heroContent = style({
  position: 'relative',
  zIndex: 1,
  maxWidth: '820px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: tokens.spacing.lg,

  animation: `${fadeInUp} 900ms cubic-bezier(0.16, 1, 0.3, 1) both`,

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});

/* Pequeno crachá contextual acima do título */
export const heroBadge = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.acento.dourado,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  fontWeight: tokens.font.weight.semibold,
  margin: 0,
  opacity: 0.9,

  '@media': {
    'screen and (min-width: 769px)': {
      fontSize: tokens.font.size.base,
    },
  },
});

/* Título principal — Cormorant Garamond em tamanho monumental */
export const heroTitle = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.display,
  color: tokens.color.texto.invertido,
  lineHeight: 1.08,
  margin: 0,
  fontWeight: 400,
  letterSpacing: '-0.01em',
});

/* Separador ornamental dourado — linhas + símbolo central */
export const heroSeparator = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.md,
  width: '100%',
  maxWidth: '300px',
  marginTop: tokens.spacing.sm,
  marginBottom: tokens.spacing.sm,

  '@media': {
    'screen and (min-width: 769px)': {
      maxWidth: '440px',
    },
  },
});

export const heroSeparatorLine = style({
  flex: 1,
  height: '1px',
  backgroundColor: tokens.color.acento.dourado,
  opacity: 0.45,
});

export const heroSeparatorGlyph = style({
  color: tokens.color.acento.dourado,
  fontSize: '0.9rem',
  flexShrink: 0,
  lineHeight: 1,
  userSelect: 'none',

  '@media': {
    'screen and (min-width: 769px)': {
      fontSize: '1.2rem',
    },
  },
});

/* Texto de boas-vindas */
export const heroDescription = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.lg,
  color: `rgba(255, 255, 255, 0.75)`,
  lineHeight: 1.75,
  maxWidth: '620px',
  margin: 0,

  '@media': {
    'screen and (min-width: 769px)': {
      fontSize: tokens.font.size.xl,
      maxWidth: '680px',
      lineHeight: 1.8,
    },
  },
});

/* Botão CTA */
export const heroCta = style({
  display: 'inline-block',
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.bold,
  color: tokens.color.secundaria,
  backgroundColor: tokens.color.acento.dourado,
  textDecoration: 'none',
  letterSpacing: '0.07em',
  textTransform: 'uppercase',
  padding: `14px ${tokens.spacing.xl}`,
  borderRadius: tokens.radius.md,
  marginTop: tokens.spacing.sm,

  '@media': {
    'screen and (min-width: 769px)': {
      fontSize: tokens.font.size.lg,
      padding: '18px 2.75rem',
    },
  },
  transition: `opacity ${tokens.motion.fast} ease, transform ${tokens.motion.fast} ease, box-shadow ${tokens.motion.fast} ease`,

  selectors: {
    '&:hover': {
      textDecoration: 'none',
      opacity: 0.9,
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 24px rgba(201, 168, 76, 0.35)`,
    },
    '&:active': {
      transform: 'translateY(0)',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.texto.invertido}`,
      outlineOffset: '3px',
      borderRadius: tokens.radius.md,
    },
  },
});
