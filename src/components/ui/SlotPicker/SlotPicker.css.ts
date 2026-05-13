import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

export const containerGrelha = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
  gap: tokens.spacing.sm,
  width: '100%',
});

const botaoBase = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  borderRadius: tokens.radius.md,
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  minHeight: '44px',
  cursor: 'pointer',
  transition: `transform ${tokens.motion.fast} ease, box-shadow ${tokens.motion.fast} ease, border-color ${tokens.motion.fast} ease`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  outline: 'none',

  selectors: {
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    '&:hover:not(:disabled)': {
      transform: 'translateY(-2px)',
      boxShadow: `0 14px 24px color-mix(in srgb, ${tokens.color.secundaria} 12%, transparent)`,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const estilosBotaoSlot = styleVariants({
  livre: [botaoBase, {
    backgroundColor: tokens.color.fundo,
    color: tokens.color.primaria,
    border: `1px solid ${tokens.color.primaria}`,
  }],
  selecionado: [botaoBase, {
    backgroundColor: tokens.color.primaria,
    color: tokens.color.texto.invertido,
    border: `1px solid ${tokens.color.primaria}`,
    boxShadow: `0 16px 28px color-mix(in srgb, ${tokens.color.primaria} 18%, transparent)`,
  }],
});

export const textoModalidade = style({
  fontSize: tokens.font.size.sm,
  opacity: 0.8,
  marginTop: tokens.spacing.xs,
  textAlign: 'center',
});

export const mensagemVazio = style({
  fontFamily: tokens.font.family.corpo,
  color: tokens.color.texto.secundario,
  textAlign: 'center',
  padding: tokens.spacing.lg,
});
