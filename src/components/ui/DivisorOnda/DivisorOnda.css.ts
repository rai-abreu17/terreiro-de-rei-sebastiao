import { style } from '@vanilla-extract/css';

export const ondaWrapper = style({
  display: 'block',
  lineHeight: 0,
  overflow: 'hidden',
  /*
   * The divider stays in normal document flow. Its explicit height reserves
   * space between sections, so the SVG does not sit on top of the next section.
   */
  position: 'relative',
  pointerEvents: 'none',
  userSelect: 'none',
  flexShrink: 0,
});
