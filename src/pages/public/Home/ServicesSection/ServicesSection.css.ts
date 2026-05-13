import { style } from '@vanilla-extract/css';
import { tokens } from '../../../../design-system/tokens.css';
import { svgEspadasCruzadas } from '../../../../assets/svgs/marcasDaguaSVG';

export const servicesSectionContainer = style({
  position: 'relative',
  /*
   * overflow: hidden — essencial para que o background cream (#FEFCF8) preencha
   * todo o box da seção até a borda inferior, evitando que o homeContainer branco
   * apareça entre ServicesSection e a DivisorOnda abaixo.
   * As Espadas Cruzadas (::before) sangram apenas para fora da borda esquerda,
   * sendo clipadas aqui — o resultado visual é intencional: saem da parede.
   */
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  /*
   * paddingTop reduzido: a onda SVG já cria espaçamento visual no topo.
   * O padding real da seção começa após a onda.
   */
  padding: `${tokens.spacing.xl} ${tokens.spacing.lg} 48px`,
  /*
   * Fundo em camadas — as dunas dos Lençóis Maranhenses:
   * 1. Halo dourado suave no canto superior direito (sol sobre as dunas)
   * 2. Sombra azul-noturna no canto inferior esquerdo (transição para o mar)
   * 3. Gradiente base: branco-areia levemente quente
   * 4. Pontilhado dourado translúcido — grãos de areia sob a luz
   */
  backgroundColor: '#FEFCF8',
  backgroundImage: [
    `radial-gradient(ellipse 55% 50% at 92% 8%, rgba(201, 168, 76, 0.10) 0%, transparent 60%)`,
    `radial-gradient(ellipse 45% 40% at 8% 95%, rgba(13, 31, 60, 0.06) 0%, transparent 55%)`,
    `linear-gradient(175deg, #FFFFFF 0%, #FEFCF8 50%, #FDF9F2 100%)`,
    `radial-gradient(circle, rgba(201, 168, 76, 0.12) 1px, transparent 1px)`,
  ].join(', '),
  backgroundSize: ['auto', 'auto', 'auto', '28px 28px'].join(', '),

  /*
   * ESPADAS CRUZADAS — os instrumentos do guerreiro espiritual.
   * Posicionamento: canto inferior-esquerdo, sangrando para fora:
   *  • bottom: -12% → as pontas (pomos) mergulham na onda que leva ao CTA
   *  • left: -8%    → a guarda esquerda some além da borda da tela
   * Efeito: as espadas parecem cravadas no chão de areia (dunas) abaixo da seção,
   * como relíquias enterradas nos Lençóis Maranhenses aguardando o Rei.
   * Cor: azul-marinho (#0D1F3C) sobre o fundo areia — contraste sutil e misterioso.
   */
  '::before': {
    content: '""',
    position: 'absolute',
    bottom: '-12%',
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
      padding: `48px ${tokens.spacing.xl} 56px`,
    },
  },
});

export const sectionHeader = style({
  textAlign: 'center',
  marginBottom: tokens.spacing.xl,

  '@media': {
    'screen and (min-width: 768px)': {
      marginBottom: '3rem',
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
  gap: tokens.spacing.lg,
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%',

  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: tokens.spacing.xl,
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
