import { style } from '@vanilla-extract/css';

export const ondaWrapper = style({
  display: 'block',
  lineHeight: 0,
  overflow: 'hidden',
  /*
   * Margens negativas bilaterais: eliminam a fresta de 1-2px que alguns
   * browsers renderizam entre blocos em layout flex. O -1px no topo puxa a
   * onda para dentro da seção acima; o -2px no fundo puxa a seção seguinte
   * para dentro da onda, garantindo cobertura total sem espaço branco visível.
   */
  marginTop: '-1px',
  marginBottom: '-2px',
  pointerEvents: 'none',
  userSelect: 'none',
  flexShrink: 0,
});
