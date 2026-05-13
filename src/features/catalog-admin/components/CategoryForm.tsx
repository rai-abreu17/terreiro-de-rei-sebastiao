import { z } from 'zod';
import { useForm } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCriarCategoria, useAtualizarCategoria, extrairMensagemErro } from '@/api/catalog';
import type { RespostaCategoria } from '@/api/catalog.types';
import { useNavigate } from 'react-router-dom';
import * as estilos from './FormStyles.css';

const schemaCategoria = z.object({
  name: z.string().min(3, 'Por favor, informe o nome com pelo menos 3 caracteres.').max(120, 'O nome deve ter no máximo 120 caracteres.'),
  description: z.string().max(280, 'A descrição deve ter no máximo 280 caracteres.').optional().nullable(),
  displayOrder: z.coerce.number().int().min(0, 'A ordem não pode ser negativa.'),
});

type DadosCategoria = z.infer<typeof schemaCategoria>;

interface CategoryFormProps {
  categoriaExistente?: RespostaCategoria;
  onSuccess?: () => void;
}

export function CategoryForm({ categoriaExistente, onSuccess }: CategoryFormProps) {
  const navigate = useNavigate();
  const isEdicao = !!categoriaExistente;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DadosCategoria>({
    resolver: zodResolver(schemaCategoria) as Resolver<DadosCategoria>,
    defaultValues: {
      name: categoriaExistente?.name ?? '',
      description: categoriaExistente?.description ?? '',
      displayOrder: categoriaExistente?.displayOrder ?? 0,
    },
  });

  const { mutate: criarCategoria, isPending: isCriando, error: erroCriar } = useCriarCategoria();
  const { mutate: atualizarCategoria, isPending: isAtualizando, error: erroAtualizar } = useAtualizarCategoria();

  const isPending = isCriando || isAtualizando;
  const erroApi = erroCriar || erroAtualizar;

  const mensagemErroExibida = erroApi
    ? extrairMensagemErro(erroApi)
    : null;

  const aoSubmeter = (dados: DadosCategoria) => {
    if (isEdicao) {
      atualizarCategoria(
        { categoriaId: categoriaExistente.id, dados },
        {
          onSuccess: () => {
            if (onSuccess) onSuccess();
            else navigate('/admin/catalog/categories');
          },
        }
      );
    } else {
      criarCategoria(dados, {
        onSuccess: () => {
          if (onSuccess) onSuccess();
          else navigate('/admin/catalog/categories');
        },
      });
    }
  };

  return (
    <div className={estilos.container}>
      {mensagemErroExibida && (
        <div role="alert" aria-live="assertive" className={estilos.painelErro}>
          {mensagemErroExibida}
        </div>
      )}

      <form onSubmit={handleSubmit(aoSubmeter)} noValidate>
        <fieldset className={estilos.fieldset}>
          <legend className={estilos.legend}>
            {isEdicao ? 'Editar Categoria' : 'Nova Categoria'}
          </legend>

          <div className={estilos.fieldGroup}>
            <label htmlFor="name" className={estilos.label}>Nome da categoria</label>
            <input
              id="name"
              type="text"
              autoComplete="off"
              aria-required="true"
              aria-describedby={errors.name ? 'erro-name' : undefined}
              aria-invalid={!!errors.name}
              className={estilos.input}
              {...register('name')}
            />
            {errors.name && (
              <span id="erro-name" role="alert" className={estilos.errorText}>
                {errors.name.message}
              </span>
            )}
          </div>

          <div className={estilos.fieldGroup}>
            <label htmlFor="description" className={estilos.label}>Descrição (opcional)</label>
            <textarea
              id="description"
              autoComplete="off"
              aria-describedby={errors.description ? 'erro-description' : undefined}
              aria-invalid={!!errors.description}
              className={estilos.textarea}
              {...register('description')}
            />
            {errors.description && (
              <span id="erro-description" role="alert" className={estilos.errorText}>
                {errors.description.message}
              </span>
            )}
          </div>

          <div className={estilos.fieldGroup}>
            <label htmlFor="displayOrder" className={estilos.label}>Ordem de exibição</label>
            <input
              id="displayOrder"
              type="number"
              min="0"
              aria-required="true"
              aria-describedby={errors.displayOrder ? 'erro-displayOrder' : undefined}
              aria-invalid={!!errors.displayOrder}
              className={estilos.input}
              {...register('displayOrder')}
            />
            {errors.displayOrder && (
              <span id="erro-displayOrder" role="alert" className={estilos.errorText}>
                {errors.displayOrder.message}
              </span>
            )}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className={isPending ? estilos.submitButton.carregando : estilos.submitButton.ativo}
        >
          {isPending ? 'Processando...' : 'Salvar categoria'}
        </button>
      </form>
    </div>
  );
}
