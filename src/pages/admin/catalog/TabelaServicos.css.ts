import { style, keyframes } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

/**
 * Estilos vanilla-extract para a tabela de gestão de serviços do catálogo.
 *
 * Segue PR-06: status aparece apenas em hover/focus.
 * Segue PR-13: desktop-first no admin.
 * Sem magic strings — todos os valores vêm dos tokens.
 */

// ── Layout da página ───────────────────────────────

export const paginaContainer = style({
  maxWidth: 1280,
  margin: '0 auto',
  padding: '32px 24px',
  fontFamily: tokens.font.family.corpo,
});

export const cabecalho = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 24,
  flexWrap: 'wrap',
  gap: 16,
});

export const tituloPagina = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: '1.75rem',
  color: tokens.color.primaria,
  fontWeight: 600,
  margin: 0,
});

// ── Barra de filtros ───────────────────────────────

export const barraFiltros = style({
  display: 'flex',
  gap: 12,
  marginBottom: 20,
  flexWrap: 'wrap',
  alignItems: 'center',
});

export const filtroSelect = style({
  padding: '8px 12px',
  borderRadius: 6,
  border: `1px solid ${tokens.color.acento.prateado}`,
  fontFamily: tokens.font.family.corpo,
  fontSize: '0.875rem',
  color: tokens.color.texto.primario,
  backgroundColor: tokens.color.fundo,
  cursor: 'pointer',
  transition: 'border-color 0.2s ease',
  outline: 'none',
  ':focus': {
    borderColor: tokens.color.primaria,
    boxShadow: `0 0 0 2px ${tokens.color.primaria}33`,
  },
});

// ── Tabela ──────────────────────────────────────────

export const tabelaWrapper = style({
  overflowX: 'auto',
  borderRadius: 8,
  border: `1px solid ${tokens.color.neutral[200]}`,
  backgroundColor: tokens.color.fundo,
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
});

export const tabela = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: tokens.font.family.corpo,
  fontSize: '0.875rem',
});

export const cabecalhoTabela = style({
  backgroundColor: tokens.color.neutral[50],
  position: 'sticky',
  top: 0,
  zIndex: 1,
});

export const celulaHeader = style({
  padding: '12px 16px',
  textAlign: 'left',
  fontWeight: 600,
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: tokens.color.texto.secundario,
  borderBottom: `1px solid ${tokens.color.neutral[200]}`,
  whiteSpace: 'nowrap',
  userSelect: 'none',
});

export const linhaTabela = style({
  transition: 'background-color 0.15s ease',
  ':hover': {
    backgroundColor: tokens.color.neutral[50],
  },
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${tokens.color.neutral[200]}`,
    },
  },
});

export const celulaCorpo = style({
  padding: '14px 16px',
  verticalAlign: 'middle',
  color: tokens.color.texto.primario,
});

export const nomeServico = style({
  fontWeight: 500,
  color: tokens.color.texto.primario,
});

export const slugServico = style({
  fontSize: '0.75rem',
  color: tokens.color.texto.secundario,
  marginTop: 2,
});

// ── Badges ─────────────────────────────────────────

const badgeBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '3px 10px',
  borderRadius: 100,
  fontSize: '0.7rem',
  fontWeight: 600,
  letterSpacing: '0.02em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  lineHeight: 1.4,
});

export const badgePublicado = style([
  badgeBase,
  {
    color: tokens.color.estado.sucesso,
    backgroundColor: `${tokens.color.estado.sucesso}14`,
    border: `1px solid ${tokens.color.estado.sucesso}33`,
  },
]);

export const badgeRascunho = style([
  badgeBase,
  {
    color: tokens.color.estado.alerta,
    backgroundColor: `${tokens.color.estado.alerta}14`,
    border: `1px solid ${tokens.color.estado.alerta}33`,
  },
]);

export const badgeTipo = style([
  badgeBase,
  {
    color: tokens.color.secundaria,
    backgroundColor: `${tokens.color.secundaria}10`,
    border: `1px solid ${tokens.color.secundaria}22`,
  },
]);

export const badgeModalidade = style([
  badgeBase,
  {
    color: tokens.color.acento.dourado,
    backgroundColor: `${tokens.color.acento.dourado}12`,
    border: `1px solid ${tokens.color.acento.dourado}28`,
    fontSize: '0.65rem',
  },
]);

// ── Coluna de ações (hover/focus) — PR-06 ──────────

export const colunaAcoes = style({
  opacity: 0,
  transition: 'opacity 0.2s ease',
  display: 'flex',
  gap: 6,
  selectors: {
    [`${linhaTabela}:hover &`]: {
      opacity: 1,
    },
    [`${linhaTabela}:focus-within &`]: {
      opacity: 1,
    },
  },
  '@media': {
    '(pointer: coarse)': {
      opacity: 1,
    },
  },
});

const botaoBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  padding: '6px 12px',
  borderRadius: 6,
  fontSize: '0.75rem',
  fontWeight: 500,
  fontFamily: tokens.font.family.corpo,
  cursor: 'pointer',
  border: 'none',
  transition: 'background-color 0.15s ease, transform 0.1s ease',
  whiteSpace: 'nowrap',
  ':active': {
    transform: 'scale(0.96)',
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    transform: 'none',
  },
});

export const botaoPublicar = style([
  botaoBase,
  {
    color: tokens.color.fundo,
    backgroundColor: tokens.color.estado.sucesso,
    ':hover': {
      backgroundColor: `color-mix(in srgb, ${tokens.color.estado.sucesso} 80%, ${tokens.color.neutral[800]})`,
    },
  },
]);

export const botaoDespublicar = style([
  botaoBase,
  {
    color: tokens.color.estado.alerta,
    backgroundColor: `${tokens.color.estado.alerta}14`,
    border: `1px solid ${tokens.color.estado.alerta}44`,
    ':hover': {
      backgroundColor: `${tokens.color.estado.alerta}22`,
    },
  },
]);

export const botaoEditar = style([
  botaoBase,
  {
    color: tokens.color.secundaria,
    backgroundColor: `${tokens.color.secundaria}0D`,
    border: `1px solid ${tokens.color.secundaria}22`,
    ':hover': {
      backgroundColor: `${tokens.color.secundaria}18`,
    },
  },
]);

export const botaoPrimario = style([
  botaoBase,
  {
    color: tokens.color.fundo,
    backgroundColor: tokens.color.primaria,
    ':hover': {
      backgroundColor: tokens.color.brand.primaryHover,
    },
  },
]);

// ── Paginação ──────────────────────────────────────

export const paginacao = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 0',
  fontSize: '0.875rem',
  color: tokens.color.texto.secundario,
});

export const botoesPaginacao = style({
  display: 'flex',
  gap: 8,
});

export const botaoPagina = style([
  botaoBase,
  {
    color: tokens.color.texto.secundario,
    backgroundColor: 'transparent',
    border: `1px solid ${tokens.color.neutral[200]}`,
    padding: '6px 14px',
    ':hover': {
      backgroundColor: tokens.color.neutral[50],
    },
  },
]);

// ── Estado vazio ───────────────────────────────────

export const estadoVazio = style({
  textAlign: 'center',
  padding: '48px 24px',
  color: tokens.color.texto.secundario,
  fontSize: '0.9375rem',
});

// ── Loading skeleton ───────────────────────────────

const pulsar = keyframes({
  '0%': { opacity: 0.4 },
  '50%': { opacity: 0.7 },
  '100%': { opacity: 0.4 },
});

export const skeleton = style({
  height: 14,
  borderRadius: 4,
  backgroundColor: tokens.color.neutral[200],
  animation: `${pulsar} 1.5s ease-in-out infinite`,
});

export const skeletonLinha = style({
  display: 'flex',
  gap: 16,
  padding: '14px 16px',
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${tokens.color.neutral[200]}`,
    },
  },
});

// ── Modalidades inline ─────────────────────────────

export const containerModalidades = style({
  display: 'flex',
  gap: 4,
  flexWrap: 'wrap',
});

// ── Toast de erro (para futuro Radix Toast) ────────

export const toastErro = style({
  padding: '12px 16px',
  borderRadius: 8,
  backgroundColor: `${tokens.color.estado.erro}12`,
  border: `1px solid ${tokens.color.estado.erro}33`,
  color: tokens.color.estado.erro,
  fontSize: '0.875rem',
  fontFamily: tokens.font.family.corpo,
  marginBottom: 16,
});
