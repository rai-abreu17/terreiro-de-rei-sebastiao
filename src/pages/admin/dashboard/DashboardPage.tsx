import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  endOfDay,
  endOfMonth,
  formatISO,
  isAfter,
  startOfDay,
  startOfMonth,
} from 'date-fns';
import {
  ArrowRight,
  CalendarCog,
  CalendarDays,
  CheckCircle2,
  Clock,
  ListChecks,
  NotebookTabs,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '@/auth/useAuth';
import {
  extractBookingsError,
  useBookings,
  type BookingAdminItem,
  type BookingStatus,
} from '@/hooks/useBookings';
import { CANONICAL_TIMEZONE, formatMoney } from '@/utils/formatters';
import * as styles from './DashboardPage.css';

const MAX_PROXIMAS = 5;

const dataExtensaFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: CANONICAL_TIMEZONE,
});

const horaFormatter = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: CANONICAL_TIMEZONE,
});

const statusLabels: Record<BookingStatus, string> = {
  PENDING_PAYMENT: 'Pendente',
  CONFIRMED: 'Confirmado',
  CANCELLED: 'Cancelado',
  EXPIRED: 'Expirado',
  COMPLETED: 'Realizado',
  NO_SHOW: 'Falta',
  REFUNDED: 'Reembolsado',
};

const formatarHora = (iso: string) => horaFormatter.format(new Date(iso));

const obterIntervaloHoje = () => {
  const agora = new Date();
  return {
    from: formatISO(startOfDay(agora)),
    to: formatISO(endOfDay(agora)),
  };
};

const obterIntervaloMes = () => {
  const agora = new Date();
  return {
    from: formatISO(startOfMonth(agora)),
    to: formatISO(endOfMonth(agora)),
  };
};

const obterStatusVisual = (status: BookingStatus | null): BookingStatus =>
  status ?? 'PENDING_PAYMENT';

interface KpiCardProps {
  readonly icone: React.ReactNode;
  readonly rotulo: string;
  readonly valor: number | undefined;
  readonly carregando: boolean;
  readonly ajuda?: string;
  readonly tom: 'primary' | 'success' | 'warning' | 'accent';
  readonly to?: string;
}

const KpiCard = ({ icone, rotulo, valor, carregando, ajuda, tom, to }: KpiCardProps) => {
  const conteudo = (
    <>
      <div className={styles.kpiTopRow}>
        <span className={styles.kpiLabel}>{rotulo}</span>
        <span className={styles.kpiIcon[tom]} aria-hidden="true">{icone}</span>
      </div>
      {carregando || valor === undefined ? (
        <span className={styles.kpiValuePlaceholder} aria-hidden="true" />
      ) : (
        <span className={styles.kpiValue}>{valor}</span>
      )}
      {ajuda ? <p className={styles.kpiHelp}>{ajuda}</p> : null}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={styles.kpiCardClickable}
        aria-label={`${rotulo}${valor !== undefined ? `: ${valor}` : ''}`}
      >
        {conteudo}
      </Link>
    );
  }

  return <article className={styles.kpiCard}>{conteudo}</article>;
};

interface UpcomingItemProps {
  readonly booking: BookingAdminItem;
}

const UpcomingItem = ({ booking }: UpcomingItemProps) => {
  const statusVisual = obterStatusVisual(booking.status);
  const modalidadeLabel = booking.modality === 'ONLINE' ? 'Online' : 'Presencial';

  return (
    <li className={styles.upcomingItem}>
      <span className={styles.upcomingTime}>{formatarHora(booking.startAt)}</span>
      <div className={styles.upcomingInfo}>
        <span className={styles.upcomingClient}>{booking.customer.fullName}</span>
        <span className={styles.upcomingMeta}>
          {booking.serviceName} · {modalidadeLabel} · {formatMoney(booking.priceCents)}
        </span>
      </div>
      <span className={styles.statusBadge[statusVisual]}>
        {statusLabels[statusVisual]}
      </span>
    </li>
  );
};

interface AtalhoConfig {
  readonly to: string;
  readonly icone: React.ReactNode;
  readonly titulo: string;
  readonly descricao: string;
}

const ATALHOS: ReadonlyArray<AtalhoConfig> = [
  {
    to: '/admin/bookings',
    icone: <NotebookTabs size={18} aria-hidden="true" />,
    titulo: 'Marcações',
    descricao: 'Veja, confirme, remarque ou cancele atendimentos.',
  },
  {
    to: '/admin/availability/rules',
    icone: <CalendarCog size={18} aria-hidden="true" />,
    titulo: 'Agenda de Horários',
    descricao: 'Defina janelas, intervalos e exceções de atendimento.',
  },
  {
    to: '/admin/catalog/services',
    icone: <ListChecks size={18} aria-hidden="true" />,
    titulo: 'Catálogo',
    descricao: 'Gerencie serviços, preços e modalidades publicadas.',
  },
];

export function DashboardPage() {
  const { user } = useAuth();
  const nomeAdmin = user?.displayName?.trim() || user?.email || 'Administradora';

  const intervaloHoje = useMemo(() => obterIntervaloHoje(), []);
  const intervaloMes = useMemo(() => obterIntervaloMes(), []);
  const dataExtensa = useMemo(() => dataExtensaFormatter.format(new Date()), []);

  const totalHojeQuery = useBookings({ ...intervaloHoje, page: 0, size: 1 });
  const confirmadosHojeQuery = useBookings({
    ...intervaloHoje,
    status: 'CONFIRMED',
    page: 0,
    size: 1,
  });
  const pendentesHojeQuery = useBookings({
    ...intervaloHoje,
    status: 'PENDING_PAYMENT',
    page: 0,
    size: 1,
  });
  const totalMesQuery = useBookings({ ...intervaloMes, page: 0, size: 1 });

  const proximasQuery = useBookings({
    ...intervaloHoje,
    page: 0,
    size: 20,
  });

  const proximas = useMemo(() => {
    const lista = proximasQuery.data?.content ?? [];
    const agora = new Date();
    return lista
      .filter((booking) => {
        const statusVisual = obterStatusVisual(booking.status);
        if (statusVisual === 'CANCELLED' || statusVisual === 'EXPIRED') {
          return false;
        }
        return isAfter(new Date(booking.endAt), agora);
      })
      .slice(0, MAX_PROXIMAS);
  }, [proximasQuery.data]);

  const proximasErro = proximasQuery.isError ? extractBookingsError(proximasQuery.error) : null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.greeting}>Olá, {nomeAdmin}</h1>
        <p className={styles.subtitle}>Visão geral · {dataExtensa}</p>
      </header>

      <section className={styles.kpiGrid} aria-label="Resumo do dia">
        <KpiCard
          icone={<CalendarDays size={18} aria-hidden="true" />}
          rotulo="Marcações hoje"
          valor={totalHojeQuery.data?.totalElements}
          carregando={totalHojeQuery.isLoading}
          ajuda="Todas as marcações agendadas para hoje"
          tom="primary"
          to="/admin/bookings"
        />
        <KpiCard
          icone={<CheckCircle2 size={18} aria-hidden="true" />}
          rotulo="Confirmadas hoje"
          valor={confirmadosHojeQuery.data?.totalElements}
          carregando={confirmadosHojeQuery.isLoading}
          ajuda="Pagamento aprovado, atendimento garantido"
          tom="success"
        />
        <KpiCard
          icone={<Clock size={18} aria-hidden="true" />}
          rotulo="Pendentes hoje"
          valor={pendentesHojeQuery.data?.totalElements}
          carregando={pendentesHojeQuery.isLoading}
          ajuda="Aguardando pagamento do consulente"
          tom="warning"
        />
        <KpiCard
          icone={<TrendingUp size={18} aria-hidden="true" />}
          rotulo="Total no mês"
          valor={totalMesQuery.data?.totalElements}
          carregando={totalMesQuery.isLoading}
          ajuda="Volume acumulado de marcações neste mês"
          tom="accent"
        />
      </section>

      <section className={styles.section} aria-label="Próximas marcações de hoje">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Próximas marcações de hoje</h2>
          <Link to="/admin/bookings" className={styles.sectionLink}>
            Ver todas <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.card}>
          {proximasErro ? (
            <div className={styles.errorBox} role="alert">
              {proximasErro}
            </div>
          ) : proximasQuery.isLoading ? (
            <div className={styles.emptyState}>
              <p className={styles.emptySubtitle}>Carregando marcações...</p>
            </div>
          ) : proximas.length === 0 ? (
            <div className={styles.emptyState}>
              <svg
                className={styles.emptyIcon}
                viewBox="0 0 40 40"
                role="img"
                aria-label="Calendário sem marcações"
              >
                <rect x="7" y="9" width="26" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M13 6v6M27 6v6M7 16h26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className={styles.emptyTitle}>Nada mais para hoje</p>
              <p className={styles.emptySubtitle}>
                Quando alguém agendar para hoje, as próximas marcações aparecem aqui.
              </p>
            </div>
          ) : (
            <ul className={styles.upcomingList}>
              {proximas.map((booking) => (
                <UpcomingItem key={booking.id} booking={booking} />
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className={styles.section} aria-label="Atalhos rápidos">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Atalhos rápidos</h2>
        </div>

        <div className={styles.shortcutsGrid}>
          {ATALHOS.map((atalho) => (
            <Link key={atalho.to} to={atalho.to} className={styles.shortcutCard}>
              <span className={styles.shortcutIcon} aria-hidden="true">{atalho.icone}</span>
              <h3 className={styles.shortcutTitle}>{atalho.titulo}</h3>
              <p className={styles.shortcutDescription}>{atalho.descricao}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
