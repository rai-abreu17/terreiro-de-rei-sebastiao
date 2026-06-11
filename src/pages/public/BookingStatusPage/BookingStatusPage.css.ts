import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

const pulseKeyframes = keyframes({
  '0%': {
    transform: 'scale(1)',
    boxShadow: `0 0 0 0 color-mix(in srgb, ${tokens.color.acento.dourado} 28%, transparent)`,
  },
  '70%': {
    transform: 'scale(1.02)',
    boxShadow: `0 0 0 18px transparent`,
  },
  '100%': {
    transform: 'scale(1)',
    boxShadow: '0 0 0 0 transparent',
  },
});

export const container = style({
  minHeight: '100vh',
  display: 'grid',
  placeItems: 'center',
  background: `linear-gradient(180deg, ${tokens.color.neutral[50]} 0%, ${tokens.color.fundo} 48%, ${tokens.color.neutral[50]} 100%)`,
  padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
  fontFamily: tokens.font.family.corpo,
  color: tokens.color.texto.primario,
});

export const cartao = style({
  width: 'min(680px, 100%)',
  backgroundColor: tokens.color.fundo,
  border: `1px solid color-mix(in srgb, ${tokens.color.secundaria} 14%, transparent)`,
  borderRadius: '28px',
  padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
  boxShadow: `0 30px 60px color-mix(in srgb, ${tokens.color.secundaria} 10%, transparent)`,
  display: 'grid',
  gap: tokens.spacing.lg,
  textAlign: 'center',
  '@media': {
    'screen and (min-width: 768px)': {
      padding: `${tokens.spacing.xl} calc(${tokens.spacing.xl} * 1.1)`,
    },
  },
});

export const statusEyebrow = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifySelf: 'center',
  width: 'fit-content',
  padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
  borderRadius: '999px',
  backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 10%, ${tokens.color.fundo})`,
  color: tokens.color.primaria,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
});

export const titulo = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
  color: tokens.color.primaria,
  margin: 0,
});

export const descricao = style({
  margin: 0,
  color: tokens.color.texto.secundario,
  fontSize: tokens.font.size.base,
  lineHeight: 1.7,
});

export const baseIconeStatus = style({
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: tokens.spacing.md,
});

export const iconeStatus = styleVariants({
  pendente: [baseIconeStatus, {
    backgroundColor: `${tokens.color.acento.dourado}20`,
    color: tokens.color.acento.dourado,
    border: `2px solid ${tokens.color.acento.dourado}`,
  }],
  confirmado: [baseIconeStatus, {
    backgroundColor: `${tokens.color.estado.sucesso}20`,
    color: tokens.color.estado.sucesso,
    border: `2px solid ${tokens.color.estado.sucesso}`,
  }],
  expirado: [baseIconeStatus, {
    backgroundColor: `${tokens.color.estado.erro}20`,
    color: tokens.color.estado.erro,
    border: `2px solid ${tokens.color.estado.erro}`,
  }],
});

export const infoLinha = style({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: `${tokens.spacing.xs} ${tokens.spacing.md}`,
  padding: `${tokens.spacing.md} 0`,
  borderBottom: `1px solid color-mix(in srgb, ${tokens.color.secundaria} 10%, transparent)`,
  ':last-child': {
    borderBottom: 'none',
  },
});

export const infoPainel = style({
  display: 'grid',
  gap: tokens.spacing.xs,
  padding: `${tokens.spacing.lg} ${tokens.spacing.lg}`,
  borderRadius: tokens.radius.lg,
  backgroundColor: `color-mix(in srgb, ${tokens.color.neutral[50]} 82%, ${tokens.color.fundo})`,
  textAlign: 'left',
});

export const infoLabel = style({
  fontWeight: 600,
  color: tokens.color.texto.secundario,
});

export const infoValor = style({
  color: tokens.color.texto.primario,
});

export const botaoAcao = style({
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  fontSize: tokens.font.size.base,
  fontFamily: tokens.font.family.corpo,
  fontWeight: 600,
  backgroundColor: tokens.color.primaria,
  color: tokens.color.texto.invertido,
  border: 'none',
  borderRadius: tokens.radius.lg,
  cursor: 'pointer',
  textDecoration: 'none',
  transition: `transform ${tokens.motion.fast} ease, background-color ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover:not(:disabled)': {
      transform: 'translateY(-2px)',
      backgroundColor: tokens.color.brand.primaryHover,
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export const secondaryAction = style({
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  borderRadius: tokens.radius.lg,
  border: `1px solid color-mix(in srgb, ${tokens.color.secundaria} 14%, transparent)`,
  color: tokens.color.secundaria,
  backgroundColor: `color-mix(in srgb, ${tokens.color.fundo} 84%, ${tokens.color.neutral[50]})`,
  textDecoration: 'none',
  fontWeight: tokens.font.weight.semibold,
});

export const actions = style({
  display: 'grid',
  gap: tokens.spacing.md,
});

export const pulseAnimation = style({
  animation: `${pulseKeyframes} 2s infinite`,
});
