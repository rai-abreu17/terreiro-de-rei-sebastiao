import { style } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

// ── Layout raiz ───────────────────────────────────────────────────────────────

export const container = style({
  minHeight: '100vh',
  backgroundColor: tokens.color.neutral[50],
});

export const conteudo = style({
  maxWidth: '800px',
  margin: '0 auto',
  padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
  fontFamily: tokens.font.family.corpo,
  color: tokens.color.texto.primario,
  display: 'grid',
  gap: tokens.spacing.xl,
  '@media': {
    'screen and (min-width: 768px)': {
      padding: `${tokens.spacing.xl} ${tokens.spacing.xl} calc(${tokens.spacing.xl} * 1.5)`,
    },
  },
});

// ── Cabeçalho da página ───────────────────────────────────────────────────────

export const paginaCabecalho = style({
  display: 'grid',
  gap: tokens.spacing.sm,
});

export const paginaTitulo = style({
  margin: 0,
  fontFamily: tokens.font.family.titulo,
  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
  color: tokens.color.texto.primario,
  lineHeight: 1.1,
});

export const paginaSubtitulo = style({
  margin: 0,
  color: tokens.color.texto.secundario,
  fontSize: tokens.font.size.base,
  lineHeight: 1.6,
});

// ── Indicador de etapas ───────────────────────────────────────────────────────

export const indicadorEtapas = style({
  display: 'flex',
  alignItems: 'center',
  gap: 0,
  overflowX: 'auto',
  paddingBottom: tokens.spacing.xs,
});

export const itemEtapa = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: tokens.spacing.xs,
  flexShrink: 0,
});

export const circuloEtapaBase = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  fontFamily: tokens.font.family.corpo,
  transition: `background-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,
  flexShrink: 0,
} as const;

export const circuloEtapaAtivo = style({
  ...circuloEtapaBase,
  backgroundColor: tokens.color.primaria,
  color: tokens.color.texto.invertido,
  boxShadow: `0 0 0 3px color-mix(in srgb, ${tokens.color.primaria} 25%, transparent)`,
});

export const circuloEtapaConcluido = style({
  ...circuloEtapaBase,
  backgroundColor: tokens.color.estado.sucesso,
  color: tokens.color.texto.invertido,
});

export const circuloEtapaPendente = style({
  ...circuloEtapaBase,
  backgroundColor: tokens.color.neutral[50],
  color: tokens.color.texto.secundario,
  border: `1px solid ${tokens.color.neutral[200]}`,
});

export const rotuloEtapa = style({
  fontSize: '0.65rem',
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
  textAlign: 'center',
  whiteSpace: 'nowrap',
  '@media': {
    'screen and (max-width: 480px)': {
      display: 'none',
    },
  },
});

export const rotuloEtapaAtivo = style({
  fontSize: '0.65rem',
  color: tokens.color.primaria,
  fontFamily: tokens.font.family.corpo,
  fontWeight: tokens.font.weight.semibold,
  textAlign: 'center',
  whiteSpace: 'nowrap',
  '@media': {
    'screen and (max-width: 480px)': {
      display: 'none',
    },
  },
});

export const conector = style({
  flex: 1,
  height: '2px',
  backgroundColor: tokens.color.neutral[200],
  marginBottom: '20px',
  minWidth: '16px',
  '@media': {
    'screen and (min-width: 481px)': {
      marginBottom: '28px',
    },
  },
});

export const conectorConcluido = style({
  flex: 1,
  height: '2px',
  backgroundColor: tokens.color.estado.sucesso,
  marginBottom: '20px',
  minWidth: '16px',
  '@media': {
    'screen and (min-width: 481px)': {
      marginBottom: '28px',
    },
  },
});

// ── Painel do wizard ──────────────────────────────────────────────────────────

export const painelWizard = style({
  backgroundColor: tokens.color.fundo,
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: tokens.radius.lg,
  boxShadow: `0 2px 8px color-mix(in srgb, ${tokens.color.secundaria} 6%, transparent)`,
  overflow: 'hidden',
});

export const etapaConteudo = style({
  display: 'grid',
  gap: tokens.spacing.xl,
  padding: `${tokens.spacing.lg} ${tokens.spacing.md}`,
  '@media': {
    'screen and (min-width: 480px)': {
      padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
    },
    'screen and (min-width: 640px)': {
      padding: tokens.spacing.xl,
    },
  },
});

export const etapaCabecalho = style({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: tokens.spacing.xs,
});

export const etapaTitulo = style({
  margin: 0,
  fontFamily: tokens.font.family.titulo,
  fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
  color: tokens.color.texto.primario,
  lineHeight: 1.2,
});

export const etapaDescricao = style({
  margin: 0,
  color: tokens.color.texto.secundario,
  fontSize: tokens.font.size.sm,
  lineHeight: 1.6,
});

// ── Cards de categoria / serviço ──────────────────────────────────────────────

export const gradeCards = style({
  display: 'grid',
  gap: tokens.spacing.md,
  '@media': {
    'screen and (min-width: 500px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))',
    },
  },
});

const cardBase = {
  display: 'grid',
  gap: tokens.spacing.sm,
  padding: `${tokens.spacing.lg} ${tokens.spacing.lg}`,
  borderRadius: tokens.radius.lg,
  textAlign: 'left' as const,
  cursor: 'pointer',
  fontFamily: tokens.font.family.corpo,
  transition: `border-color ${tokens.motion.fast} ease, box-shadow ${tokens.motion.fast} ease, transform ${tokens.motion.fast} ease`,
  border: `2px solid ${tokens.color.neutral[200]}`,
  backgroundColor: tokens.color.fundo,
} as const;

export const card = style({
  ...cardBase,
  selectors: {
    '&:hover': {
      borderColor: tokens.color.primaria,
      boxShadow: `0 4px 16px color-mix(in srgb, ${tokens.color.primaria} 12%, transparent)`,
      transform: 'translateY(-2px)',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const cardSelecionado = style({
  ...cardBase,
  borderColor: tokens.color.primaria,
  backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 5%, ${tokens.color.fundo})`,
  boxShadow: `0 4px 16px color-mix(in srgb, ${tokens.color.primaria} 16%, transparent)`,
});

export const cardTitulo = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.lg,
  color: tokens.color.texto.primario,
  lineHeight: 1.2,
});

export const cardDescricao = style({
  fontSize: tokens.font.size.sm,
  color: tokens.color.texto.secundario,
  lineHeight: 1.5,
});

export const cardInfo = style({
  fontSize: tokens.font.size.sm,
  color: tokens.color.secundaria,
  fontWeight: tokens.font.weight.semibold,
});

export const cardRodape = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens.spacing.sm,
  paddingTop: tokens.spacing.xs,
  borderTop: `1px solid ${tokens.color.neutral[100]}`,
  marginTop: tokens.spacing.xs,
});

export const cardPreco = style({
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.semibold,
  color: tokens.color.texto.primario,
});

export const cardDuracao = style({
  fontSize: tokens.font.size.sm,
  color: tokens.color.texto.secundario,
});

// ── Navegação do wizard ───────────────────────────────────────────────────────

export const navegacaoWizard = style({
  display: 'flex',
  gap: tokens.spacing.md,
  justifyContent: 'flex-end',
  paddingTop: tokens.spacing.md,
  borderTop: `1px solid ${tokens.color.neutral[100]}`,
  '@media': {
    'screen and (max-width: 479px)': {
      flexDirection: 'column',
    },
  },
});

export const botaoVoltar = style({
  padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
  minHeight: '44px',
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: tokens.radius.md,
  backgroundColor: 'transparent',
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.semibold,
  cursor: 'pointer',
  transition: `border-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover:not(:disabled)': {
      borderColor: tokens.color.texto.secundario,
      color: tokens.color.texto.primario,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  '@media': {
    'screen and (max-width: 479px)': {
      width: '100%',
      justifyContent: 'center',
      order: 1,
    },
  },
});

// ── Painel de seleção de data/horário ─────────────────────────────────────────

export const labelTimezone = style({
  fontSize: tokens.font.size.sm,
  color: tokens.color.texto.secundario,
});

export const layoutCalendarioSlots = style({
  display: 'grid',
  gap: tokens.spacing.lg,
  '@media': {
    'screen and (min-width: 640px)': {
      gridTemplateColumns: 'auto 1fr',
      alignItems: 'start',
    },
  },
});

export const wrapCalendario = style({
  minWidth: '220px',
});

export const wrapSlots = style({
  display: 'grid',
  gap: tokens.spacing.md,
  alignContent: 'start',
});

export const labelDiaDisponibilidade = style({
  margin: 0,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  color: tokens.color.texto.primario,
  textTransform: 'capitalize',
});

// ── Estados ───────────────────────────────────────────────────────────────────

export const estadoIndisponivel = style({
  display: 'grid',
  gap: tokens.spacing.md,
  paddingTop: tokens.spacing.sm,
});

export const textoIndisponivel = style({
  fontSize: tokens.font.size.sm,
  color: tokens.color.texto.secundario,
});

export const botaoProximaDisponibilidade = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
  minHeight: '44px',
  borderRadius: tokens.radius.md,
  backgroundColor: tokens.color.primaria,
  color: tokens.color.texto.invertido,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  border: 'none',
  cursor: 'pointer',
  transition: `background-color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': { backgroundColor: tokens.color.brand.primaryHover },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const estadoVazio = style({
  padding: tokens.spacing.md,
  color: tokens.color.texto.secundario,
  fontSize: tokens.font.size.sm,
  lineHeight: 1.6,
});

// ── Auxiliares genéricos ──────────────────────────────────────────────────────

export const caixaAuxiliar = style({
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  borderRadius: tokens.radius.md,
  backgroundColor: `color-mix(in srgb, ${tokens.color.neutral[50]} 78%, ${tokens.color.fundo})`,
  border: `1px dashed ${tokens.color.neutral[200]}`,
  color: tokens.color.texto.secundario,
  fontSize: tokens.font.size.sm,
  lineHeight: 1.6,
});

export const erroMensagem = style({
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  borderRadius: tokens.radius.md,
  backgroundColor: `color-mix(in srgb, ${tokens.color.estado.erro} 10%, ${tokens.color.fundo})`,
  color: tokens.color.estado.erro,
  border: `1px solid color-mix(in srgb, ${tokens.color.estado.erro} 24%, transparent)`,
  fontSize: tokens.font.size.sm,
});

// ── Formulário (etapa 4) ──────────────────────────────────────────────────────

export const formularioCheckout = style({
  display: 'grid',
  gap: tokens.spacing.lg,
});

export const gradeCampos = style({
  display: 'grid',
  gap: tokens.spacing.lg,
  '@media': {
    'screen and (min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
});

export const grupoCampo = style({
  display: 'grid',
  gap: tokens.spacing.xs,
});

export const labelCampo = style({
  color: tokens.color.secundaria,
  fontWeight: tokens.font.weight.semibold,
  fontSize: tokens.font.size.sm,
});

export const inputCampo = style({
  width: '100%',
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  borderRadius: tokens.radius.md,
  border: `1px solid ${tokens.color.neutral[200]}`,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  boxSizing: 'border-box',
  selectors: {
    '&::placeholder': {
      color: `color-mix(in srgb, ${tokens.color.texto.secundario} 60%, transparent)`,
    },
    '&:focus': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
      borderColor: tokens.color.acento.dourado,
    },
    '&[aria-invalid="true"]': {
      borderColor: tokens.color.estado.erro,
    },
  },
});

export const ajudaCampo = style({
  color: tokens.color.texto.secundario,
  fontSize: tokens.font.size.sm,
  lineHeight: 1.5,
});

export const erroCampo = style({
  color: tokens.color.estado.erro,
  fontSize: tokens.font.size.sm,
});

export const gradeModalidades = style({
  display: 'grid',
  gap: tokens.spacing.sm,
  '@media': {
    'screen and (min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
});

export const opcaoModalidade = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  borderRadius: tokens.radius.md,
  border: `1px solid ${tokens.color.neutral[200]}`,
  backgroundColor: tokens.color.neutral[50],
  color: tokens.color.texto.primario,
  cursor: 'pointer',
  fontSize: tokens.font.size.sm,
});

export const inputModalidade = style({
  width: '16px',
  height: '16px',
  accentColor: tokens.color.primaria,
  flexShrink: 0,
});

// ── CTA botões ────────────────────────────────────────────────────────────────

export const ctaButton = style({
  padding: `${tokens.spacing.sm} ${tokens.spacing.xl}`,
  minHeight: '44px',
  border: 'none',
  borderRadius: tokens.radius.md,
  backgroundColor: tokens.color.primaria,
  color: tokens.color.texto.invertido,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.semibold,
  cursor: 'pointer',
  transition: `background-color ${tokens.motion.fast} ease, transform ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: tokens.color.brand.primaryHover,
      transform: 'translateY(-1px)',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  '@media': {
    'screen and (max-width: 479px)': {
      width: '100%',
    },
  },
});

export const ctaButtonDesabilitado = style({
  padding: `${tokens.spacing.sm} ${tokens.spacing.xl}`,
  minHeight: '44px',
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: tokens.radius.md,
  backgroundColor: tokens.color.neutral[50],
  color: `color-mix(in srgb, ${tokens.color.texto.secundario} 60%, transparent)`,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.semibold,
  cursor: 'not-allowed',
  '@media': {
    'screen and (max-width: 479px)': {
      width: '100%',
    },
  },
});

// ── Painel de resumo (etapa 5) ────────────────────────────────────────────────

export const painelResumo = style({
  display: 'grid',
  gap: tokens.spacing.lg,
  '@media': {
    'screen and (min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
});

export const grupoResumo = style({
  display: 'grid',
  gap: tokens.spacing.md,
  padding: tokens.spacing.lg,
  backgroundColor: tokens.color.neutral[50],
  borderRadius: tokens.radius.lg,
  border: `1px solid ${tokens.color.neutral[200]}`,
  alignContent: 'start',
});

export const tituloGrupoResumo = style({
  margin: 0,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  color: tokens.color.secundaria,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  paddingBottom: tokens.spacing.sm,
  borderBottom: `1px solid ${tokens.color.neutral[200]}`,
});

export const listaResumo = style({
  display: 'grid',
  gap: tokens.spacing.sm,
  margin: 0,
  padding: 0,
});

export const itemResumo = style({
  display: 'grid',
  gap: '2px',
});

export const rotuloResumo = style({
  fontSize: tokens.font.size.sm,
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
});

export const valorResumo = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  color: tokens.color.texto.primario,
  margin: 0,
  lineHeight: 1.4,
});
