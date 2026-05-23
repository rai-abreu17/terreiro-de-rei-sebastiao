import { style, keyframes } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

/**
 * Estilos do Catálogo de Serviços — Painel Administrativo.
 *
 * Correções aplicadas:
 *   1 — Toggle switch CSS puro com confirmação inline
 *   2 — Barra de filtros coesa (replica Marcações)
 *   3 — Barra lateral colorida por tipo de serviço
 *   4 — Botão ⋯ circular com portal fixo (replica Marcações)
 *   5 — Altura 72px, hover com opacidade sobre primária, zebra stripes
 *
 * Sem magic strings de cor — tudo via tokens.
 */

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

// ── Layout da página ───────────────────────────────────

export const pagina = style({
  display: 'grid',
  gap: tokens.spacing.lg,
  padding: tokens.spacing.xl,
  fontFamily: tokens.font.family.corpo,
});

export const cabecalho = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: tokens.spacing.md,
  flexWrap: 'wrap',
  '@media': {
    'screen and (max-width: 767px)': {
      flexDirection: 'column',
      width: '100%',
    },
  },
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

export const descricaoCabecalho = style({
  margin: `${tokens.spacing.xs} 0 0`,
  color: textMuted,
  fontSize: tokens.font.size.sm,
});

export const contadorCabecalho = style({
  display: 'inline-block',
  marginTop: tokens.spacing.xs,
  color: textMuted,
  fontSize: tokens.font.size.sm,
  fontWeight: Number(tokens.font.weight.semibold),
});

export const painel = style({
  display: 'grid',
  gap: tokens.spacing.md,
  padding: tokens.spacing.lg,
  borderRadius: tokens.radius.lg,
  backgroundColor: tokens.color.fundo,
  boxShadow: `0 0 0 1px ${surfaceBorder}`,
});

// ── Filtros em chips (toggle pills) ─────────────────────

export const barraFiltros = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: tokens.spacing.xl,
  flexWrap: 'wrap',
  '@media': {
    'screen and (max-width: 767px)': {
      gap: tokens.spacing.lg,
    },
  },
});

/** Grupo vertical: rótulo + linha de chips. */
export const grupoChips = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

/** Rótulo pequeno acima dos chips (TIPO / CATEGORIA). */
export const rotuloChips = style({
  color: tokens.color.neutral[800],
  fontFamily: tokens.font.family.corpo,
  fontSize: '14px',
  fontWeight: Number(tokens.font.weight.bold),
  lineHeight: 1,
});

/** Linha horizontal de chips. */
export const listaChips = style({
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
});

/** Chip ativo — fundo suave, sem borda, checkmark visível. */
export const chipAtivo = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 14px',
  borderRadius: 999,
  fontSize: '14px',
  fontFamily: tokens.font.family.corpo,
  fontWeight: Number(tokens.font.weight.semibold),
  cursor: 'pointer',
  border: `1px solid transparent`,
  backgroundColor: `color-mix(in srgb, ${tokens.color.secundaria} 12%, ${tokens.color.fundo})`,
  color: tokens.color.secundaria,
  transition: `background-color ${tokens.motion.fast} ease, border-color ${tokens.motion.fast} ease, opacity ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      backgroundColor: `color-mix(in srgb, ${tokens.color.secundaria} 16%, ${tokens.color.fundo})`,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: 2,
    },
  },
  '@media': {
    'screen and (max-width: 767px)': {
      padding: '8px 14px',
      fontSize: '0.875rem',
    },
  },
});

/** Chip inativo — fantasma, sem fundo, texto esmaecido. */
export const chipInativo = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 14px',
  borderRadius: 999,
  fontSize: '14px',
  fontFamily: tokens.font.family.corpo,
  fontWeight: Number(tokens.font.weight.semibold),
  cursor: 'pointer',
  border: `1px solid ${surfaceBorder}`,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.neutral[500],
  transition: `background-color ${tokens.motion.fast} ease, border-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      borderColor: tokens.color.neutral[400],
      color: tokens.color.texto.primario,
      backgroundColor: `color-mix(in srgb, ${surfaceMuted} 50%, transparent)`,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: 2,
    },
  },
  '@media': {
    'screen and (max-width: 767px)': {
      padding: '8px 14px',
      fontSize: '0.875rem',
    },
  },
});

/** ✓ ícone do checkmark dentro do chip ativo. */
export const chipCheck = style({
  width: 16,
  height: 16,
  flexShrink: 0,
  color: 'currentColor',
});

/** Contador de resultados à direita da barra de filtros. */
export const resumoFiltro = style({
  color: textMuted,
  fontSize: tokens.font.size.sm,
  whiteSpace: 'nowrap',
  marginLeft: 'auto',
  alignSelf: 'flex-end',
  paddingBottom: '8px',
});

// ── Tabela ──────────────────────────────────────────────

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

// ── CORREÇÃO 5 — Altura 72px, hover com opacidade sobre primária, zebra ──

export const linha = style({
  minHeight: 72,
  cursor: 'pointer',
  transition: `background-color 120ms ease`,
  selectors: {
    '&:nth-child(odd)': {
      backgroundColor: `color-mix(in srgb, ${surfaceMuted} 40%, ${tokens.color.fundo})`,
    },
    '&:nth-child(even)': {
      backgroundColor: tokens.color.fundo,
    },
    '&:hover': {
      backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 4%, ${tokens.color.fundo})`,
    },
  },
});

/** Padding vertical aumentado para mais respiro entre linhas. */

export const celula = style({
  padding: `20px ${tokens.spacing.lg}`,
  borderBottom: `1px solid ${surfaceBorder}`,
  color: tokens.color.texto.primario,
  verticalAlign: 'middle',
});

export const celulaNome = style([
  celula,
  {
    position: 'relative',
  },
]);

export const nomeBloco = style({
  display: 'grid',
  gap: tokens.spacing.xs,
});

export const nome = style({
  fontSize: '15px',
  fontWeight: Number(tokens.font.weight.bold),
  color: tokens.color.neutral[800],
});

export const linhaSecundaria = style({
  display: 'flex',
  gap: tokens.spacing.sm,
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const subtipo = style({
  color: tokens.color.neutral[400],
  fontSize: '12px',
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
    color: tokens.color.secundaria,
    backgroundColor: `color-mix(in srgb, ${tokens.color.secundaria} 10%, ${tokens.color.fundo})`,
    border: `1px solid color-mix(in srgb, ${tokens.color.secundaria} 18%, ${tokens.color.fundo})`,
    fontWeight: Number(tokens.font.weight.bold),
  },
]);

export const valor = style({
  fontWeight: Number(tokens.font.weight.bold),
  whiteSpace: 'nowrap',
  color: tokens.color.neutral[800],
  fontSize: '15px',
});

// ── Coluna "Visibilidade no Site" — Toggle + Label ──────

export const celulaEstado = style([
  celula,
  {
    textAlign: 'left',
    verticalAlign: 'middle',
  },
]);

/** Container horizontal: toggle switch + label semântico. */
export const visibilidadeContainer = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
  borderRadius: tokens.radius.md,
  transition: `background-color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      backgroundColor: `color-mix(in srgb, ${surfaceMuted} 70%, ${tokens.color.fundo})`,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: 2,
    },
  },
});

/** Input real, acessível mas invisível. */
export const visibilidadeInput = style({
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  border: 0,
});

/** Trilho do toggle — 36×20px arredondado. Estado off = cinza. */
export const toggleTrilho = style({
  position: 'relative',
  width: 36,
  height: 20,
  borderRadius: 999,
  backgroundColor: tokens.color.neutral[400],
  transition: `background-color 200ms ease`,
  flexShrink: 0,
});

/** Trilho ativo = verde sucesso. */
export const toggleTrilhoAtivo = style({
  backgroundColor: tokens.color.estado.sucesso,
});

/** Bolinha branca — 14px, estado off à esquerda. */
export const toggleBolinha = style({
  position: 'absolute',
  top: 3,
  left: 3,
  width: 14,
  height: 14,
  borderRadius: '50%',
  backgroundColor: tokens.color.fundo,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)',
  transition: `transform 200ms ease`,
});

/** Bolinha ativa — desloca para a direita. */
export const toggleBolinhaAtiva = style({
  transform: 'translateX(16px)',
});

/** Label "Público" — verde, indica serviço online. */
export const labelPublico = style({
  fontSize: '13px',
  fontWeight: Number(tokens.font.weight.bold),
  color: tokens.color.estado.sucesso,
  userSelect: 'none',
  lineHeight: 1,
});

/** Label "Oculto" — cinza, indica serviço offline. */
export const labelOculto = style({
  fontSize: '13px',
  fontWeight: Number(tokens.font.weight.semibold),
  color: tokens.color.neutral[400],
  userSelect: 'none',
  lineHeight: 1,
});

/** Container da confirmação inline abaixo do toggle. */
export const confirmacaoInlineContainer = style({
  marginTop: tokens.spacing.sm,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.xs,
  padding: tokens.spacing.sm,
  backgroundColor: surfaceMuted,
  borderRadius: tokens.radius.md,
  border: `1px solid ${surfaceBorder}`,
});

export const confirmacaoTexto = style({
  fontSize: '0.8125rem',
  color: tokens.color.texto.primario,
  lineHeight: 1.4,
});

export const confirmacaoBotoes = style({
  display: 'flex',
  gap: tokens.spacing.xs,
});

const confirmacaoBotaoBase = style([
  buttonBase,
  {
    padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
    fontSize: '0.75rem',
    borderRadius: '999px',
    minHeight: 32,
  },
]);

export const botaoConfirmar = style([
  confirmacaoBotaoBase,
  {
    backgroundColor: tokens.color.primaria,
    color: tokens.color.texto.invertido,
    border: `1px solid ${tokens.color.primaria}`,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: tokens.color.brand.primaryHover,
        borderColor: tokens.color.brand.primaryHover,
      },
    },
  },
]);

export const botaoCancelar = style([
  confirmacaoBotaoBase,
  {
    backgroundColor: tokens.color.fundo,
    color: tokens.color.texto.primario,
    border: `1px solid ${surfaceBorder}`,
    selectors: {
      '&:hover:not(:disabled)': {
        borderColor: tokens.color.primaria,
        color: tokens.color.primaria,
      },
    },
  },
]);

// ── CORREÇÃO 4 — Botão ⋯ circular (padrão Marcações) ───

export const celulaAcoes = style([
  celula,
  {
    width: 60,
    textAlign: 'center',
  },
]);

export const acoesContainer = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const botaoMenu = style({
  width: 36,
  height: 36,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  border: `1px solid ${tokens.color.acento.prateado}`,
  backgroundColor: 'transparent',
  color: tokens.color.texto.primario,
  cursor: 'pointer',
  fontSize: '16px',
  lineHeight: 1,
  padding: '4px',
  transition: `background-color ${tokens.motion.fast} ease, border-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      borderColor: tokens.color.primaria,
      color: tokens.color.primaria,
      backgroundColor: `color-mix(in srgb, ${surfaceMuted} 80%, transparent)`,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: 2,
    },
  },
});

/** Dropdown do menu — position: fixed via getBoundingClientRect (como Marcações). */
export const menuFlutuante = style({
  position: 'fixed',
  width: 230,
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

export const menuItem = style({
  width: '100%',
  minHeight: 40,
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  border: 'none',
  borderRadius: tokens.radius.md,
  backgroundColor: 'transparent',
  color: tokens.color.texto.primario,
  padding: `${tokens.spacing.sm} 10px`,
  textAlign: 'left',
  cursor: 'pointer',
  fontFamily: tokens.font.family.corpo,
  fontSize: '0.88rem',
  transition: `background-color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 6%, ${tokens.color.fundo})`,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: 1,
    },
  },
  '@media': {
    'screen and (max-width: 767px)': {
      minHeight: 44,
      fontSize: '0.92rem',
    },
  },
});

export const menuSeparador = style({
  height: 1,
  backgroundColor: surfaceBorder,
  margin: `${tokens.spacing.xs} 0`,
});

export const textoPerigo = style([
  menuItem,
  {
    color: tokens.color.estado.erro,
  },
]);

// ── Botão "+ Novo Serviço" ──────────────────────────────

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
    '@media': {
      'screen and (max-width: 767px)': {
        width: '100%',
        minHeight: 48,
        marginTop: tokens.spacing.sm,
      },
    },
  },
]);

// ── Estados vazios ──────────────────────────────────────

export const estadoVazioPrincipal = style({
  padding: `64px ${tokens.spacing.lg}`,
  textAlign: 'center',
  color: textMuted,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: tokens.spacing.md,
});

export const estadoVazioFiltro = style({
  padding: `64px ${tokens.spacing.lg}`,
  textAlign: 'center',
  color: textMuted,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: tokens.spacing.md,
});

export const iconeVazio = style({
  width: 40,
  height: 40,
  color: textMuted,
});

// ── Skeleton loading ────────────────────────────────────

export const skeletonRow = style({
  minHeight: 72,
});

const pulseAnimation = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.5 },
});

export const skeletonPulse = style({
  animation: `${pulseAnimation} 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  backgroundColor: surfaceBorder,
  borderRadius: tokens.radius.sm,
});

export const skeletonTextNome = style([
  skeletonPulse,
  {
    height: '15px',
    width: '60%',
    marginBottom: tokens.spacing.xs,
  },
]);

export const skeletonTextCurto = style([
  skeletonPulse,
  {
    height: '12px',
    width: '40%',
  },
]);

export const skeletonBadge = style([
  skeletonPulse,
  {
    height: '24px',
    width: '80px',
    borderRadius: 999,
  },
]);

/**
 * Botão "Limpar filtros" no estado vazio de filtros.
 * Reutiliza o estilo base de botão com tom secundário.
 */
export const botaoLimparFiltros = style([
  buttonBase,
  {
    color: tokens.color.secundaria,
    backgroundColor: `color-mix(in srgb, ${tokens.color.secundaria} 8%, ${tokens.color.fundo})`,
    border: `1px solid color-mix(in srgb, ${tokens.color.secundaria} 20%, ${tokens.color.fundo})`,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: `color-mix(in srgb, ${tokens.color.secundaria} 14%, ${tokens.color.fundo})`,
      },
    },
  },
]);

// ── Mobile e Tablet ─────────────────────────────────────

export const containerFiltrosMobile = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.md,
  width: '100%',
  padding: tokens.spacing.md,
  backgroundColor: tokens.color.fundo,
  border: `1px solid ${surfaceBorder}`,
  borderRadius: tokens.radius.md,
});

export const labelSelectMobile = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.xs,
});

export const microLabel = style({
  color: tokens.color.neutral[500],
  fontSize: '11px',
  fontWeight: Number(tokens.font.weight.bold),
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const selectMobile = style({
  width: '100%',
  height: 44,
  fontSize: '16px',
  fontFamily: tokens.font.family.corpo,
  borderRadius: tokens.radius.sm,
  border: `1px solid ${surfaceBorder}`,
  padding: `0 ${tokens.spacing.sm}`,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
});

export const colunaOcultaTablet = style({
  '@media': {
    'screen and (max-width: 1023px)': {
      display: 'none',
    },
  },
});

export const detalheOcultoDesktop = style({
  display: 'none',
  '@media': {
    'screen and (max-width: 1023px)': {
      display: 'inline',
    },
  },
});

export const listaCardsMobile = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.sm,
});

export const cardMobile = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: tokens.color.fundo,
  borderRadius: tokens.radius.md,
  border: `1px solid ${surfaceBorder}`,
  padding: tokens.spacing.md,
  paddingLeft: 20,
  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
  overflow: 'hidden',
});

export const barraConsultation = style({
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0, left: 0, bottom: 0, width: 4,
      backgroundColor: tokens.color.primaria,
    }
  }
});

export const barraRitual = style({
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0, left: 0, bottom: 0, width: 4,
      backgroundColor: tokens.color.secundaria,
    }
  }
});

export const cardHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: tokens.spacing.sm,
});

export const cardTitulo = style({
  fontSize: '16px',
  fontWeight: Number(tokens.font.weight.bold),
  color: tokens.color.neutral[800],
  display: 'block',
  marginBottom: tokens.spacing.xs,
});

export const cardSubtitulo = style({
  margin: 0,
  fontSize: '12px',
  color: textMuted,
});

export const cardDivisor = style({
  border: 0,
  height: 1,
  backgroundColor: surfaceBorder,
  margin: `${tokens.spacing.md} 0`,
  width: '100%',
});

export const cardDetalhes = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: tokens.spacing.sm,
  fontSize: '14px',
  color: tokens.color.neutral[800],
  marginBottom: tokens.spacing.sm,
});

export const cardRodapeToggle = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.md,
  minHeight: 44,
  cursor: 'pointer',
});

export const labelToggleMobile = style({
  fontSize: '14px',
  fontWeight: Number(tokens.font.weight.semibold),
  color: tokens.color.neutral[800],
});

export const sheetAvisoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: tokens.spacing.md,
});

export const sheetAvisoIcone = style({
  color: tokens.color.estado.alerta,
});

export const sheetAvisoTitulo = style({
  fontSize: '16px',
  fontWeight: Number(tokens.font.weight.bold),
  color: tokens.color.neutral[800],
  margin: 0,
});

export const sheetAvisoTexto = style({
  fontSize: '14px',
  color: textMuted,
  margin: 0,
});

export const sheetAvisoBotoes = style({
  display: 'flex',
  width: '100%',
  gap: tokens.spacing.sm,
  marginTop: tokens.spacing.sm,
});

export const sheetBotaoConfirmarPerigo = style([
  buttonBase,
  {
    flex: 1,
    minHeight: 44,
    backgroundColor: tokens.color.fundo,
    color: tokens.color.estado.erro,
    border: `1px solid ${tokens.color.estado.erro}`,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: `color-mix(in srgb, ${tokens.color.estado.erro} 5%, ${tokens.color.fundo})`,
      },
    },
  },
]);

export const sheetBotaoCancelarPerigo = style([
  buttonBase,
  {
    flex: 1,
    minHeight: 44,
    backgroundColor: tokens.color.fundo,
    color: textMuted,
    border: `1px solid ${surfaceBorder}`,
  },
]);

export const sheetBotaoAcao = style([
  menuItem,
  {
    minHeight: 48,
    borderBottom: `1px solid ${surfaceBorder}`,
    borderRadius: 0,
    selectors: {
      '&:last-child': {
        borderBottom: 'none',
      },
    },
  },
]);