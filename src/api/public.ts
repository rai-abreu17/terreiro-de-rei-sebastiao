import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { apiClient } from '@/api/client';
import type {
  FiltrosServicoPublico,
  ModalidadeAtendimento,
  PaginaSpring,
  ProblemDetails,
  RespostaCategoria,
  RespostaServico,
} from '@/api/catalog.types';
import type {
  RespostaDisponibilidadePublica,
  ServicoPublico,
} from './public.types';

interface ListarSlotsPublicosParams {
  readonly serviceId: string;
  readonly dataISO: string;
  readonly modality?: ModalidadeAtendimento | 'ANY';
}

export const publicQueryKeys = {
  catalogo: ['public', 'catalogo'] as const,
  servicosAtivos: ['public', 'servicos', 'ativos'] as const,
  slots: (
    serviceId: string,
    dataISO: string,
    modality: ModalidadeAtendimento | 'ANY'
  ) => ['public', 'slots', serviceId, dataISO, modality] as const,
};

export async function listarCategoriasPublicas(): Promise<RespostaCategoria[]> {
  const { data } = await apiClient.get<RespostaCategoria[]>('/catalog/categories');
  return data;
}

export async function listarServicosPublicos(
  filtros: FiltrosServicoPublico = {}
): Promise<PaginaSpring<RespostaServico>> {
  const params: Record<string, string | number> = {
    size: filtros.size ?? 100,
  };

  if (filtros.type) {
    params.type = filtros.type;
  }

  if (filtros.categorySlug) {
    params.categorySlug = filtros.categorySlug;
  }

  if (filtros.page !== undefined) {
    params.page = filtros.page;
  }

  const { data } = await apiClient.get<PaginaSpring<RespostaServico>>(
    '/catalog/services',
    { params }
  );

  return data;
}

export async function listarSlotsPublicos({
  serviceId,
  dataISO,
  modality = 'ANY',
}: ListarSlotsPublicosParams): Promise<RespostaDisponibilidadePublica> {
  const [ano, mes, dia] = dataISO.split('-').map(Number);
  const dataSeguinte = new Date(ano, mes - 1, dia + 1);
  const toISO = `${dataSeguinte.getFullYear()}-${String(dataSeguinte.getMonth() + 1).padStart(2, '0')}-${String(dataSeguinte.getDate()).padStart(2, '0')}`;

  const params = {
    serviceId,
    from: dataISO,
    to: toISO,
    modality,
  };

  try {
    const { data } = await apiClient.get<RespostaDisponibilidadePublica>(
      '/availability/slots',
      { params }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      const { data } = await apiClient.get<RespostaDisponibilidadePublica>(
        '/public/availability/slots',
        { params }
      );

      return data;
    }

    throw error;
  }
}

export function useListarServicosAtivos() {
  return useQuery<ServicoPublico[], AxiosError<ProblemDetails>>({
    queryKey: publicQueryKeys.servicosAtivos,
    queryFn: async () => {
      const pagina = await listarServicosPublicos();

      return pagina.content.map((servico) => ({
        id: servico.id,
        title: servico.name,
        description: servico.shortDescription ?? undefined,
        durationMinutes: servico.durationMin,
        price: servico.priceCents,
        type: servico.type,
        category: {
          id: servico.category.id,
          title: servico.category.name,
          description: undefined,
        },
      }));
    },
    staleTime: 5 * 60 * 1000,
  });
}
