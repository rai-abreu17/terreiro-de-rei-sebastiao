import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

export const container = style({
  display: 'grid',
  gap: tokens.spacing.xl,
  maxWidth: '1280px',
  margin: '0 auto',
  padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
});

export const header = style({
  display: 'grid',
  gap: tokens.spacing.sm,
});

export const eyebrow = style({
  display: 'inline-flex',
  alignItems: 'center',
  width: 'fit-content',
  padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
  borderRadius: '999px',
  backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 10%, ${tokens.color.fundo})`,
  color: tokens.color.primaria,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
});

export const titulo = style({
  margin: 0,
  fontFamily: tokens.font.family.titulo,
  fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
  lineHeight: 0.96,
  color: tokens.color.primaria,
});

export const descricao = style({
  margin: 0,
  maxWidth: '72ch',
  color: tokens.color.texto.secundario,
  fontSize: tokens.font.size.lg,
  lineHeight: 1.75,
});

export const successPanel = style({
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  borderRadius: tokens.radius.lg,
  backgroundColor: `color-mix(in srgb, ${tokens.color.estado.sucesso} 12%, ${tokens.color.fundo})`,
  border: `1px solid color-mix(in srgb, ${tokens.color.estado.sucesso} 28%, transparent)`,
  color: tokens.color.estado.sucesso,
});

export const layoutGrid = style({
  display: 'grid',
  gap: tokens.spacing.xl,
  '@media': {
    'screen and (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      alignItems: 'start',
    },
  },
});

export const section = style({
  display: 'grid',
  gap: tokens.spacing.lg,
  padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
  borderRadius: '24px',
  backgroundColor: tokens.color.fundo,
  border: `1px solid color-mix(in srgb, ${tokens.color.secundaria} 12%, transparent)`,
  boxShadow: `0 24px 48px color-mix(in srgb, ${tokens.color.secundaria} 8%, transparent)`,
});

export const sectionHeader = style({
  display: 'grid',
  gap: tokens.spacing.xs,
});

export const sectionEyebrow = style({
  display: 'inline-flex',
  width: 'fit-content',
  padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
  borderRadius: '999px',
  backgroundColor: `color-mix(in srgb, ${tokens.color.acento.dourado} 16%, ${tokens.color.fundo})`,
  color: tokens.color.secundaria,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
});

export const sectionTitle = style({
  margin: 0,
  fontFamily: tokens.font.family.titulo,
  fontSize: 'clamp(1.9rem, 3vw, 2.7rem)',
  color: tokens.color.secundaria,
});

export const sectionDescription = style({
  margin: 0,
  color: tokens.color.texto.secundario,
  lineHeight: 1.7,
});

export const feedbackPanel = style({
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  borderRadius: tokens.radius.lg,
  backgroundColor: `color-mix(in srgb, ${tokens.color.estado.erro} 10%, ${tokens.color.fundo})`,
  border: `1px solid color-mix(in srgb, ${tokens.color.estado.erro} 22%, transparent)`,
  color: tokens.color.estado.erro,
});

export const formCard = style({
  display: 'grid',
  gap: tokens.spacing.lg,
  padding: `${tokens.spacing.lg} ${tokens.spacing.lg}`,
  borderRadius: '20px',
  backgroundColor: `color-mix(in srgb, ${tokens.color.neutral[50]} 82%, ${tokens.color.fundo})`,
  border: `1px solid color-mix(in srgb, ${tokens.color.secundaria} 10%, transparent)`,
});

export const formHeader = style({
  display: 'grid',
  gap: tokens.spacing.md,
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'minmax(0, 1fr) auto',
      alignItems: 'start',
    },
  },
});

export const formTitle = style({
  margin: 0,
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.h2,
  color: tokens.color.primaria,
});

export const formDescription = style({
  margin: 0,
  color: tokens.color.texto.secundario,
  lineHeight: 1.6,
});

export const formGrid = style({
  display: 'grid',
  gap: tokens.spacing.lg,
});

export const inlineFields = style({
  display: 'grid',
  gap: tokens.spacing.md,
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
});

export const fieldGroup = style({
  display: 'grid',
  gap: tokens.spacing.xs,
});

export const fieldset = style({
  margin: 0,
  padding: 0,
  border: 'none',
  display: 'grid',
  gap: tokens.spacing.sm,
});

export const label = style({
  color: tokens.color.texto.primario,
  fontWeight: tokens.font.weight.semibold,
});

const inputBase = style({
  width: '100%',
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  borderRadius: tokens.radius.lg,
  border: `1px solid color-mix(in srgb, ${tokens.color.secundaria} 16%, transparent)`,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  selectors: {
    '&:focus-visible': {
      outline: `2px solid color-mix(in srgb, ${tokens.color.acento.dourado} 36%, transparent)`,
      outlineOffset: '2px',
      borderColor: tokens.color.acento.dourado,
    },
    '&[aria-invalid="true"]': {
      borderColor: tokens.color.estado.erro,
    },
  },
});

export const input = style([inputBase]);

export const textArea = style([
  inputBase,
  {
    resize: 'vertical',
    minHeight: '104px',
  },
]);

export const checkboxGrid = style({
  display: 'grid',
  gap: tokens.spacing.md,
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
});

export const checkboxCard = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  borderRadius: tokens.radius.lg,
  border: `1px solid color-mix(in srgb, ${tokens.color.secundaria} 12%, transparent)`,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  cursor: 'pointer',
});

export const checkboxInput = style({
  width: '18px',
  height: '18px',
  flexShrink: 0,
  accentColor: tokens.color.primaria,
});

export const toggleRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  padding: `${tokens.spacing.sm} 0`,
  color: tokens.color.texto.primario,
});

export const errorMessage = style({
  color: tokens.color.estado.erro,
  fontSize: tokens.font.size.sm,
});

const baseButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.spacing.sm,
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  borderRadius: tokens.radius.lg,
  border: 'none',
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.semibold,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: `transform ${tokens.motion.fast} ease, background-color ${tokens.motion.fast} ease, border-color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover:not(:disabled)': {
      transform: 'translateY(-2px)',
    },
    '&:disabled': {
      opacity: 0.65,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
});

export const primaryButton = style([
  baseButton,
  {
    backgroundColor: tokens.color.primaria,
    color: tokens.color.texto.invertido,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 88%, black)`,
        transform: 'translateY(-2px)',
      },
      '&:disabled': {
        opacity: 0.65,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
]);

export const secondaryButton = style([
  baseButton,
  {
    border: `1px solid color-mix(in srgb, ${tokens.color.secundaria} 16%, transparent)`,
    backgroundColor: tokens.color.fundo,
    color: tokens.color.secundaria,
  },
]);

export const dangerButton = style([
  baseButton,
  {
    backgroundColor: `color-mix(in srgb, ${tokens.color.estado.erro} 16%, ${tokens.color.fundo})`,
    color: tokens.color.estado.erro,
    border: `1px solid color-mix(in srgb, ${tokens.color.estado.erro} 22%, transparent)`,
  },
]);

export const actionsRow = style({
  display: 'flex',
  justifyContent: 'flex-start',
});

export const listSection = style({
  display: 'grid',
  gap: tokens.spacing.md,
});

export const listHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: tokens.spacing.md,
});

export const listTitle = style({
  margin: 0,
  fontSize: tokens.font.size.xl,
  color: tokens.color.secundaria,
});

export const listCounter = style({
  color: tokens.color.texto.secundario,
  fontSize: tokens.font.size.sm,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
});

export const cardList = style({
  display: 'grid',
  gap: tokens.spacing.md,
});

export const itemCard = style({
  display: 'grid',
  gap: tokens.spacing.md,
  padding: `${tokens.spacing.lg} ${tokens.spacing.lg}`,
  borderRadius: '18px',
  border: `1px solid color-mix(in srgb, ${tokens.color.secundaria} 10%, transparent)`,
  backgroundColor: `color-mix(in srgb, ${tokens.color.fundo} 84%, ${tokens.color.neutral[50]})`,
});

export const itemHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: tokens.spacing.md,
});

export const itemTitle = style({
  margin: 0,
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.h2,
  color: tokens.color.primaria,
});

export const itemSubtitle = style({
  margin: `${tokens.spacing.xs} 0 0`,
  color: tokens.color.texto.secundario,
});

export const itemBody = style({
  margin: 0,
  color: tokens.color.texto.primario,
  lineHeight: 1.6,
});

export const itemNote = style({
  margin: 0,
  color: tokens.color.texto.secundario,
  lineHeight: 1.6,
});

export const badgeRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens.spacing.sm,
});

const basePill = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
  borderRadius: '999px',
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
});

export const statusPill = styleVariants({
  ativo: [
    basePill,
    {
      backgroundColor: `color-mix(in srgb, ${tokens.color.estado.sucesso} 14%, ${tokens.color.fundo})`,
      color: tokens.color.estado.sucesso,
    },
  ],
  inativo: [
    basePill,
    {
      backgroundColor: `color-mix(in srgb, ${tokens.color.neutral[200]} 72%, ${tokens.color.fundo})`,
      color: tokens.color.texto.secundario,
    },
  ],
  folga: [
    basePill,
    {
      backgroundColor: `color-mix(in srgb, ${tokens.color.acento.dourado} 18%, ${tokens.color.fundo})`,
      color: tokens.color.secundaria,
    },
  ],
  personalizada: [
    basePill,
    {
      backgroundColor: `color-mix(in srgb, ${tokens.color.secundaria} 10%, ${tokens.color.fundo})`,
      color: tokens.color.secundaria,
    },
  ],
});

export const modalityPill = styleVariants({
  ONLINE: [
    basePill,
    {
      backgroundColor: `color-mix(in srgb, ${tokens.color.secundaria} 12%, ${tokens.color.fundo})`,
      color: tokens.color.secundaria,
    },
  ],
  IN_PERSON: [
    basePill,
    {
      backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 12%, ${tokens.color.fundo})`,
      color: tokens.color.primaria,
    },
  ],
});

export const cardActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens.spacing.sm,
});

export const emptyState = style({
  padding: `${tokens.spacing.lg} ${tokens.spacing.lg}`,
  borderRadius: tokens.radius.lg,
  border: `1px dashed color-mix(in srgb, ${tokens.color.secundaria} 18%, transparent)`,
  color: tokens.color.texto.secundario,
  backgroundColor: `color-mix(in srgb, ${tokens.color.neutral[50]} 84%, ${tokens.color.fundo})`,
});
