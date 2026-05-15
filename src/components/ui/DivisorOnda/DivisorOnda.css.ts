import { style } from '@vanilla-extract/css';

export const ondaWrapper = style({
  display: 'block',
  lineHeight: 0,
  overflow: 'hidden',
  marginBottom: '-3px',
  /*
   * position: relative transforma o DivisorOnda em elemento posicionado,
   * fazendo-o entrar no mesmo nível de stacking que as seções adjacentes
   * (position:relative). Por vir depois no DOM, renderiza por cima da seção
   * anterior no overlap zone — sem isso, seções com position:relative ficam
   * na frente e escondem a onda com seu fundo colorido.
   */
  position: 'relative',
  pointerEvents: 'none',
  userSelect: 'none',
  flexShrink: 0,
});
