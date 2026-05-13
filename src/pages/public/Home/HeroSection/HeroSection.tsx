import React from 'react';
import { OrnatoFlutuante } from '../../../../components/ui/OrnatoFlutuante/OrnatoFlutuante';
import {
  IconEspadaVermelha,
  IconCruzCristo,
  IconToalhaBranca,
} from '../../../../assets/icons/SimbolosReiSebastiao';
import { tokens } from '../../../../design-system/tokens.css';
import {
  heroContainer,
  heroOverlay,
  heroContent,
  heroBadge,
  heroTitle,
  heroSeparator,
  heroSeparatorLine,
  heroSeparatorGlyph,
  heroDescription,
  heroCta,
} from './HeroSection.css';
import type { HeroSectionProps } from './HeroSection.types';

export function HeroSection({
  titulo = 'Terreiro de Rei Sebastião',
  mensagemBoasVindas = 'Seja bem-vindo ao nosso espaço sagrado. Um território de fé, tradição e acolhimento, regido pelos fundamentos da Encantaria Maranhense e sob a luz da Família do Lençol. Aqui, o passado e o presente se encontram para guiar nossos caminhos.',
}: HeroSectionProps): React.ReactElement {
  return (
    <section id="inicio" className={heroContainer} aria-labelledby="hero-title">
      {/* Camada de gradiente de profundidade */}
      <div className={heroOverlay} aria-hidden="true" />

      {/*
       * Ornamentos ambientais — espíritos da realeza que habitam o espaço:
       * a Espada do general, a Cruz do cavaleiro cruzado e a Toalha dos Nobres Gentis.
       * Flutuam lentamente como presenças, não como ícones explicativos.
       */}
      <OrnatoFlutuante
        Icon={IconEspadaVermelha}
        tamanho={170}
        cor={tokens.color.acento.dourado}
        opacidade={0.09}
        variante="a"
        atraso="0s"
        posicao={{ top: '12%', right: '5%' }}
      />
      <OrnatoFlutuante
        Icon={IconCruzCristo}
        tamanho={120}
        cor={tokens.color.texto.invertido}
        opacidade={0.05}
        variante="b"
        atraso="3.5s"
        posicao={{ bottom: '20%', left: '4%' }}
      />
      <OrnatoFlutuante
        Icon={IconToalhaBranca}
        tamanho={95}
        cor={tokens.color.texto.invertido}
        opacidade={0.04}
        variante="c"
        atraso="6s"
        posicao={{ top: '58%', left: '2%' }}
      />

      {/* Conteúdo principal do Hero */}
      <div className={heroContent}>
        <p className={heroBadge} aria-hidden="true">
          Encantaria Maranhense · Família do Lençol
        </p>

        <h1 id="hero-title" className={heroTitle}>
          {titulo}
        </h1>

        <div className={heroSeparator} role="presentation" aria-hidden="true">
          <span className={heroSeparatorLine} />
          <span className={heroSeparatorGlyph}>✦</span>
          <span className={heroSeparatorLine} />
        </div>

        <p className={heroDescription}>{mensagemBoasVindas}</p>

        <a href="/agendar" className={heroCta}>
          Agendar Consulta
        </a>
      </div>
    </section>
  );
}
