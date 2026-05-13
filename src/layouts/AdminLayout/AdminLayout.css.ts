import { style } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

const breakpointTablet = '768px';
const breakpointDesktop = '769px';
const larguraSidebar = '17rem';

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
      padding: tokens.spacing.md,
    },
  },
});

export const drawerOverlay = style({
  position: 'fixed',
  inset: 0,
  border: 'none',
  padding: 0,
  margin: 0,
  backgroundColor: `color-mix(in srgb, ${tokens.color.secundaria} 48%, transparent)`,
  cursor: 'pointer',
  zIndex: 35,
  '@media': {
    [`screen and (min-width: ${breakpointDesktop})`]: {
      display: 'none',
    },
  },
});

export const drawerContent = style({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: 40,
});
