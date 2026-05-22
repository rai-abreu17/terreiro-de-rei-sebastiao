import { style } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

const borderSubtle = `1px solid color-mix(in srgb, ${tokens.color.secundaria} 12%, transparent)`;
const borderWarm = `1px solid color-mix(in srgb, ${tokens.color.primaria} 32%, transparent)`;

export const container = style({
  width: '100%',
  maxWidth: '1320px',
  margin: '0 auto',
  display: 'grid',
  gap: tokens.spacing.lg,
  padding: `${tokens.spacing.lg} ${tokens.spacing.md}`,
});

export const header = style({
  display: 'grid',
  gap: tokens.spacing.md,
  alignItems: 'end',
  '@media': {
    'screen and (min-width: 920px)': {
      gridTemplateColumns: 'minmax(0, 1fr) auto',
    },
  },
});

export const headerCopy = style({
  display: 'grid',
  gap: tokens.spacing.sm,
  maxWidth: '820px',
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
  fontSize: '3.6rem',
  lineHeight: 0.96,
  color: tokens.color.primaria,
  '@media': {
    'screen and (max-width: 720px)': {
      fontSize: '2.45rem',
    },
  },
});

export const descricao = style({
  margin: 0,
  maxWidth: '72ch',
  color: tokens.color.texto.secundario,
  fontSize: tokens.font.size.lg,
  lineHeight: 1.7,
});

export const monthSummary = style({
  margin: 0,
  width: 'fit-content',
  justifySelf: 'start',
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  borderRadius: '999px',
  border: borderSubtle,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.secundaria,
  fontWeight: tokens.font.weight.semibold,
  boxShadow: `0 12px 28px color-mix(in srgb, ${tokens.color.secundaria} 7%, transparent)`,
  '@media': {
    'screen and (min-width: 920px)': {
      justifySelf: 'end',
    },
  },
});

export const agendaGrid = style({
  display: 'grid',
  gap: tokens.spacing.lg,
  alignItems: 'start',
  '@media': {
    'screen and (min-width: 1100px)': {
      gridTemplateColumns: 'minmax(0, 1.45fr) minmax(380px, 0.95fr)',
    },
  },
});

export const calendarSection = style({
  position: 'relative',
  display: 'grid',
  gap: tokens.spacing.md,
  padding: tokens.spacing.lg,
  borderRadius: tokens.radius.lg,
  border: borderSubtle,
  backgroundColor: tokens.color.fundo,
  boxShadow: `0 24px 48px color-mix(in srgb, ${tokens.color.secundaria} 8%, transparent)`,
});

export const calendarToolbar = style({
  display: 'grid',
  gap: tokens.spacing.md,
  alignItems: 'center',
  '@media': {
    'screen and (min-width: 760px)': {
      gridTemplateColumns: 'minmax(0, 1fr) auto',
    },
  },
});

export const sectionTitle = style({
  margin: 0,
  color: tokens.color.primaria,
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.h2,
  lineHeight: 1.05,
});

export const sectionDescription = style({
  margin: `${tokens.spacing.xs} 0 0`,
  color: tokens.color.texto.secundario,
  lineHeight: 1.6,
});

export const monthControls = style({
  display: 'grid',
  gridTemplateColumns: '40px minmax(150px, 1fr) 40px',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  width: '100%',
  '@media': {
    'screen and (min-width: 760px)': {
      width: 'auto',
    },
  },
});

export const iconButton = style({
  width: '40px',
  height: '40px',
  display: 'inline-grid',
  placeItems: 'center',
  borderRadius: tokens.radius.md,
  border: borderSubtle,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.secundaria,
  cursor: 'pointer',
  fontSize: tokens.font.size.xl,
  lineHeight: 1,
  transition: `background-color ${tokens.motion.fast} ease, border-color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      borderColor: tokens.color.primaria,
      color: tokens.color.primaria,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const currentMonth = style({
  minHeight: '40px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `0 ${tokens.spacing.md}`,
  borderRadius: tokens.radius.md,
  backgroundColor: `color-mix(in srgb, ${tokens.color.neutral[50]} 90%, ${tokens.color.fundo})`,
  color: tokens.color.secundaria,
  fontWeight: tokens.font.weight.bold,
  whiteSpace: 'nowrap',
});

export const batchArea = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: tokens.spacing.md,
});

const baseButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.spacing.sm,
  minHeight: '40px',
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  borderRadius: tokens.radius.md,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.semibold,
  cursor: 'pointer',
  textDecoration: 'none',
  transition: `background-color ${tokens.motion.fast} ease, border-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,
  selectors: {
    '&:disabled': {
      opacity: 0.55,
      cursor: 'not-allowed',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const primaryButton = style([
  baseButton,
  {
    border: `1px solid ${tokens.color.primaria}`,
    backgroundColor: tokens.color.primaria,
    color: tokens.color.texto.invertido,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 88%, black)`,
      },
    },
  },
]);

export const secondaryButton = style([
  baseButton,
  {
    border: borderSubtle,
    backgroundColor: tokens.color.fundo,
    color: tokens.color.secundaria,
    selectors: {
      '&:hover:not(:disabled)': {
        borderColor: tokens.color.primaria,
        color: tokens.color.primaria,
      },
    },
  },
]);

export const outlineButton = style([
  baseButton,
  {
    border: `1px solid ${tokens.color.primaria}`,
    backgroundColor: tokens.color.fundo,
    color: tokens.color.primaria,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 7%, ${tokens.color.fundo})`,
      },
    },
  },
]);

export const smallDangerButton = style([
  baseButton,
  {
    minHeight: '34px',
    padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
    border: `1px solid color-mix(in srgb, ${tokens.color.estado.erro} 22%, transparent)`,
    backgroundColor: `color-mix(in srgb, ${tokens.color.estado.erro} 10%, ${tokens.color.fundo})`,
    color: tokens.color.estado.erro,
    fontSize: tokens.font.size.sm,
  },
]);

export const smallIconButton = style({
  width: '34px',
  height: '34px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.radius.md,
  border: borderSubtle,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.secundaria,
  cursor: 'pointer',
  transition: `background-color ${tokens.motion.fast} ease, border-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      borderColor: tokens.color.primaria,
      color: tokens.color.primaria,
      backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 5%, ${tokens.color.fundo})`,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const smallIconDangerButton = style([
  smallIconButton,
  {
    color: tokens.color.estado.erro,
    borderColor: `color-mix(in srgb, ${tokens.color.estado.erro} 22%, transparent)`,
    selectors: {
      '&:hover': {
        color: tokens.color.estado.erro,
        borderColor: tokens.color.estado.erro,
        backgroundColor: `color-mix(in srgb, ${tokens.color.estado.erro} 8%, ${tokens.color.fundo})`,
      },
    },
  },
]);

export const inlineModal = style({
  position: 'relative',
  zIndex: 4,
  width: '100%',
  maxWidth: '680px',
  display: 'grid',
  gap: tokens.spacing.md,
  padding: tokens.spacing.lg,
  borderRadius: tokens.radius.lg,
  border: borderWarm,
  backgroundColor: tokens.color.fundo,
  boxShadow: `0 18px 34px color-mix(in srgb, ${tokens.color.secundaria} 16%, transparent)`,
});

export const inlineModalHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens.spacing.md,
});

export const modalTitle = style({
  margin: 0,
  color: tokens.color.primaria,
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.xl,
});

export const closeButton = style({
  width: '34px',
  height: '34px',
  borderRadius: tokens.radius.md,
  border: borderSubtle,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.secundaria,
  cursor: 'pointer',
  fontSize: tokens.font.size.xl,
  lineHeight: 1,
});

export const weekToggleGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
  gap: tokens.spacing.sm,
  '@media': {
    'screen and (max-width: 680px)': {
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    },
  },
});

export const weekToggle = style({
  minHeight: '38px',
  borderRadius: tokens.radius.md,
  border: borderSubtle,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.secundario,
  cursor: 'pointer',
  fontWeight: tokens.font.weight.semibold,
});

export const weekToggleActive = style({
  borderColor: tokens.color.primaria,
  backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 8%, ${tokens.color.fundo})`,
  color: tokens.color.primaria,
});

export const calendarGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
  gap: tokens.spacing.sm,
});

export const weekdayHeader = style({
  minHeight: '34px',
  display: 'grid',
  placeItems: 'center',
  color: tokens.color.secundaria,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.bold,
});

export const blankDay = style({
  minHeight: '126px',
  borderRadius: tokens.radius.lg,
  backgroundColor: `color-mix(in srgb, ${tokens.color.neutral[50]} 70%, ${tokens.color.fundo})`,
  border: `1px solid color-mix(in srgb, ${tokens.color.neutral[200]} 52%, transparent)`,
});

export const dayCell = style({
  position: 'relative',
  minHeight: '126px',
  width: '100%',
  display: 'grid',
  gridTemplateRows: 'auto minmax(18px, 1fr) auto',
  alignContent: 'start',
  gap: tokens.spacing.xs,
  padding: tokens.spacing.sm,
  borderRadius: tokens.radius.lg,
  border: `1px solid color-mix(in srgb, ${tokens.color.neutral[200]} 78%, transparent)`,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.secundario,
  textAlign: 'left',
  cursor: 'pointer',
  transition: `border-color ${tokens.motion.fast} ease, background-color ${tokens.motion.fast} ease, box-shadow ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover:not(:disabled)': {
      borderStyle: 'dashed',
      borderColor: tokens.color.primaria,
      boxShadow: `0 10px 18px color-mix(in srgb, ${tokens.color.primaria} 9%, transparent)`,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
    '&:disabled': {
      cursor: 'default',
    },
  },
  '@media': {
    'screen and (max-width: 720px)': {
      minHeight: '96px',
      padding: tokens.spacing.xs,
    },
  },
});

export const dayConfigured = style({
  border: `1px solid ${tokens.color.primaria}`,
  backgroundColor: `color-mix(in srgb, ${tokens.color.neutral[50]} 76%, ${tokens.color.fundo})`,
  color: tokens.color.primaria,
  selectors: {
    '&:hover:not(:disabled)': {
      borderStyle: 'solid',
    },
  },
});

export const dayClosed = style({
  backgroundImage: `repeating-linear-gradient(135deg, color-mix(in srgb, ${tokens.color.neutral[200]} 55%, transparent) 0 1px, transparent 1px 8px)`,
  backgroundColor: `color-mix(in srgb, ${tokens.color.neutral[50]} 84%, ${tokens.color.fundo})`,
  color: tokens.color.texto.secundario,
});

export const dayPast = style({
  opacity: 0.4,
  pointerEvents: 'none',
});

export const daySelected = style({
  borderColor: tokens.color.secundaria,
  borderStyle: 'solid',
  borderWidth: '2px',
  backgroundColor: tokens.color.secundaria,
  backgroundImage: 'none',
  color: tokens.color.texto.invertido,
  boxShadow: `0 0 0 3px color-mix(in srgb, ${tokens.color.acento.dourado} 42%, transparent), 0 14px 28px color-mix(in srgb, ${tokens.color.secundaria} 18%, transparent)`,
});

export const dayNumber = style({
  width: '30px',
  height: '30px',
  display: 'inline-grid',
  placeItems: 'center',
  borderRadius: '999px',
  color: 'inherit',
  fontWeight: tokens.font.weight.semibold,
});

export const todayNumber = style({
  backgroundColor: tokens.color.primaria,
  color: tokens.color.texto.invertido,
});

export const dayNumberConfigured = style({
  fontWeight: tokens.font.weight.bold,
});

export const dayNumberClosed = style({
  color: tokens.color.texto.secundario,
  textDecoration: 'line-through',
});

export const dayNumberSelected = style({
  color: tokens.color.texto.invertido,
  textDecoration: 'none',
});

export const configureLabel = style({
  alignSelf: 'end',
  color: 'inherit',
  fontSize: tokens.font.size.sm,
  textTransform: 'lowercase',
});

export const closedLabel = style({
  alignSelf: 'center',
  justifySelf: 'center',
  color: 'inherit',
  fontWeight: tokens.font.weight.bold,
});

export const dayWindows = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'start',
  gap: tokens.spacing.xs,
  minWidth: 0,
});

export const windowPill = style({
  display: 'inline-flex',
  maxWidth: '100%',
  padding: `2px ${tokens.spacing.xs}`,
  borderRadius: '999px',
  backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 10%, ${tokens.color.fundo})`,
  color: tokens.color.primaria,
  fontSize: '0.75rem',
  fontWeight: tokens.font.weight.semibold,
  whiteSpace: 'nowrap',
});

export const morePill = style([
  windowPill,
  {
    backgroundColor: `color-mix(in srgb, ${tokens.color.secundaria} 8%, ${tokens.color.fundo})`,
    color: tokens.color.secundaria,
  },
]);

export const dayCategories = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens.spacing.xs,
});

export const categoryPill = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '20px',
  height: '20px',
  padding: `0 ${tokens.spacing.xs}`,
  borderRadius: '999px',
  backgroundColor: `color-mix(in srgb, ${tokens.color.secundaria} 10%, ${tokens.color.fundo})`,
  color: tokens.color.secundaria,
  fontSize: '0.7rem',
  fontWeight: tokens.font.weight.bold,
});

export const modalityIcons = style({
  alignSelf: 'end',
  fontSize: tokens.font.size.sm,
  lineHeight: 1,
});

export const sidePanel = style({
  display: 'grid',
  minHeight: '620px',
  maxHeight: 'calc(100vh - 160px)',
  overflow: 'hidden',
  borderRadius: tokens.radius.lg,
  border: borderSubtle,
  backgroundColor: tokens.color.fundo,
  boxShadow: `0 24px 48px color-mix(in srgb, ${tokens.color.secundaria} 8%, transparent)`,
  '@media': {
    'screen and (min-width: 1100px)': {
      position: 'sticky',
      top: '112px',
    },
    'screen and (max-width: 1099px)': {
      maxHeight: 'none',
    },
  },
});

export const emptyPanel = style({
  minHeight: '520px',
  display: 'grid',
  placeItems: 'center',
  alignContent: 'center',
  gap: tokens.spacing.md,
  padding: tokens.spacing.xl,
  color: tokens.color.texto.secundario,
  textAlign: 'center',
});

export const emptyIcon = style({
  width: '40px',
  height: '40px',
  color: tokens.color.primaria,
});

export const panelContent = style({
  display: 'grid',
  gap: tokens.spacing.lg,
  alignContent: 'start',
  padding: tokens.spacing.lg,
  overflowY: 'auto',
});

export const panelHeader = style({
  display: 'grid',
  gap: tokens.spacing.xs,
});

export const panelEyebrow = style({
  color: tokens.color.texto.secundario,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
});

export const panelTitle = style({
  margin: 0,
  color: tokens.color.primaria,
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.h2,
  lineHeight: 1.1,
});

export const panelSection = style({
  display: 'grid',
  gap: tokens.spacing.md,
});

export const panelSectionHeader = style({
  display: 'grid',
  gap: tokens.spacing.sm,
  '@media': {
    'screen and (min-width: 560px)': {
      gridTemplateColumns: 'minmax(0, 1fr) auto',
      alignItems: 'center',
    },
  },
});

export const panelSectionTitle = style({
  margin: 0,
  color: tokens.color.secundaria,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.bold,
});

export const dayTypeGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: tokens.spacing.sm,
});

export const dayTypeCard = style({
  minHeight: '96px',
  display: 'grid',
  alignContent: 'center',
  gap: tokens.spacing.xs,
  padding: tokens.spacing.md,
  borderRadius: tokens.radius.lg,
  border: borderSubtle,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  textAlign: 'left',
  cursor: 'pointer',
  transition: `opacity ${tokens.motion.fast} ease, border-color ${tokens.motion.fast} ease, background-color ${tokens.motion.fast} ease`,
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const dayTypeCardSelected = style({
  opacity: 1,
  borderColor: tokens.color.primaria,
  backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 6%, ${tokens.color.fundo})`,
});

export const dayTypeCardMuted = style({
  opacity: 0.45,
});

export const dayTypeTitle = style({
  color: tokens.color.primaria,
});

export const dayTypeSubtitle = style({
  color: tokens.color.texto.secundario,
  fontSize: tokens.font.size.sm,
});

export const miniEmpty = style({
  margin: 0,
  padding: tokens.spacing.md,
  borderRadius: tokens.radius.lg,
  border: `1px dashed color-mix(in srgb, ${tokens.color.secundaria} 18%, transparent)`,
  color: tokens.color.texto.secundario,
  backgroundColor: `color-mix(in srgb, ${tokens.color.neutral[50]} 78%, ${tokens.color.fundo})`,
});

export const windowList = style({
  display: 'grid',
  gap: tokens.spacing.sm,
});

export const windowRow = style({
  display: 'grid',
  gridTemplateColumns: 'auto auto auto auto minmax(110px, 1fr) auto',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  padding: tokens.spacing.sm,
  borderRadius: tokens.radius.lg,
  border: borderSubtle,
  backgroundColor: `color-mix(in srgb, ${tokens.color.neutral[50]} 72%, ${tokens.color.fundo})`,
  '@media': {
    'screen and (max-width: 520px)': {
      gridTemplateColumns: '1fr 1fr',
    },
  },
});

export const windowActions = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: tokens.spacing.xs,
});

export const timeChip = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '34px',
  padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
  borderRadius: tokens.radius.md,
  border: borderSubtle,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.secundaria,
  fontWeight: tokens.font.weight.semibold,
});

export const untilText = style({
  color: tokens.color.texto.secundario,
  fontSize: tokens.font.size.sm,
});

export const windowIcons = style({
  color: tokens.color.secundaria,
  fontSize: tokens.font.size.lg,
  lineHeight: 1,
});

export const windowCategories = style({
  display: 'inline-flex',
  width: 'fit-content',
  maxWidth: '100%',
  padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
  borderRadius: '999px',
  backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 9%, ${tokens.color.fundo})`,
  color: tokens.color.primaria,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  lineHeight: 1.2,
});

export const editWindowRow = style({
  display: 'grid',
  gap: tokens.spacing.md,
  padding: tokens.spacing.md,
  borderRadius: tokens.radius.lg,
  border: borderWarm,
  backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 4%, ${tokens.color.fundo})`,
});

export const compactTimeRow = style({
  display: 'grid',
  gap: tokens.spacing.sm,
  alignItems: 'end',
  '@media': {
    'screen and (min-width: 520px)': {
      gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
    },
  },
});

export const fieldGroup = style({
  display: 'grid',
  gap: tokens.spacing.xs,
});

export const label = style({
  color: tokens.color.texto.primario,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
});

export const input = style({
  width: '100%',
  minHeight: '42px',
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  borderRadius: tokens.radius.md,
  border: borderSubtle,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
      borderColor: tokens.color.primaria,
    },
  },
});

export const textArea = style([
  input,
  {
    minHeight: '92px',
    resize: 'vertical',
  },
]);

export const fieldset = style({
  margin: 0,
  padding: 0,
  border: 'none',
  display: 'grid',
  gap: tokens.spacing.sm,
});

export const checkboxRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens.spacing.sm,
});

export const checkboxLabel = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  color: tokens.color.texto.primario,
  lineHeight: 1.35,
});

export const checkboxInput = style({
  width: '18px',
  height: '18px',
  flexShrink: 0,
  accentColor: tokens.color.primaria,
});

export const inlineError = style({
  margin: 0,
  color: tokens.color.estado.erro,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
});

export const inlineHint = style({
  margin: 0,
  color: tokens.color.texto.secundario,
  fontSize: tokens.font.size.sm,
});

export const inlineActions = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: tokens.spacing.sm,
  flexWrap: 'wrap',
});

export const repeatDetails = style({
  display: 'grid',
  gap: tokens.spacing.sm,
});

export const previewText = style({
  margin: 0,
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  borderRadius: tokens.radius.md,
  backgroundColor: `color-mix(in srgb, ${tokens.color.secundaria} 6%, ${tokens.color.fundo})`,
  color: tokens.color.secundaria,
  fontSize: tokens.font.size.sm,
});

export const panelFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens.spacing.sm,
  padding: tokens.spacing.md,
  borderTop: borderSubtle,
  backgroundColor: `color-mix(in srgb, ${tokens.color.fundo} 94%, ${tokens.color.neutral[50]})`,
  '@media': {
    'screen and (max-width: 520px)': {
      alignItems: 'stretch',
      flexDirection: 'column-reverse',
    },
  },
});

export const modalActions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: tokens.spacing.sm,
  flexWrap: 'wrap',
});

export const toast = style({
  position: 'fixed',
  top: '104px',
  right: tokens.spacing.xl,
  zIndex: 60,
  maxWidth: '360px',
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  borderRadius: tokens.radius.lg,
  border: `1px solid color-mix(in srgb, ${tokens.color.estado.sucesso} 28%, transparent)`,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.estado.sucesso,
  fontWeight: tokens.font.weight.semibold,
  boxShadow: `0 18px 36px color-mix(in srgb, ${tokens.color.secundaria} 16%, transparent)`,
  '@media': {
    'screen and (max-width: 767px)': {
      left: tokens.spacing.md,
      right: tokens.spacing.md,
      top: '72px',
      maxWidth: 'none',
    },
    'screen and (min-width: 768px) and (max-width: 720px)': {
      left: tokens.spacing.md,
      right: tokens.spacing.md,
      top: '88px',
      maxWidth: 'none',
    },
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE / RESPONSIVE — breakpoint 767px
// ─────────────────────────────────────────────────────────────────────────────

// Hide desktop grid on mobile; show mobile calendar section instead
// Applied to agendaGrid's existing element via a separate override class
export const agendaGridMobileHide = style({
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
    },
  },
});

// Also hide the existing page header verbose description on mobile
export const descricaoMobileHide = style({
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
    },
  },
});

// ─── Mobile calendar section (replaces agendaGrid on mobile) ─────────────────

export const mobileCal = style({
  display: 'none',
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'grid',
      gap: tokens.spacing.sm,
    },
  },
});

export const mobileCalHeader = style({
  display: 'grid',
  gridTemplateColumns: '44px 1fr 44px',
  alignItems: 'center',
  height: '56px',
  padding: `0 ${tokens.spacing.xs}`,
  borderRadius: tokens.radius.lg,
  border: borderSubtle,
  backgroundColor: tokens.color.fundo,
  position: 'sticky',
  top: 0,
  zIndex: 10,
  boxShadow: `0 2px 8px color-mix(in srgb, ${tokens.color.secundaria} 6%, transparent)`,
});

export const mobileNavBtn = style({
  width: '44px',
  height: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.radius.md,
  border: 'none',
  backgroundColor: 'transparent',
  color: tokens.color.secundaria,
  fontSize: tokens.font.size.xl,
  cursor: 'pointer',
  selectors: {
    '&:active': {
      opacity: 0.7,
      transform: 'scale(0.95)',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const mobileMonthLabel = style({
  textAlign: 'center',
  color: tokens.color.primaria,
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.lg,
  fontWeight: tokens.font.weight.bold,
});

export const mobileSummaryBar = style({
  display: 'flex',
  justifyContent: 'center',
});

export const mobileSummaryChip = style({
  padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
  borderRadius: '999px',
  backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 8%, ${tokens.color.fundo})`,
  border: borderSubtle,
  color: tokens.color.primaria,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  textAlign: 'center',
});

export const mobileBatchBar = style({
  padding: `0 0 ${tokens.spacing.xs}`,
});

export const mobileBatchBtn = style([
  baseButton,
  {
    width: '100%',
    border: `1px solid ${tokens.color.primaria}`,
    backgroundColor: tokens.color.fundo,
    color: tokens.color.primaria,
    selectors: {
      '&:active': { opacity: 0.7, transform: 'scale(0.98)' },
      '&:hover:not(:disabled)': {
        backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 7%, ${tokens.color.fundo})`,
      },
    },
  },
]);

// ─── Day cell mobile overrides ────────────────────────────────────────────────

// Applied alongside dayCell to reduce height and padding on mobile
export const dayCellMobileSize = style({
  '@media': {
    'screen and (max-width: 767px)': {
      minHeight: '64px',
      padding: '4px 2px',
      gap: '1px',
    },
  },
});

// blankDay mobile: match active cell height so rows are consistent
export const blankDayMobileSize = style({
  '@media': {
    'screen and (max-width: 767px)': {
      minHeight: '64px',
    },
  },
});

// Wrapper for desktop-only cell content
export const cellDesktop = style({
  display: 'contents',
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
    },
  },
});

// Wrapper for mobile-only cell content
export const cellMobile = style({
  display: 'none',
  gridColumn: '1 / -1',
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'flex',
      flexDirection: 'column',
      gap: '1px',
      overflow: 'hidden',
      width: '100%',
    },
  },
});

export const mobileDayTime = style({
  fontSize: '0.6rem',
  fontWeight: tokens.font.weight.semibold,
  color: 'inherit',
  lineHeight: 1.2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const mobileDayFechado = style({
  fontSize: '0.6rem',
  color: tokens.color.texto.secundario,
  fontWeight: tokens.font.weight.semibold,
  lineHeight: 1.2,
});

export const mobileDayPlus = style({
  fontSize: '0.75rem',
  color: tokens.color.neutral[400],
  lineHeight: 1,
});

export const mobileDayIcons = style({
  fontSize: '0.6rem',
  lineHeight: 1,
  color: 'inherit',
});

// ─── Mobile panel overlay (fixed, slides in from right) ──────────────────────

export const mobilePanelOverlay = style({
  display: 'none',
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      backgroundColor: tokens.color.fundo,
      transform: 'translateX(100%)',
      transition: 'transform 280ms cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: 'transform',
      // Android: remove tap highlight
      WebkitTapHighlightColor: 'transparent',
    },
  },
});

export const mobilePanelOverlayOpen = style({
  '@media': {
    'screen and (max-width: 767px)': {
      transform: 'translateX(0)',
    },
  },
});

export const mobilePanelHeader = style({
  flexShrink: 0,
  height: '56px',
  display: 'grid',
  gridTemplateColumns: '80px 1fr 80px',
  alignItems: 'center',
  paddingLeft: tokens.spacing.xs,
  paddingRight: tokens.spacing.sm,
  borderBottom: borderSubtle,
  backgroundColor: tokens.color.fundo,
  // iOS safe area top (notch)
  paddingTop: 'env(safe-area-inset-top)',
});

export const mobileBackBtn = style({
  height: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens.spacing.xs,
  paddingLeft: tokens.spacing.sm,
  paddingRight: tokens.spacing.sm,
  border: 'none',
  backgroundColor: 'transparent',
  color: tokens.color.primaria,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.semibold,
  cursor: 'pointer',
  selectors: {
    '&:active': { opacity: 0.7 },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const mobilePanelTitle = style({
  textAlign: 'center',
  color: tokens.color.primaria,
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.bold,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const mobilePanelBody = style({
  flex: 1,
  overflowY: 'scroll',
  WebkitOverflowScrolling: 'touch',
  padding: tokens.spacing.md,
  paddingBottom: '120px',
  display: 'grid',
  gap: tokens.spacing.lg,
  alignContent: 'start',
  // Android: prevent pull-to-refresh inside panel
  overscrollBehaviorY: 'contain',
});

export const mobilePanelFooter = style({
  flexShrink: 0,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: tokens.spacing.sm,
  padding: tokens.spacing.md,
  paddingBottom: `calc(${tokens.spacing.md} + env(safe-area-inset-bottom))`,
  borderTop: borderSubtle,
  backgroundColor: tokens.color.fundo,
  boxShadow: `0 -4px 12px color-mix(in srgb, ${tokens.color.secundaria} 8%, transparent)`,
});

// Tablet (768–1023px): intermediate layout
export const agendaGridTablet = style({
  '@media': {
    'screen and (min-width: 768px) and (max-width: 1023px)': {
      gridTemplateColumns: '55fr 45fr',
    },
  },
});

// ─── Global mobile fixes ──────────────────────────────────────────────────────

// Applied to all buttons for Android tap highlight removal
export const tapReset = style({
  WebkitTapHighlightColor: 'transparent',
});

// Inputs/selects on mobile: ensure 16px to prevent iOS Safari zoom
export const inputMobileSafe = style({
  '@media': {
    'screen and (max-width: 767px)': {
      fontSize: '16px',
    },
  },
});

// Day type cards: reduced height on mobile (56px per spec)
export const dayTypeCardMobile = style({
  '@media': {
    'screen and (max-width: 767px)': {
      minHeight: '56px',
      gridTemplateRows: 'auto',
      alignItems: 'center',
      flexDirection: 'row',
    },
  },
});

// Checkboxes: 48px touch target on mobile
export const checkboxLabelMobile = style({
  '@media': {
    'screen and (max-width: 767px)': {
      minHeight: '48px',
    },
  },
});

// weekToggle: 44px touch target on mobile
export const weekToggleMobile = style({
  '@media': {
    'screen and (max-width: 767px)': {
      minHeight: '44px',
    },
  },
});
