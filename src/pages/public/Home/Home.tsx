import React from 'react';
import { HeroSection } from './HeroSection/HeroSection';
import { AboutSection } from './AboutSection/AboutSection';
import { ContactSection } from './ContactSection/ContactSection';
import { ContactCTA } from './ContactCTA/ContactCTA';
import { FaqSection } from './FaqSection/FaqSection';
import { ServicesSection } from './ServicesSection/ServicesSection';
import { TestimonialsSection } from './TestimonialsSection/TestimonialsSection';
import { OrnatoFlutuante } from '../../../components/ui/OrnatoFlutuante/OrnatoFlutuante';
import { DivisorOnda } from '../../../components/ui/DivisorOnda/DivisorOnda';
import { IconBengala, IconGuardaSol } from '../../../assets/icons/SimbolosReiSebastiao';
import { tokens } from '../../../design-system/tokens.css';
import {
  heroServicesDivisorBackground,
  heroServicesDivisorOverlay,
  heroServicesOrnamentoAnchor,
  homeContainer,
} from './Home.css';

/*
 * Paleta de cores de fundo de cada seção — centralizadas aqui para que as ondas
 * transicionem com precisão entre as cores adjacentes.
 * Estes valores espelham os `backgroundColor` definidos nos CSS de cada seção.
 */
const COR = {
  /** Hero: oceano noturno — base do gradiente do HeroSection */
  oceanoNoturno: '#06101F',
  /** Serviços: areia dos Lençóis — base quente do ServicesSection */
  areiaLencois: '#FEFCF8',
  /**
   * CTA / Depoimentos: vermelho-vinho — corresponde ao `backgroundColor` declarado
   * em TestimonialsSection e ContactCTA (tokens.color.primaria).
   * Usar o backgroundColor declarado (não o endpoint do gradiente) garante que
   * o corTopo da onda seja visualmente contínuo com o fundo real da seção.
   */
  vinhoEscarlate: '#6B1A1A',
  /** Sobre: branco puro */
  brancoRitual: '#FFFFFF',
  /** Contato: creme suave — neutral[50] */
  cremeSuave: '#F9F7F5',
} as const;

export function Home(): React.ReactElement {
  return (
    <div className={homeContainer}>
      {/*
       * ─── ORNAMENTOS CROSS-SECTION ────────────────────────────────────────────
       * Posicionados no container da página (position:relative), estes ornamentos
       * não pertencem a nenhuma seção específica.
       * Eles existem no interstício — na fronteira entre seções — como os espíritos
       * que transitam entre o mundo visível e o encantado.
       *
       * O HomeContainer tem overflow-x:hidden, então eles não causam scroll horizontal.
       * ─────────────────────────────────────────────────────────────────────────
       */}

      {/*
       * Bengala — entre Serviços e Depoimentos (≈ 40% da altura da página).
       * O cetro patriarcal flutua na margem direita, cruzando a fronteira entre as
       * seções de trabalho espiritual e os depoimentos da comunidade.
       */}
      {/*
       * Guarda-Sol — entre Depoimentos e Sobre (≈ 58% da altura da página).
       * O grande guarda-sol cerimonial que abre a aparição do Rei atravessa a
       * fronteira entre o vermelho-vinho dos depoimentos e o branco puro do Sobre.
       * Posicionado à esquerda, parcialmente fora da grade — como flutua nas cerimônias.
       */}
      <OrnatoFlutuante
        Icon={IconGuardaSol}
        tamanho={210}
        cor={tokens.color.primaria}
        opacidade={0.06}
        variante="b"
        atraso="3s"
        atrasoEntrada={0.4}
        posicao={{ top: '56%', left: '-3%' }}
      />

      {/* ─── Seções da Página ───────────────────────────────────────────────── */}

      <HeroSection />

      {/*
       * Onda 1 — Oceano → Dunas:
       * O mar noturno do Hero recua e deixa exposta a areia quente dos Serviços.
       * variante "a": onda suave e ampla, como a maré baixando sobre as dunas.
       */}
      <DivisorOnda
        corTopo={COR.oceanoNoturno}
        corFundo={COR.areiaLencois}
        variante="a"
        altura={64}
        className={`${heroServicesDivisorBackground} ${heroServicesDivisorOverlay}`}
        transparente
      />

      <div className={heroServicesOrnamentoAnchor} aria-hidden="true">
        <OrnatoFlutuante
          Icon={IconBengala}
          tamanho={280}
          cor={tokens.color.primaria}
          opacidade={0.16}
          variante="a"
          atraso="0s"
          atrasoEntrada={0}
          reveladoInicial
          posicao={{ top: '-230px', right: 'clamp(-48px, -2vw, -20px)' }}
        />
      </div>

      <ServicesSection />

      {/*
       * Onda 2 — Dunas → Câmara do Trono:
       * A areia dos Lençóis cede espaço ao manto vermelho da Encantaria.
       * variante "b" invertida: perfil assimétrico de duna, recortado em escarlate.
       */}
      <DivisorOnda
        corTopo={COR.areiaLencois}
        corFundo={COR.vinhoEscarlate}
        variante="b"
        altura={48}
        invertido
      />

      <ContactCTA />
      <TestimonialsSection />

      {/*
       * Onda 3 — Manto → Luz:
       * O carmesim profundo abre-se para o branco ritual da seção Sobre.
       * variante "c": maré calma chegando à margem — suave, não abrupta.
       */}
      <DivisorOnda
        corTopo={COR.vinhoEscarlate}
        corFundo={COR.brancoRitual}
        variante="c"
        altura={64}
      />

      <AboutSection />
      <FaqSection />

      {/*
       * Onda 4 — Luz → Areia:
       * O branco dos rituais desliza para o creme suave da seção de Contato.
       * variante "d" invertida: ondulação dupla e rítmica — convite para chegar.
       */}
      <DivisorOnda
        corTopo={COR.brancoRitual}
        corFundo={COR.cremeSuave}
        variante="d"
        altura={52}
        invertido
      />

      <ContactSection />
    </div>
  );
}
