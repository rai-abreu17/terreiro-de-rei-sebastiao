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