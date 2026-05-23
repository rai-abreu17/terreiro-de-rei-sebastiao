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
      minHeight: '3.5rem',
      padding: `calc(${tokens.spacing.sm} + env(safe-area-inset-top)) ${tokens.spacing.md} ${tokens.spacing.sm}`,
      display: 'grid',
      gridTemplateColumns: '44px 1fr 44px',
      alignItems: 'center',
      gap: tokens.spacing.sm,
    },
  },
});

export const brandGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.md,
  minWidth: 0,

  '@media': {
    [`screen and (max-width: ${breakpointTablet})`]: {
      gridColumn: '2',
      justifyContent: 'center',
    },
  },
});

export const avatarWrap = style({
  position: 'relative',
  display: 'none',

  '@media': {
    [`screen and (max-width: ${breakpointTablet})`]: {
      display: 'inline-flex',
    },
  },
});

export const avatarButton = style({
  width: '40px',
  height: '40px',
  borderRadius: '999px',
  border: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: tokens.color.primaria,
  color: tokens.color.texto.invertido,
  fontFamily: tokens.font.family.corpo,
  fontWeight: tokens.font.weight.bold,
  fontSize: '15px',
  letterSpacing: '0.02em',
  WebkitTapHighlightColor: 'transparent',
  boxShadow: `0 2px 6px color-mix(in srgb, ${tokens.color.primaria} 30%, transparent)`,
  transition: `transform ${tokens.motion.fast} ease, box-shadow ${tokens.motion.fast} ease`,

  selectors: {
    '&:active': {
      transform: 'scale(0.94)',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const avatarMenu = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  minWidth: '220px',
  backgroundColor: tokens.color.fundo,
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: '12px',
  boxShadow: '0 12px 32px rgba(13, 31, 60, 0.18)',
  padding: '6px',
  zIndex: 50,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  animationName: 'none',
});

export const avatarMenuHeader = style({
  padding: '10px 12px 8px',
  borderBottom: `1px solid ${tokens.color.neutral[200]}`,
  marginBottom: '4px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const avatarMenuLabel = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: '10px',
  fontWeight: tokens.font.weight.semibold,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: tokens.color.texto.secundario,
});

export const avatarMenuNome = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: '14px',
  fontWeight: tokens.font.weight.semibold,
  color: tokens.color.texto.primario,
  wordBreak: 'break-word',
});

export const avatarMenuItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  width: '100%',
  minHeight: '44px',
  padding: '0 12px',
  border: 'none',
  background: 'transparent',
  color: tokens.color.texto.primario,
  fontFamily: tokens.font.family.corpo,
  fontSize: '14px',
  textAlign: 'left',
  cursor: 'pointer',
  borderRadius: '8px',
  transition: `background-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,

  selectors: {
    '&:hover': {
      backgroundColor: tokens.color.neutral[50],
    },
    '&:active': {
      backgroundColor: tokens.color.neutral[200],
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '-2px',
    },
  },
});

export const avatarMenuItemPerigo = style({
  color: tokens.color.estado.erro,

  selectors: {
    '&:hover': {
      backgroundColor: `color-mix(in srgb, ${tokens.color.estado.erro} 10%, transparent)`,
    },
  },
});

export const titleBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.xs,
  minWidth: 0,

  '@media': {
    [`screen and (max-width: ${breakpointTablet})`]: {
      alignItems: 'center',
      textAlign: 'center',
      gap: '2px',
    },
  },
});

export const eyebrow = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.texto.secundario,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',

  '@media': {
    [`screen and (max-width: ${breakpointTablet})`]: {
      fontFamily: tokens.font.family.titulo,
      fontSize: '12px',
      letterSpacing: '0.12em',
      color: tokens.color.primaria,
      fontWeight: tokens.font.weight.semibold,
    },
  },
});

export const logoTexto = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.h2,
  color: tokens.color.primaria,
  fontWeight: tokens.font.weight.bold,
  lineHeight: '1',

  '@media': {
    [`screen and (max-width: ${breakpointTablet})`]: {
      fontSize: '12px',
      fontStyle: 'italic',
      color: tokens.color.texto.secundario,
      fontWeight: '400',
      letterSpacing: '0.02em',
    },
  },
});

export const actionsGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.md,

  '@media': {
    [`screen and (max-width: ${breakpointTablet})`]: {
      gridColumn: '3',
      justifyContent: 'flex-end',
      gap: 0,
    },
  },
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

  '@media': {
    [`screen and (max-width: ${breakpointTablet})`]: {
      display: 'none',
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
