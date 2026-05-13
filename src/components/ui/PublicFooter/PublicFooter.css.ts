import { style } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

export const footerContainer = style({
  backgroundColor: tokens.color.secundaria,
  color: tokens.color.texto.invertido,
  paddingTop: tokens.spacing.xl,
  borderTop: '1px solid rgba(201, 168, 76, 0.2)',
});

export const footerInner = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `0 ${tokens.spacing.xl}`,
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr 1fr',
  gap: tokens.spacing.xl,
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      padding: `0 ${tokens.spacing.md}`,
      gap: tokens.spacing.lg,
    },
  },
});

export const marcaColuna = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.sm,
});

export const logoFooter = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.xl,
  color: tokens.color.acento.dourado,
  fontWeight: tokens.font.weight.bold,
  letterSpacing: '0.02em',
  lineHeight: 1.2,
  marginBottom: tokens.spacing.xs,
  textDecoration: 'none',
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

export const tagline = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.acento.prateado,
  lineHeight: 1.6,
  maxWidth: '280px',

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.base,
      maxWidth: '320px',
    },
  },
});

export const colunaNav = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.sm,
});

// Overrides global h3 styles (font-family: titulo, color: primaria) via higher specificity
export const colunaTitulo = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.bold,
  color: tokens.color.acento.dourado,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  margin: `0 0 ${tokens.spacing.xs}`,
});

export const footerLink = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.acento.prateado,
  textDecoration: 'none',
  transition: `color ${tokens.motion.fast} ease`,

  selectors: {
    '&:hover': {
      color: tokens.color.acento.dourado,
      textDecoration: 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
      borderRadius: tokens.radius.sm,
    },
  },

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.base,
    },
  },
});

export const contatoTexto = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.acento.prateado,
  lineHeight: 1.6,
});

export const separador = style({
  border: 'none',
  borderTop: '1px solid rgba(201, 168, 76, 0.15)',
  margin: `${tokens.spacing.xl} 0 0`,
});

export const rodape = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `${tokens.spacing.md} ${tokens.spacing.xl} ${tokens.spacing.xl}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.spacing.md,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${tokens.spacing.md} ${tokens.spacing.md} ${tokens.spacing.xl}`,
      textAlign: 'center',
    },
  },
});

export const copyright = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.neutral['400'],
});

/* Tambores ornamentais no rodapé — discreta presença percussiva */
export const ornatoTambor = style({
  display: 'flex',
  alignItems: 'center',
  opacity: 0.35,
  flexShrink: 0,
});

export const colunaRedes = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.sm,
});

export const linkRede = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  color: tokens.color.acento.prateado,
  textDecoration: 'none',
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  transition: `color ${tokens.motion.fast} ease`,

  selectors: {
    '&:hover': {
      color: tokens.color.acento.dourado,
      textDecoration: 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
      borderRadius: tokens.radius.sm,
    },
  },

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.base,
      gap: tokens.spacing.md,
    },
  },
});

export const iconeRede = style({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
});
