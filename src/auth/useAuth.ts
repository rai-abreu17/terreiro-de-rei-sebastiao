import { useCallback } from 'react';
import { logout } from '@/api/auth';
import { broadcastAuthLogout } from './authChannel';
import { useAcoesAuth, useEstadoAutenticacao } from '@/store/useAuthSelectors';

export function useAuth() {
  const estado = useEstadoAutenticacao();
  const { limparSessao } = useAcoesAuth();

  const encerrarSessao = useCallback(async () => {
    try {
      await logout({ __skipAuthRefresh: true });
    } catch {
      // Falha no backend (ex: sessão já expirada) é ignorada intencionalmente.
      // O estado local é sempre limpo no bloco finally.
    } finally {
      limparSessao();
      broadcastAuthLogout();
    }
  }, [limparSessao]);

  return {
    user: estado.usuario,
    estaAutenticada: estado.estaAutenticada,
    isLoading: estado.isLoading,
    inicializada: estado.inicializada,
    ultimoErro: estado.ultimoErro,
    logout: encerrarSessao,
  };
}