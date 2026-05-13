import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClient } from '@/api/client';
import type {
  FiltrosServicoAdmin,
  PaginaSpring,
  ProblemDetails,
  RequisicaoCriarServico,
  RespostaCategoria,
  RespostaServico,
} from '@/api/catalog.types';

export const catalogQueryKeys = {
  all: ['admin', 'catalog'] as const,
  categories: ['admin', 'catalog', 'categories'] as const,
  service: (serviceId: string) => ['admin', 'catalog', 'service', serviceId] as const,
  services: (filters: FiltrosServicoAdmin) =>
    ['admin', 'catalog', 'services', filters] as const,
} as const;

export function useCategories() {
  return useQuery<RespostaCategoria[], AxiosError<ProblemDetails>>({
    queryKey: catalogQueryKeys.categories,
    queryFn: async () => {
      const { data } = await apiClient.get<RespostaCategoria[]>(
        '/admin/catalog/categories'
      );
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useServices(filters: FiltrosServicoAdmin = {}) {
  return useQuery<PaginaSpring<RespostaServico>, AxiosError<ProblemDetails>>({
    queryKey: catalogQueryKeys.services(filters),
    queryFn: async () => {
      const params: Record<string, string | number> = {};

      if (filters.type) {
        params['type'] = filters.type;
      }

      if (filters.categoryId) {
        params['categoryId'] = filters.categoryId;
      }

      if (filters.page !== undefined) {
        params['page'] = filters.page;
      }

      if (filters.size !== undefined) {
        params['size'] = filters.size;
      }

      if (filters.sort) {
        params['sort'] = filters.sort;
      }

      const { data } = await apiClient.get<PaginaSpring<RespostaServico>>(
        '/admin/catalog/services',
        { params }
      );

      return data;
    },
    staleTime: 30 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useService(serviceId?: string) {
  const resolvedServiceId = serviceId ?? '';

  return useQuery<RespostaServico, AxiosError<ProblemDetails>>({
    queryKey: catalogQueryKeys.service(resolvedServiceId),
    queryFn: async () => {
      const { data } = await apiClient.get<RespostaServico>(
        `/admin/catalog/services/${resolvedServiceId}`
      );

      return data;
    },
    enabled: Boolean(serviceId),
    staleTime: 30 * 1000,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation<
    RespostaServico,
    AxiosError<ProblemDetails>,
    RequisicaoCriarServico
  >({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<RespostaServico>(
        '/admin/catalog/services',
        payload
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: catalogQueryKeys.all });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation<
    RespostaServico,
    AxiosError<ProblemDetails>,
    { serviceId: string; payload: RequisicaoCriarServico }
  >({
    mutationFn: async ({ serviceId, payload }) => {
      const { data } = await apiClient.put<RespostaServico>(
        `/admin/catalog/services/${serviceId}`,
        payload
      );

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: catalogQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: catalogQueryKeys.service(variables.serviceId),
      });
    },
  });
}

export function extractCatalogError(
  error: AxiosError<ProblemDetails>
): string {
  const detail = error.response?.data?.detail;

  if (detail) {
    return detail;
  }

  const status = error.response?.status;

  if (status === 404) {
    return 'O serviço solicitado não foi encontrado.';
  }

  if (status === 409) {
    return 'Os dados informados entram em conflito com o catálogo atual.';
  }

  if (status === 422) {
    return 'Revise os dados informados antes de guardar o serviço.';
  }

  return 'Não foi possível concluir a operação no catálogo.';
}