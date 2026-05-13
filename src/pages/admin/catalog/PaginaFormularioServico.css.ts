import { style } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

export const pagina = style({
  display: 'grid',
  gap: tokens.spacing.lg,
  padding: tokens.spacing.xl,
});

export const cabecalho = style({
  display: 'grid',
  gap: tokens.spacing.xs,
});

export const navegacao = style({
  display: 'inline-flex',
  width: 'fit-content',
  alignItems: 'center',
  gap: tokens.spacing.xs,
  color: tokens.color.secundaria,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: Number(tokens.font.weight.semibold),
  textDecoration: 'none',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: 2,
    },
  },
});

export const titulo = style({
  margin: 0,
  color: tokens.color.primaria,
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.h2,
  lineHeight: 1,
});

export const descricao = style({
  margin: 0,
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
});

export const painelEstado = style({
  padding: tokens.spacing.lg,
  borderRadius: tokens.radius.lg,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.secundario,
  boxShadow: `0 0 0 1px ${tokens.color.neutral[200]}`,
});