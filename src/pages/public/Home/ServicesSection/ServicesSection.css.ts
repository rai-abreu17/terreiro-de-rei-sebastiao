import { style } from '@vanilla-extract/css';
import { tokens } from '../../../../design-system/tokens.css';
import { svgEspadasCruzadas } from '../../../../assets/svgs/marcasDaguaSVG';

export const servicesSectionContainer = style({
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  padding: `${tokens.spacing.sm} ${tokens.spacing.lg} 0`,
  /*
   * Fundo em camadas — as dunas dos Lençóis Maranhenses:
   * 1. Halo dourado suave no canto superior direito (sol sobre as dunas)
   * 2. Sombra azul-noturna no canto inferior esquerdo (transição para o mar)
   * 3. Gradiente base: branco-areia levemente quente
   * 4. Pontilhado dourado translúcido — grãos de areia sob a luz
   */
  /*
   * backgroundColor uniforme (#FEFCF8) sem linear-gradient direcional.
   * O linear-gradient anterior (175deg #FFFFFF → #FDF9F2) fazia o fundo
   * terminar numa cor diferente do corTopo do DivisorOnda (#FEFCF8),
   * criando uma faixa visível entre a seção e a onda.
   * Agora o fundo é uniforme e a transição é invisível.
   */
  backgroundColor: '#FEFCF8',
  backgroundImage: [
    `radial-gradient(ellipse 55% 50% at 92% 8%, rgba(201, 168, 76, 0.10) 0%, transparent 60%)`,
    `radial-gradient(ellipse 45% 40% at 8% 95%, rgba(13, 31, 60, 0.06) 0%, transparent 55%)`,
    `radial-gradient(circle, rgba(201, 168, 76, 0.12) 1px, transparent 1px)`,
  ].join(', '),
  backgroundSize: ['auto', 'auto', '28px 28px'].join(', '),

  /*
   * ESPADAS CRUZADAS — emergem da parede esquerda da seção.
   * Com overflow: hidden, left: '-8%' é clipped na borda esquerda — efeito intencional:
   * as espadas aparecem saindo da lateral, como relíquias nos Lençóis.
   * bottom: 0 mantém as espadas dentro do box da seção, sem sangrar para baixo
   * (o que causava o fundo cream deixar de cobrir o espaço antes da onda).
   */
  '::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '-8%',
    width: 'clamp(280px, 38vw, 560px)',
    height: 'clamp(280px, 38vw, 560px)',
    backgroundImage: svgEspadasCruzadas(tokens.color.secundaria),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    opacity: 0.06,
    pointerEvents: 'none',
    zIndex: 0,
  },

  '@media': {
    'screen and (min-width: 768px)': {
      padding: `${tokens.spacing.md} ${tokens.spacing.xl} 0`,
    },
  },
});

export const sectionHeader = style({
  textAlign: 'center',
  marginBottom: tokens.spacing.lg,

  '@media': {
    'screen and (min-width: 768px)': {
      marginBottom: '2rem',
    },
  },
});

export const sectionTitle = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.h2,
  color: tokens.color.primaria,
  marginBottom: tokens.spacing.md,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: '2.5rem',
    },
  },
});

export const sectionSubtitle = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.lg,
  color: tokens.color.secundaria,
  maxWidth: '600px',
  margin: '0 auto',

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.xl,
      maxWidth: '700px',
    },
  },
});

export const gridContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: tokens.spacing.md, // antes lg
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%',
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: tokens.spacing.lg, // antes xl
    },
  },
});

export const categoriasContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.xl,
  width: '100%',
  '@media': {
    'screen and (min-width: 768px)': {
      gap: '3.5rem',
    },
  },
});

export const categoriaBloco = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.lg,
  width: '100%',
  '@media': {
    'screen and (min-width: 768px)': {
      gap: tokens.spacing.xl,
    },
  },
});

export const categoriaLabel = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  color: tokens.color.acento.dourado,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  textAlign: 'center',
  margin: 0,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.base,
    },
  },
});

export const messageContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: tokens.spacing.xl,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.lg,
  color: tokens.color.texto.secundario,
  textAlign: 'center',
  minHeight: '200px',
});

export const errorText = style({
  color: tokens.color.estado.erro,
});
