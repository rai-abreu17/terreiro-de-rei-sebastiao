import React from 'react';
import { ondaWrapper } from './DivisorOnda.css';

type VarianteOnda = 'a' | 'b' | 'c' | 'd';

interface DivisorOndaProps {
  /** Cor de preenchimento da onda — deve ser a cor de fundo da seção SEGUINTE */
  corFundo: string;
  /**
   * Cor de fundo do container SVG — deve ser a cor de fundo da seção ANTERIOR.
   * Necessário para que o espaço acima da onda corresponda à seção acima,
   * evitando que o background do HomeContainer "vaze" visualmente.
   */
  corTopo: string;
  /** Inverte a onda horizontalmente para variar o ritmo visual */
  invertido?: boolean;
  /** Variante de formato da onda */
  variante?: VarianteOnda;
  /** Altura da onda em pixels (padrão: 80) */
  altura?: number;
  /**
   * Pixels de sobreposição negativa sobre a seção acima (padrão: 3).
   * Aumente para cobrir padding ou gaps residuais da seção predecessor.
   */
  overlap?: number;
  /**
   * Quando true, o fundo do container SVG é transparente — a seção acima
   * (com paddingBottom adequado) mostra sua própria cor através da área vazia
   * acima da curva, eliminando a faixa de cor separada que parece um gap.
   */
  transparente?: boolean;
}

/*
 * Todos os paths começam e terminam em y=0 nas bordas laterais (x=0 e x=1440).
 * Isso elimina a "zona morta" de cor de fundo que aparecia acima da onda quando
 * os paths iniciavam em y=24, y=48 ou y=64 — o espaço entre y=0 e o ponto inicial
 * do path era preenchido pelo backgroundColor do container (corTopo), criando
 * um gap visual perceptível entre a seção acima e a onda.
 */
/*
 * Regra de design dos paths: max-y ≤ 40 para containers altura < 64px (Onda2, Onda4),
 * max-y ≤ 50 para containers altura ≥ 64px (Onda1, Onda3).
 * Isso garante que o fill (cor da seção seguinte) seja visível em ≥ 24px no ponto mais
 * fundo da onda, criando uma transição clara — não apenas um sliver de cor no rodapé.
 */
const PATHS: Record<VarianteOnda, string> = {
  a: 'M0,48 C240,80 480,16 720,52 C960,76 1200,22 1440,48 L1440,80 L0,80 Z',
  b: 'M0,0 C200,48 500,8 800,36 C1050,60 1280,16 1440,0 L1440,80 L0,80 Z',
  c: 'M0,44 C320,76 640,12 960,48 C1120,72 1280,16 1440,44 L1440,80 L0,80 Z',
  d: 'M0,0 C180,40 360,64 540,28 C720,8 900,48 1080,20 C1260,4 1380,44 1440,0 L1440,80 L0,80 Z',
};

export function DivisorOnda({
  corFundo,
  corTopo,
  invertido = false,
  variante = 'a',
  altura = 80,
  overlap = 3,
  transparente = false,
}: DivisorOndaProps): React.ReactElement {
  return (
    <div
      className={ondaWrapper}
      aria-hidden="true"
      style={{
        backgroundColor: transparente ? 'transparent' : corTopo,
        height: altura,
        marginTop: `-${overlap}px`,
        transform: invertido ? 'scaleX(-1)' : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        <path d={PATHS[variante]} fill={corFundo} />
      </svg>
    </div>
  );
}
