import { style } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

export const navContainer = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  backgroundColor: tokens.color.secundaria,
  borderBottom: '1px solid rgba(201, 168, 76, 0.2)',
});

export const navInner = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `0 ${tokens.spacing.xl}`,
  height: '64px',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `0 ${tokens.spacing.md}`,
    },
  },
});

export const logo = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.xl,
  color: tokens.color.acento.dourado,
  fontWeight: tokens.font.weight.bold,
  textDecoration: 'none',
  letterSpacing: '0.02em',
  lineHeight: 1,
  transition: `opacity ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      color: tokens.color.acento.dourado,
      textDecoration: 'none',
      opacity: 0.85,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '4px',
      borderRadius: tokens.radius.sm,
    },
  },
});

export const navLinksDesktop = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.xl,
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'none',
    },
  },
});

export const navLink = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  color: tokens.color.texto.invertido,
  textDecoration: 'none',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  transition: `color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      color: tokens.color.acento.dourado,
      textDecoration: 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '4px',
      borderRadius: tokens.radius.sm,
    },
  },
});

export const ctaLink = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.bold,
  color: tokens.color.secundaria,
  backgroundColor: tokens.color.acento.dourado,
  textDecoration: 'none',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  borderRadius: tokens.radius.md,
  padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
  transition: `opacity ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      textDecoration: 'none',
      opacity: 0.88,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.texto.invertido}`,
      outlineOffset: '2px',
    },
  },
});

export const hamburger = style({
  display: 'none',
  background: 'transparent',
  border: 'none',
  color: tokens.color.texto.invertido,
  cursor: 'pointer',
  padding: tokens.spacing.md,
  minWidth: '44px',
  minHeight: '44px',
  borderRadius: tokens.radius.sm,
  alignItems: 'center',
  justifyContent: 'center',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'flex',
    },
  },
});

// Mobile menu — hidden by default on all screen sizes
export const mobileMenu = style({
  display: 'none',
  flexDirection: 'column',
  backgroundColor: tokens.color.secundaria,
  borderTop: '1px solid rgba(201, 168, 76, 0.15)',
  paddingBottom: tokens.spacing.md,
});

// Overrides display:none when menu is open, but only on mobile
export const mobileMenuAberto = style({
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'flex',
    },
  },
});

export const mobileNavLink = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.semibold,
  color: tokens.color.texto.invertido,
  textDecoration: 'none',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  padding: `${tokens.spacing.lg} ${tokens.spacing.xl}`,
  minHeight: '52px',
  display: 'flex',
  alignItems: 'center',
  transition: `color ${tokens.motion.fast} ease, background-color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      color: tokens.color.acento.dourado,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      textDecoration: 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '-2px',
    },
  },
});

export const navSocialGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  paddingLeft: tokens.spacing.lg,
  borderLeft: '1px solid rgba(201, 168, 76, 0.25)',
});

export const navSocialLink = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: tokens.color.acento.prateado,
  padding: tokens.spacing.sm,
  borderRadius: tokens.radius.sm,
  lineHeight: 0,
  transition: `color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      color: tokens.color.primaria,
      textDecoration: 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
      borderRadius: tokens.radius.sm,
    },
  },
});

export const mobileSocialRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.spacing.xl,
  padding: `${tokens.spacing.md} ${tokens.spacing.xl} ${tokens.spacing.sm}`,
  borderTop: '1px solid rgba(201, 168, 76, 0.15)',
  marginTop: tokens.spacing.sm,
});

export const mobileSocialLink = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: tokens.color.acento.prateado,
  padding: tokens.spacing.md,
  minWidth: '44px',
  minHeight: '44px',
  borderRadius: tokens.radius.md,
  lineHeight: 0,
  transition: `color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      color: tokens.color.acento.dourado,
      textDecoration: 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const mobileCtaLink = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.bold,
  color: tokens.color.secundaria,
  backgroundColor: tokens.color.acento.dourado,
  textDecoration: 'none',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  margin: `${tokens.spacing.sm} ${tokens.spacing.xl} 0`,
  padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
  borderRadius: tokens.radius.md,
  textAlign: 'center',
  transition: `opacity ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      textDecoration: 'none',
      opacity: 0.88,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.texto.invertido}`,
      outlineOffset: '2px',
    },
  },
});
