import { useEffect } from 'react';
import { z } from 'zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  extractCatalogError,
  useCategories,
  useCreateService,
  useUpdateService,
} from '@/hooks/useCatalog';
import type { RequisicaoCriarServico, RespostaServico } from '@/api/catalog.types';
import { useNavigate } from 'react-router-dom';
import * as estilos from './FormStyles.css';

const DURACOES_PADRAO = [15, 30, 45, 60, 90] as const;

const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function slugificar(valor: string): string {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function centsFromCurrencyInput(valor: string): number {
  const digitos = valor.replace(/\D/g, '');

  if (digitos.length === 0) {
    return 0;
  }

  return Number(digitos);
}

function formatCurrencyInput(valor: string): string {
  return formatadorMoeda.format(centsFromCurrencyInput(valor) / 100);
}

function formatCurrencyFromCents(valor: number): string {
  return formatadorMoeda.format(valor / 100);
}

const schemaServico = z.object({
  categoryId: z.string().min(1, 'Por favor, selecione uma categoria.'),
  type: z.enum(['CONSULTATION', 'RITUAL'] as const, {
    error: 'Por favor, selecione o tipo de serviço.',
  }),
  slug: z
    .string()
    .min(3, 'Informe um slug com pelo menos 3 caracteres.')
    .max(120, 'O slug deve ter no máximo 120 caracteres.')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Use apenas letras minúsculas, números e hífens no slug.'
    ),
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.').max(160, 'O nome deve ter no máximo 160 caracteres.'),
  shortDescription: z.string().max(280, 'A descrição curta deve ter no máximo 280 caracteres.').optional().nullable(),
  longDescription: z.string().optional().nullable(),
  durationMin: z.coerce.number().int().refine(
    (valor) => DURACOES_PADRAO.includes(valor as (typeof DURACOES_PADRAO)[number]),
    'Selecione uma duração válida para o serviço.'
  ),
  priceInput: z.string().min(1, 'Informe o valor do serviço.'),
  modalities: z.array(z.enum(['ONLINE', 'IN_PERSON'] as const)).min(1, 'Por favor, selecione pelo menos uma modalidade.'),
});

type DadosServicoForm = z.infer<typeof schemaServico>;

interface ServiceFormProps {
  servicoExistente?: RespostaServico;
  onSuccess?: () => void;
}

export function ServiceForm({ servicoExistente, onSuccess }: ServiceFormProps) {
  const navigate = useNavigate();
  const isEdicao = !!servicoExistente;
  const duracoesDisponiveis = Array.from(
    new Set([
      ...DURACOES_PADRAO,
      servicoExistente?.durationMin ?? 0,
    ])
  )
    .filter((valor): valor is number => valor > 0)
    .sort((primeiro, segundo) => primeiro - segundo);

  const { data: categorias } = useCategories();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<DadosServicoForm>({
    resolver: zodResolver(schemaServico) as Resolver<DadosServicoForm>,
    defaultValues: {
      categoryId: servicoExistente?.category.id ?? '',
      type: servicoExistente?.type ?? 'CONSULTATION',
      slug: servicoExistente?.slug ?? '',
      name: servicoExistente?.name ?? '',
      shortDescription: servicoExistente?.shortDescription ?? '',
      longDescription: servicoExistente?.longDescription ?? '',
      durationMin: servicoExistente?.durationMin ?? 60,
      priceInput: formatCurrencyFromCents(servicoExistente?.priceCents ?? 0),
      modalities: servicoExistente?.modalities ?? ['ONLINE', 'IN_PERSON'],
    },
  });

  const nomeAtual = useWatch({ control, name: 'name' });

  useEffect(() => {
    if (isEdicao && servicoExistente) {
      return;
    }

    const slugGerado = slugificar(nomeAtual ?? '');

    if (!dirtyFields.slug) {
      setValue('slug', slugGerado, {
        shouldDirty: false,
        shouldValidate: slugGerado.length > 0,
      });
    }
  }, [dirtyFields.slug, isEdicao, nomeAtual, servicoExistente, setValue]);

  const { mutate: criarServico, isPending: isCriando, error: erroCriar } = useCreateService();
  const { mutate: atualizarServico, isPending: isAtualizando, error: erroAtualizar } = useUpdateService();

  const isPending = isCriando || isAtualizando;
  const erroApi = erroCriar || erroAtualizar;

  const mensagemErroExibida = erroApi
    ? extractCatalogError(erroApi)
    : null;

  const aoSubmeter = (dadosForm: DadosServicoForm) => {
    const payload: RequisicaoCriarServico = {
      categoryId: dadosForm.categoryId,
      type: dadosForm.type,
      slug: slugificar(dadosForm.slug),
      name: dadosForm.name,
      shortDescription: dadosForm.shortDescription,
      longDescription: dadosForm.longDescription,
      durationMin: dadosForm.durationMin,
      priceCents: centsFromCurrencyInput(dadosForm.priceInput),
      modalities: dadosForm.modalities,
    };

    if (isEdicao) {
      atualizarServico(
        { serviceId: servicoExistente.id, payload },
        {
          onSuccess: () => {
            if (onSuccess) onSuccess();
            else navigate('/admin/catalog/services');
          },
        }
      );
    } else {
      criarServico(payload, {
        onSuccess: () => {
          if (onSuccess) onSuccess();
          else navigate('/admin/catalog/services');
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
            {isEdicao ? 'Editar Serviço' : 'Novo Serviço'}
          </legend>

          <div className={estilos.fieldGroup}>
            <label htmlFor="categoryId" className={estilos.label}>Categoria</label>
            <select
              id="categoryId"
              aria-required="true"
              aria-describedby={errors.categoryId ? 'erro-categoryId' : undefined}
              aria-invalid={!!errors.categoryId}
              className={estilos.select}
              {...register('categoryId')}
            >
              <option value="">Selecione uma categoria...</option>
              {categorias?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <span id="erro-categoryId" role="alert" className={estilos.errorText}>
                {errors.categoryId.message}
              </span>
            )}
          </div>

          <div className={estilos.fieldGroup}>
            <label htmlFor="type" className={estilos.label}>Tipo de Serviço</label>
            <select
              id="type"
              aria-required="true"
              aria-describedby={errors.type ? 'erro-type' : undefined}
              aria-invalid={!!errors.type}
              className={estilos.select}
              {...register('type')}
            >
              <option value="CONSULTATION">Consulta Oracular</option>
              <option value="RITUAL">Ritual Espiritual</option>
            </select>
            {errors.type && (
              <span id="erro-type" role="alert" className={estilos.errorText}>
                {errors.type.message}
              </span>
            )}
          </div>

          <div className={estilos.fieldGroup}>
            <label htmlFor="slug" className={estilos.label}>Slug</label>
            <input
              id="slug"
              type="text"
              autoComplete="off"
              aria-required="true"
              aria-describedby={errors.slug ? 'erro-slug' : 'ajuda-slug'}
              aria-invalid={!!errors.slug}
              className={estilos.input}
              {...register('slug', {
                onBlur: (event) => {
                  setValue('slug', slugificar(event.target.value), {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                },
              })}
            />
            <span id="ajuda-slug" className={estilos.helperText}>
              Este identificador aparece na URL pública do serviço.
            </span>
            {errors.slug && (
              <span id="erro-slug" role="alert" className={estilos.errorText}>
                {errors.slug.message}
              </span>
            )}
          </div>

          <div className={estilos.fieldGroup}>
            <label htmlFor="name" className={estilos.label}>Nome do serviço</label>
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
            <label htmlFor="shortDescription" className={estilos.label}>Descrição curta (opcional)</label>
            <textarea
              id="shortDescription"
              autoComplete="off"
              aria-describedby={errors.shortDescription ? 'erro-shortDescription' : undefined}
              aria-invalid={!!errors.shortDescription}
              className={estilos.textarea}
              {...register('shortDescription')}
              style={{ minHeight: '80px' }}
            />
            {errors.shortDescription && (
              <span id="erro-shortDescription" role="alert" className={estilos.errorText}>
                {errors.shortDescription.message}
              </span>
            )}
          </div>

          <div className={estilos.fieldGroup}>
            <label htmlFor="longDescription" className={estilos.label}>Descrição completa (opcional, Markdown aceito)</label>
            <textarea
              id="longDescription"
              autoComplete="off"
              aria-describedby={errors.longDescription ? 'erro-longDescription' : undefined}
              aria-invalid={!!errors.longDescription}
              className={estilos.textarea}
              {...register('longDescription')}
            />
            {errors.longDescription && (
              <span id="erro-longDescription" role="alert" className={estilos.errorText}>
                {errors.longDescription.message}
              </span>
            )}
          </div>

          <div className={estilos.fieldGroup}>
            <label htmlFor="durationMin" className={estilos.label}>Duração (minutos)</label>
            <select
              id="durationMin"
              aria-required="true"
              aria-describedby={errors.durationMin ? 'erro-durationMin' : undefined}
              aria-invalid={!!errors.durationMin}
              className={estilos.select}
              {...register('durationMin')}
            >
              {duracoesDisponiveis.map((duracao) => (
                <option key={duracao} value={duracao}>
                  {duracao} minutos
                </option>
              ))}
            </select>
            {errors.durationMin && (
              <span id="erro-durationMin" role="alert" className={estilos.errorText}>
                {errors.durationMin.message}
              </span>
            )}
          </div>

          <div className={estilos.fieldGroup}>
            <label htmlFor="priceBrl" className={estilos.label}>Preço (R$)</label>
            <Controller
              control={control}
              name="priceInput"
              render={({ field }) => (
                <input
                  id="priceBrl"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  aria-required="true"
                  aria-describedby={errors.priceInput ? 'erro-priceBrl' : undefined}
                  aria-invalid={!!errors.priceInput}
                  className={estilos.input}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={(event) => {
                    field.onChange(formatCurrencyInput(event.target.value));
                  }}
                  ref={field.ref}
                />
              )}
            />
            {errors.priceInput && (
              <span id="erro-priceBrl" role="alert" className={estilos.errorText}>
                {errors.priceInput.message}
              </span>
            )}
          </div>

          <div className={estilos.fieldGroup}>
            <span className={estilos.label}>Modalidades disponíveis</span>
            <div className={estilos.checkboxGroup}>
              <label className={estilos.checkboxLabel}>
                <input
                  type="checkbox"
                  value="ONLINE"
                  {...register('modalities')}
                />
                Online
              </label>
              <label className={estilos.checkboxLabel}>
                <input
                  type="checkbox"
                  value="IN_PERSON"
                  {...register('modalities')}
                />
                Presencial
              </label>
            </div>
            {errors.modalities && (
              <span role="alert" className={estilos.errorText}>
                {errors.modalities.message}
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
          {isPending ? 'Processando...' : 'Salvar serviço'}
        </button>
      </form>
    </div>
  );
}
