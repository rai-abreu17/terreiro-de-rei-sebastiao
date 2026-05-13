import { useShallow } from 'zustand/react/shallow';
import { useAuthStore } from './authStore';

export const useUsuarioAdmin = () => useAuthStore((state) => state.usuario);

export const useEstadoAutenticacao = () =>
  useAuthStore(
    useShallow((state) => ({
      usuario: state.usuario,
      estaAutenticada: state.estaAutenticada,
      isLoading: state.isLoading,
      inicializada: state.inicializada,
      ultimoErro: state.ultimoErro,
    }))
  );

export const useAcoesAuth = () =>
  useAuthStore(
    useShallow((state) => ({
      iniciarCarregamentoSessao: state.iniciarCarregamentoSessao,
      registrarSessao: state.registrarSessao,
      limparSessao: state.limparSessao,
      finalizarInicializacao: state.finalizarInicializacao,
      registrarErro: state.registrarErro,
    }))
  );