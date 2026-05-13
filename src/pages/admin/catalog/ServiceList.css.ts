import { style } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

const surfaceBorder = tokens.color.neutral[200];
const surfaceMuted = tokens.color.neutral[50];
const textMuted = tokens.color.texto.secundario;

const badgeBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 999,
  padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
  fontSize: '0.75rem',
  fontWeight: Number(tokens.font.weight.semibold),
  lineHeight: 1,
  whiteSpace: 'nowrap',
});

const buttonBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.spacing.xs,
  borderRadius: tokens.radius.md,
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  fontFamily: tokens.font.family.corpo,
  fontSize: '0.8125rem',
  fontWeight: Number(tokens.font.weight.semibold),
  lineHeight: 1,
  textDecoration: 'none',
  transition: `opacity ${tokens.motion.fast} ease, background-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,
  cursor: 'pointer',
  border: `1px solid ${surfaceBorder}`,
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: 2,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.55,
    },
  },
});

export const pagina = style({
  display: 'grid',
  gap: tokens.spacing.lg,
  padding: tokens.spacing.xl,
  fontFamily: tokens.font.family.corpo,
});

export const cabecalho = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  gap: tokens.spacing.md,
  flexWrap: 'wrap',
});

export const blocoTitulo = style({
  display: 'grid',
  gap: tokens.spacing.xs,
});

export const subtitulo = style({
  margin: 0,
  color: textMuted,
  fontSize: tokens.font.size.sm,
});

export const titulo = style({
  margin: 0,
  color: tokens.color.primaria,
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.h2,
  lineHeight: 1,
});

export const painel = style({
  display: 'grid',
  gap: tokens.spacing.md,
  padding: tokens.spacing.lg,
  borderRadius: tokens.radius.lg,
  backgroundColor: tokens.color.fundo,
  boxShadow: `0 0 0 1px ${surfaceBorder}`,
});

export const barraFerramentas = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: tokens.spacing.md,
  flexWrap: 'wrap',
});

export const grupoFiltros = style({
  display: 'flex',
  gap: tokens.spacing.sm,
  flexWrap: 'wrap',
});

export const filtro = style({
  minWidth: 200,
  borderRadius: tokens.radius.md,
  border: `1px solid ${surfaceBorder}`,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: 2,
    },
  },
});

export const resumo = style({
  color: textMuted,
  fontSize: tokens.font.size.sm,
});

export const tabelaWrapper = style({
  overflowX: 'auto',
  borderRadius: tokens.radius.lg,
  boxShadow: `0 0 0 1px ${surfaceBorder}`,
});

export const tabela = style({
  width: '100%',
  minWidth: 860,
  borderCollapse: 'collapse',
  backgroundColor: tokens.color.fundo,
});

export const linhaCabecalho = style({
  backgroundColor: surfaceMuted,
});

export const cabecalhoColuna = style({
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  borderBottom: `1px solid ${surfaceBorder}`,
  color: textMuted,
  fontSize: '0.75rem',
  fontWeight: Number(tokens.font.weight.semibold),
  letterSpacing: '0.06em',
  textAlign: 'left',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
});

export const linha = style({
  transition: `background-color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      backgroundColor: surfaceMuted,
    },
    '&:focus-within': {
      backgroundColor: surfaceMuted,
    },
  },
});

export const celula = style({
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  borderBottom: `1px solid ${surfaceBorder}`,
  color: tokens.color.texto.primario,
  verticalAlign: 'middle',
});

export const nomeBloco = style({
  display: 'grid',
  gap: tokens.spacing.xs,
});

export const nome = style({
  fontSize: tokens.font.size.base,
  fontWeight: Number(tokens.font.weight.semibold),
});

export const linhaSecundaria = style({
  display: 'flex',
  gap: tokens.spacing.sm,
  alignItems: 'center',
  flexWrap: 'wrap',
  minHeight: '1.25rem',
});

export const subtipo = style({
  color: textMuted,
  fontSize: '0.8125rem',
});

export const detalheHover = style({
  opacity: 0,
  transform: 'translateY(2px)',
  color: textMuted,
  fontSize: '0.75rem',
  transition: `opacity ${tokens.motion.fast} ease, transform ${tokens.motion.fast} ease`,
  selectors: {
    [`${linha}:hover &`]: {
      opacity: 1,
      transform: 'translateY(0)',
    },
    [`${linha}:focus-within &`]: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '@media': {
    '(pointer: coarse)': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
});

export const categoriaMeta = style({
  display: 'grid',
  gap: tokens.spacing.xs,
});

export const categoria = style({
  fontWeight: Number(tokens.font.weight.semibold),
});

export const modalidades = style({
  display: 'flex',
  gap: tokens.spacing.xs,
  flexWrap: 'wrap',
});

export const modalidade = style([
  badgeBase,
  {
    color: tokens.color.acento.dourado,
    backgroundColor: `color-mix(in srgb, ${tokens.color.acento.dourado} 12%, ${tokens.color.fundo})`,
    border: `1px solid color-mix(in srgb, ${tokens.color.acento.dourado} 24%, ${tokens.color.fundo})`,
  },
]);

export const valor = style({
  fontWeight: Number(tokens.font.weight.semibold),
  whiteSpace: 'nowrap',
});

export const statusBloco = style({
  display: 'grid',
  gap: tokens.spacing.xs,
});

export const statusPublicado = style([
  badgeBase,
  {
    width: 'fit-content',
    color: tokens.color.estado.sucesso,
    backgroundColor: `color-mix(in srgb, ${tokens.color.estado.sucesso} 12%, ${tokens.color.fundo})`,
    border: `1px solid color-mix(in srgb, ${tokens.color.estado.sucesso} 24%, ${tokens.color.fundo})`,
  },
]);

export const statusInativo = style([
  badgeBase,
  {
    width: 'fit-content',
    color: tokens.color.estado.alerta,
    backgroundColor: `color-mix(in srgb, ${tokens.color.estado.alerta} 12%, ${tokens.color.fundo})`,
    border: `1px solid color-mix(in srgb, ${tokens.color.estado.alerta} 24%, ${tokens.color.fundo})`,
  },
]);

export const acoes = style({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const grupoAcoes = style({
  display: 'inline-flex',
  gap: tokens.spacing.sm,
  opacity: 0,
  transform: 'translateY(2px)',
  transition: `opacity ${tokens.motion.fast} ease, transform ${tokens.motion.fast} ease`,
  selectors: {
    [`${linha}:hover &`]: {
      opacity: 1,
      transform: 'translateY(0)',
    },
    [`${linha}:focus-within &`]: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '@media': {
    '(pointer: coarse)': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
});

export const botaoEditar = style([
  buttonBase,
  {
    color: tokens.color.secundaria,
    backgroundColor: tokens.color.fundo,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: surfaceMuted,
      },
    },
  },
]);

export const botaoNovo = style([
  buttonBase,
  {
    color: tokens.color.texto.invertido,
    backgroundColor: tokens.color.primaria,
    border: `1px solid ${tokens.color.primaria}`,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: tokens.color.brand.primaryHover,
      },
    },
  },
]);

export const estadoVazio = style({
  padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
  textAlign: 'center',
  color: textMuted,
});

export const celulaEstado = style([
  celula,
  {
    textAlign: 'center',
  },
]);

export const celulaAcoes = style([
  celula,
  {
    width: 120,
  },
]);