import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceCard } from '../../../../components/ui/ServiceCard/ServiceCard';
import { DivisorOrnamental } from '../../../../components/ui/DivisorOrnamental/DivisorOrnamental';
import { OrnatoFlutuante } from '../../../../components/ui/OrnatoFlutuante/OrnatoFlutuante';
import {
  IconEspadaVermelha,
  IconBengala,
  IconGuardaSol,
  IconCruzCristo,
} from '../../../../assets/icons/SimbolosReiSebastiao';
import { usePublicCatalog } from '../../../../hooks/usePublicCatalog';
import { formatMoney } from '../../../../lib/money';
import { tokens } from '../../../../design-system/tokens.css';
import { getCategoryContent } from '../../ServiceCategoryPage/categoryContent';
import {
  servicesSectionContainer,
  sectionHeader,
  sectionTitle,
  sectionSubtitle,
  gridContainer,
  categoriasContainer,
  messageContainer,
  errorText,
} from './ServicesSection.css';

type IconeProps = { size?: number; color?: string; 'aria-hidden'?: boolean };

const ICONE_POR_CATEGORIA: Record<string, React.ComponentType<IconeProps>> = {
  consultas: IconEspadaVermelha,
  rituais: IconGuardaSol,
};

export function ServicesSection(): React.ReactElement {
  const navigate = useNavigate();
  const { data: catalogo, isLoading, isError } = usePublicCatalog();
  const categoriasVisiveis =
    catalogo?.gruposPorCategoria.filter((g) => getCategoryContent(g.categoria.slug)) ?? [];

  const handleSaibaMais = (slugCategoria: string) => {
    navigate(`/servicos/${slugCategoria}`);
  };

  return (
    <section id="servicos" className={servicesSectionContainer} aria-labelledby="services-title">
      <OrnatoFlutuante
        Icon={IconCruzCristo}
        tamanho={160}
        cor={tokens.color.secundaria}
        opacidade={0.04}
        variante="a"
        atraso="1s"
        posicao={{ top: '40%', left: '-2%' }}
      />

      <div className={sectionHeader}>
        <DivisorOrnamental
          Icon={IconEspadaVermelha}
          cor={tokens.color.acento.dourado}
          tamanhoIcone={22}
        />
        <h2 id="services-title" className={sectionTitle}>
          Nossos Trabalhos
        </h2>
        <p className={sectionSubtitle}>
          Conheça os principais trabalhos espirituais realizados no Terreiro de Rei Sebastião,
          conduzidos sob os fundamentos da Encantaria Maranhense e da Família do Lençol.
        </p>
      </div>

      {isLoading && (
        <div className={messageContainer} aria-live="polite">
          Carregando serviços disponíveis...
        </div>
      )}

      {isError && (
        <div className={`${messageContainer} ${errorText}`} aria-live="assertive">
          Não foi possível carregar os serviços no momento. Por favor, tente novamente mais tarde.
        </div>
      )}

      {!isLoading && !isError && categoriasVisiveis.length > 0 && (
        <div className={categoriasContainer}>
          <div className={gridContainer}>
            {categoriasVisiveis.map((grupo) => {
              const conteudo = getCategoryContent(grupo.categoria.slug);
              if (!conteudo) return null;

              const menorPreco = Math.min(...grupo.servicos.map((s) => s.priceCents));
              const resumoQuantidade =
                grupo.servicos.length === 1
                  ? '1 trabalho disponível'
                  : `${grupo.servicos.length} trabalhos disponíveis`;

              const Icone = ICONE_POR_CATEGORIA[grupo.categoria.slug] ?? IconBengala;

              return (
                <ServiceCard
                  key={grupo.categoria.id}
                  titulo={grupo.categoria.name}
                  descricao={conteudo.descricaoCard}
                  precoFormatado={`A partir de ${formatMoney(menorPreco)}`}
                  duracaoFormatada={resumoQuantidade}
                  rotuloBotao="Saiba mais"
                  Icone={Icone}
                  aoClicarAgendar={() => handleSaibaMais(grupo.categoria.slug)}
                />
              );
            })}
          </div>
        </div>
      )}

      {!isLoading && !isError && categoriasVisiveis.length === 0 && (
        <div className={messageContainer}>Nenhum serviço disponível no momento.</div>
      )}
    </section>
  );
}
