import { style } from '@vanilla-extract/css';

// Navbar height is 64px; padding-top ensures content starts below the fixed header
const NAVBAR_HEIGHT = '64px';

export const layoutWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

export const conteudoPrincipal = style({
  flex: 1,
  paddingTop: NAVBAR_HEIGHT,
});
