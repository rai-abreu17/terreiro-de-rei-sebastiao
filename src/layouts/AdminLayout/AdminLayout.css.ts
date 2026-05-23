import { style } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

const breakpointTablet = '768px';
const larguraSidebar = '17rem';
const alturaBottomNav = '64px';

export const layoutContainer = style({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: tokens.color.neutral[50],
});

export const mainContent = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  marginLeft: larguraSidebar,
  '@media': {
    [`screen and (max-width: ${breakpointTablet})`]: {
      marginLeft: 0,
    },
  },
});

export const contentArea = style({
  flex: 1,
  padding: tokens.spacing.xl,
  background: `linear-gradient(180deg, ${tokens.color.fundo} 0%, ${tokens.color.neutral[50]} 100%)`,
  '@media': {
    [`screen and (max-width: ${breakpointTablet})`]: {
      padding: 0,
      paddingBottom: `calc(${alturaBottomNav} + env(safe-area-inset-bottom))`,
    },
  },
});

export const bottomNav = style({
  display: 'none',
  '@media': {
    [`screen and (max-width: ${breakpointTablet})`]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 30,
      backgroundColor: tokens.color.fundo,
      borderTop: `1px solid ${tokens.color.neutral[200]}`,
      paddingBottom: 'env(safe-area-inset-bottom)',
      boxShadow: '0 -4px 14px rgba(13, 31, 60, 0.06)',
    },
  },
});

export const bottomNavLink = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  minHeight: '64px',
  padding: '6px 4px',
  textDecoration: 'none',
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
  fontSize: '10px',
  fontWeight: '500',
  letterSpacing: '0.02em',
  transition: `color ${tokens.motion.fast} ease, transform ${tokens.motion.fast} ease`,
  WebkitTapHighlightColor: 'transparent',
  selectors: {
    '&:active': {
      transform: 'scale(0.96)',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '-2px',
    },
  },
});

export const bottomNavLinkAtivo = style({
  color: tokens.color.primaria,
  fontWeight: '700',
});

export const bottomNavIconWrap = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '44px',
  height: '28px',
  borderRadius: '999px',
  transition: `background-color ${tokens.motion.fast} ease`,
});

export const bottomNavIconWrapAtivo = style({
  backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 12%, transparent)`,
});
