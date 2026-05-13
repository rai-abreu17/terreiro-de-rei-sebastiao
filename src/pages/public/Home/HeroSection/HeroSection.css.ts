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
  padding: `80px ${tokens.spacing.xl} 24px`,
  textAlign: 'center',
  /*
   * overflow: visible — necessário para o Touro Negro (::after) sangrar para além
   * das bordas inferior e direita. O homeContainer tem overflow-x: hidden,
   * então não há barra de rolagem horizontal. O sangramento vertical é intencional:
   * o touro "emerge" do oceano e "mergulha" na onda abaixo.
   */
  overflow: 'visible',

  /*
   * Oceano noturno em camadas:
   * 1. Fulgor carmesim vindo das profundezas (lower-left) — a terra encantada abaixo das dunas
   * 2. Halo dourado distante (upper-right) — a coroa do Rei brilhando através da água
   * 3. Gradiente base: azul-marinho escuro variado em tom, imitando a profundidade do oceano
   */
  backgroundColor: tokens.color.secundaria,
  backgroundImage: [
    `radial-gradient(ellipse 70% 55% at 10% 110%, ${tokens.color.primaria}3A 0%, transparent 55%)`,
    `radial-gradient(ellipse 50% 40% at 90% -10%, ${tokens.color.acento.dourado}22 0%, transparent 55%)`,
    `linear-gradient(168deg, #080F1F 0%, ${tokens.color.secundaria} 35%, #0B1A38 65%, #06101F 100%)`,
  ].join(', '),

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
      padding: `48px ${tokens.spacing.md} 24px`,
      minHeight: 'calc(100vh - 64px)',
    },
  },
});

/*
 * Overlay em duas camadas:
 * — Halo dourado central suave (como luz filtrada pelas águas rasas das lagoas)
 * — Véu escuro nas bordas para profundidade de vinheta
 */
export const heroOverlay = style({
  position: 'absolute',
  inset: 0,
  background: [
    `radial-gradient(ellipse 65% 55% at 50% 45%, rgba(201, 168, 76, 0.10) 0%, transparent 65%)`,
    `radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(0, 0, 0, 0.35) 100%)`,
  ].join(', '),
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

/* Título principal — Cormorant Garamond em tamanho monumental com halo régio */
export const heroTitle = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.display,
  color: tokens.color.texto.invertido,
  lineHeight: 1.08,
  margin: 0,
  fontWeight: 400,
  letterSpacing: '-0.01em',
  /* Brilho dourado suave — como o reflexo da coroa nas águas */
  textShadow: `0 0 60px rgba(201, 168, 76, 0.22), 0 2px 8px rgba(0, 0, 0, 0.5)`,
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
