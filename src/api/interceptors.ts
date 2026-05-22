import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';
import { broadcastAuthLogout } from '@/auth/authChannel';
import { refresh, getMe, type ApiRequestConfig, type ProblemDetails } from './auth';
import { getCsrfToken } from '@/auth/csrf';
import { useAuthStore } from '@/store/authStore';

interface RequisicaoComRetry extends InternalAxiosRequestConfig {
  _retry?: boolean;
  __skipAuthRefresh?: boolean;
}

interface FailedQueueEntry {
  resolve: () => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedQueueEntry[] = [];

function isAuthEndpoint(url?: string): boolean {
  if (!url) {
    return false;
  }

  return url.includes('/auth/login') || url.includes('/auth/refresh');
}

function processQueue(error?: unknown): void {
  failedQueue.forEach((entry) => {
    if (error) {
      entry.reject(error);
      return;
    }

    entry.resolve();
  });

  failedQueue = [];
}

function extractProblem(error: AxiosError<ProblemDetails>): ProblemDetails | null {
  return error.response?.data ?? null;
}

function redirectToLogin(): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (window.location.pathname !== '/admin/login') {
    window.location.assign('/admin/login');
  }
}

function shouldRefreshCsrf(error: AxiosError<ProblemDetails>): boolean {
  const originalRequest = error.config as RequisicaoComRetry | undefined;
  const problem = extractProblem(error);

  if (!originalRequest || originalRequest._retry) {
    return false;
  }

  return error.response?.status === 403 && problem?.code === 'CSRF_TOKEN_MISMATCH';
}

function shouldRefreshToken(error: AxiosError<ProblemDetails>): boolean {
  const originalRequest = error.config as RequisicaoComRetry | undefined;
  const problem = extractProblem(error);

  if (!originalRequest) {
    return false;
  }

  if (originalRequest.__skipAuthRefresh || originalRequest._retry) {
    return false;
  }

  if (isAuthEndpoint(originalRequest.url)) {
    return false;
  }

  return error.response?.status === 401 && problem?.code === 'TOKEN_EXPIRED';
}

function normalizeTimeoutMessage(error: AxiosError<ProblemDetails>): AxiosError<ProblemDetails> {
  if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
    error.message = 'Tempo limite excedido ao comunicar com a API.';
  }

  return error;
}

export function setupAuthInterceptors(api: AxiosInstance): void {
  api.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
      if (!axios.isAxiosError<ProblemDetails>(error)) {
        return Promise.reject(error);
      }

      const axiosError = normalizeTimeoutMessage(error);
      const originalRequest = axiosError.config as RequisicaoComRetry | undefined;

      if (shouldRefreshCsrf(axiosError) && originalRequest) {
        originalRequest._retry = true;
        try {
          await getMe({ __skipAuthRefresh: true } satisfies ApiRequestConfig);
          const freshToken = getCsrfToken();
          if (freshToken && originalRequest.headers) {
            originalRequest.headers['X-CSRF-Token'] = freshToken;
          }
          return api(originalRequest);
        } catch {
          return Promise.reject(axiosError);
        }
      }

      if (!shouldRefreshToken(axiosError) || !originalRequest) {
        return Promise.reject(axiosError);
      }

      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const resposta = await refresh({ __skipAuthRefresh: true } satisfies ApiRequestConfig);

        useAuthStore.getState().registrarSessao(resposta.user);
        processQueue();

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        useAuthStore.getState().limparSessao();
        broadcastAuthLogout();
        redirectToLogin();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
}