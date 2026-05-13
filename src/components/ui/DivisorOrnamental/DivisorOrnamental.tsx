import React from 'react';
import * as styles from './DivisorOrnamental.css';

interface DivisorOrnamentalProps {
  /** Componente SVG do símbolo central */
  readonly Icon: React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>;
  /** Cor aplicada ao ícone e às linhas laterais */
  readonly cor: string;
  /** Tamanho do ícone SVG em px */
  readonly tamanhoIcone?: number;
}

/**
 * Divisor horizontal com símbolo sagrado centralizado.
 * Usado como ornamento antes de títulos de seção.
 * Layout: ─────── [ÍCONE] ───────
 *
 * Sempre aria-hidden. Puramente decorativo.
 */
export function DivisorOrnamental({
  Icon,
  cor,
  tamanhoIcone = 20,
}: DivisorOrnamentalProps): React.ReactElement {
  return (
    <div
      className={styles.divisorWrapper}
      role="presentation"
      aria-hidden="true"
    >
      <span
        className={styles.divisorLinha}
        style={{ backgroundColor: cor }}
      />
      <span className={styles.divisorIcone}>
        <Icon size={tamanhoIcone} color={cor} aria-hidden={true} />
      </span>
      <span
        className={styles.divisorLinha}
        style={{ backgroundColor: cor }}
      />
    </div>
  );
}
