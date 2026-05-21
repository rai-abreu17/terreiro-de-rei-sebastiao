import React from 'react';
import { useReveal } from '../../../hooks/useReveal';
import * as styles from './OrnatoFlutuante.css';

interface OrnatoFlutuanteProps {
  /** Componente SVG do símbolo sagrado */
  readonly Icon: React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>;
  /** Tamanho em px do ícone SVG */
  readonly tamanho?: number;
  /** Cor do traçado SVG — aceita tokens CSS var() */
  readonly cor?: string;
  /**
   * Opacidade visual final do ornamento (0–1).
   * 0.03–0.08 para marca d'água de fundo.
   * 0.10–0.18 para ornamento lateral visível (como as figuras na referência).
   */
  readonly opacidade?: number;
  /** Variante de cadência da flutuação: 'a' (9s) | 'b' (13s) | 'c' (7s) */
  readonly variante?: 'a' | 'b' | 'c';
  /** Delay do CSS de flutuação (ex: '3s') — separado do delay de entrada */
  readonly atraso?: string;
  /**
   * Delay da animação de entrada em segundos.
   * Aplicado via transitionDelay no inline style, garante stagger entre ornamentos.
   */
  readonly atrasoEntrada?: number;
  readonly reveladoInicial?: boolean;
  /** Posicionamento absoluto dentro da seção ou container pai */
  readonly posicao: Pick<React.CSSProperties, 'top' | 'left' | 'right' | 'bottom' | 'zIndex'>;
}

/**
 * Ornamento ambiental flutuante — símbolo sagrado que habita o espaço visual
 * como presença espiritual, não como elemento informativo.
 *
 * ARQUITETURA DE ANIMAÇÃO (duas camadas independentes, sem conflito):
 *
 *   Camada 1 — Entrada (opacity):
 *     IntersectionObserver via useReveal hook define data-revealed="true"
 *     quando o elemento entra na viewport. CSS transition anima opacity de 0 a 1.
 *     O elemento filho controla a opacidade visual final (opacidade prop).
 *     Resultado: fade-in lento e majestoso como uma aparição do Encantado.
 *
 *   Camada 2 — Presença (transform / flutuação):
 *     CSS @keyframes no container anima transform: translateY em loop infinito.
 *     Não toca opacity. Não interfere com a Camada 1.
 *     Resultado: respiração perpétua — a marcha real.
 *
 * Sem Framer Motion — em conformidade com diretrizes do projeto.
 * Sempre aria-hidden. Nunca bloqueia interação (pointer-events: none).
 * A seção pai deve ter position: relative e overflow: hidden (ou overflow-x: hidden).
 */
export function OrnatoFlutuante({
  Icon,
  tamanho = 120,
  cor = 'currentColor',
  opacidade = 0.06,
  variante = 'a',
  atraso = '0s',
  atrasoEntrada = 0,
  reveladoInicial = false,
  posicao,
}: OrnatoFlutuanteProps): React.ReactElement {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.ornato} ${styles.variante[variante]}`}
      style={{
        animationDelay: atraso,
        transitionDelay: `${atrasoEntrada}s`,
        ...posicao,
      }}
      data-revealed={reveladoInicial ? 'true' : undefined}
      aria-hidden="true"
      role="presentation"
    >
      {/*
       * Elemento filho com a opacidade visual alvo.
       * O container (ref) vai de opacity:0 a opacity:1 na revelação.
       * Este filho determina o quanto do SVG "aparece" no estado final.
       * Produto: opacity do container × opacity do filho = opacity visual.
       * Ex: 1 × 0.08 = 0.08 (marca d'água); 1 × 0.14 = 0.14 (ornamento lateral).
       */}
      <div style={{ opacity: opacidade }}>
        <Icon size={tamanho} color={cor} aria-hidden={true} />
      </div>
    </div>
  );
}
