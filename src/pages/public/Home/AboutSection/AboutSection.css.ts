import { style } from '@vanilla-extract/css';
import { tokens } from '../../../../design-system/tokens.css';

export const aboutContainer = style({
  position: 'relative',  /* necessário para ornamentos absolutos */
  overflow: 'hidden',    /* clips o guarda-sol que extrapola a borda */
  display: 'flex',
  flexDirection: 'column',
  padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
  backgroundColor: tokens.color.fundo,

  '@media': {
    'screen and (min-width: 768px)': {
      flexDirection: 'row',
      alignItems: 'center',
      padding: `80px ${tokens.spacing.xl}`,
      gap: tokens.spacing.xl,
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
});

export const sectionTitle = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.h2,
  color: tokens.color.primaria,
  marginBottom: tokens.spacing.md,

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
  marginBottom: tokens.spacing.lg,

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
  marginBottom: tokens.spacing.md,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.lg,
      lineHeight: 1.75,
    },
  },
});

export const imagePlaceholder = style({
  width: '100%',
  maxWidth: '450px',
  height: '500px',
  backgroundColor: tokens.color.secundaria,
  borderRadius: tokens.radius.lg,
  opacity: 0.9,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: tokens.color.texto.invertido,
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.lg,
  boxShadow: `0 12px 40px rgba(13, 31, 60, 0.2)`,
  position: 'relative',

  '::after': {
    content: '""',
    position: 'absolute',
    bottom: '-16px',
    right: '-16px',
    width: '100px',
    height: '100px',
    borderBottom: `4px solid ${tokens.color.acento.dourado}`,
    borderRight: `4px solid ${tokens.color.acento.dourado}`,
    borderRadius: `0 0 ${tokens.radius.lg} 0`,
  }
});
