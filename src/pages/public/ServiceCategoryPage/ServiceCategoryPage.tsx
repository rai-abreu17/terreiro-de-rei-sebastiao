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
  IconTambor,
  IconToalhaBranca,
} from '../../../assets/icons/SimbolosReiSebastiao';
import { tokens } from '../../../design-system/tokens.css';
import { usePublicCatalog } from '../../../hooks/usePublicCatalog';
import { formatMoney } from '../../../lib/money';
import { FaqSection } from '../Home/FaqSection/FaqSection';
import { getCategoryContent } from './categoryContent';
import * as styles from './ServiceCategoryPage.css';

function resolverResumoModalidades(modalidades: readonly string[]): string {
  const conjunto = new Set(modalidades);
  if (conjunto.has('ONLINE') && conjunto.has('IN_PERSON')) return 'Online e presencial';
  if (conjunto.has('ONLINE')) return 'Online';
  if (conjunto.has('IN_PERSON')) return 'Presencial';
  return 'Sob consulta';
}

function resolverFaixaInvestimento(precos: readonly number[]): string {
  if (precos.length === 0) return 'Sob consulta';
  const menor = Math.min(...precos);
  const maior = Math.max(...precos);
  if (menor === maior) return formatMoney(menor);
  return `${formatMoney(menor)} a ${formatMoney(maior)}`;
}

export function ServiceCategoryPage(): React.ReactElement {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  const conteudo = categorySlug ? getCategoryContent(categorySlug) : null;
  const { data: catalogo, isLoading, isError } = usePublicCatalog();

  if (!categorySlug || !conteudo) return <Navigate to="/" replace />;

  const grupoCategoria =
    catalogo?.gruposPorCategoria.find((g) => g.categoria.slug === categorySlug) ?? null;
  const servicos = grupoCategoria?.servicos ?? [];
  const modalidades = servicos.flatMap((s) => s.modalities);
  const precos = servicos.map((s) => s.priceCents);
  const resumoModalidades = resolverResumoModalidades(modalidades);
  const faixaInvestimento = resolverFaixaInvestimento(precos);
  const resumoQuantidade =
    servicos.length === 1 ? '1 trabalho disponível' : `${servicos.length} trabalhos disponíveis`;

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
          Icon={IconToalhaBranca}
          tamanho={140}
          cor={tokens.color.acento.dourado}
          opacidade={0.07}
          variante="c"
          atraso="1s"
          posicao={{ top: '60%', left: '40%' }}
        />

        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <Link to="/#servicos" className={styles.backLink}>← Voltar aos serviços</Link>
            <p className={styles.eyebrow}>Serviços do Terreiro</p>
            <h1 className={styles.heroTitle}>{conteudo.tituloPagina}</h1>
            <p className={styles.heroSubtitle}>{conteudo.subtituloPagina}</p>

            <div className={styles.signalsBlock}>
              <h2 className={styles.signalsTitle}>Talvez você esteja aqui porque...</h2>
              <div className={styles.sinaisContainer}>
                {conteudo.sinais.map((sinal, i) => (
                  <div key={sinal} className={styles.signalItemWrapper}>
                    <span className={styles.signalNumero} aria-hidden="true">{i + 1}</span>
                    <p className={styles.signalItemTexto}>{sinal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className={styles.heroAside}>
            <h2 className={styles.asideTitle}>Visão geral da categoria</h2>
            <p className={styles.asideText}>{conteudo.resumoHero}</p>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Trabalhos</span>
                <strong className={styles.statValue}>
                  {isLoading ? 'Carregando...' : resumoQuantidade}
                </strong>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Modalidade</span>
                <strong className={styles.statValue}>
                  {isLoading ? 'Carregando...' : resumoModalidades}
                </strong>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Investimento</span>
                <strong className={styles.statValue}>
                  {isLoading ? 'Carregando...' : faixaInvestimento}
                </strong>
              </div>
            </div>

            <Link to="/agendar" className={styles.primaryAction}>Agendar agora</Link>
          </aside>
        </div>
      </section>

      {/* ── Como é feito ──────────────────────────────────────────────────── */}
      <section id="sobre" className={styles.section}>
        <OrnatoFlutuante
          Icon={IconBengala}
          tamanho={200}
          cor={tokens.color.primaria}
          opacidade={0.05}
          variante="b"
          atraso="0.5s"
          posicao={{ bottom: '-5%', right: '-3%' }}
        />
        <div className={styles.sectionInner}>
          <div className={styles.sectionGrid}>
            <div className={styles.richTextBlock}>
              <DivisorOrnamental Icon={IconBengala} cor={tokens.color.primaria} tamanhoIcone={20} />
              <h2 className={styles.sectionTitle}>{conteudo.comoTitulo}</h2>
              {conteudo.comoParagrafos.map((p) => (
                <p key={p} className={styles.sectionParagraph}>{p}</p>
              ))}
            </div>

            <aside className={styles.topicsPanel}>
              <h3 className={styles.topicsTitle}>{conteudo.tematicasTitulo}</h3>
              <div className={styles.topicsGrid}>
                {conteudo.tematicas.map((t) => (
                  <span key={t} className={styles.topicChip}>{t}</span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Como funciona a sessão ────────────────────────────────────────── */}
      <section className={styles.sectionAlt}>
        <OrnatoFlutuante
          Icon={IconCruzCristo}
          tamanho={180}
          cor={tokens.color.secundaria}
          opacidade={0.04}
          variante="a"
          atraso="1s"
          posicao={{ top: '-5%', left: '-3%' }}
        />
        <div className={styles.sectionInner}>
          <div className={styles.richTextBlock}>
            <DivisorOrnamental Icon={IconCruzCristo} cor={tokens.color.acento.dourado} tamanhoIcone={20} />
            <h2 className={styles.sectionTitle}>{conteudo.funcionamentoTitulo}</h2>
          </div>

          <div className={styles.highlightsGrid}>
            {conteudo.funcionamentoCards.map((item, i) => (
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

      {/* ── Trabalhos disponíveis ─────────────────────────────────────────── */}
      <section id="servicos" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.richTextBlock}>
            <DivisorOrnamental Icon={IconEspadaVermelha} cor={tokens.color.primaria} tamanhoIcone={20} />
            <h2 className={styles.sectionTitle}>Trabalhos disponíveis nesta categoria</h2>
            <p className={styles.sectionParagraph}>
              Cada trabalho mantém o fundamento da categoria, com duração, valor e modalidade próprios.
            </p>
          </div>

          {isLoading && (
            <div className={styles.stateBox}>Carregando os trabalhos desta categoria...</div>
          )}
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
                  aoClicarAgendar={() => navigate(`/servicos/${categorySlug}/${servico.slug}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Observação + Quem conduz ─────────────────────────────────────── */}
      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionGrid}>
            <div className={styles.observacaoCard}>
              <div className={styles.observacaoIcone}>
                <IconCruzCristo size={18} color={tokens.color.acento.dourado} aria-hidden />
                {conteudo.observacaoTitulo}
              </div>
              <p className={styles.sectionParagraph}>{conteudo.observacaoTexto}</p>
            </div>

            <div className={styles.richTextBlock}>
              <h2 className={styles.sectionTitle}>{conteudo.conducaoTitulo}</h2>
              <p className={styles.sectionParagraph}>{conteudo.conducaoTexto}</p>
            </div>
          </div>
        </div>
      </section>

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
          Icon={IconGuardaSol}
          tamanho={160}
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
              Palavras de quem encontrou acolhimento, clareza e direcionamento na Casa.
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            {conteudo.depoimentos.map((depoimento) => (
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

      <FaqSection titulo={conteudo.faqTitulo} itensFaq={conteudo.faqItens} />

      {/* ── CTA final ─────────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.ctaCard}>
            <DivisorOrnamental Icon={IconEspadaVermelha} cor={tokens.color.acento.dourado} tamanhoIcone={20} />
            <h2 className={styles.sectionTitleDark}>{conteudo.ctaTitulo}</h2>
            <p className={styles.sectionParagraphDark}>{conteudo.ctaTexto}</p>
            <div className={styles.ctaActions}>
              <Link to="/agendar" className={styles.primaryAction}>Agendar agora</Link>
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
