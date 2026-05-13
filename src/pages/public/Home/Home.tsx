import React from 'react';
import { HeroSection } from './HeroSection/HeroSection';
import { AboutSection } from './AboutSection/AboutSection';
import { ContactSection } from './ContactSection/ContactSection';
import { ContactCTA } from './ContactCTA/ContactCTA';
import { FaqSection } from './FaqSection/FaqSection';
import { ServicesSection } from './ServicesSection/ServicesSection';
import { TestimonialsSection } from './TestimonialsSection/TestimonialsSection';
import { OrnatoFlutuante } from '../../../components/ui/OrnatoFlutuante/OrnatoFlutuante';
import { IconBengala, IconGuardaSol } from '../../../assets/icons/SimbolosReiSebastiao';
import { tokens } from '../../../design-system/tokens.css';
import { homeContainer } from './Home.css';

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
      <OrnatoFlutuante
        Icon={IconBengala}
        tamanho={180}
        cor={tokens.color.neutral[400]}
        opacidade={0.07}
        variante="a"
        atraso="0s"
        atrasoEntrada={0}
        posicao={{ top: '38%', right: '-2%' }}
      />

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
      <ServicesSection />
      <ContactCTA />
      <TestimonialsSection />
      <AboutSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}
