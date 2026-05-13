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
}

const PATHS: Record<VarianteOnda, string> = {
  // Onda suave do oceano — Hero → Serviços (areia e mar se encontram)
  a: 'M0,48 C240,88 480,16 720,48 C960,80 1200,24 1440,48 L1440,80 L0,80 Z',
  // Duna assimétrica larga — Serviços → CTA (perfil das dunas dos Lençóis)
  b: 'M0,64 C200,20 500,80 800,40 C1050,8 1280,64 1440,28 L1440,80 L0,80 Z',
  // Maré tranquila — Depoimentos → Sobre (chegada suave à margem)
  c: 'M0,24 C320,72 640,8 960,52 C1120,68 1280,36 1440,52 L1440,80 L0,80 Z',
  // Ondulação dupla — FAQ → Contato (ritmo de ondas menores sobre a areia)
  d: 'M0,56 C180,32 360,72 540,48 C720,24 900,64 1080,40 C1260,16 1380,56 1440,44 L1440,80 L0,80 Z',
};

export function DivisorOnda({
  corFundo,
  corTopo,
  invertido = false,
  variante = 'a',
  altura = 80,
}: DivisorOndaProps): React.ReactElement {
  return (
    <div
      className={ondaWrapper}
      aria-hidden="true"
      style={{
        backgroundColor: corTopo,
        height: altura,
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
