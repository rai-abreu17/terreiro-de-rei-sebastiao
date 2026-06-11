import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { resolveBookingCheckoutUrl } from '@/api/booking';
import { usePublicBookingStatus } from '@/hooks/usePublicBookingStatus';
import { formatDateTimeFortaleza } from '@/lib/date';
import {
  container,
  cartao,
  descricao,
  actions,
  titulo,
  statusEyebrow,
  secondaryAction,
  iconeStatus,
  infoPainel,
  infoLinha,
  infoLabel,
  infoValor,
  botaoAcao,
  pulseAnimation,
} from './BookingStatusPage.css';

function IconeAguardando() {
  return (
    <div className={`${iconeStatus.pendente} ${pulseAnimation}`} aria-label="Aguardando pagamento">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    </div>
  );
}

function IconeConfirmado() {
  return (
    <div className={iconeStatus.confirmado} aria-label="Confirmado">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>
  );
}

function IconeExpirado() {
  return (
    <div className={iconeStatus.expirado} aria-label="Expirado">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    </div>
  );
}

function formatarDataStatus(dataISO?: string | null): string {
  return dataISO
    ? formatDateTimeFortaleza(dataISO, "dd 'de' MMMM 'às' HH:mm")
    : 'A confirmar';
}

export function BookingStatusPage(): React.ReactElement {
  const { bookingId = '' } = useParams<{ bookingId: string }>();
  const [searchParams] = useSearchParams();
  const viewToken = searchParams.get('vt') ?? searchParams.get('viewToken') ?? undefined;
  const {
    data: booking,
    isLoading,
    isError,
  } = usePublicBookingStatus({ bookingId, viewToken });
  const checkoutUrl = resolveBookingCheckoutUrl(booking);

  if (!bookingId) {
    return (
      <main className={container}>
        <div className={cartao}>
          <h1 className={titulo}>Reserva não encontrada</h1>
          <p className={descricao}>Não foi possível identificar a reserva a partir do link recebido.</p>
          <div className={actions}>
            <Link className={botaoAcao} to="/agendar">
              Voltar ao agendamento
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className={container} aria-busy="true">
        <div className={cartao}>
          <span className={statusEyebrow}>Acompanhar reserva</span>
          <h1 className={titulo}>Consultando o status do pagamento</h1>
          <p className={descricao}>Estamos buscando as informações mais recentes da sua reserva.</p>
        </div>
      </main>
    );
  }

  if (isError || !booking) {
    return (
      <main className={container}>
        <div className={cartao}>
          <IconeExpirado />
          <span className={statusEyebrow}>Reserva indisponível</span>
          <h1 className={titulo}>Não foi possível carregar o status da reserva</h1>
          <p className={descricao}>Verifique o link recebido ou tente novamente em instantes.</p>
          <div className={actions}>
            <Link className={botaoAcao} to="/agendar">
              Escolher outro horário
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={container}>
      <div className={cartao}>
        <span className={statusEyebrow}>
          Reserva #{booking.bookingId.slice(0, 8).toUpperCase()}
        </span>

        {booking.status === 'PENDING_PAYMENT' && (
          <>
            <IconeAguardando />
            <h1 className={titulo}>Aguardando a confirmação do pagamento...</h1>
            <p className={descricao}>
              Assim que o Mercado Pago concluir o processamento, esta página se atualiza automaticamente e confirma a sua reserva.
            </p>
            <div className={infoPainel}>
              <div className={infoLinha}>
                <span className={infoLabel}>Status atual</span>
                <span className={infoValor}>Pagamento pendente</span>
              </div>
              {booking.service?.name && (
                <div className={infoLinha}>
                  <span className={infoLabel}>Serviço</span>
                  <span className={infoValor}>{booking.service.name}</span>
                </div>
              )}
              {booking.startAt && (
                <div className={infoLinha}>
                  <span className={infoLabel}>Horário</span>
                  <span className={infoValor}>{formatarDataStatus(booking.startAt)}</span>
                </div>
              )}
              {booking.holdExpiresAt && (
                <div className={infoLinha}>
                  <span className={infoLabel}>Reserva válida até</span>
                  <span className={infoValor}>{formatarDataStatus(booking.holdExpiresAt)}</span>
                </div>
              )}
            </div>
            {checkoutUrl && (
              <div className={actions}>
                <button
                  type="button"
                  className={botaoAcao}
                  onClick={() => {
                    window.location.href = checkoutUrl;
                  }}
                >
                  Voltar ao checkout
                </button>
              </div>
            )}
          </>
        )}

        {booking.status === 'CONFIRMED' && (
          <>
            <IconeConfirmado />
            <h1 className={titulo}>Sua reserva está confirmada!</h1>
            <p className={descricao}>
              Enviamos um e-mail com os detalhes. Guarde esta página como referência do seu atendimento.
            </p>
            <div className={infoPainel}>
              <div className={infoLinha}>
                <span className={infoLabel}>Código da reserva</span>
                <span className={infoValor}>{booking.bookingId.split('-')[0].toUpperCase()}</span>
              </div>
              {booking.service?.name && (
                <div className={infoLinha}>
                  <span className={infoLabel}>Serviço</span>
                  <span className={infoValor}>{booking.service.name}</span>
                </div>
              )}
              {booking.startAt && (
                <div className={infoLinha}>
                  <span className={infoLabel}>Data e hora</span>
                  <span className={infoValor}>{formatarDataStatus(booking.startAt)}</span>
                </div>
              )}
              {booking.amount?.formatted && (
                <div className={infoLinha}>
                  <span className={infoLabel}>Valor</span>
                  <span className={infoValor}>{booking.amount.formatted}</span>
                </div>
              )}
              <div className={infoLinha}>
                <span className={infoLabel}>Status</span>
                <span className={infoValor}>Pago e Confirmado</span>
              </div>
            </div>
            <div className={actions}>
              <Link className={secondaryAction} to="/agendar">
                Fazer nova reserva
              </Link>
            </div>
          </>
        )}

        {(booking.status === 'EXPIRED' ||
          booking.status === 'CANCELLED' ||
          booking.status === 'REFUNDED') && (
          <>
            <IconeExpirado />
            <h1 className={titulo}>
              {booking.status === 'EXPIRED'
                ? 'O tempo de pagamento expirou'
                : booking.status === 'REFUNDED'
                  ? 'Este pagamento foi reembolsado'
                  : 'Esta reserva foi cancelada'}
            </h1>
            <p className={descricao}>
              Para garantir outro horário, inicie um novo fluxo de agendamento com um slot disponível.
            </p>
            <div className={actions}>
              <Link className={botaoAcao} to="/agendar">
                Escolher novo horário
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
