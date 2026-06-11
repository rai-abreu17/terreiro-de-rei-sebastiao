import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, MoreHorizontal, Search, List as ListIcon, Check, AlertTriangle } from 'lucide-react';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Drawer } from '@/components/ui/Drawer/Drawer';
import type { FiltrosServicoAdmin, RespostaServico, TipoServico } from '@/api/catalog.types';
import { useCategories, useServices } from '@/hooks/useCatalog';
import { formatMoney } from '@/lib/money';
import * as styles from './ServiceList.css';

const TAMANHO_PAGINA = 20;

const TODOS_TIPOS: TipoServico[] = ['CONSULTATION', 'RITUAL'];

const ROTULOS_TIPO: Record<TipoServico, string> = {
  CONSULTATION: 'Consultas',
  RITUAL: 'Rituais',
};

const ROTULOS_MODALIDADE: Record<string, string> = {
  ONLINE: 'Online',
  IN_PERSON: 'Presencial',
};

export function ServiceList() {
  const { isMobile, isTablet } = useBreakpoint();
  const { data: categories = [] } = useCategories();

  /** Chips de tipo — todos ativos por padrão. */
  const [tiposAtivos, setTiposAtivos] = useState<Set<TipoServico>>(
    () => new Set(TODOS_TIPOS),
  );

  /** Chips de categoria — inicializados com todas quando carregam. */
  const [categoriasAtivas, setCategoriasAtivas] = useState<Set<string> | null>(null);

  const idsTodasCategorias = useMemo(
    () => new Set(categories.map((c) => c.id)),
    [categories],
  );

  useEffect(() => {
    if (categories.length > 0 && categoriasAtivas === null) {
      setCategoriasAtivas(new Set(categories.map((c) => c.id)));
    }
  }, [categories, categoriasAtivas]);

  const categoriasEfetivas = categoriasAtivas ?? idsTodasCategorias;

  /** Filtros enviados à API. */
  const filtrosApi = useMemo<FiltrosServicoAdmin>(() => {
    return {
      page: 0,
      size: TAMANHO_PAGINA,
      sort: 'displayOrder,asc',
      ...(tiposAtivos.size === 1 ? { type: [...tiposAtivos][0] } : {}),
      ...(categoriasEfetivas.size === 1
        ? { categoryId: [...categoriasEfetivas][0] }
        : {}),
    };
  }, [tiposAtivos, categoriasEfetivas]);

  const {
    data: servicesPage,
    isLoading,
    isFetching,
  } = useServices(filtrosApi);

  /** Filtragem local para estados multi-select intermediários. */
  const servicosFiltrados = useMemo(() => {
    if (!servicesPage?.content) return [];

    const todosOsTipos = tiposAtivos.size === TODOS_TIPOS.length;
    const todasAsCategorias = categoriasEfetivas.size === idsTodasCategorias.size;

    if (todosOsTipos && todasAsCategorias) return servicesPage.content;

    return servicesPage.content.filter((s) => {
      const tipoOk = tiposAtivos.has(s.type);
      const catOk = categoriasEfetivas.has(s.category.id);
      return tipoOk && catOk;
    });
  }, [servicesPage, tiposAtivos, categoriasEfetivas, idsTodasCategorias]);

  const navigate = useNavigate();
  const totalServicos = servicosFiltrados.length;

  const filtrosEstaoAtivos =
    tiposAtivos.size < TODOS_TIPOS.length ||
    categoriasEfetivas.size < idsTodasCategorias.size;

  /** Controle: apenas uma confirmação de toggle ativa por vez na tabela. */
  const [idConfirmacaoAtiva, setIdConfirmacaoAtiva] = useState<string | null>(null);

  /** Toggle de chip de tipo — impede esvaziar o set. */
  const alternarTipo = useCallback((tipo: TipoServico) => {
    setTiposAtivos((prev) => {
      const novo = new Set(prev);
      if (novo.has(tipo)) {
        if (novo.size <= 1) return prev;
        novo.delete(tipo);
      } else {
        novo.add(tipo);
      }
      return novo;
    });
  }, []);

  /** Toggle de chip de categoria — impede esvaziar o set. */
  const alternarCategoria = useCallback((id: string) => {
    setCategoriasAtivas((prev) => {
      if (!prev) return prev;
      const novo = new Set(prev);
      if (novo.has(id)) {
        if (novo.size <= 1) return prev;
        novo.delete(id);
      } else {
        novo.add(id);
      }
      return novo;
    });
  }, []);

  /** Restaura todos os chips para o estado padrão (todos ativos). */
  const limparFiltros = useCallback(() => {
    setTiposAtivos(new Set(TODOS_TIPOS));
    setCategoriasAtivas(new Set(categories.map((c) => c.id)));
  }, [categories]);

  return (
    <section className={styles.pagina} aria-labelledby="service-list-heading">
      <header className={styles.cabecalho}>
        <div className={styles.blocoTitulo}>
          <p className={styles.subtitulo}>Painel administrativo · Catálogo</p>
          <h1 className={styles.titulo} id="service-list-heading">
            Catálogo de Serviços
          </h1>
          <p className={styles.descricaoCabecalho}>
            Gerencie os serviços oferecidos pela Casa. Serviços publicados ficam visíveis para agendamento.
          </p>
          <span className={styles.contadorCabecalho}>
            {servicesPage?.totalElements ?? 0} serviços cadastrados
          </span>
        </div>
        <Link className={styles.botaoNovo} to="/admin/catalog/services/new">
          <Plus size={16} aria-hidden="true" />
          Novo Serviço
        </Link>
      </header>

      <div className={styles.painel}>
        {/* ── Chips de filtro ───────────────────────────── */}
        <div className={styles.barraFiltros}>
          <div className={styles.grupoChips}>
            <span className={styles.rotuloChips}>Tipo</span>
            <div className={styles.listaChips} role="group" aria-label="Filtrar por tipo">
              {TODOS_TIPOS.map((tipo) => {
                const ativo = tiposAtivos.has(tipo);
                return (
                  <button
                    key={tipo}
                    type="button"
                    className={ativo ? styles.chipAtivo : styles.chipInativo}
                    onClick={() => alternarTipo(tipo)}
                    aria-pressed={ativo}
                  >
                    {ativo && <Check className={styles.chipCheck} aria-hidden="true" />}
                    {ROTULOS_TIPO[tipo]}
                  </button>
                );
              })}
            </div>
          </div>

          {categories.length > 0 && (
            <div className={styles.grupoChips}>
              <span className={styles.rotuloChips}>Categoria</span>
              <div className={styles.listaChips} role="group" aria-label="Filtrar por categoria">
                {categories.map((cat) => {
                  const ativo = categoriasEfetivas.has(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={ativo ? styles.chipAtivo : styles.chipInativo}
                      onClick={() => alternarCategoria(cat.id)}
                      aria-pressed={ativo}
                    >
                      {ativo && <Check className={styles.chipCheck} aria-hidden="true" />}
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <span className={styles.resumoFiltro}>
            {totalServicos} serviço{totalServicos === 1 ? '' : 's'}
            {isFetching ? ' · Atualizando...' : ''}
          </span>
        </div>

        {/* ── Tabela ────────────────────────────────────── */}
        <div className={styles.tabelaWrapper}>
          {isMobile ? (
            <div className={styles.listaCardsMobile}>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={`${styles.cardMobile} ${styles.skeletonRow}`}>
                    <div className={styles.skeletonTextNome} />
                    <div className={styles.skeletonTextCurto} />
                  </div>
                ))
              ) : servicesPage?.totalElements === 0 && !filtrosEstaoAtivos ? (
                <div className={styles.estadoVazioPrincipal}>
                  <ListIcon className={styles.iconeVazio} />
                  <h3>Nenhum serviço cadastrado ainda.</h3>
                  <p>Adicione o primeiro serviço da Casa para que os consulentes possam agendar.</p>
                  <button className={styles.botaoNovo} onClick={() => navigate('/admin/catalog/services/new')}>
                    ＋ Adicionar primeiro serviço
                  </button>
                </div>
              ) : servicosFiltrados.length > 0 ? (
                servicosFiltrados.map((service) => (
                  <ServiceCardMobile
                    key={service.id}
                    service={service}
                  />
                ))
              ) : (
                <div className={styles.estadoVazioFiltro}>
                  <Search className={styles.iconeVazio} />
                  <h3>Nenhum serviço encontrado com esses filtros.</h3>
                  <p>Tente mudar o tipo ou a categoria.</p>
                  <button className={styles.botaoLimparFiltros} onClick={limparFiltros}>
                    Limpar filtros
                  </button>
                </div>
              )}
            </div>
          ) : (
            <table className={styles.tabela}>
              <thead>
                <tr className={styles.linhaCabecalho}>
                  <th className={styles.cabecalhoColuna}>Nome</th>
                  <th className={`${styles.cabecalhoColuna} ${styles.colunaOcultaTablet}`}>Categoria</th>
                  <th className={styles.cabecalhoColuna}>Modalidade</th>
                  <th className={`${styles.cabecalhoColuna} ${styles.colunaOcultaTablet}`}>Duração</th>
                  <th className={styles.cabecalhoColuna}>Preço</th>
                  <th className={styles.cabecalhoColuna}>Visibilidade no Site</th>
                  <th className={styles.cabecalhoColuna}>Ações</th>
                </tr>
              </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className={`${styles.linha} ${styles.skeletonRow}`}>
                    <td className={styles.celulaNome}>
                      <div className={styles.skeletonTextNome} />
                      <div className={styles.skeletonTextCurto} />
                    </td>
                    <td className={`${styles.celula} ${styles.colunaOcultaTablet}`}><div className={styles.skeletonTextCurto} /></td>
                    <td className={styles.celula}><div className={styles.skeletonBadge} /></td>
                    <td className={`${styles.celula} ${styles.colunaOcultaTablet}`} colSpan={4}></td>
                  </tr>
                ))
              ) : servicesPage?.totalElements === 0 && !filtrosEstaoAtivos ? (
                <tr>
                  <td className={styles.estadoVazioPrincipal} colSpan={7}>
                    <ListIcon className={styles.iconeVazio} />
                    <h3>Nenhum serviço cadastrado ainda.</h3>
                    <p>Adicione o primeiro serviço da Casa para que os consulentes possam agendar.</p>
                    <button className={styles.botaoNovo} onClick={() => navigate('/admin/catalog/services/new')}>
                      ＋ Adicionar primeiro serviço
                    </button>
                  </td>
                </tr>
              ) : servicosFiltrados.length > 0 ? (
                servicosFiltrados.map((service) => (
                  <ServiceRow
                    key={service.id}
                    service={service}
                    idConfirmacaoAtiva={idConfirmacaoAtiva}
                    onAbrirConfirmacao={setIdConfirmacaoAtiva}
                  />
                ))
              ) : (
                <tr>
                  <td className={styles.estadoVazioFiltro} colSpan={7}>
                    <Search className={styles.iconeVazio} />
                    <h3>Nenhum serviço encontrado com esses filtros.</h3>
                    <p>Tente mudar o tipo ou a categoria.</p>
                    <button
                      className={styles.botaoLimparFiltros}
                      onClick={limparFiltros}
                    >
                      Limpar filtros
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
//  COMPONENTE — Linha de serviço
// ══════════════════════════════════════════════════════════

interface ServiceRowProps {
  readonly service: RespostaServico;
  readonly idConfirmacaoAtiva: string | null;
  readonly onAbrirConfirmacao: (id: string | null) => void;
}

/** Intervalo do auto-cancelamento da confirmação inline, em segundos. */
const TEMPO_AUTO_CANCELAMENTO = 5;

function ServiceRow({ service, idConfirmacaoAtiva, onAbrirConfirmacao }: ServiceRowProps) {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [pedindoConfirmacaoExcluir, setPedindoConfirmacaoExcluir] = useState(false);
  const [contagemRegressiva, setContagemRegressiva] = useState(TEMPO_AUTO_CANCELAMENTO);

  const menuRef = useRef<HTMLDivElement>(null);
  const botaoMenuRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const estaConfirmandoToggle = idConfirmacaoAtiva === service.id;

  // ── Toggle: abrir confirmação (uma por vez) ──────────
  const handleToggleClick = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (estaConfirmandoToggle) {
      onAbrirConfirmacao(null);
      return;
    }
    onAbrirConfirmacao(service.id);
    setContagemRegressiva(TEMPO_AUTO_CANCELAMENTO);
  }, [estaConfirmandoToggle, onAbrirConfirmacao, service.id]);

  // ── Auto-cancelamento com contagem regressiva ────────
  useEffect(() => {
    if (!estaConfirmandoToggle) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setContagemRegressiva(TEMPO_AUTO_CANCELAMENTO);

    timerRef.current = setInterval(() => {
      setContagemRegressiva((prev) => {
        if (prev <= 1) {
          onAbrirConfirmacao(null);
          return TEMPO_AUTO_CANCELAMENTO;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [estaConfirmandoToggle, onAbrirConfirmacao]);

  const handleConfirmarStatus = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // mutation.mutate({ isPublished: !service.isPublished })
    onAbrirConfirmacao(null);
  }, [onAbrirConfirmacao]);

  const handleCancelarStatus = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onAbrirConfirmacao(null);
  }, [onAbrirConfirmacao]);

  // ── Menu ⋯ — fecha ao clicar fora ────────────────────
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAberto(false);
        setPedindoConfirmacaoExcluir(false);
      }
    };
    if (menuAberto) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuAberto]);

  // ── Menu ⋯ — posiciona com position: fixed ──────────
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const handleMenuClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!menuAberto && botaoMenuRef.current) {
      const rect = botaoMenuRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 6,
        left: Math.min(rect.right - 230, window.innerWidth - 242),
      });
    }
    setMenuAberto(!menuAberto);
    setPedindoConfirmacaoExcluir(false);
  }, [menuAberto]);

  return (
    <tr
      className={styles.linha}
      onClick={() => navigate(`/admin/catalog/services/${service.id}/edit`)}
    >
      {/* CORREÇÃO 3 — Célula nome com padding extra para a barra lateral */}
      <td className={styles.celulaNome}>
        <div className={styles.nomeBloco}>
          <strong className={styles.nome}>{service.name}</strong>
          <div className={styles.linhaSecundaria}>
            <span className={styles.subtipo}>{ROTULOS_TIPO[service.type]}</span>
            <span className={styles.detalheOcultoDesktop}> · {service.category.name}</span>
            <span className={styles.detalheOcultoDesktop}> · {service.durationMin} min</span>
          </div>
        </div>
      </td>

      <td className={`${styles.celula} ${styles.colunaOcultaTablet}`}>
        <span className={styles.categoria}>{service.category.name}</span>
      </td>

      <td className={styles.celula}>
        <div className={styles.modalidades}>
          {service.modalities.map((modality) => (
            <span className={styles.modalidade} key={modality}>
              {ROTULOS_MODALIDADE[modality] ?? modality}
            </span>
          ))}
        </div>
      </td>

      <td className={`${styles.celula} ${styles.colunaOcultaTablet}`}>{service.durationMin} min</td>

      <td className={styles.celula}>
        <span className={styles.valor}>{formatMoney(service.priceCents)}</span>
      </td>

      {/* ── Toggle de visibilidade ──────────────────── */}
      <td className={styles.celulaEstado} onClick={(e) => e.stopPropagation()}>
        <div
          className={styles.visibilidadeContainer}
          onClick={handleToggleClick}
          role="switch"
          aria-checked={service.isPublished}
          aria-label={service.isPublished ? 'Serviço público — visível para agendamento' : 'Serviço oculto — não visível'}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggleClick(e);
            }
          }}
        >
          <input
            className={styles.visibilidadeInput}
            type="checkbox"
            checked={service.isPublished}
            onChange={() => {}}
            tabIndex={-1}
            aria-hidden="true"
          />
          <span className={`${styles.toggleTrilho} ${service.isPublished ? styles.toggleTrilhoAtivo : ''}`}>
            <span className={`${styles.toggleBolinha} ${service.isPublished ? styles.toggleBolinhaAtiva : ''}`} />
          </span>
          <span className={service.isPublished ? styles.labelPublico : styles.labelOculto}>
            {service.isPublished ? 'Público' : 'Oculto'}
          </span>
        </div>

        {estaConfirmandoToggle && (
          <div className={styles.confirmacaoInlineContainer}>
            <span className={styles.confirmacaoTexto}>
              {service.isPublished
                ? `Ocultar '${service.name}' dos agendamentos?`
                : `Publicar '${service.name}' para agendamento?`}
            </span>
            <div className={styles.confirmacaoBotoes}>
              <button className={styles.botaoConfirmar} onClick={handleConfirmarStatus}>
                Confirmar
              </button>
              <button className={styles.botaoCancelar} onClick={handleCancelarStatus}>
                Cancelar ({contagemRegressiva})
              </button>
            </div>
          </div>
        )}
      </td>

      {/* ── CORREÇÃO 4 — Botão ⋯ circular + portal fixo ─ */}
      <td className={styles.celulaAcoes} onClick={(e) => e.stopPropagation()}>
        <div className={styles.acoesContainer} ref={menuRef}>
          <button
            className={styles.botaoMenu}
            onClick={handleMenuClick}
            aria-label="Ações do serviço"
            ref={botaoMenuRef}
          >
            <MoreHorizontal size={16} />
          </button>

          {menuAberto && (
            <div
              className={styles.menuFlutuante}
              style={{ top: menuPos.top, left: menuPos.left }}
            >
              <button className={styles.menuItem} onClick={() => navigate(`/admin/catalog/services/${service.id}/edit`)}>
                🔍  Ver detalhes
              </button>
              <button className={styles.menuItem} onClick={() => navigate(`/admin/catalog/services/${service.id}/edit`)}>
                ✏️  Editar serviço
              </button>
              <button className={styles.menuItem} onClick={() => { setMenuAberto(false); }}>
                📋  Duplicar serviço
              </button>
              <div className={styles.menuSeparador} />

              {!pedindoConfirmacaoExcluir ? (
                <button
                  className={styles.textoPerigo}
                  onClick={(e) => { e.stopPropagation(); setPedindoConfirmacaoExcluir(true); }}
                >
                  ✕  Excluir serviço
                </button>
              ) : (
                <div className={styles.confirmacaoInlineContainer}>
                  <span className={styles.confirmacaoTexto}>Excluir '{service.name}'?</span>
                  <div className={styles.confirmacaoBotoes}>
                    <button className={styles.botaoConfirmar} onClick={() => setMenuAberto(false)}>
                      Confirmar
                    </button>
                    <button
                      className={styles.botaoCancelar}
                      onClick={(e) => { e.stopPropagation(); setPedindoConfirmacaoExcluir(false); }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

// ══════════════════════════════════════════════════════════
//  COMPONENTE — Card Mobile
// ══════════════════════════════════════════════════════════

interface ServiceCardMobileProps {
  readonly service: RespostaServico;
}

function ServiceCardMobile({ service }: ServiceCardMobileProps) {
  const navigate = useNavigate();
  const [drawerAcoesAberto, setDrawerAcoesAberto] = useState(false);
  const [drawerExcluirAberto, setDrawerExcluirAberto] = useState(false);
  const [drawerToggleAberto, setDrawerToggleAberto] = useState(false);
  const [contagemRegressiva, setContagemRegressiva] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const corBarra = service.type === 'CONSULTATION' ? styles.barraConsultation : styles.barraRitual;

  const iniciarContagem = useCallback((segundos: number, onComplete: () => void) => {
    setContagemRegressiva(segundos);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setContagemRegressiva((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const cancelarContagem = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    return () => cancelarContagem();
  }, [cancelarContagem]);

  return (
    <>
      <div className={`${styles.cardMobile} ${corBarra}`} onClick={() => navigate(`/admin/catalog/services/${service.id}/edit`)}>
        <div className={styles.cardHeader}>
          <div>
            <strong className={styles.cardTitulo}>{service.name}</strong>
            <p className={styles.cardSubtitulo}>
              {ROTULOS_TIPO[service.type]} · {service.category.name}
            </p>
          </div>
          <button 
            className={styles.botaoMenu} 
            onClick={(e) => { e.stopPropagation(); setDrawerAcoesAberto(true); }}
            aria-label="Opções do serviço"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>

        <hr className={styles.cardDivisor} />

        <div className={styles.cardDetalhes}>
          <span>🕐 {service.durationMin} min</span>
          <span>💰 {formatMoney(service.priceCents)}</span>
        </div>
        
        <div className={styles.modalidades}>
          {service.modalities.map((modality) => (
            <span className={styles.modalidade} key={modality}>
              {ROTULOS_MODALIDADE[modality] ?? modality}
            </span>
          ))}
        </div>

        <hr className={styles.cardDivisor} />

        <div 
          className={styles.cardRodapeToggle}
          onClick={(e) => {
            e.stopPropagation();
            setDrawerToggleAberto(true);
            iniciarContagem(5, () => setDrawerToggleAberto(false));
          }}
        >
          <div
            className={styles.visibilidadeContainer}
            role="switch"
            aria-checked={service.isPublished}
            tabIndex={0}
            style={{ padding: 0 }}
          >
            <span className={`${styles.toggleTrilho} ${service.isPublished ? styles.toggleTrilhoAtivo : ''}`}>
              <span className={`${styles.toggleBolinha} ${service.isPublished ? service.isPublished ? styles.toggleBolinhaAtiva : '' : ''}`} />
            </span>
            <span className={styles.labelToggleMobile}>Visível no site</span>
          </div>
        </div>
      </div>

      <Drawer
        open={drawerAcoesAberto}
        title="Opções do serviço"
        mobileVariant="compact"
        onClose={() => setDrawerAcoesAberto(false)}
      >
        <button className={styles.sheetBotaoAcao} onClick={() => navigate(`/admin/catalog/services/${service.id}/edit`)}>
          🔍 Ver detalhes
        </button>
        <button className={styles.sheetBotaoAcao} onClick={() => navigate(`/admin/catalog/services/${service.id}/edit`)}>
          ✏️ Editar serviço
        </button>
        <button className={styles.sheetBotaoAcao} onClick={() => setDrawerAcoesAberto(false)}>
          📋 Duplicar serviço
        </button>
        <button 
          className={`${styles.sheetBotaoAcao} ${styles.textoPerigo}`} 
          onClick={() => {
            setDrawerAcoesAberto(false);
            setDrawerExcluirAberto(true);
            iniciarContagem(8, () => setDrawerExcluirAberto(false));
          }}
        >
          ✕ Excluir serviço
        </button>
      </Drawer>

      <Drawer
        open={drawerExcluirAberto}
        title="Confirmar exclusão"
        mobileVariant="compact"
        onClose={() => {
          cancelarContagem();
          setDrawerExcluirAberto(false);
        }}
      >
        <div className={styles.sheetAvisoContainer}>
          <AlertTriangle size={32} className={styles.sheetAvisoIcone} />
          <h3 className={styles.sheetAvisoTitulo}>Excluir '{service.name}'?</h3>
          <p className={styles.sheetAvisoTexto}>Esta ação não pode ser desfeita.</p>
          <div className={styles.sheetAvisoBotoes}>
            <button className={styles.sheetBotaoConfirmarPerigo} onClick={() => setDrawerExcluirAberto(false)}>
              Sim, excluir
            </button>
            <button 
              className={styles.sheetBotaoCancelarPerigo} 
              onClick={() => {
                cancelarContagem();
                setDrawerExcluirAberto(false);
              }}
            >
              Não excluir ({contagemRegressiva})
            </button>
          </div>
        </div>
      </Drawer>

      <Drawer
        open={drawerToggleAberto}
        title="Alterar visibilidade"
        mobileVariant="compact"
        onClose={() => {
          cancelarContagem();
          setDrawerToggleAberto(false);
        }}
      >
        <div className={styles.sheetAvisoContainer}>
          <h3 className={styles.sheetAvisoTitulo}>
            {service.isPublished ? `Ocultar '${service.name}' dos agendamentos?` : `Publicar '${service.name}' para agendamento?`}
          </h3>
          {service.isPublished && (
            <p className={styles.sheetAvisoTexto}>Consulentes não poderão agendar este serviço.</p>
          )}
          <div className={styles.sheetAvisoBotoes}>
            <button className={styles.botaoConfirmar} style={{ flex: 1, minHeight: 44, width: '100%', borderRadius: 999 }} onClick={() => setDrawerToggleAberto(false)}>
              Confirmar
            </button>
            <button 
              className={styles.botaoCancelar} 
              style={{ flex: 1, minHeight: 44, width: '100%', borderRadius: 999 }}
              onClick={() => {
                cancelarContagem();
                setDrawerToggleAberto(false);
              }}
            >
              Cancelar ({contagemRegressiva})
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
}