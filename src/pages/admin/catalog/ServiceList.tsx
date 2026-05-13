import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { FiltrosServicoAdmin, RespostaServico, TipoServico } from '@/api/catalog.types';
import { useCategories, useServices } from '@/hooks/useCatalog';
import { formatMoney } from '@/lib/money';
import * as styles from './ServiceList.css';

const TAMANHO_PAGINA = 20;

const ROTULOS_TIPO: Record<TipoServico, string> = {
  CONSULTATION: 'Consulta',
  RITUAL: 'Ritual',
};

const ROTULOS_MODALIDADE: Record<string, string> = {
  ONLINE: 'Online',
  IN_PERSON: 'Presencial',
};

function resumirEstado(servico: RespostaServico): string {
  if (servico.isPublished) {
    return 'Visível no catálogo público e pronto para receber consulentes.';
  }

  return 'Oculto do catálogo público até nova publicação pela administração.';
}

export function ServiceList() {
  const [filters, setFilters] = useState<FiltrosServicoAdmin>({
    page: 0,
    size: TAMANHO_PAGINA,
    sort: 'displayOrder,asc',
  });

  const { data: categories = [] } = useCategories();
  const {
    data: servicesPage,
    isLoading,
    isFetching,
  } = useServices(filters);

  const totalServices = servicesPage?.totalElements ?? 0;

  return (
    <section className={styles.pagina} aria-labelledby="service-list-heading">
      <header className={styles.cabecalho}>
        <div className={styles.blocoTitulo}>
          <p className={styles.subtitulo}>Painel administrativo · Catálogo</p>
          <h1 className={styles.titulo} id="service-list-heading">
            Listagem de Serviços
          </h1>
        </div>
        <Link className={styles.botaoNovo} to="/admin/catalog/services/new">
          Novo Serviço
        </Link>
      </header>

      <div className={styles.painel}>
        <div className={styles.barraFerramentas}>
          <div className={styles.grupoFiltros}>
            <select
              className={styles.filtro}
              value={filters.type ?? ''}
              onChange={(event) => {
                const value = event.target.value;

                setFilters((current) => ({
                  ...current,
                  page: 0,
                  type: value === '' ? null : (value as TipoServico),
                }));
              }}
              aria-label="Filtrar serviços por tipo"
            >
              <option value="">Todos os tipos</option>
              <option value="CONSULTATION">Consultas</option>
              <option value="RITUAL">Rituais</option>
            </select>

            <select
              className={styles.filtro}
              value={filters.categoryId ?? ''}
              onChange={(event) => {
                const value = event.target.value;

                setFilters((current) => ({
                  ...current,
                  page: 0,
                  categoryId: value === '' ? null : value,
                }));
              }}
              aria-label="Filtrar serviços por categoria"
            >
              <option value="">Todas as categorias</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <span className={styles.resumo}>
            {totalServices} serviço{totalServices === 1 ? '' : 's'}
            {isFetching ? ' · Atualizando lista...' : ''}
          </span>
        </div>

        <div className={styles.tabelaWrapper}>
          <table className={styles.tabela}>
            <thead>
              <tr className={styles.linhaCabecalho}>
                <th className={styles.cabecalhoColuna}>Nome</th>
                <th className={styles.cabecalhoColuna}>Categoria</th>
                <th className={styles.cabecalhoColuna}>Duração</th>
                <th className={styles.cabecalhoColuna}>Preço</th>
                <th className={styles.cabecalhoColuna}>Estado</th>
                <th className={styles.cabecalhoColuna}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className={styles.estadoVazio} colSpan={6}>
                    A carregar serviços do catálogo...
                  </td>
                </tr>
              ) : servicesPage?.content.length ? (
                servicesPage.content.map((service) => (
                  <ServiceRow key={service.id} service={service} />
                ))
              ) : (
                <tr>
                  <td className={styles.estadoVazio} colSpan={6}>
                    Nenhum serviço encontrado com os filtros atuais.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

interface ServiceRowProps {
  readonly service: RespostaServico;
}

function ServiceRow({ service }: ServiceRowProps) {
  const estadoClassName = service.isPublished
    ? styles.statusPublicado
    : styles.statusInativo;

  return (
    <tr className={styles.linha}>
      <td className={styles.celula}>
        <div className={styles.nomeBloco}>
          <strong className={styles.nome}>{service.name}</strong>
          <div className={styles.linhaSecundaria}>
            <span className={styles.subtipo}>{ROTULOS_TIPO[service.type]}</span>
            <span className={styles.detalheHover}>{service.slug}</span>
          </div>
        </div>
      </td>

      <td className={styles.celula}>
        <div className={styles.categoriaMeta}>
          <span className={styles.categoria}>{service.category.name}</span>
          <div className={styles.modalidades}>
            {service.modalities.map((modality) => (
              <span className={styles.modalidade} key={modality}>
                {ROTULOS_MODALIDADE[modality] ?? modality}
              </span>
            ))}
          </div>
        </div>
      </td>

      <td className={styles.celula}>{service.durationMin} min</td>

      <td className={styles.celula}>
        <span className={styles.valor}>{formatMoney(service.priceCents)}</span>
      </td>

      <td className={styles.celulaEstado}>
        <div className={styles.statusBloco}>
          <span className={estadoClassName}>
            {service.isPublished ? 'Publicado' : 'Inativo'}
          </span>
          <span className={styles.detalheHover}>{resumirEstado(service)}</span>
        </div>
      </td>

      <td className={styles.celulaAcoes}>
        <div className={styles.acoes}>
          <div className={styles.grupoAcoes}>
            <Link
              className={styles.botaoEditar}
              aria-label={`Editar ${service.name}`}
              title={`Editar ${service.name}`}
              to={`/admin/catalog/services/${service.id}/edit`}
            >
              Editar
            </Link>
          </div>
        </div>
      </td>
    </tr>
  );
}