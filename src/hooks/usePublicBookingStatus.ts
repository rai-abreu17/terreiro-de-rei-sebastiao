import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { chavesBooking, getBookingStatus } from '@/api/booking';
import type { ProblemDetails } from '@/api/catalog.types';
import type { BookingResponse } from '@/types/booking';

interface UsePublicBookingStatusParams {
  readonly bookingId?: string;
  readonly viewToken?: string;
}

export function usePublicBookingStatus({
  bookingId,
  viewToken,
}: UsePublicBookingStatusParams) {
  return useQuery<BookingResponse, AxiosError<ProblemDetails>>({
    queryKey: chavesBooking.detalhes(bookingId ?? '', viewToken),
    queryFn: async () => {
      if (!bookingId) {
        throw new Error('bookingId is required');
      }

      return getBookingStatus(bookingId, viewToken);
    },
    enabled: Boolean(bookingId),
    refetchInterval: (query) =>
      query.state.data?.status === 'PENDING_PAYMENT' ? 5000 : false,
  });
}