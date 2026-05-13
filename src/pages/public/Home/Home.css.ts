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
