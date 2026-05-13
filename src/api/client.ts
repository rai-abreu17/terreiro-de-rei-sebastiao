import axios from 'axios';
import { getCsrfToken } from '@/auth/csrf';
import { setupAuthInterceptors } from './interceptors';

/**
 * Cliente HTTP base para a API do Terreiro de Rei Sebastião.
 * Configurado de acordo com o Princípio PR-09 e regras de sessão segura (PR-16).
 */
const DEFAULT_API_BASE_URL = 'http://localhost:8080/api/v1';

function resolveApiBaseUrl(): string {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (!configuredBaseUrl) {
    return DEFAULT_API_BASE_URL;
  }

  return configuredBaseUrl.replace(/\/+$/, '');
}

export const apiClient = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const metodo = config.method?.toLowerCase();
    const csrfToken = getCsrfToken();

    if (
      csrfToken &&
      config.headers &&
      metodo &&
      ['post', 'put', 'patch', 'delete'].includes(metodo)
    ) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


setupAuthInterceptors(apiClient);

