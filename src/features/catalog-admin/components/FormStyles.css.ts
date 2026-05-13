import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '@/design-system/tokens.css';

export const container = style({
  maxWidth: '640px',
  margin: '0 auto',
  padding: '24px 16px',
  backgroundColor: tokens.color.fundo,
  borderRadius: '12px',
  boxShadow: `0 4px 12px color-mix(in srgb, ${tokens.color.secundaria} 10%, transparent)`,
});

export const fieldset = style({
  border: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const legend = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: '24px',
  color: tokens.color.primaria,
  marginBottom: '20px',
  fontWeight: 600,
});

export const fieldGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const label = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: '14px',
  fontWeight: 500,
  color: tokens.color.texto.primario,
});

export const input = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: '16px',
  padding: '10px 16px',
  border: `1px solid ${tokens.color.texto.secundario}`,
  borderRadius: '8px',
  color: tokens.color.texto.primario,
  backgroundColor: tokens.color.fundo,
  transition: 'border-color 0.2s ease-in-out',

  selectors: {
    '&:focus-visible': {
      outline: 'none',
      borderColor: tokens.color.acento.dourado,
      boxShadow: `0 0 0 2px color-mix(in srgb, ${tokens.color.acento.dourado} 20%, transparent)`,
    },
    '&[aria-invalid="true"]': {
      borderColor: tokens.color.estado.erro,
    },
  },
});

export const textarea = style([input, {
  resize: 'vertical',
  minHeight: '100px',
}]);

export const select = style([input, {
  appearance: 'auto',
}]);

export const errorText = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: '12px',
  color: tokens.color.estado.erro,
  marginTop: '2px',
});

export const submitButton = styleVariants({
  ativo: {
    fontFamily: tokens.font.family.corpo,
    fontWeight: 500,
    fontSize: '16px',
    padding: '12px 20px',
    backgroundColor: tokens.color.primaria,
    color: tokens.color.texto.invertido,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.2s ease-in-out',
    selectors: {
      '&:hover': {
        backgroundColor: tokens.color.brand.primaryHover,
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.color.acento.dourado}`,
        outlineOffset: '2px',
      },
    },
  },
  carregando: {
    fontFamily: tokens.font.family.corpo,
    fontWeight: 500,
    fontSize: '16px',
    padding: '12px 20px',
    backgroundColor: tokens.color.brand.primaryHover,
    color: tokens.color.texto.invertido,
    border: 'none',
    borderRadius: '8px',
    cursor: 'not-allowed',
    pointerEvents: 'none',
    opacity: 0.8,
    marginTop: '20px',
  },
});

export const painelErro = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: '14px',
  color: tokens.color.texto.invertido,
  backgroundColor: tokens.color.estado.erro,
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '16px',
  borderLeft: `4px solid ${tokens.color.primaria}`,
});

export const checkboxGroup = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
});

export const checkboxLabel = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontFamily: tokens.font.family.corpo,
  fontSize: '14px',
  color: tokens.color.texto.primario,
  cursor: 'pointer',
});

export const helperText = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: '12px',
  color: tokens.color.texto.secundario,
  marginTop: '2px',
});
