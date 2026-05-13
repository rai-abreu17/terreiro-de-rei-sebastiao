import { globalStyle } from '@vanilla-extract/css';
import { tokens } from './tokens.css';

globalStyle(':root', {
  colorScheme: 'light',
});

globalStyle('html, body, #root', {
  minHeight: '100%',
});

globalStyle('body', {
  margin: 0,
  padding: 0,
  fontFamily: tokens.font.family.corpo,
  backgroundColor: tokens.color.fundo,
  backgroundImage:
    `radial-gradient(circle at top, ${tokens.color.acento.dourado}10 0%, transparent 28%), ` +
    `linear-gradient(180deg, ${tokens.color.fundo} 0%, ${tokens.color.neutral[50]} 100%)`,
  color: tokens.color.texto.primario,
  lineHeight: 1.5,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('#root', {
  minHeight: '100vh',
});

globalStyle('h1, h2, h3, h4, h5, h6', {
  fontFamily: tokens.font.family.titulo,
  margin: 0,
  color: tokens.color.primaria,
});

globalStyle('a', {
  color: tokens.color.acento.dourado,
  textDecoration: 'none',
});

globalStyle('a:hover', {
  textDecoration: 'underline',
});

globalStyle('button, input, textarea, select', {
  font: 'inherit',
});

globalStyle('::selection', {
  backgroundColor: `${tokens.color.acento.dourado}55`,
  color: tokens.color.texto.primario,
});

globalStyle('*', {
  boxSizing: 'border-box',
});
