import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

const breakpointTablet = '768px';
const breakpointDesktop = '769px';

const sidebarBase = style({
  width: '17rem',
  minWidth: '17rem',
  height: '100vh',
  backgroundColor: tokens.color.secundaria,
  color: tokens.color.texto.invertido,
  display: 'flex',
  flexDirection: 'column',
  borderRight: `1px solid ${tokens.color.neutral[800]}`,
});

export const container = styleVariants({
  fixa: [
    sidebarBase,
    {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 30,
      '@media': {
        [`screen and (max-width: ${breakpointTablet})`]: {
          display: 'none',
        },
      },
    },
  ],
  gaveta: [
    sidebarBase,
    {
      position: 'relative',
      boxShadow: `0 0 ${tokens.spacing.lg} color-mix(in srgb, ${tokens.color.secundaria} 28%, transparent)`,
      '@media': {
        [`screen and (min-width: ${breakpointDesktop})`]: {
          display: 'none',
        },
      },
    },
  ],
});

export const logoArea = style({
  padding: `${tokens.spacing.lg} ${tokens.spacing.md}`,
  borderBottom: `1px solid ${tokens.color.neutral[800]}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: tokens.spacing.xs,
});

export const logoChancela = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.neutral[200],
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
});

export const logoTexto = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.xl,
  color: tokens.color.acento.dourado,
  fontWeight: tokens.font.weight.bold,
  lineHeight: '1.1',
});

export const navLista = style({
  flex: 1,
  listStyle: 'none',
  padding: tokens.spacing.md,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.sm,
  overflowY: 'auto',
});

export const navItem = style({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.md,
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  borderRadius: tokens.radius.sm,
  color: tokens.color.neutral[200],
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.md,
  transition: `background-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease, box-shadow ${tokens.motion.fast} ease`,
  
  selectors: {
    '&:hover': {
      backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 72%, ${tokens.color.secundaria})`,
      color: tokens.color.texto.invertido,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '-2px',
    },
  },
});

export const navItemAtivo = style({
  backgroundColor: tokens.color.primaria,
  color: tokens.color.texto.invertido,
  fontWeight: tokens.font.weight.bold,
  boxShadow: `inset 3px 0 0 ${tokens.color.acento.dourado}`,
});

export const footer = style({
  padding: tokens.spacing.md,
  borderTop: `1px solid ${tokens.color.neutral[800]}`,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.sm,
});

export const adminNome = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.neutral[200],
  lineHeight: '1.5',
});

export const logoutButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.spacing.sm,
  padding: tokens.spacing.sm,
  backgroundColor: 'transparent',
  border: `1px solid ${tokens.color.neutral[600]}`,
  color: tokens.color.neutral[200],
  borderRadius: tokens.radius.sm,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  cursor: 'pointer',
  transition: `background-color ${tokens.motion.fast} ease, border-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,

  selectors: {
    '&:hover': {
      backgroundColor: tokens.color.estado.erro,
      borderColor: tokens.color.estado.erro,
      color: tokens.color.texto.invertido,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});
