import React from 'react';
import { useReveal } from '../../../../hooks/useReveal';
import {
  IconToalhaBranca,
  IconBengala,
  IconGuardaSol,
  IconEspadaVermelha,
  IconCruzCristo,
  IconTambor,
} from '../../../../assets/icons/SimbolosReiSebastiao';
import { tokens } from '../../../../design-system/tokens.css';
import * as styles from './SimbolosSection.css';

interface SimboloItem {
  readonly id: string;
  readonly nome: string;
  readonly descricao: string;
  readonly borda: keyof typeof styles.cardBorda;
  readonly corIcone: string;
  readonly Icon: React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>;
}

const SIMBOLOS: readonly SimboloItem[] = [
  {
    id: 'toalha',
    nome: 'Toalha Branca',
    descricao:
      'Símbolo primaz de pureza e fidalguia europeia. Identifica os Senhores de Toalha — a falange nobre do panteão da Mina. Portada sobre o ombro ou cruzada no peito pela entidade ao descer.',
    borda: 'neutro',
    corIcone: tokens.color.neutral[600],
    Icon: IconToalhaBranca,
  },
  {
    id: 'bengala',
    nome: 'Bengala',
    descricao:
      'Transcende a função ortopédica para assumir o papel de cetro de comando. Nas mãos do Rei, confere o mais alto status e sublinha sua posição como regente de uma vasta dinastia espiritual.',
    borda: 'dourado',
    corIcone: tokens.color.acento.dourado,
    Icon: IconBengala,
  },
  {
    id: 'guardasol',
    nome: 'Guarda-Sol Cerimonial',
    descricao:
      'Aberto solenemente ao início de cada aparição, protege a cabeça iluminada da divindade. Partilha a iconografia de majestade das monarquias do Daomé e do Maracatu de Nação.',
    borda: 'azul',
    corIcone: tokens.color.secundaria,
    Icon: IconGuardaSol,
  },
  {
    id: 'espada',
    nome: 'Espada Vermelha',
    descricao:
      'Assentada no altar do Rei, a lâmina encarnada corta demandas e infortúnios. O dedo indicador erguido na dança mimetiza o general empunhando sua lâmina contra as hostes inimigas.',
    borda: 'vermelho',
    corIcone: tokens.color.primaria,
    Icon: IconEspadaVermelha,
  },
  {
    id: 'cruz',
    nome: 'Escudo e Cruz de Cristo',
    descricao:
      'Nas visões místicas, o Rei porta um escudo monumental ornado com a Cruz de Cristo — recontextualização do catolicismo como magia de proteção e amparo do cavaleiro cruzado.',
    borda: 'dourado',
    corIcone: tokens.color.acento.dourado,
    Icon: IconCruzCristo,
  },
  {
    id: 'tambores',
    nome: 'Tambores Sagrados',
    descricao:
      'O Hum, o Humpi e o Lé, regidos pelo Gã de ferro — os percutidores que atravessam a dimensão encantada e extraem de lá a realeza espiritual para dançar na terra.',
    borda: 'terra',
    corIcone: tokens.color.neutral[600],
    Icon: IconTambor,
  },
];

export function SimbolosSection(): React.ReactElement {
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="simbolos"
      className={styles.section}
      aria-labelledby="simbolos-titulo"
    >
      <header className={styles.cabecalho}>
        <p className={styles.sectionEyebrow} aria-hidden="true">
          Cultura Material
        </p>
        <h2 id="simbolos-titulo" className={styles.sectionTitle}>
          Os Símbolos do Rei
        </h2>
        <p className={styles.sectionSubtitle}>
          Cada artefato carregado pela entidade é um signo de poder e ancestralidade.
          A indumentária, as armas e os instrumentos compõem a gramática visual
          da realeza espiritual do Tambor de Mina.
        </p>
      </header>

      <div
        ref={gridRef}
        className={styles.grid}
        role="list"
        aria-label="Símbolos sagrados de Rei Sebastião"
      >
        {SIMBOLOS.map(({ id, nome, descricao, borda, corIcone, Icon }) => (
          <article
            key={id}
            className={`${styles.card} ${styles.cardBorda[borda]}`}
            role="listitem"
          >
            <div className={styles.cardIcone} aria-hidden="true">
              <Icon size={32} color={corIcone} aria-hidden={true} />
            </div>
            <h3 className={styles.cardNome}>{nome}</h3>
            <p className={styles.cardDescricao}>{descricao}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
