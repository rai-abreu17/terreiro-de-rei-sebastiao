import { style } from '@vanilla-extract/css';
import { tokens } from '../../../../design-system/tokens.css';

export const contactSectionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.xl,
  padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
  backgroundColor: tokens.color.neutral[50],
  scrollMarginTop: '96px',

  '@media': {
    'screen and (min-width: 768px)': {
      padding: `80px ${tokens.spacing.xl}`,
    },
  },
});

export const contentGrid = style({
  display: 'grid',
  gap: tokens.spacing.xl,

  '@media': {
    'screen and (min-width: 900px)': {
      gridTemplateColumns: '1.2fr 1fr',
      alignItems: 'start',
    },
  },
});

export const textBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.md,
});

export const sectionTitle = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.h2,
  color: tokens.color.primaria,
  margin: 0,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: '2.5rem',
    },
  },
});

export const sectionSubtitle = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.lg,
  color: tokens.color.secundaria,
  fontWeight: tokens.font.weight.semibold,
  margin: 0,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.xl,
    },
  },
});

export const sectionParagraph = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  color: tokens.color.texto.secundario,
  lineHeight: 1.6,
  margin: 0,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.lg,
      lineHeight: 1.75,
    },
  },
});

export const actionsRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens.spacing.md,
  marginTop: tokens.spacing.sm,
});

export const primaryAction = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
  borderRadius: tokens.radius.md,
  backgroundColor: tokens.color.acento.dourado,
  color: tokens.color.secundaria,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.bold,
  letterSpacing: '0.04em',
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: `opacity ${tokens.motion.fast} ease`,

  selectors: {
    '&:hover': {
      opacity: 0.88,
      textDecoration: 'none',
    },
  },

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.base,
      padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
    },
  },
});

export const secondaryAction = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
  borderRadius: tokens.radius.md,
  border: `1px solid ${tokens.color.acento.dourado}`,
  color: tokens.color.secundaria,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  letterSpacing: '0.04em',
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: `background-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,

  selectors: {
    '&:hover': {
      backgroundColor: tokens.color.acento.dourado,
      color: tokens.color.secundaria,
      textDecoration: 'none',
    },
  },

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.base,
      padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
    },
  },
});

export const cardsGrid = style({
  display: 'grid',
  gap: tokens.spacing.md,
});

export const infoCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.sm,
  padding: tokens.spacing.lg,
  backgroundColor: tokens.color.fundo,
  borderRadius: tokens.radius.lg,
  border: `1px solid ${tokens.color.neutral[200]}`,
  boxShadow: '0 12px 32px rgba(13, 31, 60, 0.08)',

  '@media': {
    'screen and (min-width: 768px)': {
      padding: tokens.spacing.xl,
      gap: tokens.spacing.md,
    },
  },
});

export const cardTitle = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.lg,
  fontWeight: tokens.font.weight.bold,
  color: tokens.color.secundaria,
  margin: 0,
});

export const cardText = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  color: tokens.color.texto.secundario,
  lineHeight: 1.6,
  margin: 0,
});