import { style } from '@vanilla-extract/css';
import { tokens } from '@theme/tokens.css';

export const section = style({
  position: 'relative',
  overflow: 'hidden',
  /*
   * Gradiente escarlate com canto brilhante — como a câmara do trono iluminada por tochas:
   * 1. Luz dourada difusa vinda do topo central (como o lustre da sala real)
   * 2. Escuridão profunda nas bordas — as paredes de pedra do castelo
   * 3. Gradiente diagonal do vinho ao carmesim quase negro
   */
  backgroundColor: tokens.color.primaria,
  backgroundImage: [
    `radial-gradient(ellipse 60% 45% at 50% -5%, rgba(201, 168, 76, 0.18) 0%, transparent 65%)`,
    `radial-gradient(ellipse 80% 70% at 100% 100%, rgba(0, 0, 0, 0.25) 0%, transparent 55%)`,
    `linear-gradient(148deg, #7D1A1F 0%, ${tokens.color.primaria} 40%, #3E0709 100%)`,
  ].join(', '),
  padding: `80px ${tokens.spacing.xl}`,

  /* Ornamento — halo dourado horizontal no topo: a soleira do salão do trono */
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '160px',
    height: '2px',
    background: `linear-gradient(90deg, transparent, ${tokens.color.acento.dourado}, transparent)`,
    opacity: 0.7,
  },

  '@media': {
    'screen and (max-width: 768px)': {
      padding: `64px ${tokens.spacing.md}`,
    },
  },
});

export const inner = style({
  maxWidth: '720px',
  margin: '0 auto',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: tokens.spacing.lg,

  '@media': {
    'screen and (min-width: 768px)': {
      maxWidth: '880px',
      gap: '2rem',
    },
  },
});

export const eyebrow = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.sm,
  fontWeight: tokens.font.weight.semibold,
  color: tokens.color.acento.dourado,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  margin: 0,
});

export const titulo = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.h1,
  color: tokens.color.texto.invertido,
  fontWeight: tokens.font.weight.bold,
  lineHeight: 1.15,
  margin: 0,
});

export const subtitulo = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.lg,
  color: 'rgba(255, 255, 255, 0.78)',
  lineHeight: 1.65,
  maxWidth: '540px',
  margin: 0,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.xl,
      maxWidth: '640px',
    },
  },
});

export const botoesRow = style({
  display: 'flex',
  gap: tokens.spacing.md,
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginTop: tokens.spacing.sm,

  '@media': {
    'screen and (max-width: 480px)': {
      flexDirection: 'column',
      width: '100%',
      gap: tokens.spacing.sm,
    },
  },
});

const baseBotao = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.spacing.sm,
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  fontWeight: tokens.font.weight.bold,
  letterSpacing: '0.04em',
  textDecoration: 'none',
  borderRadius: tokens.radius.md,
  padding: `14px ${tokens.spacing.xl}`,
  minWidth: '200px',
  transition: `transform ${tokens.motion.fast} ease, opacity ${tokens.motion.fast} ease, box-shadow ${tokens.motion.fast} ease`,
  lineHeight: 1,

  selectors: {
    '&:hover': {
      textDecoration: 'none',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
    '&:focus-visible': {
      outlineOffset: '3px',
    },
  },

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.lg,
      padding: `18px 2.75rem`,
      minWidth: '240px',
    },
    'screen and (max-width: 480px)': {
      width: '100%',
      minWidth: 'unset',
    },
  },
});

/* Botão primário — fundo branco, texto vermelho */
export const btnMaps = style([
  baseBotao,
  {
    backgroundColor: tokens.color.texto.invertido,
    color: tokens.color.primaria,
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.2)',

    selectors: {
      '&:hover': {
        opacity: 0.92,
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.28)',
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.color.texto.invertido}`,
      },
    },
  },
]);

/* Botão secundário — contorno branco, texto branco */
export const btnWhatsApp = style([
  baseBotao,
  {
    backgroundColor: 'transparent',
    color: tokens.color.texto.invertido,
    border: `2px solid rgba(255, 255, 255, 0.55)`,

    selectors: {
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.85)',
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.color.acento.dourado}`,
      },
    },
  },
]);
