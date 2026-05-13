import { style } from '@vanilla-extract/css';
import { tokens } from '../../../../design-system/tokens.css';
import { svgCoroaReal } from '../../../../assets/svgs/marcasDaguaSVG';

export const aboutContainer = style({
  position: 'relative',
  /*
   * overflow: visible — necessário para a Coroa Real (::after) sangrar pelo topo
   * e pela direita. O homeContainer previne scroll horizontal. O sangramento
   * superior faz a coroa "descer" visivelmente do manto carmesim acima.
   */
  overflow: 'visible',
  display: 'flex',
  flexDirection: 'column',
  padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
  /*
   * Branco com textura de luz:
   * 1. Halo dourado vindo da direita — como a luz do entardecer sobre os Lençóis
   * 2. Suave névoa azul-marinha no canto oposto — a sombra do oceano ao longe
   * 3. Gradiente base: branco puro a areia-clara
   */
  backgroundColor: tokens.color.fundo,
  backgroundImage: [
    `radial-gradient(ellipse 50% 70% at 105% 50%, rgba(201, 168, 76, 0.09) 0%, transparent 55%)`,
    `radial-gradient(ellipse 40% 50% at -5% 50%, rgba(13, 31, 60, 0.05) 0%, transparent 55%)`,
    `linear-gradient(to bottom, #FFFFFF 0%, #FDFAF5 100%)`,
  ].join(', '),

  /*
   * COROA REAL — o brasão da Casa e a identidade do Rei Sebastião.
   * Posicionamento: canto superior-direito, sangrando para fora:
   *  • top: -8%    → a parte superior da coroa (pontas) emerge de cima,
   *                   como se viesse do manto carmesim dos Depoimentos acima
   *  • right: -5%  → a extremidade direita da faixa some além da borda
   * Efeito: a Coroa "desce" do mundo dos encantados para abençoar a seção
   * que conta a história da Casa — como a realeza que paira sobre o terreiro.
   * Cor: vermelho-vinho (#6B1A1A) sobre branco — marca sutil da Família do Lençol.
   */
  '::after': {
    content: '""',
    position: 'absolute',
    top: '-8%',
    right: '-5%',
    width: 'clamp(300px, 40vw, 580px)',
    height: 'clamp(300px, 40vw, 580px)',
    backgroundImage: svgCoroaReal(tokens.color.primaria),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    opacity: 0.07,
    pointerEvents: 'none',
    zIndex: 0,
  },

  '@media': {
    'screen and (min-width: 768px)': {
      flexDirection: 'row',
      alignItems: 'center',
      /*
       * paddingTop reduzido de 80px para 40px: o DivisorOnda acima já fornece
       * ~40px de separação visual. Manter 80px somava ~120px de branco antes
       * do conteúdo, criando o espaçamento excessivo reportado.
       */
      padding: `40px ${tokens.spacing.xl} 80px`,
      gap: '3rem',
    },
  },
});

export const imageColumn = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  marginBottom: tokens.spacing.xl,

  '@media': {
    'screen and (min-width: 768px)': {
      marginBottom: 0,
    },
  },
});

export const textColumn = style({
  flex: 1,
  display: 'grid',
  gap: tokens.spacing.md,
});

export const sectionTitle = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.h2,
  color: tokens.color.primaria,
  margin: 0,

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
  fontWeight: tokens.font.weight.semibold,
  margin: 0,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.xl,
    },
  },
});

export const sectionParagraph = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  color: tokens.color.texto.secundario,
  lineHeight: 1.75,
  margin: 0,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.lg,
    },
  },
});

// ── Frame da foto ─────────────────────────────────────────────────────────────

export const fotoFrame = style({
  position: 'relative',
  width: '100%',
  maxWidth: '440px',

  // Cantos decorativos dourados
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-10px',
      left: '-10px',
      width: '60px',
      height: '60px',
      borderTop: `3px solid ${tokens.color.acento.dourado}`,
      borderLeft: `3px solid ${tokens.color.acento.dourado}`,
      borderRadius: `${tokens.radius.sm} 0 0 0`,
      zIndex: 1,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-10px',
      right: '-10px',
      width: '60px',
      height: '60px',
      borderBottom: `3px solid ${tokens.color.acento.dourado}`,
      borderRight: `3px solid ${tokens.color.acento.dourado}`,
      borderRadius: `0 0 ${tokens.radius.sm} 0`,
      zIndex: 1,
    },
  },
});

export const fotoPlaceholder = style({
  width: '100%',
  aspectRatio: '4 / 5',
  borderRadius: '16px',
  backgroundColor: tokens.color.neutral[200],
  backgroundImage: `linear-gradient(135deg, ${tokens.color.neutral[50]} 0%, ${tokens.color.neutral[200]} 100%)`,
  boxShadow: `0 24px 60px color-mix(in srgb, ${tokens.color.secundaria} 18%, transparent)`,
  display: 'block',
});
