import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
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
});

export const tr = style({
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: 'rgba(122, 14, 20, 0.03)',
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
  padding: '4px 12px',
  borderRadius: '9999px',
  fontSize: '0.75rem',
  fontWeight: '600',
  textTransform: 'uppercase',
  cursor: 'default',
});

export const statusBadge = styleVariants({
  PENDING_PAYMENT: [statusBadgeBase, { backgroundColor: '#FFF9C4', color: '#F57F17' }],
  CONFIRMED: [statusBadgeBase, { backgroundColor: '#E8F5E9', color: '#2E7D32' }],
  CANCELLED: [statusBadgeBase, { backgroundColor: '#FFEBEE', color: '#C62828' }],
  EXPIRED: [statusBadgeBase, { backgroundColor: '#F5F5F5', color: '#616161' }],
  COMPLETED: [statusBadgeBase, { backgroundColor: '#E3F2FD', color: '#1565C0' }],
  NO_SHOW: [statusBadgeBase, { backgroundColor: '#FFF3E0', color: '#EF6C00' }],
  REFUNDED: [statusBadgeBase, { backgroundColor: '#F3E5F5', color: '#6A1B9A' }],
});

export const paymentBadge = styleVariants({
  APPROVED: [statusBadgeBase, { backgroundColor: '#E8F5E9', color: '#2E7D32' }],
  PENDING: [statusBadgeBase, { backgroundColor: '#FFF9C4', color: '#F57F17' }],
  CREATED: [statusBadgeBase, { backgroundColor: '#F5F5F5', color: '#616161' }],
  REJECTED: [statusBadgeBase, { backgroundColor: '#FFEBEE', color: '#C62828' }],
  REFUNDED: [statusBadgeBase, { backgroundColor: '#F3E5F5', color: '#6A1B9A' }],
});

export const iconButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '8px',
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
});

export const secondaryCell = style({
  display: 'block',
  marginTop: '4px',
  color: tokens.color.texto.secundario,
  fontSize: '0.82rem',
});

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
});

export const paginationSummary = style({
  fontFamily: tokens.font.family.corpo,
  color: tokens.color.texto.secundario,
  fontSize: '0.9rem',
});

export const paginationActions = style({
  display: 'flex',
  gap: '12px',
});

export const paginationButton = style({
  border: `1px solid ${tokens.color.acento.prateado}`,
  background: tokens.color.fundo,
  color: tokens.color.texto.primario,
  borderRadius: '999px',
  padding: '10px 16px',
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
  gap: '16px',
  flexWrap: 'wrap',
  marginBottom: '24px',
});

export const select = style({
  fontFamily: tokens.font.family.corpo,
  padding: '8px 12px',
  border: `1px solid ${tokens.color.acento.prateado}`,
  borderRadius: '4px',
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  ':focus': {
    outline: 'none',
    borderColor: tokens.color.acento.dourado,
  },
});
