import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import {
  resolveBookingCheckoutUrl,
  useCreateBooking,
} from '@/api/booking';
import type {
  ModalidadeAtendimento,
  ProblemDetails,
} from '@/api/catalog.types';
import type { SlotDisponivel } from '@/api/public.types';
import { CalendarioMensal } from '@/components/ui/CalendarioMensal/CalendarioMensal';
import { SlotPicker } from '@/components/ui/SlotPicker/SlotPicker';
import { usePublicCatalog } from '@/hooks/usePublicCatalog';
import { usePublicSlots } from '@/hooks/usePublicSlots';
import { formatCanonicalDate, formatDateTimeFortaleza } from '@/lib/date';
import { formatMoney } from '@/lib/money';
import * as styles from './PublicBookingPage.css';

// ── Tipos ─────────────────────────────────────────────────────────────────────

type Etapa = 1 | 2 | 3 | 4 | 5;

const ROTULOS_ETAPA = ['Tipo', 'Serviço', 'Data e Hora', 'Seus Dados', 'Resumo'];

// ── Schema de validação ───────────────────────────────────────────────────────

const schemaCheckout = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'Informe o nome completo do Consulente.')
    .max(120, 'O nome completo deve ter no máximo 120 caracteres.'),
  email: z.string().trim().email('Informe um endereço de e-mail válido.'),
  phone: z
    .string()
    .trim()
    .min(8, 'Informe um telefone com DDI.')
    .refine(
      (v) => normalizarTelefoneParaE164(v) !== null,
      'Informe um telefone válido. Exemplo: +5598999998888.'
    ),
  modality: z.enum(['ONLINE', 'IN_PERSON']),
});

type DadosCheckout = z.infer<typeof schemaCheckout>;

// ── Utilitários ───────────────────────────────────────────────────────────────

function formatarDataInput(data: Date): string {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function obterHojeISO(): string {
  const h = new Date();
  h.setHours(12, 0, 0, 0);
  return formatarDataInput(h);
}

function formatarDiaDisponibilidade(dataISO: string): string {
  return formatCanonicalDate(dataISO, "EEEE, d 'de' MMMM");
}

function formatarModalidade(modalidade: ModalidadeAtendimento): string {
  return modalidade === 'ONLINE' ? 'Online' : 'Presencial';
}

function formatarDuracao(minutos: number): string {
  if (minutos < 60) return `${minutos} min`;
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return m > 0 ? `${h} h ${m} min` : `${h} h`;
}

function normalizarTelefoneParaE164(telefone: string): string | null {
  const valorLimpo = telefone.trim();
  if (!valorLimpo) return null;

  if (valorLimpo.startsWith('+')) {
    const normalizado = `+${valorLimpo.slice(1).replace(/\D+/g, '')}`;
    return /^\+[1-9]\d{10,14}$/.test(normalizado) ? normalizado : null;
  }

  const apenasDigitos = valorLimpo.replace(/\D+/g, '');
  if (apenasDigitos.length === 10 || apenasDigitos.length === 11) {
    return `+55${apenasDigitos}`;
  }
  return /^[1-9]\d{10,14}$/.test(apenasDigitos) ? `+${apenasDigitos}` : null;
}

function extrairProblemDetails(erro: unknown): ProblemDetails | null {
  if (axios.isAxiosError<ProblemDetails>(erro)) {
    return erro.response?.data ?? null;
  }
  return null;
}

function resolverMensagemErroCheckout(erro: unknown): string {
  const problem = extrairProblemDetails(erro);
  switch (problem?.code) {
    case 'SLOT_ALREADY_TAKEN':
      return 'Esse horário acabou de ser reservado. Escolha outro slot para continuar.';
    case 'SLOT_NOT_AVAILABLE':
      return 'O horário selecionado já não está disponível para este serviço.';
    case 'MODALITY_NOT_ALLOWED_ON_DAY':
      return 'A modalidade escolhida não está disponível para este horário.';
    case 'VALIDATION_ERROR':
      return problem.detail ?? 'Revise os dados informados antes de continuar.';
    default:
      return problem?.detail ?? 'Não foi possível iniciar o checkout neste momento.';
  }
}

function criarRotaStatusBooking(bookingId: string, viewToken?: string): string {
  const parametros = new URLSearchParams();
  if (viewToken) parametros.set('vt', viewToken);
  const sufixo = parametros.toString();
  return sufixo
    ? `/booking/${bookingId}/status?${sufixo}`
    : `/booking/${bookingId}/status`;
}

// ── Componente principal ──────────────────────────────────────────────────────

export function PublicBookingPage(): React.ReactElement {
  const navigate = useNavigate();

  const [etapa, setEtapa] = useState<Etapa>(1);
  const [categoriaId, setCategoriaId] = useState<string>('');
  const [servicoId, setServicoId] = useState<string>('');
  const [dataSelecionada, setDataSelecionada] = useState<string>('');
  const [slotSelecionado, setSlotSelecionado] = useState<SlotDisponivel | null>(null);
  const [erroCheckout, setErroCheckout] = useState<string | null>(null);

  const criarBooking = useCreateBooking();

  const {
    register,
    setValue,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<DadosCheckout>({
    resolver: zodResolver(schemaCheckout),
    defaultValues: { fullName: '', email: '', phone: '', modality: 'ONLINE' },
  });

  const modalidadeSelecionada = watch('modality');
  const dadosFormulario = watch();

  const { data: catalogo, isLoading: carregandoCatalogo } = usePublicCatalog();

  const gruposPorCategoria = catalogo?.gruposPorCategoria ?? [];
  const grupoSelecionado = gruposPorCategoria.find((g) => g.categoria.id === categoriaId);
  const servicoSelecionado = catalogo?.servicos.find((s) => s.id === servicoId) ?? null;

  const {
    data: slots,
    isLoading: carregandoSlots,
    error: erroSlots,
  } = usePublicSlots({
    serviceId: servicoSelecionado?.id,
    dataISO: dataSelecionada,
  });

  // Corrige modalidade quando slot suporta apenas uma opção
  useEffect(() => {
    if (!slotSelecionado || slotSelecionado.modalitiesAvailable.length === 0) return;
    if (!slotSelecionado.modalitiesAvailable.includes(modalidadeSelecionada)) {
      setValue('modality', slotSelecionado.modalitiesAvailable[0], {
        shouldDirty: false,
        shouldValidate: true,
      });
    }
  }, [modalidadeSelecionada, setValue, slotSelecionado]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const irParaEtapa = (novaEtapa: Etapa) => {
    setErroCheckout(null);
    setEtapa(novaEtapa);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selecionarCategoria = (id: string) => {
    setCategoriaId(id);
    setServicoId('');
    setDataSelecionada('');
    setSlotSelecionado(null);
    irParaEtapa(2);
  };

  const selecionarServico = (id: string) => {
    setServicoId(id);
    setDataSelecionada('');
    setSlotSelecionado(null);
    irParaEtapa(3);
  };

  const handleSelecionarDia = (novaData: string) => {
    setDataSelecionada(novaData);
    setSlotSelecionado(null);
  };

  const handleProximaDisponibilidade = () => {
    const base = dataSelecionada || obterHojeISO();
    const proxima = new Date(base + 'T12:00:00');
    proxima.setDate(proxima.getDate() + 1);
    handleSelecionarDia(formatarDataInput(proxima));
  };

  const avancarParaDados = () => {
    if (!dataSelecionada || !slotSelecionado) return;
    irParaEtapa(4);
  };

  const avancarParaResumo = async () => {
    const valido = await trigger(['fullName', 'email', 'phone', 'modality']);
    if (valido) irParaEtapa(5);
  };

  const handleSubmeterCheckout = () => {
    if (!servicoSelecionado || !slotSelecionado) return;

    const dados = getValues();
    const telefoneNormalizado = normalizarTelefoneParaE164(dados.phone);

    if (!telefoneNormalizado) {
      setErroCheckout('Informe um telefone válido com DDI para continuar.');
      return;
    }

    if (!slotSelecionado.modalitiesAvailable.includes(dados.modality)) {
      setErroCheckout('Selecione uma modalidade válida para este horário.');
      return;
    }

    setErroCheckout(null);

    criarBooking.mutate(
      {
        serviceId: servicoSelecionado.id,
        startAt: slotSelecionado.startAt,
        modality: dados.modality,
        customer: {
          fullName: dados.fullName.trim(),
          email: dados.email.trim(),
          phone: telefoneNormalizado,
        },
      },
      {
        onSuccess: (booking) => {
          const checkoutUrl = resolveBookingCheckoutUrl(booking);
          if (checkoutUrl) {
            window.location.href = checkoutUrl;
            return;
          }
          navigate(criarRotaStatusBooking(booking.bookingId, booking.viewToken));
        },
        onError: (erro) => setErroCheckout(resolverMensagemErroCheckout(erro)),
      }
    );
  };

  const modalidadeResumo: ModalidadeAtendimento | null =
    slotSelecionado?.modalitiesAvailable.length === 1
      ? slotSelecionado.modalitiesAvailable[0]
      : dadosFormulario.modality ?? null;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <main className={styles.container}>
      <div className={styles.conteudo}>

        {/* Cabeçalho */}
        <header className={styles.paginaCabecalho}>
          <h1 className={styles.paginaTitulo}>Agende seu serviço</h1>
          <p className={styles.paginaSubtitulo}>
            Confira a disponibilidade e agende a data e o horário que forem melhores para você.
          </p>
        </header>

        {/* Indicador de etapas */}
        <nav className={styles.indicadorEtapas} aria-label="Progresso do agendamento">
          {ROTULOS_ETAPA.map((rotulo, i) => {
            const numero = (i + 1) as Etapa;
            const ativa = numero === etapa;
            const concluida = numero < etapa;
            return (
              <React.Fragment key={rotulo}>
                <div className={styles.itemEtapa}>
                  <div
                    className={
                      ativa
                        ? styles.circuloEtapaAtivo
                        : concluida
                        ? styles.circuloEtapaConcluido
                        : styles.circuloEtapaPendente
                    }
                    aria-current={ativa ? 'step' : undefined}
                  >
                    {concluida ? '✓' : numero}
                  </div>
                  <span className={ativa ? styles.rotuloEtapaAtivo : styles.rotuloEtapa}>
                    {rotulo}
                  </span>
                </div>
                {i < ROTULOS_ETAPA.length - 1 && (
                  <div className={concluida ? styles.conectorConcluido : styles.conector} />
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Painel do wizard */}
        <div className={styles.painelWizard}>

          {/* ── Etapa 1: Categoria ───────────────────────────────────────── */}
          {etapa === 1 && (
            <div className={styles.etapaConteudo}>
              <h2 className={styles.etapaTitulo}>Qual tipo de atendimento você busca?</h2>

              {carregandoCatalogo ? (
                <div className={styles.caixaAuxiliar} aria-busy="true">
                  Carregando opções disponíveis...
                </div>
              ) : gruposPorCategoria.length === 0 ? (
                <div className={styles.estadoVazio}>
                  Nenhum serviço disponível no momento.
                </div>
              ) : (
                <div className={styles.gradeCards}>
                  {gruposPorCategoria.map((grupo) => (
                    <button
                      key={grupo.categoria.id}
                      type="button"
                      className={
                        categoriaId === grupo.categoria.id
                          ? styles.cardSelecionado
                          : styles.card
                      }
                      onClick={() => selecionarCategoria(grupo.categoria.id)}
                    >
                      <span className={styles.cardTitulo}>{grupo.categoria.name}</span>
                      {grupo.categoria.description && (
                        <span className={styles.cardDescricao}>
                          {grupo.categoria.description}
                        </span>
                      )}
                      <span className={styles.cardInfo}>
                        {grupo.servicos.length}{' '}
                        {grupo.servicos.length === 1 ? 'opção disponível' : 'opções disponíveis'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Etapa 2: Serviço ─────────────────────────────────────────── */}
          {etapa === 2 && (
            <div className={styles.etapaConteudo}>
              <h2 className={styles.etapaTitulo}>Escolha o serviço</h2>

              <div className={styles.gradeCards}>
                {(grupoSelecionado?.servicos ?? []).map((servico) => (
                  <button
                    key={servico.id}
                    type="button"
                    className={
                      servicoId === servico.id ? styles.cardSelecionado : styles.card
                    }
                    onClick={() => selecionarServico(servico.id)}
                  >
                    <span className={styles.cardTitulo}>{servico.name}</span>
                    {servico.shortDescription && (
                      <span className={styles.cardDescricao}>{servico.shortDescription}</span>
                    )}
                    <div className={styles.cardRodape}>
                      <span className={styles.cardPreco}>
                        {formatMoney(servico.priceCents)}
                      </span>
                      <span className={styles.cardDuracao}>
                        {formatarDuracao(servico.durationMin)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className={styles.navegacaoWizard}>
                <button
                  type="button"
                  className={styles.botaoVoltar}
                  onClick={() => irParaEtapa(1)}
                >
                  Voltar
                </button>
              </div>
            </div>
          )}

          {/* ── Etapa 3: Data e Hora ─────────────────────────────────────── */}
          {etapa === 3 && (
            <div className={styles.etapaConteudo}>
              <div className={styles.etapaCabecalho}>
                <h2 className={styles.etapaTitulo}>Escolha a data e horário</h2>
                <span className={styles.labelTimezone}>Horário de Brasília (BRT)</span>
              </div>

              <div className={styles.layoutCalendarioSlots}>
                <div className={styles.wrapCalendario}>
                  <CalendarioMensal
                    dataSelecionada={dataSelecionada || null}
                    aoSelecionarData={handleSelecionarDia}
                  />
                </div>

                <div className={styles.wrapSlots}>
                  {!dataSelecionada && (
                    <div className={styles.estadoVazio}>
                      Selecione uma data no calendário para ver os horários livres.
                    </div>
                  )}

                  {dataSelecionada && (
                    <>
                      <h3 className={styles.labelDiaDisponibilidade}>
                        Disponibilidade para{' '}
                        {formatarDiaDisponibilidade(dataSelecionada)}
                      </h3>

                      {carregandoSlots && (
                        <div className={styles.caixaAuxiliar} aria-busy="true">
                          Verificando disponibilidade...
                        </div>
                      )}

                      {erroSlots && !carregandoSlots && (
                        <div className={styles.erroMensagem} role="alert">
                          Não foi possível carregar os horários para esta data.
                        </div>
                      )}

                      {!carregandoSlots && !erroSlots && slots && slots.length > 0 && (
                        <SlotPicker
                          slots={slots}
                          slotSelecionado={slotSelecionado}
                          aoSelecionarSlot={(slot) => setSlotSelecionado(slot)}
                          carregando={false}
                        />
                      )}

                      {!carregandoSlots &&
                        !erroSlots &&
                        (!slots || slots.length === 0) && (
                          <div className={styles.estadoIndisponivel}>
                            <span className={styles.textoIndisponivel}>
                              Nenhum horário disponível nesta data
                            </span>
                            <button
                              type="button"
                              className={styles.botaoProximaDisponibilidade}
                              onClick={handleProximaDisponibilidade}
                            >
                              Próxima disponibilidade
                            </button>
                          </div>
                        )}
                    </>
                  )}
                </div>
              </div>

              <div className={styles.navegacaoWizard}>
                <button
                  type="button"
                  className={styles.botaoVoltar}
                  onClick={() => irParaEtapa(2)}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className={
                    dataSelecionada && slotSelecionado
                      ? styles.ctaButton
                      : styles.ctaButtonDesabilitado
                  }
                  disabled={!dataSelecionada || !slotSelecionado}
                  onClick={avancarParaDados}
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {/* ── Etapa 4: Dados do usuário ────────────────────────────────── */}
          {etapa === 4 && (
            <div className={styles.etapaConteudo}>
              <h2 className={styles.etapaTitulo}>Seus dados para a reserva</h2>

              {slotSelecionado?.modalitiesAvailable.length === 1 && (
                <div className={styles.caixaAuxiliar}>
                  Modalidade confirmada:{' '}
                  <strong>
                    {formatarModalidade(slotSelecionado.modalitiesAvailable[0])}
                  </strong>
                </div>
              )}

              <form className={styles.formularioCheckout} noValidate>
                {slotSelecionado && slotSelecionado.modalitiesAvailable.length > 1 && (
                  <div className={styles.grupoCampo}>
                    <span className={styles.labelCampo}>Modalidade do atendimento</span>
                    <div className={styles.gradeModalidades}>
                      {slotSelecionado.modalitiesAvailable.map((m) => (
                        <label key={m} className={styles.opcaoModalidade}>
                          <input
                            {...register('modality')}
                            className={styles.inputModalidade}
                            type="radio"
                            value={m}
                          />
                          <span>{formatarModalidade(m)}</span>
                        </label>
                      ))}
                    </div>
                    {errors.modality && (
                      <span className={styles.erroCampo} role="alert">
                        {errors.modality.message}
                      </span>
                    )}
                  </div>
                )}

                <div className={styles.grupoCampo}>
                  <label className={styles.labelCampo} htmlFor="fullName">
                    Nome Completo
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    className={styles.inputCampo}
                    aria-invalid={Boolean(errors.fullName)}
                    placeholder="Ex.: Maria do Rosário"
                    {...register('fullName')}
                  />
                  {errors.fullName && (
                    <span className={styles.erroCampo} role="alert">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

                <div className={styles.gradeCampos}>
                  <div className={styles.grupoCampo}>
                    <label className={styles.labelCampo} htmlFor="email">
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className={styles.inputCampo}
                      aria-invalid={Boolean(errors.email)}
                      placeholder="voce@exemplo.com"
                      {...register('email')}
                    />
                    {errors.email && (
                      <span className={styles.erroCampo} role="alert">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className={styles.grupoCampo}>
                    <label className={styles.labelCampo} htmlFor="phone">
                      Telefone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      className={styles.inputCampo}
                      aria-invalid={Boolean(errors.phone)}
                      placeholder="+5598999998888"
                      {...register('phone')}
                    />
                    <span className={styles.ajudaCampo}>
                      Pode informar com DDI ou número brasileiro com DDD.
                    </span>
                    {errors.phone && (
                      <span className={styles.erroCampo} role="alert">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>
              </form>

              <div className={styles.navegacaoWizard}>
                <button
                  type="button"
                  className={styles.botaoVoltar}
                  onClick={() => irParaEtapa(3)}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className={styles.ctaButton}
                  onClick={avancarParaResumo}
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {/* ── Etapa 5: Resumo ──────────────────────────────────────────── */}
          {etapa === 5 && (
            <div className={styles.etapaConteudo}>
              <h2 className={styles.etapaTitulo}>Resumo do agendamento</h2>
              <p className={styles.etapaDescricao}>
                Confira os dados antes de prosseguir para o pagamento.
              </p>

              <div className={styles.painelResumo}>
                <div className={styles.grupoResumo}>
                  <h3 className={styles.tituloGrupoResumo}>Serviço</h3>
                  <dl className={styles.listaResumo}>
                    <div className={styles.itemResumo}>
                      <dt className={styles.rotuloResumo}>Nome</dt>
                      <dd className={styles.valorResumo}>{servicoSelecionado?.name}</dd>
                    </div>
                    <div className={styles.itemResumo}>
                      <dt className={styles.rotuloResumo}>Valor</dt>
                      <dd className={styles.valorResumo}>
                        {servicoSelecionado && formatMoney(servicoSelecionado.priceCents)}
                      </dd>
                    </div>
                    <div className={styles.itemResumo}>
                      <dt className={styles.rotuloResumo}>Duração</dt>
                      <dd className={styles.valorResumo}>
                        {servicoSelecionado && formatarDuracao(servicoSelecionado.durationMin)}
                      </dd>
                    </div>
                    {slotSelecionado && (
                      <div className={styles.itemResumo}>
                        <dt className={styles.rotuloResumo}>Data e horário</dt>
                        <dd className={styles.valorResumo}>
                          {formatCanonicalDate(dataSelecionada, "d 'de' MMMM 'de' yyyy")} às{' '}
                          {formatDateTimeFortaleza(slotSelecionado.startAt, 'HH:mm')}
                        </dd>
                      </div>
                    )}
                    {modalidadeResumo && (
                      <div className={styles.itemResumo}>
                        <dt className={styles.rotuloResumo}>Modalidade</dt>
                        <dd className={styles.valorResumo}>
                          {formatarModalidade(modalidadeResumo)}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className={styles.grupoResumo}>
                  <h3 className={styles.tituloGrupoResumo}>Seus dados</h3>
                  <dl className={styles.listaResumo}>
                    <div className={styles.itemResumo}>
                      <dt className={styles.rotuloResumo}>Nome</dt>
                      <dd className={styles.valorResumo}>{dadosFormulario.fullName}</dd>
                    </div>
                    <div className={styles.itemResumo}>
                      <dt className={styles.rotuloResumo}>E-mail</dt>
                      <dd className={styles.valorResumo}>{dadosFormulario.email}</dd>
                    </div>
                    <div className={styles.itemResumo}>
                      <dt className={styles.rotuloResumo}>Telefone</dt>
                      <dd className={styles.valorResumo}>{dadosFormulario.phone}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {erroCheckout && (
                <div className={styles.erroMensagem} role="alert">
                  {erroCheckout}
                </div>
              )}

              <div className={styles.navegacaoWizard}>
                <button
                  type="button"
                  className={styles.botaoVoltar}
                  disabled={criarBooking.isPending}
                  onClick={() => irParaEtapa(4)}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className={styles.ctaButton}
                  disabled={criarBooking.isPending}
                  aria-busy={criarBooking.isPending}
                  onClick={handleSubmeterCheckout}
                >
                  {criarBooking.isPending ? 'Processando...' : 'Ir para pagamento'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
