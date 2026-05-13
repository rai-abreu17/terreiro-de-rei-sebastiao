import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { DivisorOrnamental } from '../../../components/ui/DivisorOrnamental/DivisorOrnamental';
import { OrnatoFlutuante } from '../../../components/ui/OrnatoFlutuante/OrnatoFlutuante';
import {
  IconBengala,
  IconCruzCristo,
  IconEspadaVermelha,
  IconGuardaSol,
  IconTambor,
  IconToalhaBranca,
} from '../../../assets/icons/SimbolosReiSebastiao';
import { tokens } from '../../../design-system/tokens.css';
import { usePublicCatalog } from '../../../hooks/usePublicCatalog';
import { formatMoney } from '../../../lib/money';
import { DivisorOnda } from '../../../components/ui/DivisorOnda/DivisorOnda';
import { FaqSection } from '../Home/FaqSection/FaqSection';
import {
  type CategoriaPublicaSlug,
  getCategoryContent,
} from '../ServiceCategoryPage/categoryContent';
import { getServiceContent } from './serviceContent';
import * as styles from '../ServiceCategoryPage/ServiceCategoryPage.css';

/*
 * Cores de fundo — espelham ServiceCategoryPage.css.ts.
 * Nesta página a ordem é: Hero → section (white) → sectionAlt (cream)
 * → section (white) → sectionDark (crimson) → FAQ → section.
 * A onda 2 parte de branco (não creme), diferente da página de categoria.
 */
const COR = {
  heroNavy: '#0D1F3C',
  branco: '#FFFFFF',
  cremeSuave: '#F9F7F5',
  vinho: '#6B1A1A',
} as const;

function resolverResumoModalidades(modalidades: readonly string[]): string {
  const conjunto = new Set(modalidades);
  if (conjunto.has('ONLINE') && conjunto.has('IN_PERSON')) return 'Online e presencial';
  if (conjunto.has('ONLINE')) return 'Online';
  if (conjunto.has('IN_PERSON')) return 'Presencial';
  return 'Sob consulta';
}

export function ServiceDetailPage(): React.ReactElement {
  const { categorySlug, serviceSlug } = useParams<{
    categorySlug: string;
    serviceSlug: string;
  }>();
  const { data: catalogo, isLoading, isError } = usePublicCatalog();

  if (!categorySlug || !serviceSlug) return <Navigate to="/" replace />;

  const conteudoCategoria = getCategoryContent(categorySlug);
  const conteudoServico = getServiceContent(serviceSlug, categorySlug as CategoriaPublicaSlug);

  if (!conteudoCategoria || !conteudoServico) return <Navigate to="/" replace />;

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
    catalogo?.gruposPorCategoria.find((g) => g.categoria.slug === categorySlug) ?? null;
  const servico = grupoCategoria?.servicos.find((item) => item.slug === serviceSlug) ?? null;

  if (isError || !grupoCategoria || !servico) {
    return <Navigate to={`/servicos/${categorySlug}`} replace />;
  }

  const resumoModalidade = resolverResumoModalidades(servico.modalities);

  return (
    <div className={styles.pageContainer}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
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
        <OrnatoFlutuante
          Icon={IconBengala}
          tamanho={130}
          cor={tokens.color.acento.dourado}
          opacidade={0.07}
          variante="c"
          atraso="1s"
          posicao={{ top: '55%', left: '38%' }}
        />

        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <Link to={`/servicos/${categorySlug}#servicos`} className={styles.backLink}>
              ← Voltar aos serviços da categoria
            </Link>
            <p className={styles.eyebrow}>{grupoCategoria.categoria.name}</p>
            <h1 className={styles.heroTitle}>{servico.name}</h1>
            <p className={styles.heroSubtitle}>{conteudoServico.subtituloPagina}</p>

            <div className={styles.signalsBlock}>
              <h2 className={styles.signalsTitle}>Talvez este trabalho faça sentido porque...</h2>
              <div className={styles.sinaisContainer}>
                {conteudoServico.sinais.map((sinal, i) => (
                  <div key={sinal} className={styles.signalItemWrapper}>
                    <span className={styles.signalNumero} aria-hidden="true">{i + 1}</span>
                    <p className={styles.signalItemTexto}>{sinal}</p>
                  </div>
                ))}
              </div>
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

            <Link to={`/agendar?servicoId=${servico.id}`} className={styles.primaryAction}>
              Agendar agora
            </Link>
          </aside>
        </div>
      </section>

      {/* Onda 1 — Oceano → Luz */}
      <DivisorOnda corTopo={COR.heroNavy} corFundo={COR.branco} variante="a" altura={64} />

      {/* ── Como é feito ──────────────────────────────────────────────────── */}
      <section id="sobre" className={styles.section}>
        <OrnatoFlutuante
          Icon={IconCruzCristo}
          tamanho={180}
          cor={tokens.color.primaria}
          opacidade={0.04}
          variante="b"
          atraso="0.5s"
          posicao={{ bottom: '-5%', right: '-3%' }}
        />
        <div className={styles.sectionInner}>
          <div className={styles.sectionGrid}>
            <div className={styles.richTextBlock}>
              <DivisorOrnamental Icon={IconBengala} cor={tokens.color.primaria} tamanhoIcone={20} />
              <h2 className={styles.sectionTitle}>{conteudoServico.comoTitulo}</h2>
              {conteudoServico.comoParagrafos.map((p) => (
                <p key={p} className={styles.sectionParagraph}>{p}</p>
              ))}
            </div>

            <aside className={styles.topicsPanel}>
              <h3 className={styles.topicsTitle}>{conteudoServico.tematicasTitulo}</h3>
              <div className={styles.topicsGrid}>
                {conteudoServico.tematicas.map((t) => (
                  <span key={t} className={styles.topicChip}>{t}</span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Como funciona ─────────────────────────────────────────────────── */}
      <section className={styles.sectionAlt}>
        <OrnatoFlutuante
          Icon={IconGuardaSol}
          tamanho={170}
          cor={tokens.color.secundaria}
          opacidade={0.04}
          variante="a"
          atraso="1s"
          posicao={{ top: '-5%', left: '-3%' }}
        />
        <div className={styles.sectionInner}>
          <div className={styles.richTextBlock}>
            <DivisorOrnamental Icon={IconCruzCristo} cor={tokens.color.acento.dourado} tamanhoIcone={20} />
            <h2 className={styles.sectionTitle}>{conteudoServico.funcionamentoTitulo}</h2>
          </div>

          <div className={styles.highlightsGrid}>
            {conteudoServico.funcionamentoCards.map((item, i) => (
              <article key={`${item.rotulo}-${item.valor}`} className={styles.highlightCard}>
                <span className={styles.highlightNumero} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className={styles.highlightLabel}>{item.rotulo}</p>
                <p className={styles.highlightValue}>{item.valor}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Observação + Quem conduz ─────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionGrid}>
            <div className={styles.observacaoCard}>
              <div className={styles.observacaoIcone}>
                <IconCruzCristo size={18} color={tokens.color.acento.dourado} aria-hidden />
                {conteudoServico.observacaoTitulo}
              </div>
              <p className={styles.sectionParagraph}>{conteudoServico.observacaoTexto}</p>
            </div>

            <div className={styles.richTextBlock}>
              <h2 className={styles.sectionTitle}>{conteudoCategoria.conducaoTitulo}</h2>
              <p className={styles.sectionParagraph}>{conteudoCategoria.conducaoTexto}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Onda 2 — Luz → Manto: branco cede ao carmesim dos Depoimentos */}
      <DivisorOnda corTopo={COR.branco} corFundo={COR.vinho} variante="b" altura={72} invertido />

      {/* ── Depoimentos ──────────────────────────────────────────────────── */}
      <section className={styles.sectionDark}>
        <OrnatoFlutuante
          Icon={IconTambor}
          tamanho={240}
          cor={tokens.color.texto.invertido}
          opacidade={0.05}
          variante="c"
          atraso="0s"
          posicao={{ bottom: '-8%', right: '-3%' }}
        />
        <OrnatoFlutuante
          Icon={IconEspadaVermelha}
          tamanho={150}
          cor={tokens.color.acento.dourado}
          opacidade={0.06}
          variante="a"
          atraso="1.5s"
          posicao={{ top: '-6%', left: '-2%' }}
        />
        <div className={styles.sectionInner}>
          <div className={styles.richTextBlock}>
            <DivisorOrnamental Icon={IconToalhaBranca} cor={tokens.color.acento.dourado} tamanhoIcone={22} />
            <h2 className={styles.sectionTitleDark}>Depoimentos</h2>
            <p className={styles.sectionParagraphDark}>
              Palavras de quem encontrou acolhimento, clareza e direção na Casa.
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            {conteudoCategoria.depoimentos.map((depoimento) => (
              <article key={`${depoimento.autor}-${depoimento.texto}`} className={styles.testimonialCard}>
                <span className={styles.aspasDecorative} aria-hidden="true">"</span>
                <p className={styles.testimonialText}>{depoimento.texto}</p>
                <footer className={styles.testimonialFooter}>
                  <span className={styles.testimonialTraco} aria-hidden="true">—</span>
                  <span className={styles.testimonialAuthor}>{depoimento.autor}</span>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Onda 3 — Manto → Ritual: carmesim abre para o branco das perguntas */}
      <DivisorOnda corTopo={COR.vinho} corFundo={COR.branco} variante="c" altura={64} />

      <FaqSection titulo={conteudoServico.faqTitulo} itensFaq={conteudoServico.faqItens} />

      {/* ── CTA final ─────────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.ctaCard}>
            <DivisorOrnamental Icon={IconBengala} cor={tokens.color.acento.dourado} tamanhoIcone={20} />
            <h2 className={styles.sectionTitleDark}>{conteudoServico.ctaTitulo}</h2>
            <p className={styles.sectionParagraphDark}>{conteudoServico.ctaTexto}</p>
            <div className={styles.ctaActions}>
              <Link to={`/agendar?servicoId=${servico.id}`} className={styles.primaryAction}>
                Agendar agora
              </Link>
              <Link to={`/servicos/${categorySlug}#servicos`} className={styles.secondaryAction}>
                Ver outros serviços desta categoria
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
