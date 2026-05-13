import React from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ServiceCard } from '../../../components/ui/ServiceCard/ServiceCard';
import { DivisorOrnamental } from '../../../components/ui/DivisorOrnamental/DivisorOrnamental';
import { OrnatoFlutuante } from '../../../components/ui/OrnatoFlutuante/OrnatoFlutuante';
import {
  IconBengala,
  IconCruzCristo,
  IconEspadaVermelha,
  IconGuardaSol,
} from '../../../assets/icons/SimbolosReiSebastiao';
import { tokens } from '../../../design-system/tokens.css';
import { usePublicCatalog } from '../../../hooks/usePublicCatalog';
import { formatMoney } from '../../../lib/money';
import { FaqSection } from '../Home/FaqSection/FaqSection';
import { getCategoryContent } from './categoryContent';
import * as styles from './ServiceCategoryPage.css';

function resolverResumoModalidades(modalidades: readonly string[]): string {
  const conjunto = new Set(modalidades);

  if (conjunto.has('ONLINE') && conjunto.has('IN_PERSON')) {
    return 'Online e presencial';
  }

  if (conjunto.has('ONLINE')) {
    return 'Online';
  }

  if (conjunto.has('IN_PERSON')) {
    return 'Presencial';
  }

  return 'Sob consulta';
}

function resolverFaixaInvestimento(precos: readonly number[]): string {
  if (precos.length === 0) {
    return 'Sob consulta';
  }

  const menor = Math.min(...precos);
  const maior = Math.max(...precos);

  if (menor === maior) {
    return formatMoney(menor);
  }

  return `${formatMoney(menor)} a ${formatMoney(maior)}`;
}

export function ServiceCategoryPage(): React.ReactElement {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  const conteudo = categorySlug ? getCategoryContent(categorySlug) : null;
  const { data: catalogo, isLoading, isError } = usePublicCatalog();

  if (!categorySlug || !conteudo) {
    return <Navigate to="/" replace />;
  }

  const grupoCategoria =
    catalogo?.gruposPorCategoria.find((grupo) => grupo.categoria.slug === categorySlug) ?? null;
  const servicos = grupoCategoria?.servicos ?? [];
  const modalidades = servicos.flatMap((servico) => servico.modalities);
  const precos = servicos.map((servico) => servico.priceCents);
  const resumoModalidades = resolverResumoModalidades(modalidades);
  const faixaInvestimento = resolverFaixaInvestimento(precos);
  const resumoQuantidade =
    servicos.length === 1 ? '1 trabalho disponível' : `${servicos.length} trabalhos disponíveis`;

  return (
    <div className={styles.pageContainer}>
      <section className={styles.heroSection}>
        <OrnatoFlutuante
          Icon={IconEspadaVermelha}
          tamanho={220}
          cor={tokens.color.texto.invertido}
          opacidade={0.08}
          variante="a"
          atraso="0s"
          posicao={{ top: '14%', left: '-2%' }}
        />
        <OrnatoFlutuante
          Icon={IconGuardaSol}
          tamanho={260}
          cor={tokens.color.texto.invertido}
          opacidade={0.06}
          variante="b"
          atraso="2s"
          posicao={{ bottom: '-10%', right: '-2%' }}
        />

        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <Link to="/#servicos" className={styles.backLink}>
              Voltar aos serviços
            </Link>
            <p className={styles.eyebrow}>Serviços do Terreiro</p>
            <h1 className={styles.heroTitle}>{conteudo.tituloPagina}</h1>
            <p className={styles.heroSubtitle}>{conteudo.subtituloPagina}</p>

            <div className={styles.signalsBlock}>
              <h2 className={styles.signalsTitle}>Talvez você esteja aqui porque...</h2>
              <ul className={styles.signalsList}>
                {conteudo.sinais.map((sinal) => (
                  <li key={sinal} className={styles.signalItem}>
                    {sinal}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className={styles.heroAside}>
            <h2 className={styles.asideTitle}>Visão geral da categoria</h2>
            <p className={styles.asideText}>{conteudo.resumoHero}</p>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Trabalhos</span>
                <strong className={styles.statValue}>{isLoading ? 'Carregando...' : resumoQuantidade}</strong>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Modalidade</span>
                <strong className={styles.statValue}>{isLoading ? 'Carregando...' : resumoModalidades}</strong>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Investimento</span>
                <strong className={styles.statValue}>{isLoading ? 'Carregando...' : faixaInvestimento}</strong>
              </div>
            </div>

            <Link to="/agendar" className={styles.primaryAction}>
              Agendar agora
            </Link>
          </aside>
        </div>
      </section>

      <section id="sobre" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionGrid}>
            <div className={styles.richTextBlock}>
              <DivisorOrnamental
                Icon={IconBengala}
                cor={tokens.color.primaria}
                tamanhoIcone={20}
              />
              <h2 className={styles.sectionTitle}>{conteudo.comoTitulo}</h2>
              {conteudo.comoParagrafos.map((paragrafo) => (
                <p key={paragrafo} className={styles.sectionParagraph}>
                  {paragrafo}
                </p>
              ))}
            </div>

            <aside className={styles.topicsPanel}>
              <h3 className={styles.topicsTitle}>{conteudo.tematicasTitulo}</h3>
              <div className={styles.topicsGrid}>
                {conteudo.tematicas.map((tematica) => (
                  <span key={tematica} className={styles.topicChip}>
                    {tematica}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <div className={styles.richTextBlock}>
            <DivisorOrnamental
              Icon={IconCruzCristo}
              cor={tokens.color.acento.dourado}
              tamanhoIcone={20}
            />
            <h2 className={styles.sectionTitle}>{conteudo.funcionamentoTitulo}</h2>
          </div>

          <div className={styles.highlightsGrid}>
            {conteudo.funcionamentoCards.map((item) => (
              <article key={`${item.rotulo}-${item.valor}`} className={styles.highlightCard}>
                <p className={styles.highlightLabel}>{item.rotulo}</p>
                <p className={styles.highlightValue}>{item.valor}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="servicos" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.richTextBlock}>
            <DivisorOrnamental
              Icon={IconEspadaVermelha}
              cor={tokens.color.primaria}
              tamanhoIcone={20}
            />
            <h2 className={styles.sectionTitle}>Trabalhos disponíveis nesta categoria</h2>
            <p className={styles.sectionParagraph}>
              Cada trabalho abaixo mantém o fundamento da categoria, com duração, valor e modalidade próprios.
            </p>
          </div>

          {isLoading && <div className={styles.stateBox}>Carregando os trabalhos desta categoria...</div>}

          {isError && (
            <div className={styles.stateBox}>
              Não foi possível carregar os trabalhos desta categoria no momento.
            </div>
          )}

          {!isLoading && !isError && servicos.length === 0 && (
            <div className={styles.stateBox}>Nenhum trabalho foi publicado nesta categoria ainda.</div>
          )}

          {!isLoading && !isError && servicos.length > 0 && (
            <div className={styles.cardsGrid}>
              {servicos.map((servico) => (
                <ServiceCard
                  key={servico.id}
                  titulo={servico.name}
                  descricao={servico.shortDescription ?? undefined}
                  precoFormatado={formatMoney(servico.priceCents)}
                  duracaoFormatada={`${servico.durationMin} minutos`}
                  rotuloBotao="Saiba mais"
                  aoClicarAgendar={() =>
                    navigate(`/servicos/${categorySlug}/${servico.slug}`)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionGrid}>
            <div className={styles.richTextBlock}>
              <h2 className={styles.sectionTitle}>{conteudo.observacaoTitulo}</h2>
              <p className={styles.sectionParagraph}>{conteudo.observacaoTexto}</p>
            </div>

            <div className={styles.richTextBlock}>
              <h2 className={styles.sectionTitle}>{conteudo.conducaoTitulo}</h2>
              <p className={styles.sectionParagraph}>{conteudo.conducaoTexto}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark}>
        <div className={styles.sectionInner}>
          <div className={styles.richTextBlock}>
            <h2 className={styles.sectionTitleDark}>Depoimentos</h2>
            <p className={styles.sectionParagraphDark}>
              Palavras de quem encontrou acolhimento, clareza e direcionamento na Casa.
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            {conteudo.depoimentos.map((depoimento) => (
              <article key={`${depoimento.autor}-${depoimento.texto}`} className={styles.testimonialCard}>
                <p className={styles.testimonialText}>“{depoimento.texto}”</p>
                <span className={styles.testimonialAuthor}>{depoimento.autor}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FaqSection titulo={conteudo.faqTitulo} itensFaq={conteudo.faqItens} />

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.ctaCard}>
            <h2 className={styles.sectionTitleDark}>{conteudo.ctaTitulo}</h2>
            <p className={styles.sectionParagraphDark}>{conteudo.ctaTexto}</p>
            <div className={styles.ctaActions}>
              <Link to="/agendar" className={styles.primaryAction}>
                Agendar agora
              </Link>
              <Link to={`/servicos/${categorySlug}#faq`} className={styles.secondaryAction}>
                Ver dúvidas frequentes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}