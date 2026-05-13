import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClient } from '@/api/client';
import type {
  FiltrosServicoAdmin,
  PaginaSpring,
  ProblemDetails,
  RequisicaoAtualizarServico,
  RequisicaoCategoria,
  RequisicaoCriarServico,
  RespostaCategoria,
  RespostaServico,
} from '@/api/catalog.types';

/**
 * Hooks TanStack Query v5 para a API de Catálogo do Terreiro de Rei Sebastião.
 *
 * Adaptado do workflow `/gerar-hook-tanstack-query` para o contexto
 * do catálogo (Sprint 003). Segue os princípios:
 * - TypeScript estrito (sem `any`)
 * - Erros tipados como `AxiosError<ProblemDetails>` (RFC 7807)
 * - Invalidação automática de cache após mutações
 * - Nomenclatura pt-BR para nomes de hooks e query keys
 */

// ══════════════════════════════════════════════════
//  CHAVES DE CACHE (Query Keys)
// ══════════════════════════════════════════════════

/** Chaves centralizadas para consistência na invalidação de cache. */
export const chavesCatalogo = {
  /** Todas as queries de categorias. */
  categorias: ['categorias'] as const,

  /** Todas as queries de serviços. */
  servicos: ['servicos'] as const,

  /** Lista de serviços admin com filtros. */
  servicosAdmin: (filtros: FiltrosServicoAdmin) =>
    ['servicos', 'admin', filtros] as const,

  /** Lista de categorias admin. */
  categoriasAdmin: ['categorias', 'admin'] as const,
} as const;

// ══════════════════════════════════════════════════
//  CATEGORIAS — QUERIES
// ══════════════════════════════════════════════════

/**
 * Lista todas as categorias (visão admin — inclui não publicadas).
 *
 * @returns query com lista de categorias ordenada por `displayOrder`
 */
export function useListarCategoriasAdmin() {
  return useQuery<RespostaCategoria[], AxiosError<ProblemDetails>>({
    queryKey: chavesCatalogo.categoriasAdmin,
    queryFn: async () => {
      const { data } = await apiClient.get<RespostaCategoria[]>(
        '/admin/catalog/categories'
      );
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// ══════════════════════════════════════════════════
//  CATEGORIAS — MUTAÇÕES
// ══════════════════════════════════════════════════

/**
 * Cria uma nova categoria.
 *
 * Invalida o cache de categorias automaticamente após sucesso.
 */
export function useCriarCategoria() {
  const queryClient = useQueryClient();

  return useMutation<
    RespostaCategoria,
    AxiosError<ProblemDetails>,
    RequisicaoCategoria
  >({
    mutationFn: async (requisicao) => {
      const { data } = await apiClient.post<RespostaCategoria>(
        '/admin/catalog/categories',
        requisicao
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chavesCatalogo.categorias });
    },
  });
}

/**
 * Atualiza uma categoria existente.
 *
 * @param categoriaId UUID da categoria a atualizar
 */
export function useAtualizarCategoria() {
  const queryClient = useQueryClient();

  return useMutation<
    RespostaCategoria,
    AxiosError<ProblemDetails>,
    { categoriaId: string; dados: RequisicaoCategoria }
  >({
    mutationFn: async ({ categoriaId, dados }) => {
      const { data } = await apiClient.patch<RespostaCategoria>(
        `/admin/catalog/categories/${categoriaId}`,
        dados
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chavesCatalogo.categorias });
    },
  });
}

/**
 * Remove uma categoria (falha se houver serviços vinculados — 409).
 */
export function useRemoverCategoria() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ProblemDetails>, string>({
    mutationFn: async (categoriaId) => {
      await apiClient.delete(`/admin/catalog/categories/${categoriaId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chavesCatalogo.categorias });
    },
  });
}

// ══════════════════════════════════════════════════
//  SERVIÇOS — QUERIES
// ══════════════════════════════════════════════════

/**
 * Lista todos os serviços com filtros (visão admin, paginado).
 *
 * @param filtros filtros opcionais (type, categoryId, page, size)
 */
export function useListarServicosAdmin(filtros: FiltrosServicoAdmin = {}) {
  return useQuery<PaginaSpring<RespostaServico>, AxiosError<ProblemDetails>>({
    queryKey: chavesCatalogo.servicosAdmin(filtros),
    queryFn: async () => {
      const parametros: Record<string, string | number> = {};

      if (filtros.type) parametros['type'] = filtros.type;
      if (filtros.categoryId) parametros['categoryId'] = filtros.categoryId;
      if (filtros.page !== undefined) parametros['page'] = filtros.page;
      if (filtros.size !== undefined) parametros['size'] = filtros.size;
      if (filtros.sort) parametros['sort'] = filtros.sort;

      const { data } = await apiClient.get<PaginaSpring<RespostaServico>>(
        '/admin/catalog/services',
        { params: parametros }
      );
      return data;
    },
    staleTime: 30 * 1000,
    placeholderData: (dadosAnteriores) => dadosAnteriores,
  });
}

// ══════════════════════════════════════════════════
//  SERVIÇOS — MUTAÇÕES
// ══════════════════════════════════════════════════

/**
 * Cria um novo serviço no catálogo.
 *
 * Invalida o cache de serviços após sucesso.
 */
export function useCriarServico() {
  const queryClient = useQueryClient();

  return useMutation<
    RespostaServico,
    AxiosError<ProblemDetails>,
    RequisicaoCriarServico
  >({
    mutationFn: async (requisicao) => {
      const { data } = await apiClient.post<RespostaServico>(
        '/admin/catalog/services',
        requisicao
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chavesCatalogo.servicos });
    },
  });
}

/**
 * Atualiza parcialmente um serviço existente (PATCH semântico).
 */
export function useAtualizarServico() {
  const queryClient = useQueryClient();

  return useMutation<
    RespostaServico,
    AxiosError<ProblemDetails>,
    { servicoId: string; dados: RequisicaoAtualizarServico }
  >({
    mutationFn: async ({ servicoId, dados }) => {
      const { data } = await apiClient.patch<RespostaServico>(
        `/admin/catalog/services/${servicoId}`,
        dados
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chavesCatalogo.servicos });
    },
  });
}

/**
 * Publica um serviço, tornando-o visível ao público.
 */
export function usePublicarServico() {
  const queryClient = useQueryClient();

  return useMutation<RespostaServico, AxiosError<ProblemDetails>, string>({
    mutationFn: async (servicoId) => {
      const { data } = await apiClient.post<RespostaServico>(
        `/admin/catalog/services/${servicoId}/publish`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chavesCatalogo.servicos });
    },
  });
}

/**
 * Despublica um serviço, removendo-o da visão pública.
 */
export function useDespublicarServico() {
  const queryClient = useQueryClient();

  return useMutation<RespostaServico, AxiosError<ProblemDetails>, string>({
    mutationFn: async (servicoId) => {
      const { data } = await apiClient.post<RespostaServico>(
        `/admin/catalog/services/${servicoId}/unpublish`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chavesCatalogo.servicos });
    },
  });
}

/**
 * Extrai a mensagem de erro legível de um `ProblemDetails` retornado pela API.
 *
 * @param erro erro do Axios tipado
 * @returns mensagem amigável para o usuário
 */
export function extrairMensagemErro(
  erro: AxiosError<ProblemDetails>
): string {
  const detalhe = erro.response?.data?.detail;
  if (detalhe) return detalhe;

  const status = erro.response?.status;
  if (status === 409) return 'Operação não permitida: existe um conflito com os dados atuais.';
  if (status === 404) return 'O recurso solicitado não foi encontrado.';
  if (status === 422) return 'Os dados informados contêm valores inválidos.';

  return 'Ocorreu um erro inesperado. Tente novamente.';
}
