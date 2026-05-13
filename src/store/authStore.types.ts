import type { ProblemDetails } from '@/api/auth';

export interface UsuarioAdmin {
  readonly id: string;
  readonly email: string;
  readonly displayName: string;
  readonly role: string;
}

export interface AuthState {
  readonly usuario: UsuarioAdmin | null;
  readonly estaAutenticada: boolean;
  readonly isLoading: boolean;
  readonly inicializada: boolean;
  readonly ultimoErro: ProblemDetails | null;
}

export interface AuthActions {
  iniciarCarregamentoSessao: () => void;
  registrarSessao: (usuario: UsuarioAdmin) => void;
  limparSessao: () => void;
  finalizarInicializacao: () => void;
  registrarErro: (erro: ProblemDetails | null) => void;
}

export type AuthStore = AuthState & AuthActions;

export const ESTADO_INICIAL_AUTH: AuthState = {
  usuario: null,
  estaAutenticada: false,
  isLoading: true,
  inicializada: false,
  ultimoErro: null,
};