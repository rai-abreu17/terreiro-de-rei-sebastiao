import { style, styleVariants, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../../../../design-system/tokens.css';

export const section = style({
  backgroundColor: tokens.color.fundo,
  padding: `80px ${tokens.spacing.xl}`,
  borderTop: `1px solid ${tokens.color.neutral[200]}`,

  '@media': {
    'screen and (max-width: 768px)': {
      padding: `56px ${tokens.spacing.md}`,
    },
  },
});

export const cabecalho = style({
  textAlign: 'center',
  maxWidth: '660px',
  margin: `0 auto ${tokens.spacing.xl}`,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.md,
});

export const sectionEyebrow = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.acento.dourado,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: tokens.font.weight.semibold,
  margin: 0,
});

export const sectionTitle = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.h1,
  color: tokens.color.primaria,
  lineHeight: 1.15,
  margin: 0,
  fontWeight: 400,
});

export const sectionSubtitle = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  color: tokens.color.texto.secundario,
  lineHeight: 1.7,
  margin: 0,
});

/* Grid de 6 cards — 3 colunas no desktop, 2 no tablet, 1 no mobile */
export const grid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: tokens.spacing.lg,
  maxWidth: '1100px',
  margin: '0 auto',

  '@media': {
    'screen and (min-width: 600px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    'screen and (min-width: 992px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

/*
 * Card — estado inicial invisível (opacity:0, offset vertical).
 * O reveal é ativado via IntersectionObserver no grid pai (data-revealed="true").
 * Hover usa apenas box-shadow e border — sem transform — para evitar conflito
 * com a transition de reveal (opacity + translateY usam propriedades distintas
 * após os cards atingirem seu estado final).
 */
export const card = style({
  backgroundColor: tokens.color.fundo,
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: tokens.radius.lg,
  padding: tokens.spacing.lg,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.md,
  boxShadow: `0 2px 12px rgba(0, 0, 0, 0.04)`,

  /* Estado inicial — invisível e deslocado para baixo */
  opacity: 0,
  transform: 'translateY(20px)',

  /*
   * Hover usa apenas box-shadow e border-color (sem transform),
   * portanto a transition de reveal (opacity + transform) não conflita com hover.
   * Após o reveal completar, transform fica em translateY(0) e não é tocado pelo hover.
   */
  transitionProperty: 'opacity, transform, box-shadow, border-color',
  transitionDuration: `${tokens.motion.slow}, ${tokens.motion.slow}, ${tokens.motion.base}, ${tokens.motion.base}`,
  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1), cubic-bezier(0.16, 1, 0.3, 1), ease, ease',

  selectors: {
    '&:hover': {
      boxShadow: `0 8px 28px rgba(0, 0, 0, 0.09)`,
      borderColor: tokens.color.neutral[400],
    },
    '&:focus-within': {
      borderColor: tokens.color.primaria,
      outline: `none`,
    },
  },

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      opacity: 1,
      transform: 'translateY(0)',
      transitionDuration: '0ms',
    },
  },
});

/* Quando o grid recebe data-revealed, todos os cards entram em cena */
globalStyle(`${grid}[data-revealed="true"] > ${card}`, {
  opacity: 1,
  transform: 'translateY(0)',
});

/* Delays escalonados — cada card atrasa 80ms em relação ao anterior */
globalStyle(`${grid}[data-revealed="true"] > ${card}:nth-child(1)`, { transitionDelay: '0ms' });
globalStyle(`${grid}[data-revealed="true"] > ${card}:nth-child(2)`, { transitionDelay: '80ms' });
globalStyle(`${grid}[data-revealed="true"] > ${card}:nth-child(3)`, { transitionDelay: '160ms' });
globalStyle(`${grid}[data-revealed="true"] > ${card}:nth-child(4)`, { transitionDelay: '240ms' });
globalStyle(`${grid}[data-revealed="true"] > ${card}:nth-child(5)`, { transitionDelay: '320ms' });
globalStyle(`${grid}[data-revealed="true"] > ${card}:nth-child(6)`, { transitionDelay: '400ms' });

/* Borda lateral colorida por tema do símbolo */
export const cardBorda = styleVariants({
  neutro: {
    borderLeft: `4px solid ${tokens.color.neutral[200]}`,
  },
  dourado: {
    borderLeft: `4px solid ${tokens.color.acento.dourado}`,
  },
  azul: {
    borderLeft: `4px solid ${tokens.color.secundaria}`,
  },
  vermelho: {
    borderLeft: `4px solid ${tokens.color.primaria}`,
  },
  terra: {
    borderLeft: `4px solid ${tokens.color.neutral[600]}`,
  },
});

export const cardIcone = style({
  width: '52px',
  height: '52px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.radius.md,
  backgroundColor: tokens.color.neutral[50],
  flexShrink: 0,
});

export const cardNome = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.xl,
  color: tokens.color.texto.primario,
  margin: 0,
  fontWeight: 400,
  lineHeight: 1.2,
});

export const cardDescricao = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.texto.secundario,
  lineHeight: 1.65,
  margin: 0,
});
