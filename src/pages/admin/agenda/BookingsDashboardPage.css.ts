import { globalStyle, keyframes, style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '../../../design-system/tokens.css';

export const revealSlot = style({
  opacity: 0,
  transform: 'translateY(4px)',
  pointerEvents: 'none',
  transition: 'opacity 0.18s ease, transform 0.18s ease',
});

globalStyle(`${revealSlot} button`, {
  pointerEvents: 'auto',
});

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '32px 16px',
});

export const header = style({
  marginBottom: '32px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const titulo = style({
  fontFamily: tokens.font.family.titulo,
  color: tokens.color.primaria,
  fontSize: '2rem',
  marginBottom: '8px',
});

export const descricao = style({
  fontFamily: tokens.font.family.corpo,
  color: tokens.color.texto.secundario,
  fontSize: '1rem',
});

export const tableContainer = style({
  backgroundColor: tokens.color.fundo,
  borderRadius: '8px',
  border: `1px solid ${tokens.color.acento.prateado}`,
  overflowX: 'auto',
  marginTop: '24px',
  WebkitOverflowScrolling: 'touch',
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: tokens.font.family.corpo,
});

export const th = style({
  padding: '16px',
  textAlign: 'left',
  borderBottom: `2px solid ${tokens.color.acento.prateado}`,
  color: tokens.color.texto.primario,
  fontWeight: '600',
  fontSize: '0.875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const td = style({
  padding: '16px',
  borderBottom: `1px solid ${tokens.color.acento.prateado}`,
  color: tokens.color.texto.primario,
  fontSize: '0.95rem',
  verticalAlign: 'middle',
  height: '64px',
});

export const tr = style({
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: `${tokens.color.primaria}08`,
  },
});

globalStyle(`${tr}:hover ${revealSlot}, ${tr}:focus-within ${revealSlot}`, {
  opacity: 1,
  transform: 'translateY(0)',
  pointerEvents: 'auto',
});

export const statusBadgeBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px 10px',
  borderRadius: '999px',
  border: '1px solid currentColor',
  backgroundColor: 'transparent',
  fontSize: '12px',
  fontWeight: '600',
  cursor: 'default',
  whiteSpace: 'nowrap',
});

export const statusBadge = styleVariants({
  PENDING_PAYMENT: [statusBadgeBase, { color: tokens.color.estado.alerta }],
  CONFIRMED: [statusBadgeBase, { color: tokens.color.estado.sucesso }],
  CANCELLED: [statusBadgeBase, { color: tokens.color.neutral[600] }],
  EXPIRED: [statusBadgeBase, { color: tokens.color.neutral[600] }],
  COMPLETED: [statusBadgeBase, { color: tokens.color.secundaria }],
  NO_SHOW: [statusBadgeBase, { color: tokens.color.estado.alerta }],
  REFUNDED: [statusBadgeBase, { color: tokens.color.secundaria }],
});

export const paymentBadge = styleVariants({
  APPROVED: [statusBadgeBase, {
    backgroundColor: `color-mix(in srgb, ${tokens.color.estado.sucesso} 12%, ${tokens.color.fundo})`,
    color: tokens.color.estado.sucesso,
  }],
  PENDING: [statusBadgeBase, {
    backgroundColor: `color-mix(in srgb, ${tokens.color.estado.alerta} 14%, ${tokens.color.fundo})`,
    color: tokens.color.estado.alerta,
  }],
  CREATED: [statusBadgeBase, {
    backgroundColor: tokens.color.neutral[50],
    color: tokens.color.neutral[600],
  }],
  REJECTED: [statusBadgeBase, {
    backgroundColor: `color-mix(in srgb, ${tokens.color.estado.erro} 10%, ${tokens.color.fundo})`,
    color: tokens.color.estado.erro,
  }],
  REFUNDED: [statusBadgeBase, {
    backgroundColor: `color-mix(in srgb, ${tokens.color.secundaria} 10%, ${tokens.color.fundo})`,
    color: tokens.color.secundaria,
  }],
});

export const iconButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '8px',
  minWidth: '44px',
  minHeight: '44px',
  borderRadius: '4px',
  color: tokens.color.secundaria,
  transition: 'all 0.2s',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    backgroundColor: 'rgba(13, 31, 60, 0.1)',
    color: tokens.color.primaria,
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const actionsGroup = style({
  display: 'flex',
  gap: '8px',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
});

export const primaryCell = style({
  fontWeight: '600',
  color: tokens.color.texto.primario,
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
});

export const secondaryCell = style({
  display: 'block',
  marginTop: '4px',
  color: tokens.color.texto.secundario,
  fontSize: '12px',
  fontWeight: '400',
});

export const tertiaryCell = style([secondaryCell, {
  color: tokens.color.neutral[600],
}]);

export const tooltipNotes = style({
  marginTop: '8px',
});

export const feedbackError = style({
  margin: '0 0 16px',
  padding: '12px 16px',
  borderRadius: '8px',
  border: `1px solid ${tokens.color.estado.erro}`,
  background: 'rgba(179, 38, 30, 0.08)',
  color: tokens.color.estado.erro,
  fontFamily: tokens.font.family.corpo,
});

export const actionsHint = style({
  color: tokens.color.texto.secundario,
  fontSize: '0.82rem',
});

export const paginationBar = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  marginTop: '20px',
  flexWrap: 'wrap',
  '@media': {
    'screen and (max-width: 767px)': {
      justifyContent: 'center',
    },
  },
});

export const paginationSummary = style({
  fontFamily: tokens.font.family.corpo,
  color: tokens.color.texto.secundario,
  fontSize: '0.9rem',
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
    },
  },
});

export const paginationActions = style({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  flexWrap: 'wrap',
  '@media': {
    'screen and (max-width: 767px)': {
      justifyContent: 'center',
      flexWrap: 'nowrap',
    },
  },
});

export const paginationButton = style({
  border: `1px solid ${tokens.color.acento.prateado}`,
  background: tokens.color.fundo,
  color: tokens.color.texto.primario,
  borderRadius: '999px',
  padding: '10px 16px',
  minHeight: '44px',
  fontFamily: tokens.font.family.corpo,
  cursor: 'pointer',
  transition: 'border-color 0.18s ease, color 0.18s ease, background-color 0.18s ease',
  ':hover': {
    borderColor: tokens.color.primaria,
    color: tokens.color.primaria,
    backgroundColor: 'rgba(122, 14, 20, 0.03)',
  },
  ':disabled': {
    opacity: 0.45,
    cursor: 'not-allowed',
  },
});

export const mobilePaginationButton = style({
  '@media': {
    'screen and (max-width: 767px)': {
      width: '44px',
      height: '44px',
      minWidth: '44px',
      padding: 0,
    },
  },
});

// Tooltip styles
export const tooltipContent = style({
  fontFamily: tokens.font.family.corpo,
  borderRadius: '4px',
  padding: '10px 15px',
  fontSize: '0.875rem',
  lineHeight: 1.2,
  color: tokens.color.texto.invertido,
  backgroundColor: tokens.color.primaria,
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  maxWidth: '250px',
});

export const tooltipArrow = style({
  fill: tokens.color.primaria,
});

export const filtersContainer = style({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '14px',
  flexWrap: 'wrap',
  marginBottom: 0,
  padding: '12px 16px',
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: '12px',
  backgroundColor: tokens.color.neutral[50],
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'grid',
      gridTemplateColumns: '1fr',
      alignItems: 'stretch',
      gap: '8px',
      padding: '12px',
    },
  },
});

export const filtersDisabled = style({
  pointerEvents: 'none',
  opacity: 0.6,
});

export const filterGroup = style({
  display: 'grid',
  gap: '6px',
  '@media': {
    'screen and (max-width: 767px)': {
      width: '100%',
    },
  },
});

export const statusFilterGroup = style([filterGroup, {
  minWidth: '190px',
  '@media': {
    'screen and (max-width: 767px)': {
      width: '100%',
      minWidth: 0,
      marginTop: '8px',
    },
    'screen and (max-width: 640px)': {
      width: '100%',
    },
  },
}]);

export const filterLabel = style({
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '0.08em',
  lineHeight: 1,
  textTransform: 'uppercase',
});

export const filterDivider = style({
  alignSelf: 'stretch',
  width: '1px',
  minHeight: '44px',
  marginLeft: 'auto',
  backgroundColor: tokens.color.neutral[200],
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
    },
    'screen and (max-width: 640px)': {
      display: 'none',
    },
  },
});

export const periodTabs = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  flexWrap: 'wrap',
  '@media': {
    'screen and (max-width: 767px)': {
      width: '100%',
      flexWrap: 'nowrap',
    },
  },
});

export const periodPill = style({
  height: '44px',
  padding: '0 16px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
  fontSize: '0.9rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: `background-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,
  whiteSpace: 'nowrap',
  '@media': {
    'screen and (max-width: 767px)': {
      flex: '1 1 0',
      minWidth: 0,
      padding: '0 4px',
      textAlign: 'center',
      fontSize: '0.86rem',
    },
  },
  ':hover': {
    backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 7%, transparent)`,
    color: tokens.color.primaria,
  },
  ':disabled': {
    cursor: 'not-allowed',
  },
  ':focus-visible': {
    outline: `2px solid ${tokens.color.acento.dourado}`,
    outlineOffset: '2px',
  },
});

export const periodPillActive = style({
  backgroundColor: tokens.color.primaria,
  color: tokens.color.texto.invertido,
  fontWeight: tokens.font.weight.semibold,
  boxShadow: `inset 0 2px 5px color-mix(in srgb, ${tokens.color.secundaria} 26%, transparent)`,
  ':hover': {
    backgroundColor: tokens.color.primaria,
    color: tokens.color.texto.invertido,
  },
});

export const statusSelectWrap = style({
  position: 'relative',
  width: '100%',
});

export const statusSelectButton = style({
  fontFamily: tokens.font.family.corpo,
  width: '100%',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  padding: '8px 36px 8px 12px',
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: '8px',
  backgroundColor: tokens.color.neutral[50],
  color: tokens.color.texto.primario,
  fontSize: '0.9rem',
  fontWeight: '500',
  lineHeight: 1,
  textAlign: 'left',
  cursor: 'pointer',
  transition: `background-color ${tokens.motion.fast} ease, border-color ${tokens.motion.fast} ease, box-shadow ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,
  ':hover': {
    borderColor: tokens.color.primaria,
    backgroundColor: `color-mix(in srgb, ${tokens.color.fundo} 72%, ${tokens.color.neutral[50]})`,
  },
  ':disabled': {
    cursor: 'not-allowed',
  },
  ':focus-visible': {
    outline: `2px solid ${tokens.color.acento.dourado}`,
    outlineOffset: '2px',
  },
  '@media': {
    'screen and (max-width: 767px)': {
      fontSize: '16px',
    },
  },
});

export const statusSelectButtonActive = style({
  borderColor: tokens.color.primaria,
  boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${tokens.color.primaria} 28%, transparent)`,
});

export const statusMenu = style({
  position: 'absolute',
  top: 'calc(100% + 6px)',
  right: 0,
  zIndex: 75,
  width: '100%',
  minWidth: '210px',
  overflow: 'hidden',
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: '10px',
  backgroundColor: tokens.color.fundo,
  boxShadow: `0 18px 36px color-mix(in srgb, ${tokens.color.secundaria} 18%, transparent)`,
  padding: '6px',
});

export const statusOption = style({
  width: '100%',
  minHeight: '38px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  border: 'none',
  borderRadius: '7px',
  backgroundColor: 'transparent',
  color: tokens.color.texto.primario,
  cursor: 'pointer',
  fontFamily: tokens.font.family.corpo,
  fontSize: '0.9rem',
  fontWeight: '500',
  padding: '8px 10px',
  textAlign: 'left',
  transition: `background-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,
  ':hover': {
    backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 7%, ${tokens.color.fundo})`,
    color: tokens.color.primaria,
  },
  ':focus-visible': {
    outline: `2px solid ${tokens.color.acento.dourado}`,
    outlineOffset: '1px',
  },
  '@media': {
    'screen and (max-width: 767px)': {
      minHeight: '44px',
      fontSize: '16px',
    },
  },
});

export const statusOptionActive = style({
  backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 10%, ${tokens.color.fundo})`,
  color: tokens.color.primaria,
  fontWeight: tokens.font.weight.semibold,
});

export const statusOptionCheck = style({
  color: tokens.color.primaria,
  fontSize: '0.86rem',
  lineHeight: 1,
});

export const select = style({
  fontFamily: tokens.font.family.corpo,
  width: '100%',
  height: '44px',
  appearance: 'none',
  padding: '8px 36px 8px 12px',
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: '8px',
  backgroundColor: tokens.color.neutral[50],
  color: tokens.color.texto.primario,
  fontSize: '0.9rem',
  fontWeight: '500',
  lineHeight: 1,
  transition: `border-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,
  ':focus': {
    outline: 'none',
    borderColor: tokens.color.acento.dourado,
  },
  '@media': {
    'screen and (max-width: 767px)': {
      fontSize: '16px',
    },
  },
});

export const selectActive = style({
  borderColor: tokens.color.primaria,
});

export const selectChevron = style({
  position: 'absolute',
  top: '50%',
  right: '12px',
  transform: 'translateY(-50%)',
  color: tokens.color.texto.secundario,
  fontSize: '0.68rem',
  lineHeight: 1,
  pointerEvents: 'none',
});

export const filterFeedback = style({
  marginTop: '8px',
  marginBottom: '24px',
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
  fontSize: '13px',
  lineHeight: 1.4,
});

export const summaryCards = style({
  display: 'flex',
  gap: '12px',
  overflowX: 'auto',
  paddingBottom: '4px',
  marginBottom: '24px',
  WebkitOverflowScrolling: 'touch',
  '@media': {
    'screen and (max-width: 767px)': {
      gap: '8px',
      overflowX: 'visible',
      paddingBottom: 0,
    },
  },
});

export const summaryCard = style({
  flex: '0 0 auto',
  minWidth: '160px',
  border: `1px solid ${tokens.color.acento.prateado}`,
  borderRadius: '8px',
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  padding: '14px 16px',
  textAlign: 'left',
  cursor: 'pointer',
  fontFamily: tokens.font.family.corpo,
  transition: `border-color ${tokens.motion.fast} ease, box-shadow ${tokens.motion.fast} ease`,
  ':hover': {
    borderColor: tokens.color.primaria,
  },
  ':disabled': {
    cursor: 'not-allowed',
  },
  '@media': {
    'screen and (max-width: 767px)': {
      flex: '1 1 0',
      minWidth: 0,
      padding: '12px',
    },
  },
});

export const summaryCardActive = style({
  borderColor: tokens.color.primaria,
  boxShadow: `inset 3px 0 0 ${tokens.color.acento.dourado}`,
});

export const summaryMetric = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '1.35rem',
  lineHeight: 1,
  '@media': {
    'screen and (max-width: 767px)': {
      justifyContent: 'center',
      gap: '6px',
      fontSize: '22px',
    },
  },
});

export const summaryIcon = style({
  fontSize: '1.1rem',
  lineHeight: 1,
  '@media': {
    'screen and (max-width: 767px)': {
      fontSize: '18px',
    },
    'screen and (max-width: 359px)': {
      display: 'none',
    },
  },
});

export const summaryLabel = style({
  display: 'block',
  marginTop: '8px',
  fontSize: '0.86rem',
  color: tokens.color.texto.secundario,
  '@media': {
    'screen and (max-width: 767px)': {
      textAlign: 'center',
      fontSize: '11px',
      lineHeight: 1.25,
    },
  },
});

export const todayBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${tokens.color.primaria}`,
  borderRadius: '999px',
  padding: '2px 7px',
  color: tokens.color.primaria,
  backgroundColor: 'transparent',
  fontSize: '10px',
  fontWeight: '700',
  textTransform: 'uppercase',
  lineHeight: 1.2,
});

export const actionsCell = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

export const actionsMenuWrap = style({
  display: 'inline-flex',
  alignItems: 'center',
});

export const menuButton = style({
  width: '44px',
  height: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '999px',
  border: `1px solid ${tokens.color.acento.prateado}`,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  cursor: 'pointer',
  fontSize: '1.25rem',
  lineHeight: 1,
  ':hover': {
    borderColor: tokens.color.primaria,
    color: tokens.color.primaria,
  },
});

export const actionsDropdown = style({
  position: 'fixed',
  width: '230px',
  maxWidth: 'calc(100vw - 24px)',
  maxHeight: 'calc(100vh - 24px)',
  overflowY: 'auto',
  boxSizing: 'border-box',
  border: `1px solid ${tokens.color.acento.prateado}`,
  borderRadius: '8px',
  backgroundColor: tokens.color.fundo,
  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.12)',
  padding: '6px',
  zIndex: 70,
});

export const dropdownItem = style({
  width: '100%',
  minHeight: '40px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  border: 'none',
  borderRadius: '6px',
  backgroundColor: 'transparent',
  color: tokens.color.texto.primario,
  padding: '8px 10px',
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: '0.88rem',
  ':hover': {
    backgroundColor: `${tokens.color.primaria}08`,
  },
  ':disabled': {
    opacity: 0.45,
    cursor: 'not-allowed',
    backgroundColor: 'transparent',
  },
  '@media': {
    'screen and (max-width: 767px)': {
      minHeight: '44px',
      fontSize: '0.92rem',
    },
  },
});

export const inlineConfirm = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  border: `1px solid ${tokens.color.acento.prateado}`,
  borderRadius: '8px',
  backgroundColor: tokens.color.fundo,
  padding: '8px',
  color: tokens.color.texto.primario,
  fontSize: '12px',
});

globalStyle(`${inlineConfirm} button`, {
  minHeight: '32px',
  border: `1px solid ${tokens.color.acento.prateado}`,
  borderRadius: '999px',
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  cursor: 'pointer',
  padding: '4px 10px',
});

export const inlineInfo = style({
  maxWidth: '260px',
  display: 'grid',
  gap: '4px',
  border: `1px solid ${tokens.color.acento.prateado}`,
  borderRadius: '8px',
  backgroundColor: tokens.color.fundo,
  padding: '10px',
  color: tokens.color.texto.secundario,
  fontSize: '12px',
  lineHeight: 1.35,
});

globalStyle(`${inlineInfo} strong`, {
  color: tokens.color.texto.primario,
  fontSize: '12px',
});

export const emptyState = style({
  minHeight: '280px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '48px 24px',
  color: tokens.color.texto.secundario,
});

export const emptyIcon = style({
  width: '40px',
  height: '40px',
  marginBottom: '12px',
  color: tokens.color.primaria,
});

export const emptyTitle = style({
  margin: 0,
  color: tokens.color.texto.primario,
  fontWeight: '600',
  fontSize: '1rem',
});

export const emptySubtitle = style({
  margin: '6px 0 0',
  color: tokens.color.texto.secundario,
  fontSize: '0.9rem',
});

const pulse = keyframes({
  '0%': { opacity: 0.45 },
  '50%': { opacity: 0.75 },
  '100%': { opacity: 0.45 },
});

const skeletonBase = style({
  display: 'block',
  height: '14px',
  borderRadius: '999px',
  backgroundColor: tokens.color.neutral[200],
  animation: `${pulse} 1.2s ease-in-out infinite`,
});

export const skeletonData = style([skeletonBase, { width: '150px' }]);
export const skeletonCliente = style([skeletonBase, { width: '180px' }]);
export const skeletonServico = style([skeletonBase, { width: '160px' }]);
export const skeletonStatus = style([skeletonBase, { width: '88px' }]);

export const paginationCurrent = style({
  fontFamily: tokens.font.family.corpo,
  color: tokens.color.texto.secundario,
  fontSize: '0.9rem',
});

export const rescheduleDrawerBody = style({
  display: 'grid',
  gap: '18px',
  fontFamily: tokens.font.family.corpo,
});

export const customerBlock = style({
  display: 'grid',
  gap: '8px',
});

export const customerName = style({
  color: tokens.color.texto.primario,
  fontSize: '1rem',
  fontWeight: tokens.font.weight.bold,
  lineHeight: 1.35,
});

export const customerContact = style({
  color: tokens.color.texto.secundario,
  fontSize: '0.9rem',
  lineHeight: 1.35,
});

export const whatsappLink = style({
  minHeight: '40px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  width: 'fit-content',
  color: tokens.color.primaria,
  fontWeight: tokens.font.weight.semibold,
  textDecoration: 'none',
  borderRadius: '999px',
  border: `1px solid ${tokens.color.neutral[200]}`,
  padding: '7px 12px',
  backgroundColor: tokens.color.fundo,
  selectors: {
    '&:hover': {
      borderColor: tokens.color.primaria,
      backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 5%, ${tokens.color.fundo})`,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const phoneWarning = style({
  display: 'inline-flex',
  alignItems: 'center',
  width: 'fit-content',
  minHeight: '40px',
  borderRadius: '8px',
  border: `1px solid ${tokens.color.estado.alerta}`,
  backgroundColor: `color-mix(in srgb, ${tokens.color.estado.alerta} 10%, ${tokens.color.fundo})`,
  color: tokens.color.estado.alerta,
  fontWeight: tokens.font.weight.semibold,
  padding: '8px 12px',
  fontSize: '0.9rem',
});

export const currentBookingBlock = style({
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: '8px',
  backgroundColor: tokens.color.neutral[50],
  padding: '14px',
});

export const currentBookingList = style({
  margin: 0,
  display: 'grid',
  gap: '10px',
});

globalStyle(`${currentBookingList} div`, {
  display: 'grid',
  gap: '3px',
});

globalStyle(`${currentBookingList} dt`, {
  color: tokens.color.texto.secundario,
  fontSize: '0.76rem',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  fontWeight: '600',
});

globalStyle(`${currentBookingList} dd`, {
  margin: 0,
  color: tokens.color.texto.primario,
  fontSize: '0.92rem',
  fontWeight: '600',
});

export const rescheduleFlow = style({
  display: 'grid',
  gap: '16px',
});

export const rescheduleSteps = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
  '@media': {
    'screen and (max-width: 520px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const rescheduleStep = style({
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: '8px',
  color: tokens.color.texto.secundario,
  backgroundColor: tokens.color.fundo,
  padding: '10px',
  fontSize: '0.78rem',
  fontWeight: '600',
  lineHeight: 1.3,
});

export const rescheduleStepActive = style([rescheduleStep, {
  borderColor: tokens.color.primaria,
  color: tokens.color.primaria,
  backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 6%, ${tokens.color.fundo})`,
  boxShadow: `inset 3px 0 0 ${tokens.color.acento.dourado}`,
}]);

export const rescheduleStepPanel = style({
  display: 'grid',
  gap: '14px',
});

export const drawerField = style({
  display: 'grid',
  gap: '7px',
  color: tokens.color.texto.primario,
  fontWeight: '600',
  fontSize: '0.9rem',
});

globalStyle(`${drawerField} input`, {
  minHeight: '44px',
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: '6px',
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  fontFamily: tokens.font.family.corpo,
  fontSize: '1rem',
  padding: '8px 12px',
});

globalStyle(`${drawerField} input:focus`, {
  outline: 'none',
  borderColor: tokens.color.acento.dourado,
});

export const selectedDateHeader = style({
  color: tokens.color.primaria,
  fontFamily: tokens.font.family.titulo,
  fontSize: '1.2rem',
  fontWeight: tokens.font.weight.bold,
  lineHeight: 1.25,
});

export const timeGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
  gap: '10px',
});

const timeButtonBase = style({
  minHeight: '58px',
  borderRadius: '8px',
  padding: '8px',
  fontFamily: tokens.font.family.corpo,
  display: 'grid',
  gap: '3px',
  alignContent: 'center',
  justifyItems: 'center',
  cursor: 'pointer',
  transition: `border-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease, background-color ${tokens.motion.fast} ease, box-shadow ${tokens.motion.fast} ease`,
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});

export const timeButtonAvailable = style([timeButtonBase, {
  border: `1px solid ${tokens.color.neutral[200]}`,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  selectors: {
    '&:hover:not(:disabled)': {
      borderColor: tokens.color.primaria,
      color: tokens.color.primaria,
      backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 5%, ${tokens.color.fundo})`,
    },
  },
}]);

export const timeButtonSelected = style([timeButtonBase, {
  border: `2px solid ${tokens.color.primaria}`,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.primaria,
  fontWeight: tokens.font.weight.bold,
  boxShadow: `0 10px 22px color-mix(in srgb, ${tokens.color.primaria} 12%, transparent)`,
}]);

export const timeButtonUnavailable = style([timeButtonBase, {
  border: `1px solid ${tokens.color.neutral[200]}`,
  backgroundColor: tokens.color.neutral[50],
  color: tokens.color.texto.secundario,
  opacity: 0.68,
}]);

globalStyle(`${timeButtonBase} span`, {
  fontWeight: '700',
  fontSize: '0.95rem',
});

globalStyle(`${timeButtonBase} small`, {
  color: tokens.color.texto.secundario,
  fontSize: '0.72rem',
  fontWeight: '600',
});

export const drawerMutedBox = style({
  border: `1px dashed ${tokens.color.neutral[200]}`,
  borderRadius: '8px',
  backgroundColor: `color-mix(in srgb, ${tokens.color.neutral[50]} 78%, ${tokens.color.fundo})`,
  color: tokens.color.texto.secundario,
  padding: '14px',
  fontSize: '0.9rem',
});

export const drawerError = style({
  border: `1px solid ${tokens.color.estado.erro}`,
  borderRadius: '8px',
  backgroundColor: `color-mix(in srgb, ${tokens.color.estado.erro} 9%, ${tokens.color.fundo})`,
  color: tokens.color.estado.erro,
  padding: '12px',
  fontSize: '0.9rem',
  fontWeight: '600',
});

export const drawerFooterActions = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px',
});

const drawerButtonBase = style({
  minHeight: '44px',
  borderRadius: '999px',
  padding: '9px 16px',
  fontFamily: tokens.font.family.corpo,
  fontWeight: tokens.font.weight.semibold,
  cursor: 'pointer',
  transition: `opacity ${tokens.motion.fast} ease, border-color ${tokens.motion.fast} ease, background-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,
  selectors: {
    '&:disabled': {
      opacity: 0.48,
      cursor: 'not-allowed',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const drawerPrimaryButton = style([drawerButtonBase, {
  border: `1px solid ${tokens.color.primaria}`,
  backgroundColor: tokens.color.primaria,
  color: tokens.color.texto.invertido,
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: tokens.color.brand.primaryHover,
      borderColor: tokens.color.brand.primaryHover,
    },
  },
}]);

export const drawerSecondaryButton = style([drawerButtonBase, {
  border: `1px solid ${tokens.color.neutral[200]}`,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  selectors: {
    '&:hover:not(:disabled)': {
      borderColor: tokens.color.primaria,
      color: tokens.color.primaria,
      backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 5%, ${tokens.color.fundo})`,
    },
  },
}]);

export const toast = style({
  position: 'fixed',
  right: '24px',
  bottom: '24px',
  zIndex: 120,
  maxWidth: 'min(420px, calc(100vw - 32px))',
  border: `1px solid ${tokens.color.estado.sucesso}`,
  borderRadius: '8px',
  backgroundColor: tokens.color.fundo,
  color: tokens.color.estado.sucesso,
  boxShadow: '0 14px 30px rgba(0, 0, 0, 0.14)',
  padding: '12px 16px',
  fontFamily: tokens.font.family.corpo,
  fontWeight: tokens.font.weight.semibold,
  fontSize: '0.9rem',
});

export const mobileCardsList = style({
  display: 'none',
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'grid',
      gap: '8px',
      marginTop: '24px',
      overscrollBehaviorY: 'contain',
      WebkitOverflowScrolling: 'touch',
    },
  },
});

export const mobileBookingCard = style({
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: '12px',
  backgroundColor: tokens.color.fundo,
  boxShadow: `0 4px 14px color-mix(in srgb, ${tokens.color.secundaria} 7%, transparent)`,
  padding: '16px',
  display: 'grid',
  gap: '12px',
  fontFamily: tokens.font.family.corpo,
});

export const mobileCardTopline = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  minHeight: '44px',
});

export const mobileCustomerBlock = style({
  display: 'grid',
  gap: '2px',
});

export const mobileCustomerName = style({
  color: tokens.color.texto.primario,
  fontSize: '15px',
  fontWeight: tokens.font.weight.bold,
  lineHeight: 1.35,
});

export const mobileCustomerContact = style({
  color: tokens.color.texto.secundario,
  fontSize: '13px',
  lineHeight: 1.35,
  overflowWrap: 'anywhere',
});

export const mobileServiceBlock = style({
  display: 'grid',
  gap: '2px',
});

export const mobileServiceName = style({
  color: tokens.color.texto.primario,
  fontSize: '14px',
  fontWeight: tokens.font.weight.bold,
  lineHeight: 1.35,
});

export const mobileServiceMeta = style({
  color: tokens.color.texto.secundario,
  fontSize: '12px',
  lineHeight: 1.35,
});

export const mobileCardDetails = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  flexWrap: 'wrap',
  color: tokens.color.texto.secundario,
  fontSize: '12px',
  lineHeight: 1.35,
});

export const mobileDetailItem = style({
  minWidth: 0,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  flexWrap: 'wrap',
});

export const cancelSheetContent = style({
  display: 'grid',
  justifyItems: 'center',
  gap: '8px',
  textAlign: 'center',
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
  fontSize: '0.9rem',
});

globalStyle(`${cancelSheetContent} svg`, {
  color: tokens.color.primaria,
});

globalStyle(`${cancelSheetContent} strong`, {
  color: tokens.color.texto.primario,
  fontSize: '1rem',
  lineHeight: 1.35,
});

export const cancelSheetActions = style({
  display: 'grid',
  gap: '8px',
});

const cancelSheetButton = style({
  width: '100%',
  minHeight: '44px',
  borderRadius: '999px',
  padding: '10px 14px',
  fontFamily: tokens.font.family.corpo,
  fontWeight: tokens.font.weight.semibold,
  cursor: 'pointer',
  selectors: {
    '&:disabled': {
      opacity: 0.48,
      cursor: 'not-allowed',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const cancelConfirmButton = style([cancelSheetButton, {
  border: `1px solid ${tokens.color.primaria}`,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.primaria,
}]);

export const cancelKeepButton = style([cancelSheetButton, {
  border: '1px solid transparent',
  backgroundColor: 'transparent',
  color: tokens.color.texto.primario,
}]);
