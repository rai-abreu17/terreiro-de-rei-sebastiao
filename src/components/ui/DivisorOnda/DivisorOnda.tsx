import React from 'react';
import { ondaWrapper } from './DivisorOnda.css';

type VarianteOnda = 'a' | 'b' | 'c' | 'd';

interface DivisorOndaProps {
  /** Wave fill color. It should match the next section background. */
  corFundo: string;
  /** SVG container background. It should match the previous section background. */
  corTopo: string;
  /** Mirrors the wave horizontally to vary the rhythm. */
  invertido?: boolean;
  /** Wave path variant. */
  variante?: VarianteOnda;
  /** Divider height in pixels. */
  altura?: number;
  /** Optional extra class for the wrapper background. */
  className?: string;
  /**
   * Optional negative overlap over the previous section.
   * Keep this at 0 when the divider must reserve its full height in the layout.
   */
  overlap?: number;
  /** Lets the previous section show through the empty SVG area above the curve. */
  transparente?: boolean;
}

const TOP_PATHS: Record<VarianteOnda, string> = {
  a: 'M0,0 L1440,0 L1440,48 C1200,22 960,76 720,52 C480,16 240,80 0,48 Z',
  b: 'M0,0 C200,48 500,8 800,36 C1050,60 1280,16 1440,0 L1440,0 L0,0 Z',
  c: 'M0,0 L1440,0 L1440,44 C1280,16 1120,72 960,48 C640,12 320,76 0,44 Z',
  d: 'M0,0 C180,40 360,64 540,28 C720,8 900,48 1080,20 C1260,4 1380,44 1440,0 L1440,0 L0,0 Z',
};

export function DivisorOnda({
  corFundo,
  corTopo,
  invertido = false,
  variante = 'a',
  altura = 80,
  className,
  overlap = 0,
  transparente = false,
}: DivisorOndaProps): React.ReactElement {
  return (
    <div
      className={[ondaWrapper, className].filter(Boolean).join(' ')}
      aria-hidden="true"
      style={{
        backgroundColor: transparente ? 'transparent' : corFundo,
        height: altura,
        marginTop: overlap > 0 ? `-${overlap}px` : undefined,
        transform: invertido ? 'scaleX(-1)' : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        <path d={TOP_PATHS[variante]} fill={corTopo} />
      </svg>
    </div>
  );
}
