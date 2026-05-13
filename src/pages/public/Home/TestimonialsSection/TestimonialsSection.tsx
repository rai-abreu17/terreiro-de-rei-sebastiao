import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OrnatoFlutuante } from '../../../../components/ui/OrnatoFlutuante/OrnatoFlutuante';
import {
  IconEspadaVermelha,
  IconCruzCristo,
  IconToalhaBranca,
} from '../../../../assets/icons/SimbolosReiSebastiao';
import { tokens } from '../../../../design-system/tokens.css';
import * as styles from './TestimonialsSection.css';

interface Depoimento {
  readonly id: string;
  readonly texto: string;
  readonly autor: string;
}

const DEPOIMENTOS: readonly Depoimento[] = [
  {
    id: '1',
    texto:
      'Saí do atendimento com uma clareza que não tinha há muito tempo. As orientações trouxeram luz sobre caminhos que eu não conseguia enxergar sozinha. Gratidão profunda pela escuta e pela condução com tanto respeito.',
    autor: 'Ana Luíza M.',
  },
  {
    id: '2',
    texto:
      'O trabalho realizado no Terreiro de Rei Sebastião me ajudou a compreender padrões familiares que carregava sem perceber. A abordagem é séria, fundamentada e ao mesmo tempo muito acolhedora. Recomendo de coração.',
    autor: 'Carla F.',
  },
  {
    id: '3',
    texto:
      'Fui com muitas dúvidas e voltei com direcionamento. O atendimento foi preciso e respeitoso. Sinto que finalmente encontrei um espaço de verdade para cuidar da minha espiritualidade e da minha ancestralidade.',
    autor: 'Mariana T.',
  },
];

export function TestimonialsSection(): React.ReactElement {
  const [indiceAtual, setIndiceAtual] = useState(0);

  const avancar = () =>
    setIndiceAtual((i) => (i + 1) % DEPOIMENTOS.length);

  const recuar = () =>
    setIndiceAtual((i) => (i - 1 + DEPOIMENTOS.length) % DEPOIMENTOS.length);

  const depoimento = DEPOIMENTOS[indiceAtual];

  return (
    <section className={styles.container} aria-labelledby="depoimentos-titulo">
      {/*
       * LATERAL ESQUERDO — Espada Vermelha
       * O general de batalha que cortou areias do Marrocos flanqueia os depoimentos
       * à esquerda. Como nas cerimônias onde o dedo indicador erguido simula a espada,
       * este símbolo de bravura guarda a palavra de cada consulente.
       * Opacidade moderada (0.14) — visível, como as figuras na referência visual.
       */}
      <OrnatoFlutuante
        Icon={IconEspadaVermelha}
        tamanho={200}
        cor={tokens.color.texto.invertido}
        opacidade={0.14}
        variante="a"
        atraso="0s"
        atrasoEntrada={0.3}
        posicao={{ top: '8%', left: '1%' }}
      />

      {/*
       * LATERAL DIREITO — Cruz de Cristo / Escudo
       * O cavaleiro cruzado flanqueia à direita. Nas visões místicas, o Rei porta um
       * escudo ornado com a Cruz de Cristo. Aqui, protege a comunidade de consulentes.
       * Opacidade levemente maior — o escudo do Rei é mais visível que a espada.
       */}
      <OrnatoFlutuante
        Icon={IconCruzCristo}
        tamanho={180}
        cor={tokens.color.texto.invertido}
        opacidade={0.12}
        variante="b"
        atraso="2s"
        atrasoEntrada={0.6}
        posicao={{ top: '12%', right: '1%' }}
      />

      {/*
       * FUNDO SUPERIOR — Toalha Branca
       * Presença suave dos Senhores de Toalha como marca d'água no topo da seção.
       * Menor opacidade que os laterais — é fundo, não figura.
       */}
      <OrnatoFlutuante
        Icon={IconToalhaBranca}
        tamanho={220}
        cor={tokens.color.texto.invertido}
        opacidade={0.05}
        variante="c"
        atraso="4s"
        atrasoEntrada={0.9}
        posicao={{ bottom: '-5%', left: '-4%' }}
      />

      <div className={styles.conteudo}>
        <header className={styles.cabecalho}>
          <h2 id="depoimentos-titulo" className={styles.titulo}>
            Depoimentos
          </h2>
          <p className={styles.subtitulo}>
            Palavras de quem encontrou clareza e direcionamento no Terreiro de Rei Sebastião.
          </p>
        </header>

        <div
          className={styles.carouselWrap}
          role="region"
          aria-label="Carrossel de depoimentos"
          aria-live="polite"
        >
          <blockquote className={styles.citacao} key={depoimento.id}>
            <p className={styles.textoCitacao}>"{depoimento.texto}"</p>
            <footer className={styles.autorCitacao}>
              <cite className={styles.nomeAutor}>{depoimento.autor}</cite>
            </footer>
          </blockquote>

          <div className={styles.controles} role="group" aria-label="Navegar depoimentos">
            <button
              type="button"
              className={styles.botaoNav}
              onClick={recuar}
              aria-label="Depoimento anterior"
            >
              <ChevronLeft size={16} />
            </button>

            <div className={styles.indicadores} aria-hidden="true">
              {DEPOIMENTOS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={
                    idx === indiceAtual
                      ? styles.indicador.ativo
                      : styles.indicador.inativo
                  }
                  onClick={() => setIndiceAtual(idx)}
                  aria-label={`Ir para depoimento ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className={styles.botaoNav}
              onClick={avancar}
              aria-label="Próximo depoimento"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
