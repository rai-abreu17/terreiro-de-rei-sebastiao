import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

const sheetIn = keyframes({
  from: { transform: 'translateY(100%)' },
  to: { transform: 'translateY(0)' },
});

export const overlay = style({
  position: 'fixed',
  inset: 0,
  border: 0,
  padding: 0,
  margin: 0,
  backgroundColor: `color-mix(in srgb, ${tokens.color.secundaria} 54%, transparent)`,
  zIndex: 80,
  cursor: 'pointer',
});

export const panel = style({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 90,
  width: 'min(100vw, 520px)',
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  boxShadow: '-18px 0 40px rgba(0, 0, 0, 0.18)',
  display: 'flex',
  flexDirection: 'column',
  outline: 'none',
  '@media': {
    'screen and (max-width: 767px)': {
      top: 'auto',
      left: 0,
      right: 0,
      bottom: 'var(--drawer-keyboard-offset, 0px)',
      width: '100%',
      height: '85dvh',
      maxHeight: 'calc(100dvh - 24px - var(--drawer-keyboard-offset, 0px))',
      borderRadius: '20px 20px 0 0',
      boxShadow: '0 -18px 40px rgba(0, 0, 0, 0.18)',
      animation: `${sheetIn} 300ms cubic-bezier(0.4, 0, 0.2, 1)`,
      transition: 'bottom 180ms ease, transform 180ms ease',
      willChange: 'transform',
      overflow: 'hidden',
    },
  },
});

export const panelMobileCompact = style({
  '@media': {
    'screen and (max-width: 767px)': {
      height: 'auto',
      minHeight: '220px',
      maxHeight: 'min(60dvh, 340px)',
    },
  },
});

export const sheetHandle = style({
  display: 'none',
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'block',
      flexShrink: 0,
      width: '40px',
      height: '4px',
      margin: '10px auto 4px',
      borderRadius: '999px',
      backgroundColor: tokens.color.neutral[400],
    },
  },
});

export const header = style({
  flexShrink: 0,
  minHeight: '72px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens.spacing.md,
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  borderBottom: `1px solid ${tokens.color.neutral[200]}`,
});

export const title = style({
  margin: 0,
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.xl,
  color: tokens.color.primaria,
  fontWeight: tokens.font.weight.bold,
});

export const closeButton = style({
  width: '40px',
  height: '40px',
  borderRadius: '999px',
  border: `1px solid ${tokens.color.neutral[200]}`,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: `border-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease, background-color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      borderColor: tokens.color.primaria,
      color: tokens.color.primaria,
      backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 5%, ${tokens.color.fundo})`,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const body = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  padding: tokens.spacing.lg,
  WebkitOverflowScrolling: 'touch',
  overscrollBehaviorY: 'contain',
});

export const footer = style({
  flexShrink: 0,
  borderTop: `1px solid ${tokens.color.neutral[200]}`,
  backgroundColor: tokens.color.fundo,
  padding: tokens.spacing.lg,
  paddingBottom: `calc(${tokens.spacing.lg} + env(safe-area-inset-bottom))`,
});

globalStyle(`${panelMobileCompact} ${header}`, {
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
    },
  },
});

globalStyle(`${panelMobileCompact} ${body}`, {
  '@media': {
    'screen and (max-width: 767px)': {
      flex: '0 1 auto',
      overflowY: 'visible',
      padding: '16px 20px 12px',
    },
  },
});

globalStyle(`${panelMobileCompact} ${footer}`, {
  '@media': {
    'screen and (max-width: 767px)': {
      borderTop: 0,
      padding: '0 20px calc(16px + env(safe-area-inset-bottom))',
    },
  },
});
