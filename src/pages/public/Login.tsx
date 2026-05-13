import { useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { extractProblemDetails, login, type LoginDTO } from '@/api/auth';
import { useAcoesAuth } from '@/store/useAuthSelectors';
import { useAuth } from '@/auth/useAuth';
import * as styles from './Login.css';

const schemaLogin = z.object({
  email: z.string().email('Informe um endereço de e-mail válido.'),
  password: z.string().min(1, 'Informe a sua senha.'),
});

type DadosLogin = z.infer<typeof schemaLogin>;

function resolverMensagemErro(erro: unknown): string {
  const problem = extractProblemDetails(erro);

  switch (problem?.code) {
    case 'INVALID_CREDENTIALS':
      return 'E-mail ou senha incorretos.';
    case 'ACCOUNT_LOCKED':
      return 'Conta temporariamente bloqueada por múltiplas tentativas falhas. Tente novamente mais tarde.';
    case 'RATE_LIMITED':
      return 'Muitas tentativas. Aguarde um momento.';
    default:
      return problem?.detail ?? 'Não foi possível iniciar a sessão administrativa.';
  }
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, estaAutenticada, isLoading } = useAuth();
  const { registrarSessao, registrarErro } = useAcoesAuth();

  const returnTo = useMemo(() => {
    const state = location.state as { returnTo?: string } | null;
    return state?.returnTo ?? '/admin/catalog/services';
  }, [location.state]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DadosLogin>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (dados: LoginDTO) => login(dados, { __skipAuthRefresh: true }),
    onSuccess: (resposta) => {
      registrarSessao(resposta.user);
      registrarErro(null);
      navigate(returnTo, { replace: true });
    },
    onError: (erro) => {
      registrarErro(extractProblemDetails(erro));
    },
  });

  if (!isLoading && estaAutenticada && user) {
    return <Navigate to={returnTo} replace />;
  }

  return (
    <main className={styles.pagina}>
      <section className={styles.cartao} aria-labelledby="login-admin-heading">
        <header className={styles.cabecalho}>
          <span className={styles.etiqueta}>Acesso da administração</span>
          <h1 className={styles.titulo} id="login-admin-heading">
            Entrar no painel
          </h1>
          <p className={styles.descricao}>
            Informe as credenciais da Casa para gerir catálogo, disponibilidade e marcações.
          </p>
        </header>

        {mutation.isError && (
          <div className={styles.erroPainel} role="alert" aria-live="assertive">
            {resolverMensagemErro(mutation.error)}
          </div>
        )}

        <form
          className={styles.formulario}
          noValidate
          onSubmit={handleSubmit((dados) => mutation.mutate(dados))}
        >
          <div className={styles.grupoCampo}>
            <label className={styles.label} htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={styles.input}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'erro-email' : undefined}
              {...register('email')}
            />
            {errors.email && (
              <span className={styles.erroCampo} id="erro-email" role="alert">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={styles.grupoCampo}>
            <label className={styles.label} htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className={styles.input}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'erro-password' : undefined}
              {...register('password')}
            />
            {errors.password && (
              <span className={styles.erroCampo} id="erro-password" role="alert">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            className={styles.botaoSubmit}
            type="submit"
            disabled={mutation.isPending}
            aria-busy={mutation.isPending}
          >
            {mutation.isPending ? 'A validar acesso...' : 'Entrar no painel'}
          </button>
        </form>
      </section>
    </main>
  );
}