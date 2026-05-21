import { style } from '@vanilla-extract/css';
import { tokens } from '../../../design-system/tokens.css';

export const homeContainer = style({
  position: 'relative',     /* âncora para ornamentos cross-section posicionados absolutamente */
  overflowX: 'hidden',      /* impede scroll horizontal causado por ornamentos laterais que extrapolam */
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100vh',
  backgroundColor: tokens.color.fundo,
});

export const heroServicesOrnamentoAnchor = style({
  position: 'relative',
  height: 0,
  zIndex: 2,
  pointerEvents: 'none',
});

export const heroServicesDivisorBackground = style({
  backgroundImage: [
    `radial-gradient(ellipse 55% 50% at 92% 8%, rgba(201, 168, 76, 0.10) 0%, transparent 60%)`,
    `radial-gradient(ellipse 45% 40% at 8% 95%, rgba(13, 31, 60, 0.06) 0%, transparent 55%)`,
    `radial-gradient(circle, rgba(201, 168, 76, 0.12) 1px, transparent 1px)`,
  ].join(', '),
  backgroundSize: ['auto', 'auto', '28px 28px'].join(', '),
});

export const heroServicesDivisorOverlay = style({
  marginBottom: '-64px',
  zIndex: 1,
});
