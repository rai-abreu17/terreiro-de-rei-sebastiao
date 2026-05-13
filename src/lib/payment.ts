import type { BookingStatus } from '@/types/booking';
import { formatMoney } from '@/utils/formatters';

const callbackStatuses = new Set<BookingStatus>([
  'PENDING_PAYMENT',
  'CONFIRMED',
  'EXPIRED',
  'CANCELLED',
  'REFUNDED',
  'COMPLETED',
  'NO_SHOW',
]);

export interface CheckoutCallbackParams {
  bookingId: string | null;
  status: BookingStatus | null;
}

export function parseCheckoutCallback(url: string): CheckoutCallbackParams {
  const parsedUrl = new URL(url, 'http://localhost');
  const bookingId = parsedUrl.searchParams.get('b');
  const rawStatus = parsedUrl.searchParams.get('r');
  const status = rawStatus && callbackStatuses.has(rawStatus as BookingStatus)
    ? (rawStatus as BookingStatus)
    : null;

  return { bookingId, status };
}

export { formatMoney };