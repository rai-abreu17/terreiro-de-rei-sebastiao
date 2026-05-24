import type { AxiosRequestConfig, AxiosError, AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';
import { apiClient } from './client';
import { registrarCsrfToken } from '@/auth/csrf';

export interface AuthFieldError {
  readonly field: string;
  readonly message: string;
}

export interface ProblemDetails {
  readonly type: string;
  readonly title: string;
  readonly status: number;
  readonly detail: string;
  readonly instance?: string;
  readonly code?: string;
  readonly traceId?: string;
  readonly errors?: AuthFieldError[];
}

export interface LoginDTO {
  readonly email: string;
  readonly password: string;
}

export interface AdminUser {
  readonly id: string;
  readonly email: string;
  readonly displayName: string;
  readonly role: string;
}

export interface AuthEnvelope {
  readonly user: AdminUser;
}

export interface ApiRequestConfig extends AxiosRequestConfig {
  __skipAuthRefresh?: boolean;
}

function registrarCsrfDaResposta(
  headers: AxiosResponseHeaders | RawAxiosResponseHeaders
): void {
  const csrfHeader = headers?.['x-csrf-token'];
  const valor = Array.isArray(csrfHeader) ? csrfHeader[0] : csrfHeader;
  if (typeof valor === 'string' && valor) {
    registrarCsrfToken(valor);
  }
}

export function login(
  credentials: LoginDTO,
  config?: ApiRequestConfig
): Promise<AuthEnvelope> {
  return apiClient
    .post<AuthEnvelope>('/auth/login', credentials, config)
    .then((response) => {
      registrarCsrfDaResposta(response.headers);
      return response.data;
    });
}

export function logout(config?: ApiRequestConfig): Promise<void> {
  return apiClient
    .post('/auth/logout', undefined, config)
    .then(() => undefined);
}

export function getMe(config?: ApiRequestConfig): Promise<AuthEnvelope> {
  return apiClient.get<AuthEnvelope>('/auth/me', config).then((response) => {
    registrarCsrfDaResposta(response.headers);
    return response.data;
  });
}

export function refresh(config?: ApiRequestConfig): Promise<AuthEnvelope> {
  return apiClient
    .post<AuthEnvelope>('/auth/refresh', undefined, config)
    .then((response) => {
      registrarCsrfDaResposta(response.headers);
      return response.data;
    });
}

export function isProblemDetailsError(
  error: unknown
): error is AxiosError<ProblemDetails> {
  return Boolean(
    typeof error === 'object' && error !== null && 'isAxiosError' in error
  );
}

export function extractProblemDetails(error: unknown): ProblemDetails | null {
  if (!isProblemDetailsError(error)) {
    return null;
  }

  return error.response?.data ?? null;
}
