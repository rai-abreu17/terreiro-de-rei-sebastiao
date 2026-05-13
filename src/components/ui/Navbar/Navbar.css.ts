import { style } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

const breakpointTablet = '768px';

export const container = style({
  width: '100%',
  minHeight: '5.5rem',
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens.spacing.md,
  padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
  borderBottom: `1px solid ${tokens.color.neutral[200]}`,
  position: 'sticky',
  top: 0,
  zIndex: 20,

  '@media': {
    [`screen and (max-width: ${breakpointTablet})`]: {
      padding: tokens.spacing.md,
    },
  },
});

export const brandGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.md,
  minWidth: 0,
});

export const menuButton = style({
  display: 'none',
  backgroundColor: tokens.color.fundo,
  border: `1px solid ${tokens.color.neutral[200]}`,
  color: tokens.color.secundaria,
  borderRadius: tokens.radius.md,
  padding: tokens.spacing.sm,
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',

  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },

  '@media': {
    [`screen and (max-width: ${breakpointTablet})`]: {
      display: 'inline-flex',
    },
  },
});

export const titleBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.xs,
  minWidth: 0,
});

export const eyebrow = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.texto.secundario,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
});

export const logoTexto = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.h2,
  color: tokens.color.primaria,
  fontWeight: tokens.font.weight.bold,
  lineHeight: '1',

  '@media': {
    [`screen and (max-width: ${breakpointTablet})`]: {
      fontSize: tokens.font.size.xl,
    },
  },
});

export const actionsGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.md,
});

export const adminInfo = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.texto.secundario,

  '@media': {
    [`screen and (max-width: ${breakpointTablet})`]: {
      display: 'none',
    },
  },
});

export const logoutButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.spacing.sm,
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  backgroundColor: tokens.color.fundo,
  border: `1px solid ${tokens.color.neutral[200]}`,
  color: tokens.color.secundaria,
  cursor: 'pointer',
  borderRadius: tokens.radius.md,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  transition: `background-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease, border-color ${tokens.motion.fast} ease`,

  selectors: {
    '&:hover': {
      backgroundColor: tokens.color.primaria,
      borderColor: tokens.color.primaria,
      color: tokens.color.texto.invertido,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const logoutLabel = style({
  '@media': {
    [`screen and (max-width: ${breakpointTablet})`]: {
      display: 'none',
    },
  },
});
