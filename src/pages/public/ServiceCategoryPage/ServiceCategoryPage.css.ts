import { style } from '@vanilla-extract/css';
import { tokens } from '../../../design-system/tokens.css';

export const pageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: tokens.color.fundo,
  /*
   * Impede scroll horizontal causado pelos DivisorOnda que sangram
   * além da borda direita ou esquerda da viewport.
   */
  overflowX: 'hidden',
});

// ── Hero ──────────────────────────────────────────────────────────────────────

export const heroSection = style({
  position: 'relative',
  overflow: 'hidden',
  background: `linear-gradient(145deg, ${tokens.color.secundaria} 0%, color-mix(in srgb, ${tokens.color.secundaria} 82%, ${tokens.color.primaria}) 100%)`,
  padding: `88px ${tokens.spacing.lg} ${tokens.spacing.xl}`,
  '@media': {
    'screen and (min-width: 768px)': {
      padding: `112px ${tokens.spacing.xl} 88px`,
    },
  },
});

export const heroGrid = style({
  position: 'relative',
  zIndex: 1,
  maxWidth: '1120px',
  margin: '0 auto',
  display: 'grid',
  gap: tokens.spacing.xl,
  '@media': {
    'screen and (min-width: 960px)': {
      gridTemplateColumns: '1.35fr 0.95fr',
      alignItems: 'start',
      gap: '2.5rem',
    },
  },
});

export const heroContent = style({
  display: 'grid',
  gap: tokens.spacing.lg,
});

export const backLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  width: 'fit-content',
  color: tokens.color.acento.dourado,
  textDecoration: 'none',
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  selectors: {
    '&:hover': { textDecoration: 'underline' },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '3px',
      borderRadius: tokens.radius.sm,
    },
  },
});

export const eyebrow = style({
  margin: 0,
  color: tokens.color.acento.dourado,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
});

export const heroTitle = style({
  margin: 0,
  color: tokens.color.texto.invertido,
  fontFamily: tokens.font.family.titulo,
  fontSize: 'clamp(2.4rem, 5vw, 4.6rem)',
  lineHeight: 1,
});

export const heroSubtitle = style({
  margin: 0,
  color: `color-mix(in srgb, ${tokens.color.texto.invertido} 82%, transparent)`,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.lg,
  lineHeight: 1.7,
  maxWidth: '58ch',
});

// ── Sinais — lista numerada com círculos dourados ─────────────────────────────

export const signalsBlock = style({
  display: 'grid',
  gap: tokens.spacing.md,
});

export const signalsTitle = style({
  margin: 0,
  color: tokens.color.texto.invertido,
  fontFamily: tokens.font.family.titulo,
  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
});

export const sinaisContainer = style({
  display: 'grid',
  gap: tokens.spacing.md,
});

export const signalItemWrapper = style({
  display: 'flex',
  gap: tokens.spacing.md,
  alignItems: 'flex-start',
});

export const signalNumero = style({
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  border: `1.5px solid ${tokens.color.acento.dourado}`,
  color: tokens.color.acento.dourado,
  fontFamily: tokens.font.family.titulo,
  fontSize: '1rem',
  fontWeight: tokens.font.weight.semibold,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  backgroundColor: `color-mix(in srgb, ${tokens.color.acento.dourado} 10%, transparent)`,
  lineHeight: 1,
  marginTop: '2px',
});

export const signalItemTexto = style({
  margin: 0,
  color: `color-mix(in srgb, ${tokens.color.texto.invertido} 86%, transparent)`,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  lineHeight: 1.7,
  flex: 1,
});

// ── Hero Aside ────────────────────────────────────────────────────────────────

export const heroAside = style({
  display: 'grid',
  gap: tokens.spacing.lg,
  padding: tokens.spacing.xl,
  backgroundColor: `color-mix(in srgb, ${tokens.color.texto.invertido} 7%, transparent)`,
  border: `1px solid color-mix(in srgb, ${tokens.color.texto.invertido} 16%, transparent)`,
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.16)',
  backdropFilter: 'blur(6px)',
});

export const asideTitle = style({
  margin: 0,
  color: tokens.color.texto.invertido,
  fontFamily: tokens.font.family.titulo,
  fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
});

export const asideText = style({
  margin: 0,
  color: `color-mix(in srgb, ${tokens.color.texto.invertido} 82%, transparent)`,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  lineHeight: 1.7,
});

export const statsGrid = style({
  display: 'grid',
  gap: tokens.spacing.md,
});

export const statCard = style({
  display: 'grid',
  gap: '0.35rem',
  padding: tokens.spacing.lg,
  borderRadius: '18px',
  backgroundColor: `color-mix(in srgb, ${tokens.color.texto.invertido} 11%, transparent)`,
  border: `1px solid color-mix(in srgb, ${tokens.color.acento.dourado} 30%, transparent)`,
  borderBottom: `3px solid ${tokens.color.acento.dourado}`,
});

export const statLabel = style({
  color: tokens.color.acento.dourado,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
});

export const statValue = style({
  color: tokens.color.texto.invertido,
  fontFamily: tokens.font.family.titulo,
  fontSize: '1.45rem',
  lineHeight: 1.2,
});

export const primaryAction = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
  minHeight: '48px',
  borderRadius: tokens.radius.md,
  backgroundColor: tokens.color.acento.dourado,
  color: tokens.color.secundaria,
  textDecoration: 'none',
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.bold,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  transition: `transform ${tokens.motion.fast} ease, opacity ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      opacity: 0.92,
      transform: 'translateY(-2px)',
      textDecoration: 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.texto.invertido}`,
      outlineOffset: '3px',
    },
  },
});

// ── Seções ────────────────────────────────────────────────────────────────────

export const section = style({
  padding: `56px ${tokens.spacing.lg}`,
  position: 'relative',
  overflow: 'hidden',
  '@media': {
    'screen and (min-width: 768px)': {
      /* Reduzido de 88px: ondas acima/abaixo já fornecem separação visual */
      padding: `64px ${tokens.spacing.xl}`,
    },
  },
});

export const sectionAlt = style([
  section,
  {
    backgroundColor: tokens.color.neutral[50],
    backgroundImage: `radial-gradient(circle, color-mix(in srgb, ${tokens.color.acento.dourado} 14%, transparent) 1px, transparent 1px)`,
    backgroundSize: '28px 28px',
  },
]);

export const sectionDark = style([
  section,
  {
    backgroundColor: tokens.color.primaria,
  },
]);

export const sectionInner = style({
  maxWidth: '1120px',
  margin: '0 auto',
  display: 'grid',
  gap: tokens.spacing.xl,
});

export const sectionGrid = style({
  display: 'grid',
  gap: tokens.spacing.xl,
  '@media': {
    'screen and (min-width: 960px)': {
      gridTemplateColumns: '1.1fr 0.9fr',
      alignItems: 'start',
      gap: '2.5rem',
    },
  },
});

export const richTextBlock = style({
  display: 'grid',
  gap: tokens.spacing.md,
});

export const sectionTitle = style({
  margin: 0,
  color: tokens.color.secundaria,
  fontFamily: tokens.font.family.titulo,
  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
  lineHeight: 1.1,
});

export const sectionTitleDark = style([
  sectionTitle,
  { color: tokens.color.texto.invertido },
]);

export const sectionParagraph = style({
  margin: 0,
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  lineHeight: 1.75,
});

export const sectionParagraphDark = style([
  sectionParagraph,
  {
    color: `color-mix(in srgb, ${tokens.color.texto.invertido} 84%, transparent)`,
  },
]);

// ── Tópicos ───────────────────────────────────────────────────────────────────

export const topicsPanel = style({
  display: 'grid',
  gap: tokens.spacing.lg,
  padding: tokens.spacing.xl,
  backgroundColor: tokens.color.fundo,
  borderRadius: '24px',
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderTop: `4px solid ${tokens.color.acento.dourado}`,
  boxShadow: '0 18px 40px rgba(13, 31, 60, 0.08)',
});

export const topicsTitle = style({
  margin: 0,
  color: tokens.color.primaria,
  fontFamily: tokens.font.family.titulo,
  fontSize: '1.6rem',
});

export const topicsGrid = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens.spacing.sm,
});

export const topicChip = style({
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  borderRadius: '999px',
  backgroundColor: tokens.color.neutral[50],
  border: `1px solid ${tokens.color.neutral[200]}`,
  color: tokens.color.secundaria,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  lineHeight: 1.4,
  selectors: {
    '&::before': {
      content: '"✦"',
      marginRight: '6px',
      color: tokens.color.acento.dourado,
      fontSize: '0.6em',
      verticalAlign: 'middle',
    },
  },
});

// ── Cards de funcionamento — numerados ────────────────────────────────────────

export const highlightsGrid = style({
  display: 'grid',
  gap: tokens.spacing.lg,
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
});

export const highlightCard = style({
  display: 'grid',
  gap: tokens.spacing.sm,
  padding: tokens.spacing.xl,
  paddingTop: tokens.spacing.lg,
  borderRadius: '22px',
  backgroundColor: tokens.color.fundo,
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderTop: `3px solid ${tokens.color.acento.dourado}`,
  boxShadow: '0 18px 40px rgba(13, 31, 60, 0.08)',
  position: 'relative',
  transition: `transform ${tokens.motion.fast} ease, box-shadow ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 24px 48px rgba(13, 31, 60, 0.12)',
    },
  },
});

export const highlightNumero = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: '2rem',
  color: `color-mix(in srgb, ${tokens.color.acento.dourado} 35%, transparent)`,
  fontWeight: tokens.font.weight.bold,
  lineHeight: 1,
  letterSpacing: '-0.02em',
  marginBottom: tokens.spacing.xs,
});

export const highlightLabel = style({
  margin: 0,
  color: tokens.color.primaria,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
});

export const highlightValue = style({
  margin: 0,
  color: tokens.color.secundaria,
  fontFamily: tokens.font.family.titulo,
  fontSize: '1.45rem',
  lineHeight: 1.3,
});

// ── Callout de observação ─────────────────────────────────────────────────────

export const observacaoCard = style({
  display: 'grid',
  gap: tokens.spacing.md,
  padding: tokens.spacing.xl,
  borderRadius: tokens.radius.lg,
  borderLeft: `5px solid ${tokens.color.acento.dourado}`,
  backgroundColor: `color-mix(in srgb, ${tokens.color.acento.dourado} 6%, ${tokens.color.fundo})`,
  boxShadow: `0 8px 24px color-mix(in srgb, ${tokens.color.acento.dourado} 12%, transparent)`,
});

export const observacaoIcone = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  color: tokens.color.acento.dourado,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
});

// ── Depoimentos ───────────────────────────────────────────────────────────────

export const testimonialsGrid = style({
  display: 'grid',
  gap: tokens.spacing.lg,
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    },
  },
});

export const testimonialCard = style({
  display: 'grid',
  gap: tokens.spacing.md,
  padding: `${tokens.spacing.lg} ${tokens.spacing.xl} ${tokens.spacing.xl}`,
  borderRadius: '22px',
  backgroundColor: `color-mix(in srgb, ${tokens.color.texto.invertido} 10%, ${tokens.color.primaria})`,
  border: `1px solid color-mix(in srgb, ${tokens.color.texto.invertido} 16%, transparent)`,
  alignContent: 'start',
});

export const aspasDecorative = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: '4.5rem',
  lineHeight: 0.8,
  color: `color-mix(in srgb, ${tokens.color.acento.dourado} 45%, transparent)`,
  display: 'block',
  userSelect: 'none',
});

export const testimonialText = style({
  margin: 0,
  color: `color-mix(in srgb, ${tokens.color.texto.invertido} 92%, transparent)`,
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.lg,
  lineHeight: 1.7,
  fontStyle: 'italic',
});

export const testimonialFooter = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  marginTop: tokens.spacing.sm,
  paddingTop: tokens.spacing.sm,
  borderTop: `1px solid color-mix(in srgb, ${tokens.color.texto.invertido} 16%, transparent)`,
});

export const testimonialTraco = style({
  color: tokens.color.acento.dourado,
  fontFamily: tokens.font.family.titulo,
  fontSize: '1.2rem',
});

export const testimonialAuthor = style({
  color: tokens.color.acento.dourado,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
});

// ── CTA final ─────────────────────────────────────────────────────────────────

export const ctaCard = style({
  display: 'grid',
  gap: tokens.spacing.lg,
  padding: tokens.spacing.xl,
  backgroundColor: tokens.color.secundaria,
  borderRadius: '28px',
  boxShadow: '0 24px 44px rgba(13, 31, 60, 0.18)',
  backgroundImage: `radial-gradient(circle at 90% 10%, color-mix(in srgb, ${tokens.color.acento.dourado} 8%, transparent) 0%, transparent 50%)`,
});

export const ctaActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens.spacing.md,
});

export const secondaryAction = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
  minHeight: '48px',
  borderRadius: tokens.radius.md,
  border: `1px solid color-mix(in srgb, ${tokens.color.texto.invertido} 24%, transparent)`,
  color: tokens.color.texto.invertido,
  textDecoration: 'none',
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.semibold,
  transition: `background-color ${tokens.motion.fast} ease, border-color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      backgroundColor: `color-mix(in srgb, ${tokens.color.texto.invertido} 10%, transparent)`,
      borderColor: tokens.color.acento.dourado,
      textDecoration: 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '3px',
    },
  },
});

// ── Estado vazio / erro ───────────────────────────────────────────────────────

export const stateBox = style({
  padding: tokens.spacing.xl,
  borderRadius: '20px',
  backgroundColor: tokens.color.fundo,
  border: `1px solid ${tokens.color.neutral[200]}`,
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  lineHeight: 1.6,
});

export const cardsGrid = style({
  display: 'grid',
  gap: tokens.spacing.xl,
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
});

// ── Legados (ainda usados em algum lugar) ─────────────────────────────────────

/** @deprecated — substituído por sinaisContainer + signalItemWrapper */
export const signalsList = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
  display: 'grid',
  gap: tokens.spacing.sm,
});

/** @deprecated — substituído por signalItemTexto */
export const signalItem = style({
  position: 'relative',
  paddingLeft: '1.4rem',
  color: `color-mix(in srgb, ${tokens.color.texto.invertido} 86%, transparent)`,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  lineHeight: 1.7,
  selectors: {
    '&::before': {
      content: '"✦"',
      position: 'absolute',
      left: 0,
      top: 0,
      color: tokens.color.acento.dourado,
    },
  },
});
