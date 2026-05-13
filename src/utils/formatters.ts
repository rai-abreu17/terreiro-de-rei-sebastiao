import { isValid, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';

export const CANONICAL_TIMEZONE = 'America/Fortaleza';

type MoneyInput = number | string | null | undefined;

const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function normalizeCents(value: MoneyInput): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === 'string') {
    const normalized = Number(value.trim());
    return Number.isFinite(normalized) ? normalized : 0;
  }

  return 0;
}

function normalizeDate(value: Date | string): Date {
  const parsedDate = typeof value === 'string' ? parseISO(value) : value;
  return isValid(parsedDate) ? parsedDate : new Date(Number.NaN);
}

export function formatMoney(cents: MoneyInput): string {
  return brlFormatter.format(normalizeCents(cents) / 100);
}

export function toCanonicalTimeZone(date: Date | string): Date {
  const normalizedDate = normalizeDate(date);

  if (!isValid(normalizedDate)) {
    return normalizedDate;
  }

  return toZonedTime(normalizedDate, CANONICAL_TIMEZONE);
}

export function formatCanonicalDate(
  date: Date | string,
  formatStr: string
): string {
  const normalizedDate = normalizeDate(date);

  if (!isValid(normalizedDate)) {
    return '';
  }

  return formatInTimeZone(normalizedDate, CANONICAL_TIMEZONE, formatStr, {
    locale: ptBR,
  });
}

export function formatDateTimeFortaleza(
  isoUtc: string,
  formatStr = "dd/MM/yyyy 'às' HH:mm"
): string {
  return formatCanonicalDate(isoUtc, formatStr);
}