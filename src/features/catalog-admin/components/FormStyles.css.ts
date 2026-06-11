import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '@/design-system/tokens.css';

export const container = style({
  maxWidth: '640px',
  margin: '0 auto',
  padding: '24px 16px',
  backgroundColor: tokens.color.fundo,
  borderRadius: '12px',
  boxShadow: `0 4px 12px color-mix(in srgb, ${tokens.color.secundaria} 10%, transparent)`,
});

export const serviceWizardContainer = style({
  width: 'min(100%, 1080px)',
  margin: '0 auto',
  padding: '24px',
  backgroundColor: tokens.color.fundo,
  borderRadius: tokens.radius.lg,
  boxShadow: `0 16px 40px color-mix(in srgb, ${tokens.color.secundaria} 12%, transparent)`,

  '@media': {
    'screen and (max-width: 768px)': {
      padding: '16px',
    },
  },
});

export const wizardForm = style({
  display: 'grid',
  gridTemplateColumns: '300px minmax(0, 1fr)',
  gap: '28px',
  alignItems: 'start',

  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '20px',
    },
  },
});

export const wizardAside = style({
  display: 'grid',
  gap: '20px',
  paddingRight: '24px',
  borderRight: `1px solid ${tokens.color.neutral[200]}`,

  '@media': {
    'screen and (max-width: 768px)': {
      paddingRight: 0,
      paddingBottom: '20px',
      borderRight: 'none',
      borderBottom: `1px solid ${tokens.color.neutral[200]}`,
    },
  },
});

export const wizardIntro = style({
  display: 'grid',
  gap: '6px',
});

export const eyebrow = style({
  color: tokens.color.acento.dourado,
  fontFamily: tokens.font.family.corpo,
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: 0,
  textTransform: 'uppercase',
});

export const wizardTitle = style({
  margin: 0,
  color: tokens.color.primaria,
  fontFamily: tokens.font.family.titulo,
  fontSize: '30px',
  lineHeight: 1,
});

export const wizardDescription = style({
  margin: 0,
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
  fontSize: '14px',
  lineHeight: 1.5,
});

export const stepList = style({
  display: 'grid',
  gap: '10px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

const stepButtonBase = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '32px minmax(0, 1fr)',
  gap: '10px',
  alignItems: 'center',
  padding: '12px',
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: tokens.radius.lg,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.secundario,
  cursor: 'pointer',
  textAlign: 'left',
  transition: `border-color ${tokens.motion.fast} ease, background-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease`,

  selectors: {
    '&:disabled': {
      cursor: 'default',
      opacity: 0.72,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },
});

export const stepButton = styleVariants({
  ativa: [stepButtonBase, {
    borderColor: tokens.color.primaria,
    backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 6%, ${tokens.color.fundo})`,
    color: tokens.color.primaria,
  }],
  concluida: [stepButtonBase, {
    borderColor: `color-mix(in srgb, ${tokens.color.acento.dourado} 58%, ${tokens.color.neutral[200]})`,
    backgroundColor: `color-mix(in srgb, ${tokens.color.acento.dourado} 10%, ${tokens.color.fundo})`,
    color: tokens.color.secundaria,
  }],
  pendente: [stepButtonBase, {
    selectors: {
      '&:not(:disabled):hover': {
        borderColor: tokens.color.acento.dourado,
      },
    },
  }],
  erro: [stepButtonBase, {
    borderColor: tokens.color.estado.erro,
    backgroundColor: `color-mix(in srgb, ${tokens.color.estado.erro} 8%, ${tokens.color.fundo})`,
    color: tokens.color.estado.erro,
  }],
});

export const stepMarker = style({
  width: '32px',
  height: '32px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '999px',
  backgroundColor: 'currentColor',
  color: tokens.color.texto.invertido,
  fontFamily: tokens.font.family.corpo,
  fontSize: '13px',
  fontWeight: 700,
});

export const stepText = style({
  minWidth: 0,
  display: 'grid',
  gap: '2px',
  fontFamily: tokens.font.family.corpo,
});

globalStyle(`${stepText} strong`, {
  color: 'currentColor',
  fontSize: '14px',
  lineHeight: 1.2,
});

globalStyle(`${stepText} small`, {
  color: tokens.color.texto.secundario,
  fontSize: '12px',
  lineHeight: 1.35,
});

export const quickSummary = style({
  display: 'grid',
  gap: '4px',
  paddingTop: '16px',
  borderTop: `1px solid ${tokens.color.neutral[200]}`,
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
  fontSize: '13px',
  lineHeight: 1.4,
});

globalStyle(`${quickSummary} strong`, {
  color: tokens.color.texto.primario,
  fontSize: '15px',
});

export const summaryEyebrow = style({
  color: tokens.color.secundaria,
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: 0,
});

export const wizardMain = style({
  minWidth: 0,
  display: 'grid',
  gap: '22px',
});

export const stepHeader = style({
  display: 'grid',
  gap: '6px',
});

export const stepCounter = style({
  color: tokens.color.acento.dourado,
  fontFamily: tokens.font.family.corpo,
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: 0,
});

export const stepTitle = style({
  margin: 0,
  color: tokens.color.primaria,
  fontFamily: tokens.font.family.titulo,
  fontSize: '28px',
  lineHeight: 1,
});

export const stepDescription = style({
  margin: 0,
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
  fontSize: '14px',
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

export const fieldGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '18px',

  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const fieldGroupFull = style([fieldGroup, {
  gridColumn: '1 / -1',
}]);

export const label = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: '14px',
  fontWeight: 500,
  color: tokens.color.texto.primario,
});

export const optionalLabel = style({
  display: 'inline-flex',
  alignItems: 'center',
  marginLeft: '6px',
  padding: '2px 6px',
  borderRadius: '999px',
  backgroundColor: tokens.color.neutral[50],
  color: tokens.color.texto.secundario,
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
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

export const textareaCurta = style([textarea, {
  minHeight: '92px',
}]);

export const textareaLonga = style([textarea, {
  minHeight: '180px',
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

export const inlineFieldset = style({
  border: 'none',
  padding: 0,
  margin: 0,
  display: 'grid',
  gap: '8px',
});

export const inlineFieldsetFull = style([inlineFieldset, {
  gridColumn: '1 / -1',
}]);

export const optionGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '10px',

  '@media': {
    'screen and (max-width: 560px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const optionLabel = style({
  position: 'relative',
  minWidth: 0,
});

export const optionInput = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
});

export const optionContent = style({
  minHeight: '58px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '12px 14px',
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: tokens.radius.lg,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.texto.primario,
  fontFamily: tokens.font.family.corpo,
  fontSize: '14px',
  fontWeight: 600,
  textAlign: 'center',
  lineHeight: 1.25,
  transition: `border-color ${tokens.motion.fast} ease, background-color ${tokens.motion.fast} ease, color ${tokens.motion.fast} ease, box-shadow ${tokens.motion.fast} ease`,

  selectors: {
    [`${optionInput}:checked + &`]: {
      borderColor: tokens.color.primaria,
      backgroundColor: tokens.color.primaria,
      color: tokens.color.texto.invertido,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${tokens.color.primaria} 18%, transparent)`,
    },
    [`${optionInput}:focus-visible + &`]: {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
    [`${optionInput}:hover + &`]: {
      borderColor: tokens.color.acento.dourado,
    },
  },
});

export const optionTitle = style({
  minWidth: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});

export const selectedPill = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  flexShrink: 0,
  padding: '4px 8px',
  borderRadius: '999px',
  backgroundColor: tokens.color.fundo,
  color: tokens.color.primaria,
  fontSize: '12px',
  fontWeight: 700,
});

export const reviewPanel = style({
  display: 'grid',
  gap: '18px',
  padding: '20px',
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: tokens.radius.lg,
  backgroundColor: tokens.color.neutral[50],
});

export const reviewHeader = style({
  display: 'grid',
  gridTemplateColumns: '24px minmax(0, 1fr)',
  gap: '10px',
  alignItems: 'start',
  color: tokens.color.primaria,
});

globalStyle(`${reviewHeader} h4`, {
  margin: 0,
  color: tokens.color.primaria,
  fontFamily: tokens.font.family.titulo,
  fontSize: '24px',
  lineHeight: 1,
});

globalStyle(`${reviewHeader} p`, {
  margin: '4px 0 0',
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
  fontSize: '14px',
  lineHeight: 1.45,
});

export const reviewList = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '10px',
  margin: 0,

  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

globalStyle(`${reviewList} > div`, {
  display: 'grid',
  gap: '4px',
  minWidth: 0,
  padding: '12px',
  borderRadius: tokens.radius.md,
  backgroundColor: tokens.color.fundo,
  boxShadow: `0 0 0 1px ${tokens.color.neutral[200]}`,
});

globalStyle(`${reviewList} dt`, {
  color: tokens.color.texto.secundario,
  fontFamily: tokens.font.family.corpo,
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: 0,
});

globalStyle(`${reviewList} dd`, {
  margin: 0,
  color: tokens.color.texto.primario,
  fontFamily: tokens.font.family.corpo,
  fontSize: '14px',
  lineHeight: 1.4,
  overflowWrap: 'anywhere',
});

export const wizardActions = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  paddingTop: '18px',
  borderTop: `1px solid ${tokens.color.neutral[200]}`,

  '@media': {
    'screen and (max-width: 560px)': {
      flexDirection: 'column-reverse',
    },
  },
});

export const primaryButton = style({
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '12px 18px',
  border: 'none',
  borderRadius: tokens.radius.lg,
  backgroundColor: tokens.color.primaria,
  color: tokens.color.texto.invertido,
  fontFamily: tokens.font.family.corpo,
  fontSize: '15px',
  fontWeight: 700,
  cursor: 'pointer',
  transition: `background-color ${tokens.motion.fast} ease, opacity ${tokens.motion.fast} ease`,

  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: tokens.color.brand.primaryHover,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.72,
    },
  },

  '@media': {
    'screen and (max-width: 560px)': {
      width: '100%',
    },
  },
});

export const primaryButtonLoading = style([primaryButton, {
  backgroundColor: tokens.color.brand.primaryHover,
  cursor: 'not-allowed',
  pointerEvents: 'none',
  opacity: 0.85,
}]);

export const secondaryButton = style({
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '12px 16px',
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: tokens.radius.lg,
  backgroundColor: tokens.color.fundo,
  color: tokens.color.secundaria,
  fontFamily: tokens.font.family.corpo,
  fontSize: '15px',
  fontWeight: 700,
  cursor: 'pointer',
  transition: `border-color ${tokens.motion.fast} ease, opacity ${tokens.motion.fast} ease`,

  selectors: {
    '&:hover:not(:disabled)': {
      borderColor: tokens.color.acento.dourado,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.48,
    },
  },

  '@media': {
    'screen and (max-width: 560px)': {
      width: '100%',
    },
  },
});

export const visuallyHidden = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});
