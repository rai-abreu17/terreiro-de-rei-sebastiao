import React from 'react';
import { DivisorOrnamental } from '../../../../components/ui/DivisorOrnamental/DivisorOrnamental';
import { OrnatoFlutuante } from '../../../../components/ui/OrnatoFlutuante/OrnatoFlutuante';
import {
  IconBengala,
  IconGuardaSol,
  IconEspadaVermelha,
  IconCruzCristo,
  IconToalhaBranca,
} from '../../../../assets/icons/SimbolosReiSebastiao';
import { tokens } from '../../../../design-system/tokens.css';
import {
  aboutContainer,
  imageColumn,
  textColumn,
  sectionTitle,
  sectionSubtitle,
  sectionParagraph,
  imagePlaceholder,
  simbolosGrade,
  simboloItem,
  simboloRotulo,
} from './AboutSection.css';
import type { AboutSectionProps } from './AboutSection.types';

export function AboutSection({
  titulo = 'A Casa e a Missão',
  subtitulo = 'Sob a guarda da Família do Lençol — acolhimento, conselho e cura espiritual',
}: AboutSectionProps): React.ReactElement {
  return (
    <section id="sobre" className={aboutContainer} aria-labelledby="about-title">
      <OrnatoFlutuante
        Icon={IconGuardaSol}
        tamanho={340}
        cor={tokens.color.secundaria}
        opacidade={0.035}
        variante="b"
        atraso="1s"
        posicao={{ bottom: '-12%', right: '-6%' }}
      />

      {/* Coluna visual: símbolos sagrados do Terreiro */}
      <div className={imageColumn}>
        <div className={imagePlaceholder} aria-label="Símbolos sagrados do Terreiro de Rei Sebastião">
          <div className={simbolosGrade}>
            <div className={simboloItem}>
              <IconEspadaVermelha size={48} color={tokens.color.acento.dourado} aria-hidden />
              <span className={simboloRotulo}>Espada</span>
            </div>
            <div className={simboloItem}>
              <IconCruzCristo size={48} color={tokens.color.acento.dourado} aria-hidden />
              <span className={simboloRotulo}>Escudo</span>
            </div>
            <div className={simboloItem}>
              <IconGuardaSol size={48} color={tokens.color.acento.dourado} aria-hidden />
              <span className={simboloRotulo}>Guarda-Sol</span>
            </div>
            <div className={simboloItem}>
              <IconBengala size={48} color={tokens.color.acento.dourado} aria-hidden />
              <span className={simboloRotulo}>Bengala</span>
            </div>
            <div className={simboloItem} style={{ gridColumn: 'span 2' }}>
              <IconToalhaBranca size={48} color={tokens.color.acento.dourado} aria-hidden />
              <span className={simboloRotulo}>Toalha Branca</span>
            </div>
          </div>
        </div>
      </div>

      <div className={textColumn}>
        <DivisorOrnamental Icon={IconBengala} cor={tokens.color.primaria} tamanhoIcone={20} />
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
