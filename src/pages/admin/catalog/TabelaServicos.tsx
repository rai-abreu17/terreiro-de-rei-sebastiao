import { useState, useCallback } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  useListarServicosAdmin,
  useListarCategoriasAdmin,
  usePublicarServico,
  useDespublicarServico,
  extrairMensagemErro,
} from '@/api/catalog';
import type {
  FiltrosServicoAdmin,
  RespostaServico,
  TipoServico,
} from '@/api/catalog.types';
import { formatMoney } from '@/lib/money';
import * as styles from './TabelaServicos.css';

/**
 * Mapa de rótulos para tipos de serviço — evita magic strings na UI.
 */
const ROTULOS_TIPO: Record<TipoServico, string> = {
  CONSULTATION: 'Consulta',
  RITUAL: 'Ritual',
};

/**
 * Mapa de rótulos para modalidades de atendimento.
 */
const ROTULOS_MODALIDADE: Record<string, string> = {
  ONLINE: 'Online',
  IN_PERSON: 'Presencial',
};

/** Tamanho padrão da página de resultados. */
const TAMANHO_PAGINA = 20;

/**
 * Tabela administrativa de serviços do catálogo.
 *
 * Funcionalidades:
 * - Listagem paginada com filtros por tipo e categoria
 * - Badge de status (publicado/rascunho)
 * - Ações de publicação/despublicação visíveis em hover/focus (PR-06)
 * - Tooltip acessível com detalhes (Radix UI)
 * - Feedback de erro via Problem Details (RFC 7807)
 * - Skeleton loading para transições suaves
 *
 * @see SPEC §5.3.2 — Contratos do Catálogo
 * @see PR-06 — Status em tabelas só aparece em hover/focus
 * @see PR-13 — Desktop-first no admin
 */
export function TabelaServicos() {
  const [filtros, definirFiltros] = useState<FiltrosServicoAdmin>({
    page: 0,
    size: TAMANHO_PAGINA,
  });
  const [mensagemErro, definirMensagemErro] = useState<string | null>(null);

  const {
    data: pagina,
    isLoading: carregando,
    isFetching: buscando,
  } = useListarServicosAdmin(filtros);

  const { data: categorias } = useListarCategoriasAdmin();

  const publicarMutation = usePublicarServico();
  const despublicarMutation = useDespublicarServico();

  const alterarFiltroTipo = useCallback(
    (valor: string) => {
      definirFiltros((prev) => ({
        ...prev,
        type: valor === '' ? null : (valor as TipoServico),
        page: 0,
      }));
    },
    []
  );

  const alterarFiltroCategoria = useCallback(
    (valor: string) => {
      definirFiltros((prev) => ({
        ...prev,
        categoryId: valor === '' ? null : valor,
        page: 0,
      }));
    },
    []
  );

  const irParaPagina = useCallback(
    (pagina: number) => {
      definirFiltros((prev) => ({ ...prev, page: pagina }));
    },
    []
  );

  const publicar = useCallback(
    (servicoId: string) => {
      definirMensagemErro(null);
      publicarMutation.mutate(servicoId, {
        onError: (erro) => {
          definirMensagemErro(extrairMensagemErro(erro));
        },
      });
    },
    [publicarMutation]
  );

  const despublicar = useCallback(
    (servicoId: string) => {
      definirMensagemErro(null);
      despublicarMutation.mutate(servicoId, {
        onError: (erro) => {
          definirMensagemErro(extrairMensagemErro(erro));
        },
      });
    },
    [despublicarMutation]
  );

  return (
    <Tooltip.Provider delayDuration={300}>
      <div className={styles.paginaContainer}>
        {/* ── Cabeçalho ──────────────────────────── */}
        <div className={styles.cabecalho}>
          <h1 className={styles.tituloPagina}>Gestão de Serviços</h1>
          <button className={styles.botaoPrimario} type="button">
            + Novo Serviço
          </button>
        </div>

        {/* ── Mensagem de erro ────────────────────── */}
        {mensagemErro && (
          <div className={styles.toastErro} role="alert">
            {mensagemErro}
          </div>
        )}

        {/* ── Filtros ────────────────────────────── */}
        <div className={styles.barraFiltros}>
          <select
            className={styles.filtroSelect}
            value={filtros.type ?? ''}
            onChange={(e) => alterarFiltroTipo(e.target.value)}
            aria-label="Filtrar por tipo de serviço"
          >
            <option value="">Todos os tipos</option>
            <option value="CONSULTATION">Consultas</option>
            <option value="RITUAL">Rituais</option>
          </select>

          <select
            className={styles.filtroSelect}
            value={filtros.categoryId ?? ''}
            onChange={(e) => alterarFiltroCategoria(e.target.value)}
            aria-label="Filtrar por categoria"
          >
            <option value="">Todas as categorias</option>
            {categorias?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* ── Tabela ─────────────────────────────── */}
        <div className={styles.tabelaWrapper}>
          <table className={styles.tabela}>
            <thead className={styles.cabecalhoTabela}>
              <tr>
                <th className={styles.celulaHeader}>Serviço</th>
                <th className={styles.celulaHeader}>Tipo</th>
                <th className={styles.celulaHeader}>Categoria</th>
                <th className={styles.celulaHeader}>Modalidades</th>
                <th className={styles.celulaHeader}>Duração</th>
                <th className={styles.celulaHeader}>Preço</th>
                <th className={styles.celulaHeader}>Status</th>
                <th className={styles.celulaHeader}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {carregando ? (
                <LinhasCarregando />
              ) : pagina?.content.length === 0 ? (
                <tr>
                  <td className={styles.estadoVazio} colSpan={8}>
                    Nenhum serviço encontrado.
                  </td>
                </tr>
              ) : (
                pagina?.content.map((servico) => (
                  <LinhaServico
                    key={servico.id}
                    servico={servico}
                    onPublicar={publicar}
                    onDespublicar={despublicar}
                    publicando={publicarMutation.isPending}
                    despublicando={despublicarMutation.isPending}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Paginação ──────────────────────────── */}
        {pagina && !pagina.empty && (
          <div className={styles.paginacao}>
            <span>
              {pagina.totalElements} serviço{pagina.totalElements !== 1 ? 's' : ''}
              {buscando ? ' · Atualizando...' : ''}
            </span>
            <div className={styles.botoesPaginacao}>
              <button
                className={styles.botaoPagina}
                disabled={pagina.first}
                onClick={() => irParaPagina(pagina.number - 1)}
                type="button"
              >
                ← Anterior
              </button>
              <button
                className={styles.botaoPagina}
                disabled={pagina.last}
                onClick={() => irParaPagina(pagina.number + 1)}
                type="button"
              >
                Próxima →
              </button>
            </div>
          </div>
        )}
      </div>
    </Tooltip.Provider>
  );
}

// ══════════════════════════════════════════════════
//  COMPONENTES INTERNOS
// ══════════════════════════════════════════════════

interface PropsLinhaServico {
  readonly servico: RespostaServico;
  readonly onPublicar: (id: string) => void;
  readonly onDespublicar: (id: string) => void;
  readonly publicando: boolean;
  readonly despublicando: boolean;
}

/**
 * Linha individual da tabela de serviços.
 *
 * PR-06: status e ações aparecem em hover/focus-within.
 * Tooltip acessível via Radix UI para detalhes do status.
 */
function LinhaServico({
  servico,
  onPublicar,
  onDespublicar,
  publicando,
  despublicando,
}: PropsLinhaServico) {
  return (
    <tr className={styles.linhaTabela} tabIndex={0}>
      {/* Nome + slug */}
      <td className={styles.celulaCorpo}>
        <div className={styles.nomeServico}>{servico.name}</div>
        <div className={styles.slugServico}>/{servico.slug}</div>
      </td>

      {/* Tipo */}
      <td className={styles.celulaCorpo}>
        <span className={styles.badgeTipo}>
          {ROTULOS_TIPO[servico.type]}
        </span>
      </td>

      {/* Categoria */}
      <td className={styles.celulaCorpo}>
        {servico.category.name}
      </td>

      {/* Modalidades */}
      <td className={styles.celulaCorpo}>
        <div className={styles.containerModalidades}>
          {servico.modalities.map((mod) => (
            <span key={mod} className={styles.badgeModalidade}>
              {ROTULOS_MODALIDADE[mod] ?? mod}
            </span>
          ))}
        </div>
      </td>

      {/* Duração */}
      <td className={styles.celulaCorpo}>
        {servico.durationMin} min
      </td>

      {/* Preço */}
      <td className={styles.celulaCorpo}>
        {formatMoney(servico.priceCents)}
      </td>

      {/* Status — PR-06: Tooltip com detalhes */}
      <td className={styles.celulaCorpo}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <span
              className={
                servico.isPublished
                  ? styles.badgePublicado
                  : styles.badgeRascunho
              }
            >
              {servico.isPublished ? '● Publicado' : '○ Rascunho'}
            </span>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="top"
              sideOffset={6}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: '0.75rem',
                backgroundColor: '#1a1a1a',
                color: '#fff',
                maxWidth: 240,
                lineHeight: 1.4,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 50,
              }}
            >
              {servico.isPublished
                ? 'Este serviço está visível para os consulentes no catálogo público.'
                : 'Este serviço está em rascunho e não aparece no catálogo público.'}
              <Tooltip.Arrow
                style={{ fill: '#1a1a1a' }}
              />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </td>

      {/* Ações — PR-06: visível apenas em hover/focus */}
      <td className={styles.celulaCorpo}>
        <div className={styles.colunaAcoes}>
          {servico.isPublished ? (
            <button
              className={styles.botaoDespublicar}
              onClick={() => onDespublicar(servico.id)}
              disabled={despublicando}
              type="button"
              aria-label={`Despublicar ${servico.name}`}
            >
              Despublicar
            </button>
          ) : (
            <button
              className={styles.botaoPublicar}
              onClick={() => onPublicar(servico.id)}
              disabled={publicando}
              type="button"
              aria-label={`Publicar ${servico.name}`}
            >
              Publicar
            </button>
          )}
          <button
            className={styles.botaoEditar}
            type="button"
            aria-label={`Editar ${servico.name}`}
          >
            Editar
          </button>
        </div>
      </td>
    </tr>
  );
}

/**
 * Skeleton de carregamento — exibe linhas pulsantes enquanto carrega.
 */
function LinhasCarregando() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className={styles.linhaTabela}>
          <td className={styles.celulaCorpo}>
            <div className={styles.skeleton} style={{ width: 140 }} />
            <div className={styles.skeleton} style={{ width: 80, marginTop: 6 }} />
          </td>
          <td className={styles.celulaCorpo}>
            <div className={styles.skeleton} style={{ width: 72 }} />
          </td>
          <td className={styles.celulaCorpo}>
            <div className={styles.skeleton} style={{ width: 90 }} />
          </td>
          <td className={styles.celulaCorpo}>
            <div className={styles.skeleton} style={{ width: 100 }} />
          </td>
          <td className={styles.celulaCorpo}>
            <div className={styles.skeleton} style={{ width: 50 }} />
          </td>
          <td className={styles.celulaCorpo}>
            <div className={styles.skeleton} style={{ width: 70 }} />
          </td>
          <td className={styles.celulaCorpo}>
            <div className={styles.skeleton} style={{ width: 72 }} />
          </td>
          <td className={styles.celulaCorpo}>
            <div className={styles.skeleton} style={{ width: 100 }} />
          </td>
        </tr>
      ))}
    </>
  );
}
