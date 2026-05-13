import { style } from '@vanilla-extract/css';
import { tokens } from '../../../../design-system/tokens.css';

export const servicesSectionContainer = style({
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
  backgroundColor: tokens.color.neutral[50],
  backgroundImage: `radial-gradient(circle, color-mix(in srgb, ${tokens.color.acento.dourado} 13%, transparent) 1px, transparent 1px)`,
  backgroundSize: '28px 28px',

  '@media': {
    'screen and (min-width: 768px)': {
      padding: `80px ${tokens.spacing.xl}`,
    },
  },
});

export const sectionHeader = style({
  textAlign: 'center',
  marginBottom: tokens.spacing.xl,

  '@media': {
    'screen and (min-width: 768px)': {
      marginBottom: '3rem',
    },
  },
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
  maxWidth: '600px',
  margin: '0 auto',

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.xl,
      maxWidth: '700px',
    },
  },
});

export const gridContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: tokens.spacing.lg,
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%',

  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: tokens.spacing.xl,
    },
  },
});

export const categoriasContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.xl,
  width: '100%',

  '@media': {
    'screen and (min-width: 768px)': {
      gap: '3.5rem',
    },
  },
});

export const categoriaBloco = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.lg,
  width: '100%',

  '@media': {
    'screen and (min-width: 768px)': {
      gap: tokens.spacing.xl,
    },
  },
});

export const categoriaLabel = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  color: tokens.color.acento.dourado,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  textAlign: 'center',
  margin: 0,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.base,
    },
  },
});

export const messageContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: tokens.spacing.xl,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.lg,
  color: tokens.color.texto.secundario,
  textAlign: 'center',
  minHeight: '200px',
});

export const errorText = style({
  color: tokens.color.estado.erro,
});
