import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { getMe } from '@/api/auth';
import { subscribeToAuthLogout } from './authChannel';
import { useAcoesAuth, useEstadoAutenticacao } from '@/store/useAuthSelectors';

export function AuthProvider({ children }: PropsWithChildren) {
  const { inicializada } = useEstadoAutenticacao();
  const {
    iniciarCarregamentoSessao,
    registrarSessao,
    limparSessao,
    finalizarInicializacao,
    registrarErro,
  } = useAcoesAuth();

  useEffect(() => {
    let ativo = true;

    if (inicializada) {
      return () => {
        ativo = false;
      };
    }

    iniciarCarregamentoSessao();

    void getMe()
      .then((resposta) => {
        if (!ativo) {
          return;
        }

        registrarSessao(resposta.user);
      })
      .catch((erro) => {
        if (!ativo) {
          return;
        }

        limparSessao();
        registrarErro(
          typeof erro === 'object' && erro !== null && 'response' in erro
            ? ((erro as { response?: { data?: unknown } }).response?.data as never)
            : null
        );
      })
      .finally(() => {
        if (!ativo) {
          return;
        }

        finalizarInicializacao();
      });

    return () => {
      ativo = false;
    };
  }, [
    finalizarInicializacao,
    iniciarCarregamentoSessao,
    inicializada,
    limparSessao,
    registrarErro,
    registrarSessao,
  ]);

  useEffect(() => {
    return subscribeToAuthLogout(() => {
      limparSessao();
    });
  }, [limparSessao]);

  return <>{children}</>;
}