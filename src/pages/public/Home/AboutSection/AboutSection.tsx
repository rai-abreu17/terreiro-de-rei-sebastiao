import React from 'react';
import { DivisorOrnamental } from '../../../../components/ui/DivisorOrnamental/DivisorOrnamental';
import { OrnatoFlutuante } from '../../../../components/ui/OrnatoFlutuante/OrnatoFlutuante';
import { IconBengala, IconGuardaSol } from '../../../../assets/icons/SimbolosReiSebastiao';
import { tokens } from '../../../../design-system/tokens.css';
import {
  aboutContainer,
  imageColumn,
  textColumn,
  sectionTitle,
  sectionSubtitle,
  sectionParagraph,
  imagePlaceholder,
} from './AboutSection.css';
import type { AboutSectionProps } from './AboutSection.types';

export function AboutSection({
  titulo = 'A Casa e a Missão',
  subtitulo = 'Sob a guarda da Família do Lençol — acolhimento, conselho e cura espiritual',
}: AboutSectionProps): React.ReactElement {
  return (
    <section id="sobre" className={aboutContainer} aria-labelledby="about-title">
      {/*
       * Guarda-Sol Cerimonial — flutuando parcialmente fora da borda inferior direita.
       * Na Encantaria, o guarda-sol protege a cabeça iluminada do Encantado.
       * Aqui, protege e envolve o espaço de acolhimento da casa.
       */}
      <OrnatoFlutuante
        Icon={IconGuardaSol}
        tamanho={340}
        cor={tokens.color.secundaria}
        opacidade={0.035}
        variante="b"
        atraso="1s"
        posicao={{ bottom: '-12%', right: '-6%' }}
      />

      <div className={imageColumn}>
        <div
          className={imagePlaceholder}
          role="img"
          aria-label="Fotografia do espaço sagrado do Terreiro de Rei Sebastião"
        >
          O Terreiro
        </div>
      </div>

      <div className={textColumn}>
        {/* Bengala como divisor ornamental — símbolo do Pai de Terreiro */}
        <DivisorOrnamental
          Icon={IconBengala}
          cor={tokens.color.primaria}
          tamanhoIcone={20}
        />

        <h2 id="about-title" className={sectionTitle}>{titulo}</h2>
        <p className={sectionSubtitle}>{subtitulo}</p>

        <p className={sectionParagraph}>
          O Terreiro de Rei Sebastião tem como missão o acolhimento espiritual fundamentado
          na Encantaria Maranhense. Orientamos os consulentes que nos buscam através das
          tradições genuínas da Família do Lençol, respeitando a ancestralidade e os
          ensinamentos transmitidos pela corte encantada de Dom Sebastião — o Pai de
          Terreiro que traz conselho, serenidade e proteção.
        </p>

        <p className={sectionParagraph}>
          Nossos valores estão enraizados na cosmologia afro-brasileira do Tambor de Mina.
          A reverência aos encantados, o respeito à natureza e à ancestralidade, e a
          caridade como fundamento inabalável — estes são os pilares que sustentam cada
          trabalho realizado nesta casa, sob o repique do Hum, do Humpi e do Lé.
        </p>

        <p className={sectionParagraph}>
          Cada consulente é recebido com a reverência que a ocasião exige. Nossas portas
          estão abertas para aqueles que buscam clareza, direcionamento e paz de espírito,
          sempre sob a proteção do encantado que habita as dunas da Ilha dos Lençóis e
          reina no fundo do mar — eterno e sábio, jamais esquecido.
        </p>
      </div>
    </section>
  );
}
