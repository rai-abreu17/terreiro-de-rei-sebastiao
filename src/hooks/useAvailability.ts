import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import type { ProblemDetails } from '@/api/catalog.types';
import {
  batchCreateAvailabilityOverrides,
  createAvailabilityOverride,
  createAvailabilityRule,
  deleteAvailabilityOverride,
  deleteAvailabilityOverridesByDate,
  deleteAvailabilityRule,
  listAvailabilityOverrides,
  listAvailabilityRules,
  type ListAvailabilityOverridesParams,
  type AvailabilityOverride,
  type AvailabilityRule,
  type SaveAvailabilityOverrideRequest,
  type SaveAvailabilityRuleRequest,
  updateAvailabilityOverride,
  updateAvailabilityRule,
} from '@/api/availability-admin';

export const availabilityQueryKeys = {
  all: ['admin', 'availability'] as const,
  rules: ['admin', 'availability', 'rules'] as const,
  overrides: (from?: string, to?: string) =>
    ['admin', 'availability', 'overrides', from ?? 'all', to ?? 'all'] as const,
} as const;

interface UseAvailabilityOptions {
  readonly overrides?: ListAvailabilityOverridesParams;
}

export function extractAvailabilityError(error: unknown): string {
  if (axios.isAxiosError<ProblemDetails>(error)) {
    const problem = error.response?.data;

    switch (problem?.code) {
      case 'VALIDATION_ERROR':
        return problem.detail ?? 'Revise os dados informados antes de guardar a disponibilidade.';
      case 'RESOURCE_NOT_FOUND':
        return 'O item selecionado não foi encontrado. Atualize a página e tente novamente.';
      default:
        return problem?.detail ?? 'Não foi possível atualizar a agenda administrativa.';
    }
  }

  return 'Não foi possível atualizar a agenda administrativa.';
}

export function useAvailability(options: UseAvailabilityOptions = {}) {
  const queryClient = useQueryClient();
  const overridesFilter = options.overrides ?? {};

  const invalidateAvailability = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: availabilityQueryKeys.rules }),
      queryClient.invalidateQueries({ queryKey: ['admin', 'availability', 'overrides'] }),
    ]);
  };

  const rulesQuery = useQuery<AvailabilityRule[], AxiosError<ProblemDetails>>({
    queryKey: availabilityQueryKeys.rules,
    queryFn: listAvailabilityRules,
    staleTime: 30 * 1000,
  });

  const overridesQuery = useQuery<AvailabilityOverride[], AxiosError<ProblemDetails>>({
    queryKey: availabilityQueryKeys.overrides(
      overridesFilter.from,
      overridesFilter.to
    ),
    queryFn: () => listAvailabilityOverrides(overridesFilter),
    staleTime: 30 * 1000,
  });

  const createRuleMutation = useMutation<
    AvailabilityRule,
    AxiosError<ProblemDetails>,
    SaveAvailabilityRuleRequest
  >({
    mutationFn: createAvailabilityRule,
    onSuccess: invalidateAvailability,
  });

  const updateRuleMutation = useMutation<
    AvailabilityRule,
    AxiosError<ProblemDetails>,
    { ruleId: string; payload: SaveAvailabilityRuleRequest }
  >({
    mutationFn: ({ ruleId, payload }) => updateAvailabilityRule(ruleId, payload),
    onSuccess: invalidateAvailability,
  });

  const deleteRuleMutation = useMutation<
    void,
    AxiosError<ProblemDetails>,
    string
  >({
    mutationFn: deleteAvailabilityRule,
    onSuccess: invalidateAvailability,
  });

  const createOverrideMutation = useMutation<
    AvailabilityOverride,
    AxiosError<ProblemDetails>,
    SaveAvailabilityOverrideRequest
  >({
    mutationFn: createAvailabilityOverride,
    onSuccess: invalidateAvailability,
  });

  const updateOverrideMutation = useMutation<
    AvailabilityOverride,
    AxiosError<ProblemDetails>,
    { overrideId: string; payload: SaveAvailabilityOverrideRequest }
  >({
    mutationFn: ({ overrideId, payload }) =>
      updateAvailabilityOverride(overrideId, payload),
    onSuccess: invalidateAvailability,
  });

  const deleteOverrideMutation = useMutation<
    void,
    AxiosError<ProblemDetails>,
    string
  >({
    mutationFn: deleteAvailabilityOverride,
    onSuccess: invalidateAvailability,
  });

  const deleteOverridesByDateMutation = useMutation<
    void,
    AxiosError<ProblemDetails>,
    string
  >({
    mutationFn: deleteAvailabilityOverridesByDate,
    onSuccess: invalidateAvailability,
  });

  const batchCreateOverridesMutation = useMutation<
    AvailabilityOverride[],
    AxiosError<ProblemDetails>,
    SaveAvailabilityOverrideRequest[]
  >({
    mutationFn: batchCreateAvailabilityOverrides,
    onSuccess: invalidateAvailability,
  });

  return {
    rules: rulesQuery.data ?? [],
    overrides: overridesQuery.data ?? [],
    rulesQuery,
    overridesQuery,
    createRuleMutation,
    updateRuleMutation,
    deleteRuleMutation,
    createOverrideMutation,
    updateOverrideMutation,
    deleteOverrideMutation,
    deleteOverridesByDateMutation,
    batchCreateOverridesMutation,
  };
}