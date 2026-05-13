import { style } from '@vanilla-extract/css';
import { tokens } from '../../../../design-system/tokens.css';

export const aboutContainer = style({
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
  backgroundColor: tokens.color.fundo,

  '@media': {
    'screen and (min-width: 768px)': {
      flexDirection: 'row',
      alignItems: 'center',
      padding: `80px ${tokens.spacing.xl}`,
      gap: '3rem',
    },
  },
});

export const imageColumn = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  marginBottom: tokens.spacing.xl,

  '@media': {
    'screen and (min-width: 768px)': {
      marginBottom: 0,
    },
  },
});

export const textColumn = style({
  flex: 1,
  display: 'grid',
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
  lineHeight: 1.75,
  margin: 0,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.lg,
    },
  },
});

// ── Frame da foto ─────────────────────────────────────────────────────────────

export const fotoFrame = style({
  position: 'relative',
  width: '100%',
  maxWidth: '440px',

  // Cantos decorativos dourados
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-10px',
      left: '-10px',
      width: '60px',
      height: '60px',
      borderTop: `3px solid ${tokens.color.acento.dourado}`,
      borderLeft: `3px solid ${tokens.color.acento.dourado}`,
      borderRadius: `${tokens.radius.sm} 0 0 0`,
      zIndex: 1,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-10px',
      right: '-10px',
      width: '60px',
      height: '60px',
      borderBottom: `3px solid ${tokens.color.acento.dourado}`,
      borderRight: `3px solid ${tokens.color.acento.dourado}`,
      borderRadius: `0 0 ${tokens.radius.sm} 0`,
      zIndex: 1,
    },
  },
});

export const fotoPlaceholder = style({
  width: '100%',
  aspectRatio: '4 / 5',
  borderRadius: '16px',
  backgroundColor: tokens.color.neutral[200],
  backgroundImage: `linear-gradient(135deg, ${tokens.color.neutral[50]} 0%, ${tokens.color.neutral[200]} 100%)`,
  boxShadow: `0 24px 60px color-mix(in srgb, ${tokens.color.secundaria} 18%, transparent)`,
  display: 'block',
});
