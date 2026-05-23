import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
  addDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  formatISO,
  isPast,
  isSameDay,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import {
  AlertTriangle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Monitor,
  MoreHorizontal,
} from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Drawer } from '@/components/ui/Drawer/Drawer';
import { IconWhatsApp } from '@/assets/icons/SimbolosReiSebastiao';
import type { SlotDisponivel } from '@/api/public.types';
import {
  extractBookingsError,
  type BookingAdminItem,
  type BookingModality,
  type BookingStatus,
  useBookings,
  useRescheduleBooking,
  useUpdateBookingStatus,
} from '@/hooks/useBookings';
import { usePublicSlots } from '@/hooks/usePublicSlots';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { CANONICAL_TIMEZONE, formatMoney } from '@/utils/formatters';
import * as styles from './BookingsDashboardPage.css';

type PeriodoFiltro = 'hoje' | 'semana' | 'mes' | 'todos';
type DropdownAcoes = {
  readonly bookingId: string;
  readonly top: number;
  readonly left: number;
};

const PAGE_SIZE = 12;
const LOADING_MINIMO_MS = 300;
const ACTIONS_MENU_WIDTH = 230;
const ACTIONS_MENU_HEIGHT = 190;
const ACTIONS_MENU_GAP = 8;
const VIEWPORT_MARGIN = 12;

const opcoesPeriodo: ReadonlyArray<{ label: string; value: PeriodoFiltro }> = [
  { label: 'Hoje', value: 'hoje' },
  { label: 'Esta Semana', value: 'semana' },
  { label: 'Este Mês', value: 'mes' },
  { label: 'Todos', value: 'todos' },
];

const labelsPeriodoMobile: Record<PeriodoFiltro, string> = {
  hoje: 'Hoje',
  semana: 'Semana',
  mes: 'Mês',
  todos: 'Todos',
};

const dataFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: CANONICAL_TIMEZONE,
});

const mesAnoFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'long',
  year: 'numeric',
  timeZone: CANONICAL_TIMEZONE,
});

const horaFormatter = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: CANONICAL_TIMEZONE,
});

const dataExtensaFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: CANONICAL_TIMEZONE,
});

const dataHoraExtensaFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: CANONICAL_TIMEZONE,
});

const Badge = ({
  className,
  children,
}: {
  readonly className: string;
  readonly children: ReactNode;
}) => <span className={className}>{children}</span>;

const combinarClasses = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

const formatarDataHora = (iso: string) => {
  const data = new Date(iso);
  return `${dataFormatter.format(data)} às ${horaFormatter.format(data)}`;
};

const formatarHora = (iso: string) => horaFormatter.format(new Date(iso));

const formatarDataInput = (data: Date) => {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

const obterHojeISO = () => formatarDataInput(new Date());

const formatarDataExtensa = (dataISO: string) =>
  dataExtensaFormatter.format(new Date(`${dataISO}T12:00:00`));

const formatarDataHoraExtensa = (iso: string) =>
  dataHoraExtensaFormatter.format(new Date(iso));

const formatarModalidade = (modalidade: BookingModality) =>
  modalidade === 'ONLINE' ? 'Online' : 'Presencial';

const obterContatoCliente = (booking: BookingAdminItem) => {
  if (booking.customer.isAnonymized) {
    return 'Dados anonimizados';
  }

  return booking.customer.email ?? booking.customer.phone ?? 'Contato indisponível';
};

const formatarTelefoneBrasileiro = (numeroLocal: string, fallback: string) => {
  if (numeroLocal.length === 11) {
    return `(${numeroLocal.slice(0, 2)}) ${numeroLocal.slice(2, 7)}-${numeroLocal.slice(7)}`;
  }

  if (numeroLocal.length === 10) {
    return `(${numeroLocal.slice(0, 2)}) ${numeroLocal.slice(2, 6)}-${numeroLocal.slice(6)}`;
  }

  return fallback;
};

const obterTelefoneWhatsApp = (telefone: string | null | undefined) => {
  const telefoneOriginal = telefone?.trim();

  if (!telefoneOriginal) {
    return null;
  }

  const digitos = telefoneOriginal.replace(/\D+/g, '');

  if (!digitos) {
    return null;
  }

  const numeroComPais = digitos.startsWith('55') ? digitos : `55${digitos}`;
  const numeroLocal = numeroComPais.startsWith('55') ? numeroComPais.slice(2) : numeroComPais;

  return {
    href: `https://wa.me/${numeroComPais}`,
    rotulo: formatarTelefoneBrasileiro(numeroLocal, telefoneOriginal),
  };
};

const slotEstaDisponivel = (slot: SlotDisponivel) => slot.available ?? true;

const normalizarStatusVisual = (status: BookingStatus | null | undefined): BookingStatus =>
  status ?? 'PENDING_PAYMENT';

const getStatusLabel = (status: BookingStatus | null | undefined) => {
  switch (normalizarStatusVisual(status)) {
    case 'CONFIRMED': return 'Confirmado';
    case 'PENDING_PAYMENT': return 'Pendente';
    case 'CANCELLED': return 'Cancelado';
    case 'EXPIRED': return 'Expirado';
    case 'COMPLETED': return 'Realizado';
    case 'NO_SHOW': return 'Falta';
    case 'REFUNDED': return 'Reembolsado';
    default: return 'Pendente';
  }
};

const getStatusDescription = (status: BookingStatus | null | undefined) => {
  switch (normalizarStatusVisual(status)) {
    case 'CONFIRMED': return 'Pagamento aprovado. Agendamento confirmado.';
    case 'PENDING_PAYMENT': return 'Aguardando pagamento pelo consulente (hold de 15min).';
    case 'CANCELLED': return 'Cancelado.';
    case 'EXPIRED': return 'Expirado por falta de pagamento.';
    case 'COMPLETED': return 'Atendimento realizado.';
    case 'NO_SHOW': return 'Consulente não compareceu.';
    case 'REFUNDED': return 'Pagamento reembolsado.';
    default: return 'Aguardando pagamento pelo consulente (hold de 15min).';
  }
};

const obterIntervaloPeriodo = (periodo: PeriodoFiltro) => {
  const agora = new Date();

  if (periodo === 'hoje') {
    return {
      from: formatISO(startOfDay(agora)),
      to: formatISO(endOfDay(agora)),
    };
  }

  if (periodo === 'semana') {
    return {
      from: formatISO(startOfWeek(agora, { weekStartsOn: 1 })),
      to: formatISO(endOfWeek(agora, { weekStartsOn: 1 })),
    };
  }

  if (periodo === 'mes') {
    return {
      from: formatISO(startOfMonth(agora)),
      to: formatISO(endOfMonth(agora)),
    };
  }

  return {};
};

const obterRotuloTotal = (periodo: PeriodoFiltro) => {
  switch (periodo) {
    case 'hoje': return 'Total do dia';
    case 'semana': return 'Total da semana';
    case 'mes': return 'Total do mês';
    default: return 'Total geral';
  }
};

const obterDescricaoFiltroAtual = (periodo: PeriodoFiltro, status: BookingStatus | '') => {
  const periodoTexto = (() => {
    switch (periodo) {
      case 'hoje': return 'marcações de hoje';
      case 'semana': return 'marcações desta semana';
      case 'mes': return `marcações de ${mesAnoFormatter.format(new Date())}`;
      default: return 'todas as marcações';
    }
  })();

  const statusTexto = status ? ` · Status: ${getStatusLabel(status)}` : '';

  return `Mostrando ${periodoTexto}${statusTexto}`;
};

const obterEstadoVazio = (periodo: PeriodoFiltro, status: BookingStatus | '') => {
  if (status) {
    return {
      titulo: 'Nenhuma marcação com este status',
      subtitulo: 'Tente mudar o filtro de status.',
    };
  }

  if (periodo === 'hoje') {
    return {
      titulo: 'Nenhuma marcação para hoje',
      subtitulo: 'Quando alguém agendar para hoje, aparecerá aqui.',
    };
  }

  if (periodo === 'semana') {
    return {
      titulo: 'Nenhuma marcação esta semana',
      subtitulo: "Tente ver os próximos meses em 'Todos'.",
    };
  }

  if (periodo === 'mes') {
    return {
      titulo: 'Nenhuma marcação este mês',
      subtitulo: "Tente ver outros períodos em 'Todos'.",
    };
  }

  return {
    titulo: 'Nenhuma marcação encontrada',
    subtitulo: 'Tente mudar o filtro de status.',
  };
};

const calcularPosicaoMenuAcoes = (trigger: HTMLElement) => {
  const rect = trigger.getBoundingClientRect();
  const maxLeft = window.innerWidth - ACTIONS_MENU_WIDTH - VIEWPORT_MARGIN;
  const left = Math.max(
    VIEWPORT_MARGIN,
    Math.min(rect.right - ACTIONS_MENU_WIDTH, maxLeft)
  );
  const abreAcima =
    rect.bottom + ACTIONS_MENU_GAP + ACTIONS_MENU_HEIGHT > window.innerHeight
    && rect.top > ACTIONS_MENU_HEIGHT;

  return {
    top: abreAcima
      ? Math.max(VIEWPORT_MARGIN, rect.top - ACTIONS_MENU_HEIGHT - ACTIONS_MENU_GAP)
      : rect.bottom + ACTIONS_MENU_GAP,
    left,
  };
};

const bookingPodeConfirmarAtendimento = (booking: BookingAdminItem) => {
  const isPastStart = isPast(new Date(booking.startAt));
  const within7Days = !isPast(addDays(new Date(booking.startAt), 7));
  return normalizarStatusVisual(booking.status) === 'CONFIRMED' && isPastStart && within7Days;
};

interface BookingActionHandlers {
  readonly dropdownAberto: DropdownAcoes | null;
  readonly updateStatusPending: boolean;
  readonly onToggleDropdown: (bookingId: string, trigger: HTMLElement) => void;
  readonly onVerDetalhes: (booking: BookingAdminItem) => void;
  readonly onConfirmarAtendimento: (id: string) => void;
  readonly onRemarcar: (booking: BookingAdminItem) => void;
  readonly onSolicitarCancelamento: (booking: BookingAdminItem) => void;
}

interface BookingActionsMenuProps extends BookingActionHandlers {
  readonly booking: BookingAdminItem;
}

const BookingActionsMenu = ({
  booking,
  dropdownAberto,
  updateStatusPending,
  onToggleDropdown,
  onVerDetalhes,
  onConfirmarAtendimento,
  onRemarcar,
  onSolicitarCancelamento,
}: BookingActionsMenuProps) => {
  const statusVisual = normalizarStatusVisual(booking.status);
  const estaRealizado = statusVisual === 'COMPLETED';
  const estaCancelado = statusVisual === 'CANCELLED';
  const estaReembolsado = statusVisual === 'REFUNDED';
  const podeCancelar = !estaCancelado && !estaRealizado && !estaReembolsado;
  const podeRemarcar = statusVisual === 'CONFIRMED' || statusVisual === 'PENDING_PAYMENT';
  const podeConfirmarAtendimento = bookingPodeConfirmarAtendimento(booking);

  return (
    <div className={styles.actionsMenuWrap}>
      <button
        type="button"
        className={styles.menuButton}
        aria-label="Abrir ações da marcação"
        aria-haspopup="menu"
        aria-expanded={dropdownAberto?.bookingId === booking.id}
        onClick={(event) => {
          event.stopPropagation();
          onToggleDropdown(booking.id, event.currentTarget);
        }}
      >
        <MoreHorizontal size={20} aria-hidden="true" />
      </button>

      {dropdownAberto?.bookingId === booking.id && typeof document !== 'undefined' ? createPortal(
        <div
          className={styles.actionsDropdown}
          style={{ top: dropdownAberto.top, left: dropdownAberto.left }}
          role="menu"
          onClick={(event) => event.stopPropagation()}
        >
          <button type="button" className={styles.dropdownItem} onClick={() => onVerDetalhes(booking)}>
            <span aria-hidden="true">👁</span>
            Ver detalhes
          </button>
          <button
            type="button"
            className={styles.dropdownItem}
            onClick={() => onConfirmarAtendimento(booking.id)}
            disabled={!podeConfirmarAtendimento || updateStatusPending}
          >
            <span aria-hidden="true">✅</span>
            Confirmar atendimento
          </button>
          <button
            type="button"
            className={styles.dropdownItem}
            onClick={() => onRemarcar(booking)}
            disabled={!podeRemarcar || updateStatusPending}
          >
            <span aria-hidden="true">🔁</span>
            Remarcar
          </button>
          <button
            type="button"
            className={styles.dropdownItem}
            onClick={() => onSolicitarCancelamento(booking)}
            disabled={!podeCancelar || updateStatusPending}
          >
            <span aria-hidden="true">✕</span>
            Cancelar marcação
          </button>
        </div>
      , document.body) : null}
    </div>
  );
};

interface BookingsPresentationProps extends BookingActionHandlers {
  readonly bookings: BookingAdminItem[];
}

interface BookingsTableProps extends BookingsPresentationProps {
  readonly isTablet: boolean;
}

const BookingsTable = ({
  bookings,
  isTablet,
  ...actions
}: BookingsTableProps) => (
  <Tooltip.Provider delayDuration={200}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>Data/Hora</th>
          <th className={styles.th}>Cliente</th>
          {!isTablet ? <th className={styles.th}>Serviço</th> : null}
          <th className={styles.th}>Status</th>
          <th className={styles.th}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => {
          const statusVisual = normalizarStatusVisual(booking.status);
          const estaHoje = isSameDay(new Date(booking.startAt), new Date());

          return (
            <tr key={booking.id} className={styles.tr}>
              <td className={styles.td}>
                <div className={styles.primaryCell}>
                  {formatarDataHora(booking.startAt)}
                  {estaHoje ? <Badge className={styles.todayBadge}>Hoje</Badge> : null}
                </div>
                <span className={styles.secondaryCell}>
                  {formatarModalidade(booking.modality)} · {formatMoney(booking.priceCents)}
                </span>
              </td>

              <td className={styles.td}>
                <div className={styles.primaryCell}>{booking.customer.fullName}</div>
                {isTablet ? (
                  <span className={styles.secondaryCell}>
                    {booking.serviceName} · termina {formatarHora(booking.endAt)}
                  </span>
                ) : null}
                <span className={isTablet ? styles.tertiaryCell : styles.secondaryCell}>
                  {obterContatoCliente(booking)}
                </span>
              </td>

              {!isTablet ? (
                <td className={styles.td}>
                  <div className={styles.primaryCell}>{booking.serviceName}</div>
                  <span className={styles.secondaryCell}>
                    Termina {formatarHora(booking.endAt)}
                  </span>
                </td>
              ) : null}

              <td className={styles.td}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Badge className={styles.statusBadge[statusVisual]}>
                      {getStatusLabel(statusVisual)}
                    </Badge>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className={styles.tooltipContent} sideOffset={5}>
                      {getStatusDescription(statusVisual)}
                      {booking.adminNotes ? <div className={styles.tooltipNotes}><strong>Notas:</strong> {booking.adminNotes}</div> : null}
                      <Tooltip.Arrow className={styles.tooltipArrow} />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </td>

              <td className={styles.td}>
                <div className={styles.actionsCell}>
                  <BookingActionsMenu booking={booking} {...actions} />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </Tooltip.Provider>
);

const BookingMobileCards = ({
  bookings,
  ...actions
}: BookingsPresentationProps) => (
  <div className={styles.mobileCardsList} data-scrollable="true" aria-label="Marcações">
    {bookings.map((booking) => {
      const statusVisual = normalizarStatusVisual(booking.status);
      const estaHoje = isSameDay(new Date(booking.startAt), new Date());
      const IconeModalidade = booking.modality === 'ONLINE' ? Monitor : MapPin;

      return (
        <article key={booking.id} className={styles.mobileBookingCard}>
          <div className={styles.mobileCardTopline}>
            <Badge className={styles.statusBadge[statusVisual]}>
              {getStatusLabel(statusVisual)}
            </Badge>
            <BookingActionsMenu booking={booking} {...actions} />
          </div>

          <div className={styles.mobileCustomerBlock}>
            <strong className={styles.mobileCustomerName}>{booking.customer.fullName}</strong>
            <span className={styles.mobileCustomerContact}>{obterContatoCliente(booking)}</span>
          </div>

          <div className={styles.mobileServiceBlock}>
            <strong className={styles.mobileServiceName}>{booking.serviceName}</strong>
            <span className={styles.mobileServiceMeta}>Termina {formatarHora(booking.endAt)}</span>
          </div>

          <div className={styles.mobileCardDetails}>
            <span className={styles.mobileDetailItem}>
              <CalendarDays size={14} aria-hidden="true" />
              {formatarDataHora(booking.startAt)}
              {estaHoje ? <Badge className={styles.todayBadge}>Hoje</Badge> : null}
            </span>
            <span className={styles.mobileDetailItem}>
              <IconeModalidade size={14} aria-hidden="true" />
              {formatarModalidade(booking.modality)} · {formatMoney(booking.priceCents)}
            </span>
          </div>
        </article>
      );
    })}
  </div>
);

interface EmptyBookingsStateProps {
  readonly titulo: string;
  readonly subtitulo: string;
}

const EmptyBookingsState = ({ titulo, subtitulo }: EmptyBookingsStateProps) => (
  <div className={styles.emptyState}>
    <svg className={styles.emptyIcon} viewBox="0 0 40 40" role="img" aria-label="Calendário sem marcações">
      <rect x="7" y="9" width="26" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M13 6v6M27 6v6M7 16h26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 22h4M22 22h4M14 28h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
    <p className={styles.emptyTitle}>{titulo}</p>
    <p className={styles.emptySubtitle}>{subtitulo}</p>
  </div>
);

const MobileLoadingCards = () => (
  <div className={styles.mobileCardsList} aria-busy="true" aria-label="Carregando marcações">
    {Array.from({ length: 3 }).map((_, indice) => (
      <article key={indice} className={styles.mobileBookingCard}>
        <span className={styles.skeletonStatus} />
        <span className={styles.skeletonCliente} />
        <span className={styles.skeletonData} />
        <span className={styles.skeletonServico} />
      </article>
    ))}
  </div>
);

interface BookingDetailsDrawerProps {
  readonly booking: BookingAdminItem | null;
  readonly aberto: boolean;
  readonly onClose: () => void;
}

const BookingDetailsDrawer = ({
  booking,
  aberto,
  onClose,
}: BookingDetailsDrawerProps) => {
  const telefoneWhatsApp = obterTelefoneWhatsApp(booking?.customer.phone);
  const statusVisual = normalizarStatusVisual(booking?.status);

  return (
    <Drawer
      open={aberto && Boolean(booking)}
      title="Detalhes da marcação"
      onClose={onClose}
    >
      {booking ? (
        <div className={styles.rescheduleDrawerBody}>
          <section className={styles.customerBlock} aria-label="Dados do consulente">
            <strong className={styles.customerName}>{booking.customer.fullName}</strong>
            <span className={styles.customerContact}>
              {booking.customer.email ?? 'E-mail não cadastrado'}
            </span>
            {telefoneWhatsApp ? (
              <a
                className={styles.whatsappLink}
                href={telefoneWhatsApp.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconWhatsApp size={18} aria-hidden={true} />
                {telefoneWhatsApp.rotulo}
              </a>
            ) : (
              <div className={styles.phoneWarning} role="status">
                Consulente sem telefone cadastrado
              </div>
            )}
          </section>

          <section className={styles.currentBookingBlock} aria-label="Dados da marcação">
            <dl className={styles.currentBookingList}>
              <div>
                <dt>Status</dt>
                <dd>{getStatusLabel(statusVisual)}</dd>
              </div>
              <div>
                <dt>Descrição do status</dt>
                <dd>{getStatusDescription(statusVisual)}</dd>
              </div>
              <div>
                <dt>Serviço</dt>
                <dd>{booking.serviceName}</dd>
              </div>
              <div>
                <dt>Data e hora</dt>
                <dd>{formatarDataHora(booking.startAt)}</dd>
              </div>
              <div>
                <dt>Término</dt>
                <dd>{formatarHora(booking.endAt)}</dd>
              </div>
              <div>
                <dt>Modalidade</dt>
                <dd>{formatarModalidade(booking.modality)}</dd>
              </div>
              <div>
                <dt>Valor</dt>
                <dd>{formatMoney(booking.priceCents)}</dd>
              </div>
              <div>
                <dt>Notas administrativas</dt>
                <dd>{booking.adminNotes ?? 'Sem notas administrativas.'}</dd>
              </div>
            </dl>
          </section>
        </div>
      ) : null}
    </Drawer>
  );
};

interface CancelBookingDrawerProps {
  readonly booking: BookingAdminItem | null;
  readonly aberto: boolean;
  readonly isMobile: boolean;
  readonly isPending: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
}

const CancelBookingDrawer = ({
  booking,
  aberto,
  isMobile,
  isPending,
  onClose,
  onConfirm,
}: CancelBookingDrawerProps) => {
  const [segundosRestantes, setSegundosRestantes] = useState(8);

  useEffect(() => {
    if (!aberto || !booking || !isMobile || isPending) {
      return undefined;
    }

    setSegundosRestantes(8);

    const intervalo = window.setInterval(() => {
      setSegundosRestantes((segundos) => Math.max(0, segundos - 1));
    }, 1000);

    const timeout = window.setTimeout(() => {
      onClose();
    }, 8000);

    return () => {
      window.clearInterval(intervalo);
      window.clearTimeout(timeout);
    };
  }, [aberto, booking, isMobile, isPending, onClose]);

  if (isMobile) {
    return (
      <Drawer
        open={aberto && Boolean(booking)}
        title="Cancelar marcação"
        onClose={onClose}
        mobileVariant="compact"
        footer={
          <div className={styles.cancelSheetActions}>
            <button
              type="button"
              className={styles.cancelConfirmButton}
              onClick={onConfirm}
              disabled={isPending}
            >
              {isPending ? 'Cancelando...' : 'Sim, cancelar'}
            </button>
            <button
              type="button"
              className={styles.cancelKeepButton}
              onClick={onClose}
              disabled={isPending}
            >
              Não cancelar ({segundosRestantes})
            </button>
          </div>
        }
      >
        {booking ? (
          <div className={styles.cancelSheetContent}>
            <AlertTriangle size={28} aria-hidden="true" />
            <strong>Cancelar a marcação de {booking.customer.fullName}?</strong>
            <span>Esta ação não pode ser desfeita.</span>
          </div>
        ) : null}
      </Drawer>
    );
  }

  return (
    <Drawer
      open={aberto && Boolean(booking)}
      title="Cancelar marcação"
      onClose={onClose}
      footer={
        <div className={styles.drawerFooterActions}>
          <button
            type="button"
            className={styles.drawerSecondaryButton}
            onClick={onClose}
            disabled={isPending}
          >
            Não, voltar
          </button>
          <button
            type="button"
            className={styles.drawerPrimaryButton}
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? 'Cancelando...' : 'Sim, cancelar'}
          </button>
        </div>
      }
    >
      {booking ? (
        <div className={styles.rescheduleDrawerBody}>
          <div className={styles.drawerError} role="alert">
            Esta ação cancela a marcação selecionada e atualiza o status no painel.
          </div>

          <section className={styles.currentBookingBlock} aria-label="Marcação a cancelar">
            <dl className={styles.currentBookingList}>
              <div>
                <dt>Consulente</dt>
                <dd>{booking.customer.fullName}</dd>
              </div>
              <div>
                <dt>Serviço</dt>
                <dd>{booking.serviceName}</dd>
              </div>
              <div>
                <dt>Data e hora</dt>
                <dd>{formatarDataHora(booking.startAt)}</dd>
              </div>
              <div>
                <dt>Status atual</dt>
                <dd>{getStatusLabel(booking.status)}</dd>
              </div>
            </dl>
          </section>
        </div>
      ) : null}
    </Drawer>
  );
};

type PassoRemarcacao = 1 | 2;

interface RescheduleDrawerProps {
  readonly booking: BookingAdminItem | null;
  readonly aberto: boolean;
  readonly onClose: () => void;
  readonly onSuccess: (dataHoraExtensa: string) => void;
}

const RescheduleDrawer = ({
  booking,
  aberto,
  onClose,
  onSuccess,
}: RescheduleDrawerProps) => {
  const hojeISO = useMemo(() => obterHojeISO(), []);
  const [passo, setPasso] = useState<PassoRemarcacao>(1);
  const [novaData, setNovaData] = useState(hojeISO);
  const [slotSelecionado, setSlotSelecionado] = useState<SlotDisponivel | null>(null);
  const rescheduleMutation = useRescheduleBooking();
  const resetRescheduleMutation = rescheduleMutation.reset;

  const {
    data: slots = [],
    isLoading: carregandoSlots,
    isError: erroSlots,
  } = usePublicSlots({
    serviceId: booking?.serviceId,
    dataISO: novaData,
    modality: booking?.modality,
    includeUnavailable: true,
  });

  useEffect(() => {
    if (!aberto) {
      return;
    }

    const hoje = obterHojeISO();
    setPasso(1);
    setNovaData(hoje);
    setSlotSelecionado(null);
    resetRescheduleMutation();
  }, [aberto, booking?.id, hojeISO, resetRescheduleMutation]);

  const telefoneWhatsApp = obterTelefoneWhatsApp(booking?.customer.phone);
  const slotsOrdenados = useMemo(
    () => [...slots].sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()),
    [slots]
  );
  const dataValida = Boolean(novaData) && novaData >= hojeISO;
  const podeConfirmar = Boolean(booking && dataValida && slotSelecionado && slotEstaDisponivel(slotSelecionado));

  const confirmarRemarcacao = () => {
    if (!booking || !slotSelecionado || !podeConfirmar) {
      return;
    }

    const dataHoraExtensa = formatarDataHoraExtensa(slotSelecionado.startAt);

    rescheduleMutation.mutate(
      {
        id: booking.id,
        startAt: slotSelecionado.startAt,
        adminNotes: `Remarcado pelo painel administrativo para ${dataHoraExtensa}.`,
      },
      {
        onSuccess: () => onSuccess(dataHoraExtensa),
      }
    );
  };

  return (
    <Drawer
      open={aberto && Boolean(booking)}
      title="Remarcar Atendimento"
      onClose={onClose}
      footer={
        <div className={styles.drawerFooterActions}>
          <button
            type="button"
            className={styles.drawerSecondaryButton}
            onClick={onClose}
            disabled={rescheduleMutation.isPending}
          >
            Cancelar
          </button>
          <button
            type="button"
            className={styles.drawerPrimaryButton}
            onClick={confirmarRemarcacao}
            disabled={!podeConfirmar || rescheduleMutation.isPending}
          >
            {rescheduleMutation.isPending ? 'Confirmando...' : 'Confirmar Remarcação'}
          </button>
        </div>
      }
    >
      {booking ? (
        <div className={styles.rescheduleDrawerBody}>
          <section className={styles.customerBlock} aria-label="Dados do consulente">
            <strong className={styles.customerName}>{booking.customer.fullName}</strong>
            <span className={styles.customerContact}>
              {booking.customer.email ?? 'E-mail não cadastrado'}
            </span>
            {telefoneWhatsApp ? (
              <a
                className={styles.whatsappLink}
                href={telefoneWhatsApp.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconWhatsApp size={18} aria-hidden={true} />
                {telefoneWhatsApp.rotulo}
              </a>
            ) : (
              <div className={styles.phoneWarning} role="status">
                ⚠️ Consulente sem telefone cadastrado
              </div>
            )}
          </section>

          <section className={styles.currentBookingBlock} aria-label="Marcação atual">
            <dl className={styles.currentBookingList}>
              <div>
                <dt>Serviço</dt>
                <dd>{booking.serviceName}</dd>
              </div>
              <div>
                <dt>Data e hora atual</dt>
                <dd>{formatarDataHora(booking.startAt)}</dd>
              </div>
              <div>
                <dt>Modalidade</dt>
                <dd>{formatarModalidade(booking.modality)}</dd>
              </div>
              <div>
                <dt>Valor</dt>
                <dd>{formatMoney(booking.priceCents)}</dd>
              </div>
            </dl>
          </section>

          <section className={styles.rescheduleFlow} aria-label="Fluxo de remarcação">
            <div className={styles.rescheduleSteps} aria-label="Progresso da remarcação">
              <span className={passo === 1 ? styles.rescheduleStepActive : styles.rescheduleStep}>
                Passo 1 de 2 — Escolha a nova data
              </span>
              <span className={passo === 2 ? styles.rescheduleStepActive : styles.rescheduleStep}>
                Passo 2 de 2 — Escolha o novo horário
              </span>
            </div>

            {passo === 1 ? (
              <div className={styles.rescheduleStepPanel}>
                <label className={styles.drawerField}>
                  <span>Nova data</span>
                  <input
                    type="date"
                    value={novaData}
                    min={hojeISO}
                    onChange={(event) => {
                      const valor = event.target.value;
                      if (!valor || valor < hojeISO) {
                        setNovaData('');
                        setSlotSelecionado(null);
                        return;
                      }
                      setNovaData(valor);
                      setSlotSelecionado(null);
                    }}
                  />
                </label>

                <button
                  type="button"
                  className={styles.drawerPrimaryButton}
                  disabled={!dataValida}
                  onClick={() => setPasso(2)}
                >
                  Continuar
                </button>
              </div>
            ) : (
              <div className={styles.rescheduleStepPanel}>
                <div className={styles.selectedDateHeader}>
                  {novaData ? formatarDataExtensa(novaData) : 'Escolha uma data'}
                </div>

                {carregandoSlots ? (
                  <div className={styles.drawerMutedBox} aria-busy="true">
                    Buscando horários disponíveis...
                  </div>
                ) : null}

                {erroSlots && !carregandoSlots ? (
                  <div className={styles.drawerError} role="alert">
                    Não foi possível carregar os horários para esta data.
                  </div>
                ) : null}

                {!carregandoSlots && !erroSlots && slotsOrdenados.length === 0 ? (
                  <div className={styles.drawerMutedBox}>
                    Nenhum horário encontrado para esta data.
                  </div>
                ) : null}

                {!carregandoSlots && !erroSlots && slotsOrdenados.length > 0 ? (
                  <div className={styles.timeGrid} role="radiogroup" aria-label="Novo horário">
                    {slotsOrdenados.map((slot) => {
                      const disponivel = slotEstaDisponivel(slot);
                      const selecionado = slotSelecionado?.startAt === slot.startAt;

                      return (
                        <button
                          key={slot.startAt}
                          type="button"
                          className={
                            selecionado
                              ? styles.timeButtonSelected
                              : disponivel
                              ? styles.timeButtonAvailable
                              : styles.timeButtonUnavailable
                          }
                          role="radio"
                          aria-checked={selecionado}
                          disabled={!disponivel}
                          onClick={() => setSlotSelecionado(slot)}
                        >
                          <span>{formatarHora(slot.startAt)}</span>
                          {!disponivel ? <small>Ocupado</small> : null}
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                <button
                  type="button"
                  className={styles.drawerSecondaryButton}
                  onClick={() => setPasso(1)}
                >
                  Voltar
                </button>
              </div>
            )}

            {rescheduleMutation.isError ? (
              <div className={styles.drawerError} role="alert">
                {extractBookingsError(rescheduleMutation.error)}
              </div>
            ) : null}
          </section>
        </div>
      ) : null}
    </Drawer>
  );
};

export const BookingsDashboardPage = () => {
  const { isMobile, isTablet } = useBreakpoint();
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | ''>('');
  const [periodo, setPeriodo] = useState<PeriodoFiltro>('hoje');
  const [page, setPage] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const [dropdownAberto, setDropdownAberto] = useState<DropdownAcoes | null>(null);
  const [bookingDetalhes, setBookingDetalhes] = useState<BookingAdminItem | null>(null);
  const [bookingCancelamento, setBookingCancelamento] = useState<BookingAdminItem | null>(null);
  const [bookingRemarcacao, setBookingRemarcacao] = useState<BookingAdminItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const loadingTimeoutRef = useRef<number | null>(null);

  const intervaloPeriodo = useMemo(() => obterIntervaloPeriodo(periodo), [periodo]);

  const filters = useMemo(() => ({
    ...intervaloPeriodo,
    status: selectedStatus || undefined,
    page,
    size: PAGE_SIZE,
  }), [intervaloPeriodo, page, selectedStatus]);

  const summaryFilters = useMemo(() => ({
    ...intervaloPeriodo,
    page: 0,
    size: 1,
  }), [intervaloPeriodo]);

  const { data, isLoading, isFetching, isError, error } = useBookings(filters);
  const totalPeriodoQuery = useBookings(summaryFilters);
  const confirmadosQuery = useBookings({ ...summaryFilters, status: 'CONFIRMED' });
  const pendentesQuery = useBookings({ ...summaryFilters, status: 'PENDING_PAYMENT' });
  const updateStatusMutation = useUpdateBookingStatus();

  const bookings = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;
  const totalElements = data?.totalElements ?? 0;
  const paginaAtual = data?.number ?? page;
  const inicioPagina = totalElements === 0 ? 0 : paginaAtual * PAGE_SIZE + 1;
  const fimPagina = Math.min((paginaAtual + 1) * PAGE_SIZE, totalElements);
  const loadingTabela = isLoading || isFetching || carregando;
  const filtrosDesabilitados = loadingTabela || updateStatusMutation.isPending;
  const estadoVazio = obterEstadoVazio(periodo, selectedStatus);
  const descricaoFiltroAtual = useMemo(
    () => obterDescricaoFiltroAtual(periodo, selectedStatus),
    [periodo, selectedStatus]
  );

  useEffect(() => {
    setCarregando(true);

    if (loadingTimeoutRef.current) {
      window.clearTimeout(loadingTimeoutRef.current);
    }

    loadingTimeoutRef.current = window.setTimeout(() => {
      setCarregando(false);
      loadingTimeoutRef.current = null;
    }, LOADING_MINIMO_MS);

    return () => {
      if (loadingTimeoutRef.current) {
        window.clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [page, periodo, selectedStatus]);

  useEffect(() => {
    const fechar = () => {
      setDropdownAberto(null);
    };
    document.addEventListener('click', fechar);
    window.addEventListener('resize', fechar);
    window.addEventListener('scroll', fechar, true);

    return () => {
      document.removeEventListener('click', fechar);
      window.removeEventListener('resize', fechar);
      window.removeEventListener('scroll', fechar, true);
    };
  }, []);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setToast(null);
    }, 4500);

    return () => window.clearTimeout(timeout);
  }, [toast]);

  const handlePeriodoChange = (novoPeriodo: PeriodoFiltro) => {
    setPeriodo(novoPeriodo);
    setPage(0);
    setDropdownAberto(null);
  };

  const handleStatusChange = (status: BookingStatus | '') => {
    setSelectedStatus(status);
    setPage(0);
    setDropdownAberto(null);
  };

  const handleToggleDropdown = (bookingId: string, trigger: HTMLElement) => {
    const posicao = calcularPosicaoMenuAcoes(trigger);

    setDropdownAberto((atual) =>
      atual?.bookingId === bookingId ? null : { bookingId, ...posicao }
    );
  };

  const handleSolicitarCancelamento = (booking: BookingAdminItem) => {
    updateStatusMutation.reset();
    setBookingCancelamento(booking);
    setBookingDetalhes(null);
    setBookingRemarcacao(null);
    setDropdownAberto(null);
  };

  const handleCancel = () => {
    if (!bookingCancelamento) {
      return;
    }

    updateStatusMutation.mutate(
      {
        id: bookingCancelamento.id,
        newStatus: 'CANCELLED',
        adminNotes: 'Cancelado pelo administrador.',
      },
      {
        onSuccess: () => {
          setBookingCancelamento(null);
          setToast('Marcação cancelada.');
        },
      }
    );
  };

  const handleMarkCompleted = (id: string) => {
    updateStatusMutation.mutate({ id, newStatus: 'COMPLETED' });
    setDropdownAberto(null);
  };

  const handleVerDetalhes = (booking: BookingAdminItem) => {
    setBookingDetalhes(booking);
    setBookingCancelamento(null);
    setBookingRemarcacao(null);
    setDropdownAberto(null);
  };

  const abrirDrawerRemarcacao = (booking: BookingAdminItem) => {
    setBookingRemarcacao(booking);
    setBookingDetalhes(null);
    setBookingCancelamento(null);
    setDropdownAberto(null);
  };

  const fecharDrawerRemarcacao = () => {
    setBookingRemarcacao(null);
  };

  const handleRemarcacaoConcluida = (dataHoraExtensa: string) => {
    setBookingRemarcacao(null);
    setToast(`✓ Marcação remarcada para ${dataHoraExtensa}.`);
  };

  const canMarkCompleted = bookingPodeConfirmarAtendimento;

  const resumoPeriodo = [
    {
      chave: 'todos',
      icone: '📅',
      valor: totalPeriodoQuery.data?.totalElements ?? 0,
      rotulo: obterRotuloTotal(periodo),
      ativo: selectedStatus === '',
      onClick: () => handleStatusChange(''),
    },
    {
      chave: 'confirmados',
      icone: '✅',
      valor: confirmadosQuery.data?.totalElements ?? 0,
      rotulo: 'Confirmados',
      ativo: selectedStatus === 'CONFIRMED',
      onClick: () => handleStatusChange('CONFIRMED'),
    },
    {
      chave: 'pendentes',
      icone: '⏳',
      valor: pendentesQuery.data?.totalElements ?? 0,
      rotulo: 'Pendentes',
      ativo: selectedStatus === 'PENDING_PAYMENT',
      onClick: () => handleStatusChange('PENDING_PAYMENT'),
    },
  ];

  const bookingActionHandlers: BookingActionHandlers = {
    dropdownAberto,
    updateStatusPending: updateStatusMutation.isPending,
    onToggleDropdown: handleToggleDropdown,
    onVerDetalhes: handleVerDetalhes,
    onConfirmarAtendimento: handleMarkCompleted,
    onRemarcar: abrirDrawerRemarcacao,
    onSolicitarCancelamento: handleSolicitarCancelamento,
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.titulo}>Gestão de Marcações</h1>
          <p className={styles.descricao}>Acompanhe clientes agendados e atualize o estado do atendimento sem saturar o painel.</p>
        </div>
      </div>

      <div className={`${styles.filtersContainer} ${filtrosDesabilitados ? styles.filtersDisabled : ''}`}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>PERÍODO</span>
          <div className={styles.periodTabs} aria-label="Filtrar por período">
            {opcoesPeriodo.map((opcao) => (
              <button
                key={opcao.value}
                type="button"
                className={`${styles.periodPill} ${periodo === opcao.value ? styles.periodPillActive : ''}`}
                onClick={() => handlePeriodoChange(opcao.value)}
                aria-pressed={periodo === opcao.value}
                disabled={filtrosDesabilitados}
              >
                {isMobile ? labelsPeriodoMobile[opcao.value] : opcao.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      <p className={styles.filterFeedback}>{descricaoFiltroAtual}</p>

      <div className={styles.summaryCards} aria-label="Resumo das marcações no período">
        {resumoPeriodo.map((item) => (
          <button
            key={item.chave}
            type="button"
            className={`${styles.summaryCard} ${item.ativo ? styles.summaryCardActive : ''}`}
            onClick={item.onClick}
            disabled={filtrosDesabilitados}
          >
            <span className={styles.summaryMetric}>
              <span className={styles.summaryIcon} aria-hidden="true">{item.icone}</span>
              <strong>{item.valor}</strong>
            </span>
            <span className={styles.summaryLabel}>{item.rotulo}</span>
          </button>
        ))}
      </div>

      {isError ? (
        <p className={styles.feedbackError}>{extractBookingsError(error)}</p>
      ) : null}

      {updateStatusMutation.isError ? (
        <p className={styles.feedbackError}>{extractBookingsError(updateStatusMutation.error)}</p>
      ) : null}

      {isMobile ? (
        loadingTabela ? (
          <MobileLoadingCards />
        ) : isError ? (
          <div className={styles.tableContainer}>
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Erro ao carregar as marcações.</p>
              <p className={styles.emptySubtitle}>Tente atualizar a página em instantes.</p>
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <div className={styles.tableContainer}>
            <EmptyBookingsState titulo={estadoVazio.titulo} subtitulo={estadoVazio.subtitulo} />
          </div>
        ) : (
          <BookingMobileCards bookings={bookings} {...bookingActionHandlers} />
        )
      ) : null}

      {!isMobile && !loadingTabela && !isError && bookings.length > 0 ? (
        <div className={styles.tableContainer}>
          <BookingsTable
            bookings={bookings}
            isTablet={isTablet}
            {...bookingActionHandlers}
          />
        </div>
      ) : null}

      {!isMobile && (loadingTabela || isError || bookings.length === 0) ? (
      <div className={styles.tableContainer}>
        {loadingTabela ? (
          <table className={styles.table} aria-busy="true" aria-label="Carregando marcações">
            <thead>
              <tr>
                <th className={styles.th}>Data/Hora</th>
                <th className={styles.th}>Cliente</th>
                {!isTablet ? <th className={styles.th}>Serviço</th> : null}
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 3 }).map((_, indice) => (
                <tr key={indice} className={styles.tr}>
                  <td className={styles.td}><span className={styles.skeletonData} /></td>
                  <td className={styles.td}><span className={styles.skeletonCliente} /></td>
                  {!isTablet ? <td className={styles.td}><span className={styles.skeletonServico} /></td> : null}
                  <td className={styles.td}><span className={styles.skeletonStatus} /></td>
                  <td className={styles.td} />
                </tr>
              ))}
            </tbody>
          </table>
        ) : isError ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>Erro ao carregar as marcações.</p>
            <p className={styles.emptySubtitle}>Tente atualizar a página em instantes.</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className={styles.emptyState}>
            <svg className={styles.emptyIcon} viewBox="0 0 40 40" role="img" aria-label="Calendário sem marcações">
              <rect x="7" y="9" width="26" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M13 6v6M27 6v6M7 16h26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M14 22h4M22 22h4M14 28h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className={styles.emptyTitle}>{estadoVazio.titulo}</p>
            <p className={styles.emptySubtitle}>{estadoVazio.subtitulo}</p>
          </div>
        ) : (
          <Tooltip.Provider delayDuration={200}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Data/Hora</th>
                  <th className={styles.th}>Cliente</th>
                  {!isTablet ? <th className={styles.th}>Serviço</th> : null}
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const statusVisual = normalizarStatusVisual(booking.status);
                  const estaHoje = isSameDay(new Date(booking.startAt), new Date());
                  const estaRealizado = statusVisual === 'COMPLETED';
                  const estaCancelado = statusVisual === 'CANCELLED';
                  const estaReembolsado = statusVisual === 'REFUNDED';
                  const podeCancelar = !estaCancelado && !estaRealizado && !estaReembolsado;
                  const podeRemarcar = statusVisual === 'CONFIRMED' || statusVisual === 'PENDING_PAYMENT';
                  const podeConfirmarAtendimento = canMarkCompleted(booking);

                  return (
                  <tr key={booking.id} className={styles.tr}>
                    <td className={styles.td}>
                      <div className={styles.primaryCell}>
                        {formatarDataHora(booking.startAt)}
                        {estaHoje ? <Badge className={styles.todayBadge}>Hoje</Badge> : null}
                      </div>
                      <span className={styles.secondaryCell}>
                        {booking.modality === 'ONLINE' ? 'Online' : 'Presencial'} · {formatMoney(booking.priceCents)}
                      </span>
                    </td>

                    <td className={styles.td}>
                      <div className={styles.primaryCell}>{booking.customer.fullName}</div>
                      {isTablet ? (
                        <span className={styles.secondaryCell}>
                          {booking.serviceName} · termina {formatarHora(booking.endAt)}
                        </span>
                      ) : null}
                      <span className={styles.secondaryCell}>
                        {obterContatoCliente(booking)}
                      </span>
                    </td>

                    {!isTablet ? (
                      <td className={styles.td}>
                        <div className={styles.primaryCell}>{booking.serviceName}</div>
                        <span className={styles.secondaryCell}>
                          Termina {formatarHora(booking.endAt)}
                        </span>
                      </td>
                    ) : null}

                    <td className={styles.td}>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <Badge className={styles.statusBadge[statusVisual]}>
                            {getStatusLabel(statusVisual)}
                          </Badge>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content className={styles.tooltipContent} sideOffset={5}>
                            {getStatusDescription(statusVisual)}
                            {booking.adminNotes ? <div className={styles.tooltipNotes}><strong>Notas:</strong> {booking.adminNotes}</div> : null}
                            <Tooltip.Arrow className={styles.tooltipArrow} />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </td>

                    <td className={styles.td}>
                      <div className={styles.actionsCell}>
                        <div className={styles.actionsMenuWrap}>
                          <button
                            type="button"
                            className={styles.menuButton}
                            aria-label="Abrir ações da marcação"
                            aria-haspopup="menu"
                            aria-expanded={dropdownAberto?.bookingId === booking.id}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleToggleDropdown(booking.id, event.currentTarget);
                            }}
                          >
                            ⋯
                          </button>

                          {dropdownAberto?.bookingId === booking.id && typeof document !== 'undefined' ? createPortal(
                            <div
                              className={styles.actionsDropdown}
                              style={{ top: dropdownAberto.top, left: dropdownAberto.left }}
                              role="menu"
                              onClick={(event) => event.stopPropagation()}
                            >
                              <button type="button" className={styles.dropdownItem} onClick={() => handleVerDetalhes(booking)}>
                                <span aria-hidden="true">👁</span>
                                Ver detalhes
                              </button>
                              <button
                                type="button"
                                className={styles.dropdownItem}
                                onClick={() => handleMarkCompleted(booking.id)}
                                disabled={!podeConfirmarAtendimento || updateStatusMutation.isPending}
                              >
                                <span aria-hidden="true">✅</span>
                                Confirmar atendimento
                              </button>
                              <button
                                type="button"
                                className={styles.dropdownItem}
                                onClick={() => abrirDrawerRemarcacao(booking)}
                                disabled={!podeRemarcar || updateStatusMutation.isPending}
                              >
                                <span aria-hidden="true">🔁</span>
                                Remarcar
                              </button>
                              <button
                                type="button"
                                className={styles.dropdownItem}
                                onClick={() => handleSolicitarCancelamento(booking)}
                                disabled={!podeCancelar || updateStatusMutation.isPending}
                              >
                                <span aria-hidden="true">✕</span>
                                Cancelar marcação
                              </button>
                            </div>
                          , document.body) : null}
                        </div>
                      </div>
                    </td>
                  </tr>
                  );
                })}
            </tbody>
          </table>
        </Tooltip.Provider>
        )}
      </div>
      ) : null}

      {totalPages > 1 && data ? (
        <div className={styles.paginationBar}>
          <span className={styles.paginationSummary}>
            Mostrando {inicioPagina}–{fimPagina} de {totalElements} marcações
          </span>

          <div className={styles.paginationActions}>
            <button
              type="button"
              className={combinarClasses(styles.paginationButton, isMobile && styles.mobilePaginationButton)}
              onClick={() => setPage((current) => Math.max(current - 1, 0))}
              disabled={filtrosDesabilitados || data.first}
              aria-label="Página anterior"
            >
              {isMobile ? <ChevronLeft size={18} aria-hidden="true" /> : '← Anterior'}
            </button>
            <span className={styles.paginationCurrent}>
              Página {paginaAtual + 1} de {totalPages}
            </span>
            <button
              type="button"
              className={combinarClasses(styles.paginationButton, isMobile && styles.mobilePaginationButton)}
              onClick={() => setPage((current) => current + 1)}
              disabled={filtrosDesabilitados || data.last}
              aria-label="Próxima página"
            >
              {isMobile ? <ChevronRight size={18} aria-hidden="true" /> : 'Próxima →'}
            </button>
          </div>
        </div>
      ) : null}

      <RescheduleDrawer
        aberto={Boolean(bookingRemarcacao)}
        booking={bookingRemarcacao}
        onClose={fecharDrawerRemarcacao}
        onSuccess={handleRemarcacaoConcluida}
      />

      <BookingDetailsDrawer
        aberto={Boolean(bookingDetalhes)}
        booking={bookingDetalhes}
        onClose={() => setBookingDetalhes(null)}
      />

      <CancelBookingDrawer
        aberto={Boolean(bookingCancelamento)}
        booking={bookingCancelamento}
        isMobile={isMobile}
        isPending={updateStatusMutation.isPending}
        onClose={() => setBookingCancelamento(null)}
        onConfirm={handleCancel}
      />

      {toast ? (
        <div className={styles.toast} role="status" aria-live="polite">
          {toast}
        </div>
      ) : null}
    </div>
  );
};
