import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '@/design-system/tokens.css';

const shimmer = keyframes({
  '0%': { backgroundPosition: '200% 0' },
  '100%': { backgroundPosition: '-200% 0' },
});

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '32px 16px',
  display: 'grid',
  gap: '32px',
  '@media': {
    'screen and (max-width: 767px)': {
      padding: '20px 16px 24px',
      gap: '24px',
    },
  },
});

export const header = style({
  display: 'grid',
  gap: '8px',
});

export const greeting = style({
  fontFamily: tokens.font.family.titulo,
  color: tokens.color.primaria,
  fontSize: '2rem',
  lineHeight: 1.1,
  margin: 0,
  '@media': {
    'screen and (max-width: 767px)': {
      fontSize: '22px',
    },
  },
});

export const subtitle = style({
  fontFamily: tokens.font.family.corpo,
  color: tokens.color.texto.secundario,
  fontSize: '1rem',
  margin: 0,
  textTransform: 'capitalize',
  '@media': {
    'screen and (max-width: 767px)': {
      fontSize: '13px',
      opacity: 0.85,
    },
  },
});

export const kpiGrid = style({
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  '@media': {
    'screen and (max-width: 767px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: '12px',
    },
  },
});

export const kpiCard = style({
  display: 'grid',
  gap: '8px',
  padding: '20px',
  borderRadius: '12px',
  border: `1px solid ${tokens.color.neutral[200]}`,
  backgroundColor: tokens.color.fundo,
  textAlign: 'left',
  transition: `box-shadow ${tokens.motion.fast} ease, border-color ${tokens.motion.fast} ease, transform ${tokens.motion.fast} ease`,
  '@media': {
    'screen and (max-width: 767px)': {
      padding: '16px',
      borderRadius: '16px',
    },
  },
});

export const kpiCardClickable = style([
  kpiCard,
  {
    cursor: 'pointer',
    selectors: {
      '&:hover': {
        borderColor: tokens.color.primaria,
        boxShadow: '0 6px 18px rgba(13, 31, 60, 0.08)',
        transform: 'translateY(-1px)',
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.color.acento.dourado}`,
        outlineOffset: '2px',
      },
    },
  },
]);

export const kpiTopRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  color: tokens.color.texto.secundario,
});

export const kpiLabel = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: '0.78rem',
  fontWeight: '600',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: tokens.color.texto.secundario,
  '@media': {
    'screen and (max-width: 767px)': {
      fontSize: '11px',
      letterSpacing: '0.1em',
    },
  },
});

export const kpiIcon = styleVariants({
  primary: {
    color: tokens.color.primaria,
  },
  success: {
    color: tokens.color.estado.sucesso,
  },
  warning: {
    color: tokens.color.estado.alerta,
  },
  accent: {
    color: tokens.color.secundaria,
  },
});

export const kpiValue = style({
  fontFamily: tokens.font.family.titulo,
  color: tokens.color.texto.primario,
  fontSize: '2.25rem',
  fontWeight: '600',
  lineHeight: 1,
  '@media': {
    'screen and (max-width: 767px)': {
      fontSize: '32px',
      fontWeight: '700',
    },
  },
});

export const kpiValuePlaceholder = style({
  display: 'inline-block',
  width: '60px',
  height: '36px',
  borderRadius: '6px',
  background: `linear-gradient(90deg, ${tokens.color.neutral[200]} 0%, ${tokens.color.neutral[50]} 50%, ${tokens.color.neutral[200]} 100%)`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} 1.4s linear infinite`,
});

export const kpiHelp = style({
  fontFamily: tokens.font.family.corpo,
  color: tokens.color.texto.secundario,
  fontSize: '0.85rem',
  margin: 0,
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
    },
  },
});

export const section = style({
  display: 'grid',
  gap: '16px',
});

export const sectionHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  flexWrap: 'wrap',
});

export const sectionTitle = style({
  fontFamily: tokens.font.family.titulo,
  color: tokens.color.secundaria,
  fontSize: '1.4rem',
  margin: 0,
  '@media': {
    'screen and (max-width: 767px)': {
      fontSize: '17px',
    },
  },
});

export const sectionLink = style({
  fontFamily: tokens.font.family.corpo,
  color: tokens.color.primaria,
  fontSize: '0.9rem',
  fontWeight: '600',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  ':hover': {
    textDecoration: 'underline',
  },
});

export const card = style({
  border: `1px solid ${tokens.color.neutral[200]}`,
  borderRadius: '12px',
  backgroundColor: tokens.color.fundo,
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 767px)': {
      borderRadius: '16px',
    },
  },
});

export const upcomingList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const upcomingItem = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  alignItems: 'center',
  gap: '16px',
  padding: '16px 20px',
  borderBottom: `1px solid ${tokens.color.neutral[200]}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  '@media': {
    'screen and (max-width: 767px)': {
      gridTemplateColumns: 'auto 1fr',
      gridTemplateRows: 'auto auto',
      rowGap: '6px',
      columnGap: '12px',
      padding: '14px 16px',
    },
  },
});

export const upcomingTime = style({
  fontFamily: tokens.font.family.titulo,
  fontSize: '1.5rem',
  fontWeight: '600',
  color: tokens.color.primaria,
  minWidth: '64px',
  lineHeight: 1,
  '@media': {
    'screen and (max-width: 767px)': {
      fontSize: '22px',
      minWidth: 'auto',
      gridRow: 'span 2',
      alignSelf: 'center',
    },
  },
});

export const upcomingInfo = style({
  display: 'grid',
  gap: '2px',
});

export const upcomingClient = style({
  fontFamily: tokens.font.family.corpo,
  color: tokens.color.texto.primario,
  fontSize: '0.95rem',
  fontWeight: '600',
});

export const upcomingMeta = style({
  fontFamily: tokens.font.family.corpo,
  color: tokens.color.texto.secundario,
  fontSize: '0.82rem',
});

export const statusBadgeBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px 10px',
  borderRadius: '999px',
  border: '1px solid currentColor',
  backgroundColor: 'transparent',
  fontSize: '0.72rem',
  fontWeight: '600',
  whiteSpace: 'nowrap',
  '@media': {
    'screen and (max-width: 767px)': {
      justifySelf: 'end',
      gridColumn: '2',
      gridRow: '2',
    },
  },
});

export const statusBadge = styleVariants({
  PENDING_PAYMENT: [statusBadgeBase, { color: tokens.color.estado.alerta }],
  CONFIRMED: [statusBadgeBase, { color: tokens.color.estado.sucesso }],
  CANCELLED: [statusBadgeBase, { color: tokens.color.neutral[600] }],
  EXPIRED: [statusBadgeBase, { color: tokens.color.neutral[600] }],
  COMPLETED: [statusBadgeBase, { color: tokens.color.secundaria }],
  NO_SHOW: [statusBadgeBase, { color: tokens.color.estado.alerta }],
  REFUNDED: [statusBadgeBase, { color: tokens.color.secundaria }],
});

export const emptyState = style({
  display: 'grid',
  justifyItems: 'center',
  gap: '8px',
  padding: '48px 24px',
  textAlign: 'center',
  color: tokens.color.texto.secundario,
});

export const emptyIcon = style({
  width: '40px',
  height: '40px',
  color: tokens.color.neutral[400],
});

export const emptyTitle = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: '1rem',
  fontWeight: '600',
  color: tokens.color.texto.primario,
  margin: 0,
});

export const emptySubtitle = style({
  fontFamily: tokens.font.family.corpo,
  fontSize: '0.9rem',
  margin: 0,
});

export const errorBox = style({
  margin: 0,
  padding: '12px 16px',
  borderRadius: '8px',
  border: `1px solid ${tokens.color.estado.erro}`,
  background: 'rgba(192, 57, 43, 0.08)',
  color: tokens.color.estado.erro,
  fontFamily: tokens.font.family.corpo,
  fontSize: '0.9rem',
});

export const shortcutsGrid = style({
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'flex',
      gridTemplateColumns: 'none',
      gap: '12px',
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'none',
      marginInline: '-16px',
      paddingInline: '16px',
      paddingBottom: '4px',
    },
  },
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const shortcutCard = style({
  display: 'grid',
  gap: '8px',
  padding: '20px',
  borderRadius: '12px',
  border: `1px solid ${tokens.color.neutral[200]}`,
  backgroundColor: tokens.color.fundo,
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer',
  transition: `box-shadow ${tokens.motion.fast} ease, border-color ${tokens.motion.fast} ease, transform ${tokens.motion.fast} ease`,
  ':hover': {
    borderColor: tokens.color.primaria,
    boxShadow: '0 6px 18px rgba(13, 31, 60, 0.08)',
    transform: 'translateY(-1px)',
  },
  ':focus-visible': {
    outline: `2px solid ${tokens.color.acento.dourado}`,
    outlineOffset: '2px',
  },
  ':active': {
    transform: 'scale(0.98)',
  },
  '@media': {
    'screen and (max-width: 767px)': {
      flex: '0 0 72%',
      minWidth: '240px',
      scrollSnapAlign: 'start',
      padding: '18px',
      borderRadius: '16px',
    },
  },
});

export const shortcutIcon = style({
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: `color-mix(in srgb, ${tokens.color.primaria} 10%, transparent)`,
  color: tokens.color.primaria,
});

export const shortcutTitle = style({
  fontFamily: tokens.font.family.titulo,
  color: tokens.color.secundaria,
  fontSize: '1.05rem',
  fontWeight: '600',
  margin: 0,
});

export const shortcutDescription = style({
  fontFamily: tokens.font.family.corpo,
  color: tokens.color.texto.secundario,
  fontSize: '0.85rem',
  margin: 0,
});
