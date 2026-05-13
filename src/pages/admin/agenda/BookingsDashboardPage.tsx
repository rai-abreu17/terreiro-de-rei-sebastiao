import { useMemo, useState } from 'react';
import { isPast, addDays, endOfDay, formatISO, startOfDay } from 'date-fns';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  extractBookingsError,
  type BookingAdminItem,
  type BookingStatus,
  useBookings,
  useUpdateBookingStatus,
} from '@/hooks/useBookings';
import { formatDateTimeFortaleza, formatMoney } from '@/utils/formatters';
import * as styles from './BookingsDashboardPage.css';

type FilterPreset = 'all' | 'today' | 'next7' | 'month';

const StatusIcon = ({ status }: { status: BookingStatus }) => {
  switch (status) {
    case 'CONFIRMED': return <span>✓</span>;
    case 'PENDING_PAYMENT': return <span>⌛</span>;
    case 'CANCELLED': return <span>✕</span>;
    case 'EXPIRED': return <span>⧗</span>;
    case 'COMPLETED': return <span>★</span>;
    case 'NO_SHOW': return <span>∅</span>;
    case 'REFUNDED': return <span>↺</span>;
    default: return <span>?</span>;
  }
};

const getStatusDescription = (status: BookingStatus) => {
  switch (status) {
    case 'CONFIRMED': return 'Pagamento aprovado. Agendamento confirmado.';
    case 'PENDING_PAYMENT': return 'Aguardando pagamento pelo consulente (hold de 15min).';
    case 'CANCELLED': return 'Cancelado.';
    case 'EXPIRED': return 'Expirado por falta de pagamento.';
    case 'COMPLETED': return 'Atendimento realizado.';
    case 'NO_SHOW': return 'Consulente não compareceu.';
    case 'REFUNDED': return 'Pagamento reembolsado.';
    default: return status;
  }
};

export const BookingsDashboardPage = () => {
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | ''>('');
  const [preset, setPreset] = useState<FilterPreset>('all');
  const [page, setPage] = useState(0);

  const filters = useMemo(() => {
    const now = new Date();

    if (preset === 'today') {
      return {
        status: selectedStatus || undefined,
        page,
        size: 12,
        from: formatISO(startOfDay(now)),
        to: formatISO(endOfDay(now)),
      };
    }

    if (preset === 'next7') {
      return {
        status: selectedStatus || undefined,
        page,
        size: 12,
        from: formatISO(startOfDay(now)),
        to: formatISO(endOfDay(addDays(now, 7))),
      };
    }

    if (preset === 'month') {
      return {
        status: selectedStatus || undefined,
        page,
        size: 12,
        from: formatISO(startOfDay(now)),
        to: formatISO(endOfDay(addDays(now, 30))),
      };
    }

    return {
      status: selectedStatus || undefined,
      page,
      size: 12,
    };
  }, [page, preset, selectedStatus]);

  const { data, isLoading, isError, error } = useBookings(filters);
  const updateStatusMutation = useUpdateBookingStatus();

  const bookings = data?.content ?? [];

  const handleCancel = (id: string) => {
    if (window.confirm('Tem certeza que deseja cancelar esta marcação? O horário será liberado.')) {
      updateStatusMutation.mutate({
        id,
        newStatus: 'CANCELLED',
        adminNotes: 'Cancelado pelo administrador.',
      });
    }
  };

  const handleMarkCompleted = (id: string) => {
    updateStatusMutation.mutate({ id, newStatus: 'COMPLETED' });
  };

  const handleMarkNoShow = (id: string) => {
    updateStatusMutation.mutate({ id, newStatus: 'NO_SHOW' });
  };

  const canMarkCompleted = (booking: BookingAdminItem) => {
    const isPastStart = isPast(new Date(booking.startAt));
    const within7Days = !isPast(addDays(new Date(booking.startAt), 7));
    return booking.status === 'CONFIRMED' && isPastStart && within7Days;
  };

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.titulo}>Gestão de Marcações</h1>
          <p className={styles.descricao}>Acompanhe clientes agendados e atualize o estado do atendimento sem saturar o painel.</p>
        </div>
      </div>

      <div className={styles.filtersContainer}>
        <select
          className={styles.select}
          value={preset}
          onChange={(event) => {
            setPreset(event.target.value as FilterPreset);
            setPage(0);
          }}
        >
          <option value="all">Todo o período</option>
          <option value="today">Hoje</option>
          <option value="next7">Próximos 7 dias</option>
          <option value="month">Próximos 30 dias</option>
        </select>

        <select 
          className={styles.select}
          value={selectedStatus}
          onChange={(event) => {
            setSelectedStatus(event.target.value as BookingStatus | '');
            setPage(0);
          }}
        >
          <option value="">Todos os Status</option>
          <option value="PENDING_PAYMENT">Pendente</option>
          <option value="CONFIRMED">Confirmado</option>
          <option value="COMPLETED">Atendido</option>
          <option value="CANCELLED">Cancelado</option>
          <option value="NO_SHOW">Falta</option>
          <option value="EXPIRED">Expirado</option>
        </select>
      </div>

      {isError ? (
        <p className={styles.feedbackError}>{extractBookingsError(error)}</p>
      ) : null}

      {updateStatusMutation.isError ? (
        <p className={styles.feedbackError}>{extractBookingsError(updateStatusMutation.error)}</p>
      ) : null}

      <div className={styles.tableContainer}>
        <Tooltip.Provider delayDuration={200}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Data/Hora</th>
                <th className={styles.th}>Cliente</th>
                <th className={styles.th}>Serviço</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className={styles.td} style={{ textAlign: 'center' }}>Carregando marcações...</td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={5} className={styles.td} style={{ textAlign: 'center' }}>Erro ao carregar as marcações.</td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.td} style={{ textAlign: 'center' }}>Nenhuma marcação encontrada.</td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className={styles.tr}>
                    <td className={styles.td}>
                      <div className={styles.primaryCell}>{formatDateTimeFortaleza(booking.startAt)}</div>
                      <span className={styles.secondaryCell}>
                        {booking.modality === 'ONLINE' ? 'Online' : 'Presencial'} · {formatMoney(booking.priceCents)}
                      </span>
                    </td>

                    <td className={styles.td}>
                      <div className={styles.primaryCell}>{booking.customer.fullName}</div>
                      <span className={styles.secondaryCell}>
                        {booking.customer.isAnonymized
                          ? 'Dados anonimizados'
                          : booking.customer.email ?? booking.customer.phone ?? 'Contato indisponível'}
                      </span>
                    </td>

                    <td className={styles.td}>
                      <div className={styles.primaryCell}>{booking.serviceName}</div>
                      <span className={styles.secondaryCell}>
                        Termina {formatDateTimeFortaleza(booking.endAt, 'HH:mm')}
                      </span>
                    </td>

                    <td className={styles.td}>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <span className={styles.revealSlot}>
                            <span className={styles.statusBadge[booking.status]}>
                              <StatusIcon status={booking.status} />
                            </span>
                          </span>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content className={styles.tooltipContent} sideOffset={5}>
                            {getStatusDescription(booking.status)}
                            {booking.adminNotes ? <div className={styles.tooltipNotes}><strong>Notas:</strong> {booking.adminNotes}</div> : null}
                            <Tooltip.Arrow className={styles.tooltipArrow} />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </td>

                    <td className={styles.td}>
                      <div className={styles.revealSlot}>
                        <div className={styles.actionsGroup}>
                          {['PENDING_PAYMENT', 'CONFIRMED'].includes(booking.status) && (
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <button
                                  className={styles.iconButton}
                                  onClick={() => handleCancel(booking.id)}
                                  disabled={updateStatusMutation.isPending}
                                  aria-label="Cancelar agendamento"
                                >
                                  ✕
                                </button>
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content className={styles.tooltipContent} sideOffset={5}>
                                  Cancelar e liberar horário
                                  <Tooltip.Arrow className={styles.tooltipArrow} />
                                </Tooltip.Content>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          )}

                          {canMarkCompleted(booking) && (
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <button
                                  className={styles.iconButton}
                                  onClick={() => handleMarkCompleted(booking.id)}
                                  disabled={updateStatusMutation.isPending}
                                  aria-label="Marcar como atendido"
                                >
                                  ✓
                                </button>
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content className={styles.tooltipContent} sideOffset={5}>
                                  Marcar como atendido
                                  <Tooltip.Arrow className={styles.tooltipArrow} />
                                </Tooltip.Content>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          )}

                          {canMarkCompleted(booking) && (
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <button
                                  className={styles.iconButton}
                                  onClick={() => handleMarkNoShow(booking.id)}
                                  disabled={updateStatusMutation.isPending}
                                  aria-label="Marcar falta"
                                >
                                  ∅
                                </button>
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content className={styles.tooltipContent} sideOffset={5}>
                                  Marcar como falta
                                  <Tooltip.Arrow className={styles.tooltipArrow} />
                                </Tooltip.Content>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          )}

                          {!['PENDING_PAYMENT', 'CONFIRMED'].includes(booking.status) && !canMarkCompleted(booking) ? (
                            <span className={styles.actionsHint}>Sem ações</span>
                          ) : null}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Tooltip.Provider>
      </div>

      <div className={styles.paginationBar}>
        <span className={styles.paginationSummary}>
          Página {(data?.number ?? 0) + 1} de {Math.max(totalPages, 1)}
        </span>

        <div className={styles.paginationActions}>
          <button
            type="button"
            className={styles.paginationButton}
            onClick={() => setPage((current) => Math.max(current - 1, 0))}
            disabled={!data || data.first || updateStatusMutation.isPending}
          >
            Anterior
          </button>
          <button
            type="button"
            className={styles.paginationButton}
            onClick={() => setPage((current) => current + 1)}
            disabled={!data || data.last || updateStatusMutation.isPending}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};
