import { style } from '@vanilla-extract/css';
import { tokens } from '../../../design-system/tokens.css';

export const divisorWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.md,
  width: '100%',
  maxWidth: '300px',
  margin: `0 auto ${tokens.spacing.lg}`,
});

export const divisorLinha = style({
  flex: 1,
  height: '1px',
  opacity: 0.35,
  /* Cor herdada do contexto via currentColor via backgroundColor inline */
});

export const divisorIcone = style({
  flexShrink: 0,
  opacity: 0.55,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
