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

// ── Painel de símbolos decorativos ────────────────────────────────────────────

export const imagePlaceholder = style({
  width: '100%',
  maxWidth: '420px',
  minHeight: '420px',
  background: `linear-gradient(145deg, ${tokens.color.secundaria} 0%, color-mix(in srgb, ${tokens.color.secundaria} 85%, ${tokens.color.primaria}) 100%)`,
  borderRadius: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: tokens.spacing.xl,
  boxShadow: `0 24px 60px color-mix(in srgb, ${tokens.color.secundaria} 25%, transparent)`,
  position: 'relative',

  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: '24px',
      background: `radial-gradient(ellipse at 30% 30%, color-mix(in srgb, ${tokens.color.acento.dourado} 10%, transparent), transparent 60%)`,
      pointerEvents: 'none',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-14px',
      right: '-14px',
      width: '90px',
      height: '90px',
      borderBottom: `4px solid ${tokens.color.acento.dourado}`,
      borderRight: `4px solid ${tokens.color.acento.dourado}`,
      borderRadius: `0 0 16px 0`,
    },
  },
});

export const simbolosGrade = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: tokens.spacing.xl,
  position: 'relative',
  zIndex: 1,
  width: '100%',
});

export const simboloItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  padding: tokens.spacing.lg,
  borderRadius: '16px',
  backgroundColor: `color-mix(in srgb, ${tokens.color.texto.invertido} 5%, transparent)`,
  border: `1px solid color-mix(in srgb, ${tokens.color.acento.dourado} 20%, transparent)`,
  transition: `background-color ${tokens.motion.fast} ease`,

  selectors: {
    '&:hover': {
      backgroundColor: `color-mix(in srgb, ${tokens.color.texto.invertido} 10%, transparent)`,
    },
  },
});

export const simboloRotulo = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: '0.7rem',
  color: `color-mix(in srgb, ${tokens.color.acento.dourado} 80%, transparent)`,
  fontWeight: tokens.font.weight.semibold,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  textAlign: 'center',
});
