import { style, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../../../../design-system/tokens.css';

export const faqSectionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
  backgroundColor: tokens.color.fundo,
  
  '@media': {
    'screen and (min-width: 768px)': {
      padding: `80px ${tokens.spacing.xl}`,
    },
  },
});

export const sectionTitle = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: tokens.font.size.h2,
  color: tokens.color.primaria,
  marginBottom: tokens.spacing.xl,
  textAlign: 'center',

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: '2.5rem',
      marginBottom: '3rem',
    },
  },
});

export const accordionRoot = style({
  width: '100%',
  maxWidth: '920px',
  borderRadius: tokens.radius.md,
  border: `1px solid ${tokens.color.neutral[200]}`,
  overflow: 'hidden',
  boxShadow: `0 2px 10px rgba(0, 0, 0, 0.05)`,
});

export const accordionItem = style({
  borderBottom: `1px solid ${tokens.color.neutral[200]}`,
  backgroundColor: tokens.color.fundo,
  ':last-child': {
    borderBottom: 'none',
  },
});

export const accordionHeader = style({
  display: 'flex',
  margin: 0,
});

export const accordionTrigger = style({
  all: 'unset',
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.lg,
  fontWeight: tokens.font.weight.semibold,
  color: tokens.color.secundaria,
  padding: tokens.spacing.lg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  cursor: 'pointer',
  transition: `background-color ${tokens.motion.fast} ease`,

  ':hover': {
    backgroundColor: tokens.color.neutral[50],
  },
  ':focus-visible': {
    outline: `2px solid ${tokens.color.primaria}`,
    outlineOffset: '-2px',
    backgroundColor: tokens.color.neutral[50],
  },

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.xl,
      padding: `${tokens.spacing.lg} ${tokens.spacing.xl}`,
    },
  },
});

export const accordionContent = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: tokens.font.size.base,
  color: tokens.color.texto.secundario,
  backgroundColor: tokens.color.neutral[50],
  overflow: 'hidden',

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: tokens.font.size.lg,
    },
  },
});

export const accordionContentInner = style({
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  paddingTop: 0,
  lineHeight: 1.6,
});

export const chevronIcon = style({
  color: tokens.color.acento.dourado,
  transition: `transform ${tokens.motion.base} cubic-bezier(0.87, 0, 0.13, 1)`,
});

// Estilos globais para a rotação do ícone quando o item está aberto
globalStyle(`${accordionTrigger}[data-state="open"] > .${chevronIcon}`, {
  transform: 'rotate(180deg)',
});
