import { apiClient } from '@/api/client';

export type Modalidade = 'ONLINE' | 'IN_PERSON';
export type TipoServicoAgenda = 'CONSULTATION' | 'RITUAL';

export interface AvailabilityRule {
  id: string;
  weekday: number;
  startTime: string;
  endTime: string;
  modalities: Modalidade[];
  serviceTypes: TipoServicoAgenda[];
  isActive: boolean;
}

export interface SaveAvailabilityRuleRequest {
  weekday: number;
  startTime: string;
  endTime: string;
  modalities: Modalidade[];
  serviceTypes: TipoServicoAgenda[];
  isActive: boolean;
}

export interface AvailabilityOverride {
  id: string;
  date: string;
  isClosed: boolean;
  startTime?: string | null;
  endTime?: string | null;
  modalities?: Modalidade[] | null;
  serviceTypes?: TipoServicoAgenda[] | null;
  reason?: string | null;
  notes?: string | null;
}

export interface SaveAvailabilityOverrideRequest {
  date: string;
  isClosed: boolean;
  startTime?: string | null;
  endTime?: string | null;
  modalities?: Modalidade[] | null;
  serviceTypes?: TipoServicoAgenda[] | null;
  reason?: string | null;
  notes?: string | null;
}

export interface ListAvailabilityOverridesParams {
  from?: string;
  to?: string;
}

export async function listAvailabilityRules(): Promise<AvailabilityRule[]> {
  const { data } = await apiClient.get<AvailabilityRule[]>('/admin/availability/rules');
  return data;
}

export async function createAvailabilityRule(
  payload: SaveAvailabilityRuleRequest
): Promise<AvailabilityRule> {
  const { data } = await apiClient.post<AvailabilityRule>(
    '/admin/availability/rules',
    payload
  );

  return data;
}

export async function updateAvailabilityRule(
  ruleId: string,
  payload: SaveAvailabilityRuleRequest
): Promise<AvailabilityRule> {
  const { data } = await apiClient.put<AvailabilityRule>(
    `/admin/availability/rules/${ruleId}`,
    payload
  );

  return data;
}

export async function deleteAvailabilityRule(ruleId: string): Promise<void> {
  await apiClient.delete(`/admin/availability/rules/${ruleId}`);
}

export async function listAvailabilityOverrides(
  params: ListAvailabilityOverridesParams = {}
): Promise<AvailabilityOverride[]> {
  const { data } = await apiClient.get<AvailabilityOverride[]>(
    '/admin/availability/overrides',
    {
      params,
    }
  );

  return data;
}

export async function createAvailabilityOverride(
  payload: SaveAvailabilityOverrideRequest
): Promise<AvailabilityOverride> {
  const { data } = await apiClient.post<AvailabilityOverride>(
    '/admin/availability/overrides',
    payload
  );

  return data;
}

export async function updateAvailabilityOverride(
  overrideId: string,
  payload: SaveAvailabilityOverrideRequest
): Promise<AvailabilityOverride> {
  const { data } = await apiClient.put<AvailabilityOverride>(
    `/admin/availability/overrides/${overrideId}`,
    payload
  );

  return data;
}

export async function deleteAvailabilityOverride(
  overrideId: string
): Promise<void> {
  await apiClient.delete(`/admin/availability/overrides/${overrideId}`);
}

export async function deleteAvailabilityOverridesByDate(
  date: string
): Promise<void> {
  await apiClient.delete(`/admin/availability/overrides/by-date/${date}`);
}

export async function batchCreateAvailabilityOverrides(
  payloads: SaveAvailabilityOverrideRequest[]
): Promise<AvailabilityOverride[]> {
  const { data } = await apiClient.post<AvailabilityOverride[]>(
    '/admin/availability/overrides/batch',
    payloads
  );

  return data;
}
