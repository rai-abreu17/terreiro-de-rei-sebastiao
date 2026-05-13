import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
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
import {
  type CategoriaPublicaSlug,
  getCategoryContent,
} from '../ServiceCategoryPage/categoryContent';
import { getServiceContent } from './serviceContent';
import * as styles from '../ServiceCategoryPage/ServiceCategoryPage.css';

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

export function ServiceDetailPage(): React.ReactElement {
  const { categorySlug, serviceSlug } = useParams<{
    categorySlug: string;
    serviceSlug: string;
  }>();
  const { data: catalogo, isLoading, isError } = usePublicCatalog();

  if (!categorySlug || !serviceSlug) {
    return <Navigate to="/" replace />;
  }

  const conteudoCategoria = getCategoryContent(categorySlug);
  const conteudoServico = getServiceContent(
    serviceSlug,
    categorySlug as CategoriaPublicaSlug
  );

  if (!conteudoCategoria || !conteudoServico) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className={styles.pageContainer}>
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.stateBox}>Carregando as informações deste trabalho...</div>
          </div>
        </section>
      </div>
    );
  }

  const grupoCategoria =
    catalogo?.gruposPorCategoria.find((grupo) => grupo.categoria.slug === categorySlug) ?? null;
  const servico = grupoCategoria?.servicos.find((item) => item.slug === serviceSlug) ?? null;

  if (isError || !grupoCategoria || !servico) {
    return <Navigate to={`/servicos/${categorySlug}`} replace />;
  }

  const resumoModalidade = resolverResumoModalidades(servico.modalities);

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
            <Link
              to={`/servicos/${categorySlug}#servicos`}
              className={styles.backLink}
            >
              Voltar aos serviços da categoria
            </Link>
            <p className={styles.eyebrow}>{grupoCategoria.categoria.name}</p>
            <h1 className={styles.heroTitle}>{servico.name}</h1>
            <p className={styles.heroSubtitle}>{conteudoServico.subtituloPagina}</p>

            <div className={styles.signalsBlock}>
              <h2 className={styles.signalsTitle}>Talvez este trabalho faça sentido porque...</h2>
              <ul className={styles.signalsList}>
                {conteudoServico.sinais.map((sinal) => (
                  <li key={sinal} className={styles.signalItem}>
                    {sinal}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className={styles.heroAside}>
            <h2 className={styles.asideTitle}>Visão geral do atendimento</h2>
            <p className={styles.asideText}>{conteudoServico.resumoHero}</p>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Duração</span>
                <strong className={styles.statValue}>{servico.durationMin} minutos</strong>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Modalidade</span>
                <strong className={styles.statValue}>{resumoModalidade}</strong>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Investimento</span>
                <strong className={styles.statValue}>{formatMoney(servico.priceCents)}</strong>
              </div>
            </div>

            <Link
              to={`/agendar?servicoId=${servico.id}`}
              className={styles.primaryAction}
            >
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
              <h2 className={styles.sectionTitle}>{conteudoServico.comoTitulo}</h2>
              {conteudoServico.comoParagrafos.map((paragrafo) => (
                <p key={paragrafo} className={styles.sectionParagraph}>
                  {paragrafo}
                </p>
              ))}
            </div>

            <aside className={styles.topicsPanel}>
              <h3 className={styles.topicsTitle}>{conteudoServico.tematicasTitulo}</h3>
              <div className={styles.topicsGrid}>
                {conteudoServico.tematicas.map((tematica) => (
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
            <h2 className={styles.sectionTitle}>{conteudoServico.funcionamentoTitulo}</h2>
          </div>

          <div className={styles.highlightsGrid}>
            {conteudoServico.funcionamentoCards.map((item) => (
              <article key={`${item.rotulo}-${item.valor}`} className={styles.highlightCard}>
                <p className={styles.highlightLabel}>{item.rotulo}</p>
                <p className={styles.highlightValue}>{item.valor}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionGrid}>
            <div className={styles.richTextBlock}>
              <h2 className={styles.sectionTitle}>{conteudoServico.observacaoTitulo}</h2>
              <p className={styles.sectionParagraph}>{conteudoServico.observacaoTexto}</p>
            </div>

            <div className={styles.richTextBlock}>
              <h2 className={styles.sectionTitle}>{conteudoCategoria.conducaoTitulo}</h2>
              <p className={styles.sectionParagraph}>{conteudoCategoria.conducaoTexto}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark}>
        <div className={styles.sectionInner}>
          <div className={styles.richTextBlock}>
            <h2 className={styles.sectionTitleDark}>Depoimentos</h2>
            <p className={styles.sectionParagraphDark}>
              Palavras de quem encontrou acolhimento, clareza e direção na Casa.
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            {conteudoCategoria.depoimentos.map((depoimento) => (
              <article key={`${depoimento.autor}-${depoimento.texto}`} className={styles.testimonialCard}>
                <p className={styles.testimonialText}>“{depoimento.texto}”</p>
                <span className={styles.testimonialAuthor}>{depoimento.autor}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        titulo={conteudoServico.faqTitulo}
        itensFaq={conteudoServico.faqItens}
      />

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.ctaCard}>
            <h2 className={styles.sectionTitleDark}>{conteudoServico.ctaTitulo}</h2>
            <p className={styles.sectionParagraphDark}>{conteudoServico.ctaTexto}</p>
            <div className={styles.ctaActions}>
              <Link
                to={`/agendar?servicoId=${servico.id}`}
                className={styles.primaryAction}
              >
                Agendar agora
              </Link>
              <Link
                to={`/servicos/${categorySlug}#servicos`}
                className={styles.secondaryAction}
              >
                Ver outros serviços desta categoria
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}