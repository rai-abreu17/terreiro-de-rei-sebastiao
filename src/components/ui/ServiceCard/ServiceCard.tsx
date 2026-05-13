import React from 'react';
import {
  cardContainer,
  cardContainerSelecionado,
  iconPlaceholder,
  iconPlaceholderInner,
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
  Icone,
}: ServiceCardProps): React.ReactElement {
  return (
    <article className={estaSelecionado ? cardContainerSelecionado : cardContainer}>
      <div className={iconPlaceholder} aria-hidden="true">
        <div className={iconPlaceholderInner}>
          {Icone ? (
            <Icone size={52} color="currentColor" aria-hidden />
          ) : (
            <span style={{ fontSize: '2rem', lineHeight: 1 }}>✧</span>
          )}
        </div>
      </div>

      <h3 className={cardTitle}>{titulo}</h3>

      {descricao && (
        <p className={cardDescription}>{descricao}</p>
      )}

      <div className={cardMeta}>
        <span>{duracaoFormatada}</span>
        <span aria-hidden="true">·</span>
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
