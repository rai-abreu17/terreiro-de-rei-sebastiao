import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type {
  AvailabilityOverride,
  AvailabilityRule,
  Modalidade,
  SaveAvailabilityOverrideRequest,
  SaveAvailabilityRuleRequest,
} from '@/api/availability-admin';
import { useAvailability, extractAvailabilityError } from '@/hooks/useAvailability';
import { formatCanonicalDate } from '@/lib/date';
import * as styles from './DisponibilidadePage.css';

const ruleSchema = z.object({
  weekday: z.number().int().min(0).max(6),
  startTime: z.string().min(5, 'Informe o horário inicial.'),
  endTime: z.string().min(5, 'Informe o horário final.'),
  modalities: z.array(z.enum(['ONLINE', 'IN_PERSON'])).min(1, 'Selecione pelo menos uma modalidade'),
  isActive: z.boolean().default(true),
}).superRefine((dados, contexto) => {
  if (dados.startTime >= dados.endTime) {
    contexto.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['endTime'],
      message: 'O horário final deve ser posterior ao horário inicial.',
    });
  }
});

type RuleFormInput = z.input<typeof ruleSchema>;
type RuleFormValues = z.output<typeof ruleSchema>;

const overrideSchema = z.object({
  date: z.string().min(10, 'Data é obrigatória'),
  isClosed: z.boolean().default(true),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  modalities: z.array(z.enum(['ONLINE', 'IN_PERSON'])).default(['IN_PERSON', 'ONLINE']),
  reason: z.string().trim().max(280, 'Motivo muito longo').optional(),
}).superRefine((dados, contexto) => {
  if (!dados.isClosed) {
    if (!dados.startTime || !dados.endTime) {
      contexto.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['startTime'],
        message: 'Informe início e término para uma exceção com atendimento.',
      });
    }

    if (dados.startTime && dados.endTime && dados.startTime >= dados.endTime) {
      contexto.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endTime'],
        message: 'O horário final deve ser posterior ao horário inicial.',
      });
    }

    if (!dados.modalities || dados.modalities.length === 0) {
      contexto.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['modalities'],
        message: 'Selecione pelo menos uma modalidade.',
      });
    }
  }
});

type OverrideFormInput = z.input<typeof overrideSchema>;
type OverrideFormValues = z.output<typeof overrideSchema>;

const DIAS_DA_SEMANA = [
  'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 
  'Quinta-feira', 'Sexta-feira', 'Sábado'
];

const MODALIDADES: Array<{ valor: Modalidade; rotulo: string }> = [
  { valor: 'IN_PERSON', rotulo: 'Presencial no Terreiro' },
  { valor: 'ONLINE', rotulo: 'Online / À distância' },
];

const VALORES_PADRAO_REGRA: RuleFormValues = {
  weekday: 1,
  startTime: '09:00',
  endTime: '18:00',
  modalities: ['IN_PERSON', 'ONLINE'],
  isActive: true,
};

const VALORES_PADRAO_EXCECAO: OverrideFormValues = {
  date: '',
  isClosed: true,
  startTime: '09:00',
  endTime: '18:00',
  modalities: ['IN_PERSON', 'ONLINE'],
  reason: '',
};

function formatarHoraParaInput(valor?: string | null): string {
  return valor ? valor.slice(0, 5) : '';
}

function formatarModalidade(modalidade: Modalidade): string {
  return modalidade === 'ONLINE' ? 'Online' : 'Presencial';
}

function formatarDataExcecao(data: string): string {
  try {
    return formatCanonicalDate(data, "EEEE, dd 'de' MMMM");
  } catch {
    return data;
  }
}

function mapearRegraParaFormulario(regra: AvailabilityRule): RuleFormValues {
  return {
    weekday: regra.weekday,
    startTime: formatarHoraParaInput(regra.startTime),
    endTime: formatarHoraParaInput(regra.endTime),
    modalities: regra.modalities,
    isActive: regra.isActive,
  };
}

function mapearExcecaoParaFormulario(excecao: AvailabilityOverride): OverrideFormValues {
  return {
    date: excecao.date,
    isClosed: excecao.isClosed,
    startTime: formatarHoraParaInput(excecao.startTime),
    endTime: formatarHoraParaInput(excecao.endTime),
    modalities: excecao.modalities ?? ['IN_PERSON', 'ONLINE'],
    reason: excecao.reason ?? '',
  };
}

function criarPayloadRegra(valores: RuleFormValues): SaveAvailabilityRuleRequest {
  return {
    weekday: valores.weekday,
    startTime: valores.startTime,
    endTime: valores.endTime,
    modalities: valores.modalities,
    isActive: valores.isActive,
  };
}

function criarPayloadExcecao(
  valores: OverrideFormValues
): SaveAvailabilityOverrideRequest {
  const motivo = valores.reason?.trim();

  if (valores.isClosed) {
    return {
      date: valores.date,
      isClosed: true,
      startTime: null,
      endTime: null,
      modalities: null,
      reason: motivo || null,
    };
  }

  return {
    date: valores.date,
    isClosed: false,
    startTime: valores.startTime ?? null,
    endTime: valores.endTime ?? null,
    modalities: valores.modalities,
    reason: motivo || null,
  };
}

export function DisponibilidadePage(): React.ReactElement {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [ruleErrorMessage, setRuleErrorMessage] = useState<string | null>(null);
  const [overrideErrorMessage, setOverrideErrorMessage] = useState<string | null>(null);
  const [regraEmEdicao, setRegraEmEdicao] = useState<AvailabilityRule | null>(null);
  const [excecaoEmEdicao, setExcecaoEmEdicao] = useState<AvailabilityOverride | null>(null);

  const {
    rules,
    overrides,
    rulesQuery,
    overridesQuery,
    createRuleMutation,
    updateRuleMutation,
    deleteRuleMutation,
    createOverrideMutation,
    updateOverrideMutation,
    deleteOverrideMutation,
  } = useAvailability();

  const {
    register: registerRule,
    handleSubmit: handleSubmitRule,
    reset: resetRule,
    formState: { errors: ruleErrors },
  } = useForm<RuleFormInput, undefined, RuleFormValues>({
    resolver: zodResolver(ruleSchema),
    defaultValues: VALORES_PADRAO_REGRA,
  });

  const {
    register: registerOverrideField,
    handleSubmit: handleSubmitOverride,
    reset: resetOverride,
    watch,
    formState: { errors: overrideErrors },
  } = useForm<OverrideFormInput, undefined, OverrideFormValues>({
    resolver: zodResolver(overrideSchema),
    defaultValues: VALORES_PADRAO_EXCECAO,
  });

  const isClosedWatch = watch('isClosed');
  const rulesLoading = rulesQuery.isLoading;
  const overridesLoading = overridesQuery.isLoading;
  const isSavingRule = createRuleMutation.isPending || updateRuleMutation.isPending;
  const isDeletingRule = deleteRuleMutation.isPending;
  const isSavingOverride =
    createOverrideMutation.isPending || updateOverrideMutation.isPending;
  const isDeletingOverride = deleteOverrideMutation.isPending;

  const panelRuleError =
    ruleErrorMessage ??
    (rulesQuery.isError ? extractAvailabilityError(rulesQuery.error) : null);
  const panelOverrideError =
    overrideErrorMessage ??
    (overridesQuery.isError ? extractAvailabilityError(overridesQuery.error) : null);

  const limparFormularioRegra = () => {
    setRegraEmEdicao(null);
    resetRule(VALORES_PADRAO_REGRA);
  };

  const limparFormularioExcecao = () => {
    setExcecaoEmEdicao(null);
    resetOverride(VALORES_PADRAO_EXCECAO);
  };

  const iniciarEdicaoRegra = (regra: AvailabilityRule) => {
    setSuccessMessage(null);
    setRuleErrorMessage(null);
    setRegraEmEdicao(regra);
    resetRule(mapearRegraParaFormulario(regra));
  };

  const iniciarEdicaoExcecao = (excecao: AvailabilityOverride) => {
    setSuccessMessage(null);
    setOverrideErrorMessage(null);
    setExcecaoEmEdicao(excecao);
    resetOverride(mapearExcecaoParaFormulario(excecao));
  };

  const onSalvarRegra = handleSubmitRule((valores) => {
    const payload = criarPayloadRegra(valores);

    setSuccessMessage(null);
    setRuleErrorMessage(null);

    const callbacks = {
      onSuccess: () => {
        setSuccessMessage(
          regraEmEdicao
            ? 'Regra semanal atualizada com sucesso.'
            : 'Novo horário fixo registado com sucesso.'
        );
        limparFormularioRegra();
      },
      onError: (erro: unknown) => {
        setRuleErrorMessage(extractAvailabilityError(erro));
      },
    };

    if (regraEmEdicao) {
      updateRuleMutation.mutate({ ruleId: regraEmEdicao.id, payload }, callbacks);
      return;
    }

    createRuleMutation.mutate(payload, callbacks);
  });

  const onSalvarExcecao = handleSubmitOverride((valores) => {
    const payload = criarPayloadExcecao(valores);

    setSuccessMessage(null);
    setOverrideErrorMessage(null);

    const callbacks = {
      onSuccess: () => {
        setSuccessMessage(
          excecaoEmEdicao
            ? 'Exceção da agenda atualizada com sucesso.'
            : 'Dia de folga ou exceção registado com sucesso.'
        );
        limparFormularioExcecao();
      },
      onError: (erro: unknown) => {
        setOverrideErrorMessage(extractAvailabilityError(erro));
      },
    };

    if (excecaoEmEdicao) {
      updateOverrideMutation.mutate(
        { overrideId: excecaoEmEdicao.id, payload },
        callbacks
      );
      return;
    }

    createOverrideMutation.mutate(payload, callbacks);
  });

  const onRemoverRegra = (regra: AvailabilityRule) => {
    if (!window.confirm('Deseja remover este bloco fixo da agenda?')) {
      return;
    }

    setSuccessMessage(null);
    setRuleErrorMessage(null);
    deleteRuleMutation.mutate(regra.id, {
      onSuccess: () => {
        setSuccessMessage('Horário fixo removido com sucesso.');

        if (regraEmEdicao?.id === regra.id) {
          limparFormularioRegra();
        }
      },
      onError: (erro) => {
        setRuleErrorMessage(extractAvailabilityError(erro));
      },
    });
  };

  const onRemoverExcecao = (excecao: AvailabilityOverride) => {
    if (!window.confirm('Deseja apagar esta exceção da agenda?')) {
      return;
    }

    setSuccessMessage(null);
    setOverrideErrorMessage(null);
    deleteOverrideMutation.mutate(excecao.id, {
      onSuccess: () => {
        setSuccessMessage('Exceção removida com sucesso.');

        if (excecaoEmEdicao?.id === excecao.id) {
          limparFormularioExcecao();
        }
      },
      onError: (erro) => {
        setOverrideErrorMessage(extractAvailabilityError(erro));
      },
    });
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Sprint 3 · Configuração da agenda</span>
        <h1 className={styles.titulo}>Configuração de Agenda</h1>
        <p className={styles.descricao}>
          Defina os horários fixos da Casa e registe folgas ou exceções pontuais para alimentar o gerador de slots do atendimento público.
        </p>
      </header>

      {successMessage && (
        <div className={styles.successPanel} role="status" aria-live="polite">
          {successMessage}
        </div>
      )}

      <div className={styles.layoutGrid}>
        <section className={styles.section} aria-labelledby="horarios-fixos-heading">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Horários Fixos</span>
            <h2 id="horarios-fixos-heading" className={styles.sectionTitle}>
              Regras semanais da Casa
            </h2>
            <p className={styles.sectionDescription}>
              Cadastre os blocos recorrentes da agenda, como segunda a sexta-feira em horário comercial ou janelas específicas por modalidade.
            </p>
          </div>

          {panelRuleError && (
            <div role="alert" aria-live="assertive" className={styles.feedbackPanel}>
              {panelRuleError}
            </div>
          )}

          <form className={styles.formCard} onSubmit={onSalvarRegra} noValidate>
            <div className={styles.formHeader}>
              <div>
                <h3 className={styles.formTitle}>
                  {regraEmEdicao ? 'Editar horário fixo' : 'Adicionar horário fixo'}
                </h3>
                <p className={styles.formDescription}>
                  Defina o dia, a janela de atendimento e as modalidades permitidas.
                </p>
              </div>
              {regraEmEdicao && (
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={limparFormularioRegra}
                >
                  Cancelar edição
                </button>
              )}
            </div>

            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label htmlFor="rule-weekday" className={styles.label}>
                  Dia da semana
                </label>
                <select
                  id="rule-weekday"
                  className={styles.input}
                  {...registerRule('weekday', { valueAsNumber: true })}
                >
                  {DIAS_DA_SEMANA.map((dia, indice) => (
                    <option key={dia} value={indice}>
                      {dia}
                    </option>
                  ))}
                </select>
                {ruleErrors.weekday && (
                  <span className={styles.errorMessage} role="alert">
                    {ruleErrors.weekday.message}
                  </span>
                )}
              </div>

              <div className={styles.inlineFields}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="rule-start" className={styles.label}>
                    Início
                  </label>
                  <input
                    id="rule-start"
                    type="time"
                    className={styles.input}
                    aria-invalid={Boolean(ruleErrors.startTime)}
                    {...registerRule('startTime')}
                  />
                  {ruleErrors.startTime && (
                    <span className={styles.errorMessage} role="alert">
                      {ruleErrors.startTime.message}
                    </span>
                  )}
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="rule-end" className={styles.label}>
                    Término
                  </label>
                  <input
                    id="rule-end"
                    type="time"
                    className={styles.input}
                    aria-invalid={Boolean(ruleErrors.endTime)}
                    {...registerRule('endTime')}
                  />
                  {ruleErrors.endTime && (
                    <span className={styles.errorMessage} role="alert">
                      {ruleErrors.endTime.message}
                    </span>
                  )}
                </div>
              </div>

              <fieldset className={styles.fieldset}>
                <legend className={styles.label}>Modalidades atendidas</legend>
                <div className={styles.checkboxGrid}>
                  {MODALIDADES.map((modalidade) => (
                    <label key={modalidade.valor} className={styles.checkboxCard}>
                      <input
                        type="checkbox"
                        value={modalidade.valor}
                        className={styles.checkboxInput}
                        {...registerRule('modalities')}
                      />
                      <span>{modalidade.rotulo}</span>
                    </label>
                  ))}
                </div>
                {ruleErrors.modalities && (
                  <span className={styles.errorMessage} role="alert">
                    {ruleErrors.modalities.message}
                  </span>
                )}
              </fieldset>

              <label className={styles.toggleRow}>
                <input type="checkbox" className={styles.checkboxInput} {...registerRule('isActive')} />
                <span>Manter esta regra ativa no gerador de slots</span>
              </label>
            </div>

            <div className={styles.actionsRow}>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={isSavingRule}
                aria-busy={isSavingRule}
              >
                {isSavingRule
                  ? 'Guardando horário...'
                  : regraEmEdicao
                    ? 'Guardar alterações'
                    : 'Adicionar horário fixo'}
              </button>
            </div>
          </form>

          <div className={styles.listSection}>
            <div className={styles.listHeader}>
              <h3 className={styles.listTitle}>Blocos registados</h3>
              <span className={styles.listCounter}>{rules.length} item(ns)</span>
            </div>

            {rulesLoading ? (
              <div className={styles.emptyState}>Carregando horários fixos da Casa...</div>
            ) : rules.length === 0 ? (
              <div className={styles.emptyState}>
                Nenhuma regra semanal foi registada ainda.
              </div>
            ) : (
              <div className={styles.cardList}>
                {rules.map((regra) => (
                  <article key={regra.id} className={styles.itemCard}>
                    <div className={styles.itemHeader}>
                      <div>
                        <h4 className={styles.itemTitle}>
                          {DIAS_DA_SEMANA[regra.weekday]}
                        </h4>
                        <p className={styles.itemSubtitle}>
                          {formatarHoraParaInput(regra.startTime)} às {formatarHoraParaInput(regra.endTime)}
                        </p>
                      </div>
                      <span
                        className={
                          regra.isActive ? styles.statusPill.ativo : styles.statusPill.inativo
                        }
                      >
                        {regra.isActive ? 'Ativa' : 'Inativa'}
                      </span>
                    </div>

                    <div className={styles.badgeRow}>
                      {regra.modalities.map((modalidade) => (
                        <span
                          key={modalidade}
                          className={styles.modalityPill[modalidade]}
                        >
                          {formatarModalidade(modalidade)}
                        </span>
                      ))}
                    </div>

                    <div className={styles.cardActions}>
                      <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={() => iniciarEdicaoRegra(regra)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className={styles.dangerButton}
                        onClick={() => onRemoverRegra(regra)}
                        disabled={isDeletingRule}
                      >
                        Remover
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="excecoes-heading">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Dias de Folga/Exceção</span>
            <h2 id="excecoes-heading" className={styles.sectionTitle}>
              Ajustes pontuais da agenda
            </h2>
            <p className={styles.sectionDescription}>
              Registe feriados, retiros, pausas ou dias com horário especial para sobrescrever a agenda semanal quando necessário.
            </p>
          </div>

          {panelOverrideError && (
            <div role="alert" aria-live="assertive" className={styles.feedbackPanel}>
              {panelOverrideError}
            </div>
          )}

          <form className={styles.formCard} onSubmit={onSalvarExcecao} noValidate>
            <div className={styles.formHeader}>
              <div>
                <h3 className={styles.formTitle}>
                  {excecaoEmEdicao ? 'Editar exceção' : 'Adicionar exceção'}
                </h3>
                <p className={styles.formDescription}>
                  Pode fechar o dia inteiro ou abrir uma janela especial apenas para uma data.
                </p>
              </div>
              {excecaoEmEdicao && (
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={limparFormularioExcecao}
                >
                  Cancelar edição
                </button>
              )}
            </div>

            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label htmlFor="override-date" className={styles.label}>
                  Data da exceção
                </label>
                <input
                  id="override-date"
                  type="date"
                  className={styles.input}
                  aria-invalid={Boolean(overrideErrors.date)}
                  {...registerOverrideField('date')}
                />
                {overrideErrors.date && (
                  <span className={styles.errorMessage} role="alert">
                    {overrideErrors.date.message}
                  </span>
                )}
              </div>

              <label className={styles.toggleRow}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  {...registerOverrideField('isClosed')}
                />
                <span>Marcar como dia fechado, sem atendimento</span>
              </label>

              {!isClosedWatch && (
                <>
                  <div className={styles.inlineFields}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="override-start" className={styles.label}>
                        Início customizado
                      </label>
                      <input
                        id="override-start"
                        type="time"
                        className={styles.input}
                        aria-invalid={Boolean(overrideErrors.startTime)}
                        {...registerOverrideField('startTime')}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="override-end" className={styles.label}>
                        Término customizado
                      </label>
                      <input
                        id="override-end"
                        type="time"
                        className={styles.input}
                        aria-invalid={Boolean(overrideErrors.endTime)}
                        {...registerOverrideField('endTime')}
                      />
                    </div>
                  </div>

                  {(overrideErrors.startTime || overrideErrors.endTime) && (
                    <span className={styles.errorMessage} role="alert">
                      {overrideErrors.startTime?.message ?? overrideErrors.endTime?.message}
                    </span>
                  )}

                  <fieldset className={styles.fieldset}>
                    <legend className={styles.label}>Modalidades liberadas nesta data</legend>
                    <div className={styles.checkboxGrid}>
                      {MODALIDADES.map((modalidade) => (
                        <label key={modalidade.valor} className={styles.checkboxCard}>
                          <input
                            type="checkbox"
                            value={modalidade.valor}
                            className={styles.checkboxInput}
                            {...registerOverrideField('modalities')}
                          />
                          <span>{modalidade.rotulo}</span>
                        </label>
                      ))}
                    </div>
                    {overrideErrors.modalities && (
                      <span className={styles.errorMessage} role="alert">
                        {overrideErrors.modalities.message}
                      </span>
                    )}
                  </fieldset>
                </>
              )}

              <div className={styles.fieldGroup}>
                <label htmlFor="override-reason" className={styles.label}>
                  Motivo da exceção
                </label>
                <textarea
                  id="override-reason"
                  rows={3}
                  className={styles.textArea}
                  placeholder="Ex.: Feriado municipal, retiro espiritual ou atendimento especial."
                  {...registerOverrideField('reason')}
                />
                {overrideErrors.reason && (
                  <span className={styles.errorMessage} role="alert">
                    {overrideErrors.reason.message}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.actionsRow}>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={isSavingOverride}
                aria-busy={isSavingOverride}
              >
                {isSavingOverride
                  ? 'Guardando exceção...'
                  : excecaoEmEdicao
                    ? 'Guardar alterações'
                    : 'Adicionar exceção'}
              </button>
            </div>
          </form>

          <div className={styles.listSection}>
            <div className={styles.listHeader}>
              <h3 className={styles.listTitle}>Exceções registadas</h3>
              <span className={styles.listCounter}>{overrides.length} item(ns)</span>
            </div>

            {overridesLoading ? (
              <div className={styles.emptyState}>Carregando exceções já registadas...</div>
            ) : overrides.length === 0 ? (
              <div className={styles.emptyState}>
                Nenhuma folga ou exceção foi registada até agora.
              </div>
            ) : (
              <div className={styles.cardList}>
                {overrides.map((excecao) => (
                  <article key={excecao.id} className={styles.itemCard}>
                    <div className={styles.itemHeader}>
                      <div>
                        <h4 className={styles.itemTitle}>{formatarDataExcecao(excecao.date)}</h4>
                        <p className={styles.itemSubtitle}>{excecao.date}</p>
                      </div>
                      <span
                        className={
                          excecao.isClosed
                            ? styles.statusPill.folga
                            : styles.statusPill.personalizada
                        }
                      >
                        {excecao.isClosed ? 'Folga' : 'Horário especial'}
                      </span>
                    </div>

                    <p className={styles.itemBody}>
                      {excecao.isClosed
                        ? 'Sem atendimento durante todo o dia.'
                        : `Atendimento das ${formatarHoraParaInput(excecao.startTime)} às ${formatarHoraParaInput(excecao.endTime)}.`}
                    </p>

                    {!excecao.isClosed && excecao.modalities?.length ? (
                      <div className={styles.badgeRow}>
                        {excecao.modalities.map((modalidade) => (
                          <span
                            key={`${excecao.id}-${modalidade}`}
                            className={styles.modalityPill[modalidade]}
                          >
                            {formatarModalidade(modalidade)}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {excecao.reason && (
                      <p className={styles.itemNote}>{excecao.reason}</p>
                    )}

                    <div className={styles.cardActions}>
                      <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={() => iniciarEdicaoExcecao(excecao)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className={styles.dangerButton}
                        onClick={() => onRemoverExcecao(excecao)}
                        disabled={isDeletingOverride}
                      >
                        Remover
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
