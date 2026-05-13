import { style } from '@vanilla-extract/css';

export const ondaWrapper = style({
  display: 'block',
  lineHeight: 0,
  overflow: 'hidden',
  /*
   * marginTop negativo: puxa a onda 1px para dentro da seção acima,
   * eliminando a fresta de 1px que alguns browsers renderizam entre blocos.
   */
  marginTop: '-1px',
  pointerEvents: 'none',
  userSelect: 'none',
  flexShrink: 0,
});
