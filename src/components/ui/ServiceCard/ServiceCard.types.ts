import type React from 'react';

export interface ServiceCardProps {
  titulo: string;
  descricao?: string;
  precoFormatado: string;
  duracaoFormatada: string;
  estaSelecionado?: boolean;
  rotuloBotao?: string;
  aoClicarAgendar: () => void;
  /** Ícone SVG do terreiro a exibir no card */
  Icone?: React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>;
}
