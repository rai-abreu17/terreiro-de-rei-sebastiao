import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { listarSlotsPublicos, publicQueryKeys } from '@/api/public';
import type { ModalidadeAtendimento, ProblemDetails } from '@/api/catalog.types';
import type { SlotDisponivel } from '@/api/public.types';

interface UsePublicSlotsParams {
  readonly serviceId?: string;
  readonly dataISO?: string;
  readonly modality?: ModalidadeAtendimento | 'ANY';
}

export function usePublicSlots({
  serviceId,
  dataISO,
  modality = 'ANY',
}: UsePublicSlotsParams) {
  return useQuery<SlotDisponivel[], AxiosError<ProblemDetails>>({
    queryKey: publicQueryKeys.slots(serviceId ?? '', dataISO ?? '', modality),
    queryFn: async () => {
      if (!serviceId || !dataISO) {
        return [];
      }

      const resposta = await listarSlotsPublicos({
        serviceId,
        dataISO,
        modality,
      });

      return resposta.slots;
    },
    enabled: Boolean(serviceId && dataISO),
    staleTime: 30 * 1000,
  });
}