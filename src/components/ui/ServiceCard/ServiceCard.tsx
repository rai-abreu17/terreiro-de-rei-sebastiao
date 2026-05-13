import React from 'react';
import {
  cardContainer,
  cardContainerSelecionado,
  iconPlaceholder,
  cardTitle,
  cardDescription,
  cardMeta,
  cardButton,
} from './ServiceCard.css';
import type { ServiceCardProps } from './ServiceCard.types';

export function ServiceCard({
  titulo,
  descricao,
  precoFormatado,
  duracaoFormatada,
  estaSelecionado = false,
  rotuloBotao = 'Saiba Mais / Agendar',
  aoClicarAgendar,
}: ServiceCardProps): React.ReactElement {
  return (
    <article className={estaSelecionado ? cardContainerSelecionado : cardContainer}>
      <div className={iconPlaceholder} aria-hidden="true">
        {/* Ícone representativo (Placeholder de acordo com o design) */}
        ✧
      </div>
      
      <h3 className={cardTitle}>{titulo}</h3>
      
      {descricao && (
        <p className={cardDescription}>{descricao}</p>
      )}
      
      <div className={cardMeta}>
        <span>{duracaoFormatada}</span>
        <span aria-hidden="true">•</span>
        <span>{precoFormatado}</span>
      </div>
      
      <button 
        type="button"
        className={cardButton} 
        onClick={aoClicarAgendar}
        aria-label={`${rotuloBotao}: ${titulo}`}
        aria-pressed={estaSelecionado}
      >
        {rotuloBotao}
      </button>
    </article>
  );
}
