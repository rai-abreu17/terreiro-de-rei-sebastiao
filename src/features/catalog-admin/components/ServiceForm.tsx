import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import type { FieldErrors, FieldPath, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  Save,
  Sparkles,
} from 'lucide-react';
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
    .max(120, 'O slug deve ter no máximo 120 caracteres.')
    .refine(
      (valor) => valor.length === 0 || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(valor),
      'Use apenas letras minúsculas, números e hífens no slug.'
    )
    .optional(),
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
type CampoServicoForm = FieldPath<DadosServicoForm>;
type TipoServicoForm = DadosServicoForm['type'];
type ModalidadeServicoForm = DadosServicoForm['modalities'][number];

const ROTULOS_TIPO_SERVICO: Record<TipoServicoForm, string> = {
  CONSULTATION: 'Consulta Oracular',
  RITUAL: 'Ritual Espiritual',
};

const ROTULOS_MODALIDADE: Record<ModalidadeServicoForm, string> = {
  ONLINE: 'Online',
  IN_PERSON: 'Presencial',
};

const ETAPAS_SERVICO = [
  {
    titulo: 'Identificação',
    descricao: 'Categoria, tipo e nome do serviço.',
    campos: ['categoryId', 'type', 'name'],
  },
  {
    titulo: 'Apresentação',
    descricao: 'Textos que aparecem no catálogo.',
    campos: ['shortDescription', 'longDescription'],
  },
  {
    titulo: 'Atendimento',
    descricao: 'Duração, valor e modalidades.',
    campos: ['durationMin', 'priceInput', 'modalities'],
  },
  {
    titulo: 'Revisão',
    descricao: 'Conferência antes de salvar.',
    campos: [],
  },
] satisfies ReadonlyArray<{
  titulo: string;
  descricao: string;
  campos: readonly CampoServicoForm[];
}>;

const INDICE_ULTIMA_ETAPA = ETAPAS_SERVICO.length - 1;

function formatarModalidades(modalidades?: ModalidadeServicoForm[]): string {
  if (!modalidades?.length) {
    return 'Nenhuma modalidade selecionada';
  }

  return modalidades.map((modalidade) => ROTULOS_MODALIDADE[modalidade]).join(' e ');
}

function encontrarPrimeiraEtapaComErro(
  erros: FieldErrors<DadosServicoForm>
): number {
  const indice = ETAPAS_SERVICO.findIndex((etapa) =>
    etapa.campos.some((campo) => Boolean(erros[campo]))
  );

  return indice >= 0 ? indice : 0;
}

interface ServiceFormProps {
  servicoExistente?: RespostaServico;
  onSuccess?: () => void;
}

export function ServiceForm({ servicoExistente, onSuccess }: ServiceFormProps) {
  const navigate = useNavigate();
  const isEdicao = !!servicoExistente;
  const [etapaAtual, setEtapaAtual] = useState(0);
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
    trigger,
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
  const categoriaAtual = useWatch({ control, name: 'categoryId' });
  const tipoAtual = useWatch({ control, name: 'type' });
  const descricaoCurtaAtual = useWatch({ control, name: 'shortDescription' });
  const descricaoLongaAtual = useWatch({ control, name: 'longDescription' });
  const duracaoAtual = useWatch({ control, name: 'durationMin' });
  const precoAtual = useWatch({ control, name: 'priceInput' });
  const modalidadesAtuais = useWatch({ control, name: 'modalities' });
  const modalidadesSelecionadas = modalidadesAtuais ?? [];
  const categoriaSelecionada = categorias?.find((cat) => cat.id === categoriaAtual);

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

  const possuiErroNaEtapa = (indiceEtapa: number) =>
    ETAPAS_SERVICO[indiceEtapa].campos.some((campo) => Boolean(errors[campo]));

  const classeBotaoEtapa = (indiceEtapa: number) => {
    if (possuiErroNaEtapa(indiceEtapa)) {
      return estilos.stepButton.erro;
    }

    if (indiceEtapa === etapaAtual) {
      return estilos.stepButton.ativa;
    }

    if (indiceEtapa < etapaAtual) {
      return estilos.stepButton.concluida;
    }

    return estilos.stepButton.pendente;
  };

  const avancarEtapa = async () => {
    const camposEtapaAtual = ETAPAS_SERVICO[etapaAtual].campos;
    const etapaValida = camposEtapaAtual.length === 0
      ? true
      : await trigger(camposEtapaAtual, { shouldFocus: true });

    if (etapaValida) {
      setEtapaAtual((indice) => Math.min(indice + 1, INDICE_ULTIMA_ETAPA));
    }
  };

  const voltarEtapa = () => {
    setEtapaAtual((indice) => Math.max(indice - 1, 0));
  };

  const irParaEtapaAnterior = (indiceEtapa: number) => {
    if (indiceEtapa <= etapaAtual) {
      setEtapaAtual(indiceEtapa);
    }
  };

  const aoSubmeter = (dadosForm: DadosServicoForm) => {
    const payload: RequisicaoCriarServico = {
      categoryId: dadosForm.categoryId,
      type: dadosForm.type,
      slug: slugificar(dadosForm.slug || dadosForm.name),
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

  const aoSubmeterInvalido = (errosFormulario: FieldErrors<DadosServicoForm>) => {
    setEtapaAtual(encontrarPrimeiraEtapaComErro(errosFormulario));
  };

  const aoEnviarFormulario = handleSubmit(aoSubmeter, aoSubmeterInvalido);

  return (
    <div className={estilos.serviceWizardContainer}>
      {mensagemErroExibida && (
        <div role="alert" aria-live="assertive" className={estilos.painelErro}>
          {mensagemErroExibida}
        </div>
      )}

      <form onSubmit={aoEnviarFormulario} noValidate className={estilos.wizardForm}>
        <input type="hidden" {...register('slug')} />
        <aside className={estilos.wizardAside} aria-label="Etapas do cadastro">
          <div className={estilos.wizardIntro}>
            <span className={estilos.eyebrow}>Cadastro guiado</span>
            <h2 className={estilos.wizardTitle}>
              {isEdicao ? 'Ajustar serviço' : 'Adicionar serviço'}
            </h2>
            <p className={estilos.wizardDescription}>
              Cada etapa guarda uma parte do cadastro para evitar campos soltos demais.
            </p>
          </div>

          <ol className={estilos.stepList}>
            {ETAPAS_SERVICO.map((etapa, indice) => (
              <li key={etapa.titulo}>
                <button
                  type="button"
                  className={classeBotaoEtapa(indice)}
                  onClick={() => irParaEtapaAnterior(indice)}
                  disabled={indice > etapaAtual}
                  aria-current={indice === etapaAtual ? 'step' : undefined}
                >
                  <span className={estilos.stepMarker}>
                    {indice < etapaAtual && !possuiErroNaEtapa(indice) ? (
                      <CheckCircle2 size={16} aria-hidden="true" />
                    ) : (
                      indice + 1
                    )}
                  </span>
                  <span className={estilos.stepText}>
                    <strong>{etapa.titulo}</strong>
                    <small>{etapa.descricao}</small>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className={estilos.quickSummary} aria-live="polite">
            <span className={estilos.summaryEyebrow}>Resumo rápido</span>
            <strong>{nomeAtual?.trim() || 'Serviço sem nome'}</strong>
            <span>{categoriaSelecionada?.name ?? 'Categoria pendente'}</span>
            <span>
              {duracaoAtual ? `${duracaoAtual} min` : 'Duração pendente'} · {precoAtual || 'Preço pendente'}
            </span>
          </div>
        </aside>

        <div className={estilos.wizardMain}>
          <header className={estilos.stepHeader}>
            <span className={estilos.stepCounter}>
              Etapa {etapaAtual + 1} de {ETAPAS_SERVICO.length}
            </span>
            <h3 className={estilos.stepTitle}>{ETAPAS_SERVICO[etapaAtual].titulo}</h3>
            <p className={estilos.stepDescription}>{ETAPAS_SERVICO[etapaAtual].descricao}</p>
          </header>

          {etapaAtual === 0 && (
            <fieldset className={estilos.fieldset}>
              <legend className={estilos.visuallyHidden}>Identificação do serviço</legend>

              <div className={estilos.fieldGrid}>
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

                <fieldset className={estilos.inlineFieldset}>
                  <legend className={estilos.label}>Tipo de serviço</legend>
                  <div className={estilos.optionGrid}>
                    <label className={estilos.optionLabel}>
                      <input
                        className={estilos.optionInput}
                        type="radio"
                        value="CONSULTATION"
                        {...register('type')}
                      />
                      <span className={estilos.optionContent}>
                        <Sparkles size={16} aria-hidden="true" />
                        Consulta Oracular
                      </span>
                    </label>
                    <label className={estilos.optionLabel}>
                      <input
                        className={estilos.optionInput}
                        type="radio"
                        value="RITUAL"
                        {...register('type')}
                      />
                      <span className={estilos.optionContent}>
                        <FileText size={16} aria-hidden="true" />
                        Ritual Espiritual
                      </span>
                    </label>
                  </div>
                  {errors.type && (
                    <span id="erro-type" role="alert" className={estilos.errorText}>
                      {errors.type.message}
                    </span>
                  )}
                </fieldset>

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
                    placeholder="Ex.: Jogo de búzios completo"
                    {...register('name')}
                  />
                  {errors.name && (
                    <span id="erro-name" role="alert" className={estilos.errorText}>
                      {errors.name.message}
                    </span>
                  )}
                </div>

              </div>
            </fieldset>
          )}

          {etapaAtual === 1 && (
            <fieldset className={estilos.fieldset}>
              <legend className={estilos.visuallyHidden}>Apresentação no catálogo</legend>

              <div className={estilos.fieldGroupFull}>
                <label htmlFor="shortDescription" className={estilos.label}>
                  Descrição curta
                </label>
                <textarea
                  id="shortDescription"
                  autoComplete="off"
                  aria-describedby={errors.shortDescription ? 'erro-shortDescription' : 'ajuda-shortDescription'}
                  aria-invalid={!!errors.shortDescription}
                  className={estilos.textareaCurta}
                  placeholder="Uma frase direta para o cartão do catálogo."
                  {...register('shortDescription')}
                />
                <span id="ajuda-shortDescription" className={estilos.helperText}>
                  {(descricaoCurtaAtual?.length ?? 0)}/280 caracteres.
                </span>
                {errors.shortDescription && (
                  <span id="erro-shortDescription" role="alert" className={estilos.errorText}>
                    {errors.shortDescription.message}
                  </span>
                )}
              </div>

              <div className={estilos.fieldGroupFull}>
                <label htmlFor="longDescription" className={estilos.label}>
                  Descrição completa <span className={estilos.optionalLabel}>opcional</span>
                </label>
                <textarea
                  id="longDescription"
                  autoComplete="off"
                  aria-describedby={errors.longDescription ? 'erro-longDescription' : 'ajuda-longDescription'}
                  aria-invalid={!!errors.longDescription}
                  className={estilos.textareaLonga}
                  placeholder="Detalhe preparação, condução, duração espiritual e o que a pessoa deve esperar."
                  {...register('longDescription')}
                />
                <span id="ajuda-longDescription" className={estilos.helperText}>
                  Pode ficar em branco. Use apenas se precisar detalhar preparação, cuidados ou observações.
                </span>
                {errors.longDescription && (
                  <span id="erro-longDescription" role="alert" className={estilos.errorText}>
                    {errors.longDescription.message}
                  </span>
                )}
              </div>
            </fieldset>
          )}

          {etapaAtual === 2 && (
            <fieldset className={estilos.fieldset}>
              <legend className={estilos.visuallyHidden}>Atendimento e valor</legend>

              <div className={estilos.fieldGrid}>
                <div className={estilos.fieldGroup}>
                  <label htmlFor="durationMin" className={estilos.label}>Duração</label>
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
                  <label htmlFor="priceBrl" className={estilos.label}>Preço</label>
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

                <fieldset className={estilos.inlineFieldsetFull}>
                  <legend className={estilos.label}>Modalidades disponíveis</legend>
                  <span className={estilos.helperText}>
                    As opções marcadas aparecem com destaque e selo de selecionado.
                  </span>
                  <div className={estilos.optionGrid}>
                    <label className={estilos.optionLabel}>
                      <input
                        className={estilos.optionInput}
                        type="checkbox"
                        value="ONLINE"
                        {...register('modalities')}
                      />
                      <span className={estilos.optionContent}>
                        <span className={estilos.optionTitle}>
                          <Eye size={16} aria-hidden="true" />
                          Online
                        </span>
                        {modalidadesSelecionadas.includes('ONLINE') && (
                          <span className={estilos.selectedPill}>
                            <CheckCircle2 size={14} aria-hidden="true" />
                            Selecionado
                          </span>
                        )}
                      </span>
                    </label>
                    <label className={estilos.optionLabel}>
                      <input
                        className={estilos.optionInput}
                        type="checkbox"
                        value="IN_PERSON"
                        {...register('modalities')}
                      />
                      <span className={estilos.optionContent}>
                        <span className={estilos.optionTitle}>
                          <Clock3 size={16} aria-hidden="true" />
                          Presencial
                        </span>
                        {modalidadesSelecionadas.includes('IN_PERSON') && (
                          <span className={estilos.selectedPill}>
                            <CheckCircle2 size={14} aria-hidden="true" />
                            Selecionado
                          </span>
                        )}
                      </span>
                    </label>
                  </div>
                  {errors.modalities && (
                    <span role="alert" className={estilos.errorText}>
                      {errors.modalities.message}
                    </span>
                  )}
                </fieldset>
              </div>
            </fieldset>
          )}

          {etapaAtual === 3 && (
            <section className={estilos.reviewPanel} aria-label="Revisão do serviço">
              <div className={estilos.reviewHeader}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <div>
                  <h4>Conferir cadastro</h4>
                  <p>Revise os principais dados antes de salvar no catálogo.</p>
                </div>
              </div>

              <dl className={estilos.reviewList}>
                <div>
                  <dt>Nome</dt>
                  <dd>{nomeAtual?.trim() || 'Não informado'}</dd>
                </div>
                <div>
                  <dt>Categoria</dt>
                  <dd>{categoriaSelecionada?.name ?? 'Não selecionada'}</dd>
                </div>
                <div>
                  <dt>Tipo</dt>
                  <dd>{ROTULOS_TIPO_SERVICO[tipoAtual]}</dd>
                </div>
                <div>
                  <dt>Duração</dt>
                  <dd>{duracaoAtual} minutos</dd>
                </div>
                <div>
                  <dt>Preço</dt>
                  <dd>{precoAtual}</dd>
                </div>
                <div>
                  <dt>Modalidades</dt>
                  <dd>{formatarModalidades(modalidadesAtuais)}</dd>
                </div>
                <div>
                  <dt>Texto curto</dt>
                  <dd>{descricaoCurtaAtual?.trim() || 'Sem descrição curta'}</dd>
                </div>
                <div>
                  <dt>Texto completo</dt>
                  <dd>{descricaoLongaAtual?.trim() ? 'Descrição completa preenchida' : 'Sem descrição completa'}</dd>
                </div>
              </dl>
            </section>
          )}

          <footer className={estilos.wizardActions}>
            <button
              type="button"
              className={estilos.secondaryButton}
              onClick={voltarEtapa}
              disabled={etapaAtual === 0 || isPending}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Voltar
            </button>

            {etapaAtual < INDICE_ULTIMA_ETAPA ? (
              <button
                type="button"
                className={estilos.primaryButton}
                onClick={() => void avancarEtapa()}
                disabled={isPending}
              >
                Avançar
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isPending}
                aria-busy={isPending}
                className={isPending ? estilos.primaryButtonLoading : estilos.primaryButton}
              >
                {isPending ? (
                  'Processando...'
                ) : (
                  <>
                    <Save size={16} aria-hidden="true" />
                    Salvar serviço
                  </>
                )}
              </button>
            )}
          </footer>
        </div>
      </form>
    </div>
  );
}
