import { style } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

const baseCardContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: tokens.color.fundo,
  borderRadius: tokens.radius.lg,
  padding: tokens.spacing.xl,
  boxShadow: `0 18px 40px color-mix(in srgb, ${tokens.color.secundaria} 10%, transparent)`,
  border: `1px solid ${tokens.color.neutral[200]}`,
  transition: `transform ${tokens.motion.base} ease, box-shadow ${tokens.motion.base} ease`,
  height: '100%',
  textAlign: 'center',
  position: 'relative',

  selectors: {
    '&:hover, &:focus-within': {
      transform: 'translateY(-4px)',
      boxShadow: `0 24px 40px color-mix(in srgb, ${tokens.color.primaria} 12%, transparent)`,
      borderColor: tokens.color.acento.dourado,
    },
  },

  '@media': {
    'screen and (min-width: 768px)': {
      padding: '2.5rem',
    },
  },
});

export const cardContainer = baseCardContainer;

export const cardContainerSelecionado = style([
  baseCardContainer,
  {
    borderColor: tokens.color.acento.dourado,
    boxShadow: `0 24px 48px color-mix(in srgb, ${tokens.color.primaria} 16%, transparent)`,
    transform: 'translateY(-2px)',
  },
]);

export const iconPlaceholder = style({
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  backgroundColor: tokens.color.neutral[50],
  border: `2px solid ${tokens.color.primaria}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: tokens.spacing.lg,
  color: tokens.color.primaria,
  fontSize: tokens.font.size.h2,

  '@media': {
    'screen and (min-width: 768px)': {
      width: '148px',
      height: '148px',
    },
  },
});

export const cardTitle = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.xl,
  color: tokens.color.secundaria,
  marginBottom: tokens.spacing.sm,
  fontWeight: tokens.font.weight.bold,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: '1.45rem',
    },
  },
});

export const cardDescription = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.texto.secundario,
  marginBottom: tokens.spacing.lg,
  lineHeight: 1.5,
  flexGrow: 1,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.base,
      lineHeight: 1.65,
    },
  },
});

export const cardMeta = style({
  display: 'flex',
  flexDirection: 'row',
  gap: tokens.spacing.md,
  marginBottom: tokens.spacing.lg,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.primaria,
  fontWeight: tokens.font.weight.semibold,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.base,
    },
  },
});

export const cardButton = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.semibold,
  color: tokens.color.texto.invertido,
  backgroundColor: tokens.color.acento.dourado,
  padding: `${tokens.spacing.sm} ${tokens.spacing.xl}`,
  borderRadius: tokens.radius.md,
  border: 'none',
  cursor: 'pointer',
  transition: `background-color ${tokens.motion.fast} ease`,
  width: '100%',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',

  '@media': {
    'screen and (min-width: 768px)': {
      padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
      fontSize: tokens.font.size.lg,
    },
  },

  selectors: {
    '&:hover': {
      backgroundColor: `color-mix(in srgb, ${tokens.color.acento.dourado} 78%, ${tokens.color.primaria})`,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.primaria}`,
      outlineOffset: '2px',
    },
  },
});
