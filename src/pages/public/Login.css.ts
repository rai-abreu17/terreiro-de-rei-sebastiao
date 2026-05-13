import { style } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

export const pagina = style({
  minHeight: '100vh',
  display: 'grid',
  placeItems: 'center',
  padding: tokens.spacing.xl,
  background: `linear-gradient(135deg, ${tokens.color.secundaria} 0%, ${tokens.color.primaria} 100%)`,
});

export const cartao = style({
  width: '100%',
  maxWidth: 440,
  display: 'grid',
  gap: tokens.spacing.lg,
  padding: tokens.spacing.xl,
  borderRadius: '20px',
  backgroundColor: tokens.color.fundo,
  boxShadow: `0 20px 50px color-mix(in srgb, ${tokens.color.secundaria} 28%, transparent)`,
});

export const cabecalho = style({
  display: 'grid',
  gap: tokens.spacing.sm,
});

export const etiqueta = style({
  display: 'inline-flex',
  width: 'fit-content',
  alignItems: 'center',
  gap: tokens.spacing.xs,
  padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
  borderRadius: 999,
  color: tokens.color.secundaria,
  backgroundColor: `color-mix(in srgb, ${tokens.color.acento.dourado} 16%, ${tokens.color.fundo})`,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: Number(tokens.font.weight.semibold),
});

export const titulo = style({
  margin: 0,
  color: tokens.color.primaria,
  fontFamily: tokens.font.family.titulo,
  fontSize: '2.5rem',
  lineHeight: 1,
});

export const descricao = style({
  margin: 0,
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  lineHeight: 1.6,
});

export const formulario = style({
  display: 'grid',
  gap: tokens.spacing.md,
});

export const grupoCampo = style({
  display: 'grid',
  gap: tokens.spacing.xs,
});

export const label = style({
  color: tokens.color.texto.primario,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: Number(tokens.font.weight.semibold),
});

export const input = style({
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: '14px',
  padding: `${tokens.spacing.md} ${tokens.spacing.md}`,
  color: tokens.color.texto.primario,
  backgroundColor: tokens.color.fundo,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  transition: `border-color ${tokens.motion.fast} ease, box-shadow ${tokens.motion.fast} ease`,
  selectors: {
    '&:focus-visible': {
      outline: 'none',
      borderColor: tokens.color.acento.dourado,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${tokens.color.acento.dourado} 22%, transparent)`,
    },
    '&[aria-invalid="true"]': {
      borderColor: tokens.color.estado.erro,
    },
  },
});

export const erroCampo = style({
  color: tokens.color.estado.erro,
  fontFamily: tokens.font.family.corpo,
  fontSize: '0.75rem',
});

export const erroPainel = style({
  padding: tokens.spacing.md,
  borderRadius: '14px',
  color: tokens.color.estado.erro,
  backgroundColor: `color-mix(in srgb, ${tokens.color.estado.erro} 10%, ${tokens.color.fundo})`,
  border: `1px solid color-mix(in srgb, ${tokens.color.estado.erro} 22%, ${tokens.color.fundo})`,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
});

export const botaoSubmit = style({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 52,
  border: 'none',
  borderRadius: '14px',
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  color: tokens.color.texto.invertido,
  backgroundColor: tokens.color.primaria,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  fontWeight: Number(tokens.font.weight.semibold),
  cursor: 'pointer',
  transition: `background-color ${tokens.motion.fast} ease, opacity ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: tokens.color.brand.primaryHover,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: 2,
    },
    '&:disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
});