import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AuthStore } from './authStore.types';
import { ESTADO_INICIAL_AUTH } from './authStore.types';

const criarEstado: StateCreator<AuthStore> = (set) => ({
  ...ESTADO_INICIAL_AUTH,

  iniciarCarregamentoSessao: () =>
    set(
      (estadoAtual) => ({
        ...estadoAtual,
        isLoading: true,
      }),
      false,
      'authStore/iniciarCarregamentoSessao'
    ),

  registrarSessao: (usuario) =>
    set(
      {
        usuario,
        estaAutenticada: true,
        isLoading: false,
        inicializada: true,
        ultimoErro: null,
      },
      false,
      'authStore/registrarSessao'
    ),

  limparSessao: () => {
    set(
      {
        ...ESTADO_INICIAL_AUTH,
        isLoading: false,
        inicializada: true,
      },
      false,
      'authStore/limparSessao'
    );
  },

  finalizarInicializacao: () =>
    set(
      (estadoAtual) => ({
        ...estadoAtual,
        isLoading: false,
        inicializada: true,
      }),
      false,
      'authStore/finalizarInicializacao'
    ),

  registrarErro: (erro) =>
    set(
      (estadoAtual) => ({
        ...estadoAtual,
        ultimoErro: erro,
      }),
      false,
      'authStore/registrarErro'
    ),
});

export const useAuthStore = create<AuthStore>()(
  import.meta.env.DEV
    ? devtools(criarEstado, { name: 'AuthStore' })
    : criarEstado
);
