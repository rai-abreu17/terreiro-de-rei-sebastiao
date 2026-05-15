import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '../../../../design-system/tokens.css';

export const container = style({
  position: 'relative',
  overflow: 'hidden',
  /*
   * Manto aveludado — do vermelho-vinho da Família do Lençol ao carmesim profundo:
   * 1. Halo dourado difuso no centro superior — a coroa brilhando no manto
   * 2. Sombra negra nas bordas inferiores — profundidade do tecido
   * 3. Gradiente diagonal que varia entre os tons do vermelho-vinho
   */
  backgroundColor: tokens.color.primaria,
  backgroundImage: [
    `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201, 168, 76, 0.14) 0%, transparent 60%)`,
    `radial-gradient(ellipse 60% 60% at 0% 110%, rgba(0, 0, 0, 0.30) 0%, transparent 55%)`,
    `linear-gradient(155deg, ${tokens.color.primaria} 0%, ${tokens.color.primaria} 35%, #4A0A0F 70%, #320608 100%)`,
  ].join(', '),
  padding: `${tokens.spacing.xl} ${tokens.spacing.lg} 48px`,

  '@media': {
    'screen and (min-width: 768px)': {
      /* paddingBottom reduzido: onda abaixo fornece separação visual */
      padding: `80px ${tokens.spacing.xl} 56px`,
    },
  },
});

export const conteudo = style({
  maxWidth: '760px',
  margin: '0 auto',
  display: 'grid',
  gap: tokens.spacing.xl,

  '@media': {
    'screen and (min-width: 768px)': {
      maxWidth: '960px',
      gap: '3rem',
    },
  },
});

export const cabecalho = style({
  textAlign: 'center',
  display: 'grid',
  gap: tokens.spacing.sm,
});

export const titulo = style({
  margin: 0,
  fontFamily: tokens.font.family.titulo,
  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
  color: tokens.color.texto.invertido,
  lineHeight: 1.1,
});

export const subtitulo = style({
  margin: 0,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  color: `color-mix(in srgb, ${tokens.color.texto.invertido} 78%, transparent)`,
  lineHeight: 1.6,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.lg,
    },
  },
});

export const carouselWrap = style({
  display: 'grid',
  gap: tokens.spacing.xl,
});

export const citacao = style({
  margin: 0,
  padding: `${tokens.spacing.xl} ${tokens.spacing.xl}`,

  '@media': {
    'screen and (min-width: 768px)': {
      padding: '2.5rem',
    },
  },

  /*
   * Glassmorphism sobre o manto:
   * — Fundo quase transparente com blur — como um véu sobre o veludo
   * — Borda dourada fina à esquerda — o friso do manto real
   * — Borda geral mais sutil — contorno de vidro fosco
   */
  backgroundColor: 'rgba(255, 255, 255, 0.06)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  borderRadius: '16px',
  border: `1px solid rgba(201, 168, 76, 0.22)`,
  borderLeft: `3px solid rgba(201, 168, 76, 0.60)`,
  boxShadow: `0 4px 24px rgba(0, 0, 0, 0.20), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
  display: 'grid',
  gap: tokens.spacing.lg,
});

export const textoCitacao = style({
  margin: 0,
  fontFamily: tokens.font.family.titulo,
  fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
  color: tokens.color.texto.invertido,
  lineHeight: 1.7,
  fontStyle: 'italic',

  /*
   * Estrela dourada (✦) como ornamento da Encantaria antes de cada depoimento.
   * Evoca a estrela na testa do Touro Encantado — signo iconográfico do Rei.
   */
  '::before': {
    content: '"✦  "',
    color: tokens.color.acento.dourado,
    fontStyle: 'normal',
    fontSize: '0.85em',
    opacity: 0.8,
    letterSpacing: '0.1em',
  },
});

export const autorCitacao = style({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const nomeAutor = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  color: tokens.color.acento.dourado,
  fontStyle: 'normal',
  fontWeight: tokens.font.weight.semibold,
  letterSpacing: '0.04em',

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.base,
    },
  },
});

export const controles = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.spacing.lg,
});

export const botaoNav = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  border: `1px solid color-mix(in srgb, ${tokens.color.texto.invertido} 30%, transparent)`,
  backgroundColor: 'transparent',
  color: tokens.color.texto.invertido,
  cursor: 'pointer',
  transition: `border-color ${tokens.motion.fast} ease, background-color ${tokens.motion.fast} ease`,

  selectors: {
    '&:hover': {
      borderColor: tokens.color.acento.dourado,
      color: tokens.color.acento.dourado,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.acento.dourado}`,
      outlineOffset: '2px',
    },
  },

  '@media': {
    'screen and (min-width: 768px)': {
      width: '46px',
      height: '46px',
    },
  },
});

export const indicadores = style({
  display: 'flex',
  gap: tokens.spacing.sm,
  alignItems: 'center',
});

const baseIndicador = style({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  transition: `background-color ${tokens.motion.fast} ease, transform ${tokens.motion.fast} ease`,
});

export const indicador = styleVariants({
  ativo: [
    baseIndicador,
    {
      backgroundColor: tokens.color.acento.dourado,
      transform: 'scale(1.3)',
    },
  ],
  inativo: [
    baseIndicador,
    {
      backgroundColor: `color-mix(in srgb, ${tokens.color.texto.invertido} 35%, transparent)`,
      selectors: {
        '&:hover': {
          backgroundColor: `color-mix(in srgb, ${tokens.color.texto.invertido} 60%, transparent)`,
        },
      },
    },
  ],
});
