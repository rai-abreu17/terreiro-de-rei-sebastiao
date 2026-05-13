import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

export const container = style({
  display: 'grid',
  gap: tokens.spacing.md,
  userSelect: 'none',
});

export const cabecalho = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `0 ${tokens.spacing.xs}`,
});

export const mesAno = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  color: tokens.color.texto.primario,
  fontWeight: tokens.font.weight.semibold,
});

export const botaoNav = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '44px',
  height: '44px',
  borderRadius: tokens.radius.md,
  border: `1px solid ${tokens.color.neutral[200]}`,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  cursor: 'pointer',
  flexShrink: 0,
  transition: `border-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,

  selectors: {
    '&:hover:not(:disabled)': {
      borderColor: tokens.color.primaria,
      color: tokens.color.primaria,
    },
    '&:disabled': {
      opacity: 0.3,
      cursor: 'not-allowed',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const gradeCalendario = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const linhaCabecalho = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
  marginBottom: tokens.spacing.xs,
});

export const linhaSemana = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
});

export const rotuloDia = style({
  textAlign: 'center',
  fontSize: '0.75rem',
  color: tokens.color.texto.secundario,
  padding: `${tokens.spacing.xs} 0`,
  fontFamily: tokens.font.family.corpo,
});

export const celulaVazia = style({
  aspectRatio: '1',
});

const baseCelula = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  aspectRatio: '1',
  maxWidth: '38px',
  margin: '0 auto',
  borderRadius: '50%',
  fontSize: tokens.font.size.sm,
  fontFamily: tokens.font.family.corpo,
  border: 'none',
  cursor: 'pointer',
  transition: `background-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,
  padding: 0,
  lineHeight: 1,
});

export const celulaDia = styleVariants({
  padrao: [
    baseCelula,
    {
      backgroundColor: 'transparent',
      color: tokens.color.texto.primario,
      selectors: {
        '&:hover': {
          backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 8%, transparent)`,
          color: tokens.color.primaria,
        },
        '&:focus-visible': {
          outline: `2px solid ${tokens.color.acento.dourado}`,
          outlineOffset: '1px',
        },
      },
    },
  ],
  hoje: [
    baseCelula,
    {
      backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 12%, ${tokens.color.fundo})`,
      color: tokens.color.primaria,
      fontWeight: tokens.font.weight.semibold,
      selectors: {
        '&:hover': {
          backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 22%, ${tokens.color.fundo})`,
        },
        '&:focus-visible': {
          outline: `2px solid ${tokens.color.acento.dourado}`,
          outlineOffset: '1px',
        },
      },
    },
  ],
  selecionado: [
    baseCelula,
    {
      backgroundColor: tokens.color.primaria,
      color: tokens.color.texto.invertido,
      fontWeight: tokens.font.weight.bold,
      selectors: {
        '&:hover': {
          backgroundColor: tokens.color.brand.primaryHover,
        },
        '&:focus-visible': {
          outline: `2px solid ${tokens.color.acento.dourado}`,
          outlineOffset: '1px',
        },
      },
    },
  ],
  desabilitado: [
    baseCelula,
    {
      backgroundColor: 'transparent',
      color: `color-mix(in srgb, ${tokens.color.texto.secundario} 35%, transparent)`,
      cursor: 'not-allowed',
    },
  ],
});

export const ponto = style({
  position: 'absolute',
  bottom: '3px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '4px',
  height: '4px',
  borderRadius: '50%',
  backgroundColor: tokens.color.primaria,
  pointerEvents: 'none',
});
