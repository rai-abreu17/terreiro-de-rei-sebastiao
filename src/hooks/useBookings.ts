import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClient } from '@/api/client';
import type { PaginaSpring, ProblemDetails } from '@/api/catalog.types';

export type BookingStatus =
  | 'PENDING_PAYMENT'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'COMPLETED'
  | 'NO_SHOW'
  | 'REFUNDED';

export type BookingModality = 'ONLINE' | 'IN_PERSON';

export interface BookingAdminCustomer {
  readonly id: string;
  readonly fullName: string;
  readonly email: string | null;
  readonly phone: string | null;
  readonly isAnonymized: boolean;
  readonly shortId: string;
}

export interface BookingAdminItem {
  readonly id: string;
  readonly serviceId: string;
  readonly serviceName: string;
  readonly customer: BookingAdminCustomer;
  readonly modality: BookingModality;
  readonly startAt: string;
  readonly endAt: string;
  readonly status: BookingStatus | null;
  readonly priceCents: number;
  readonly currency: string;
  readonly adminNotes: string | null;
}

export interface BookingsFilters {
  readonly status?: BookingStatus;
  readonly from?: string;
  readonly to?: string;
  readonly page?: number;
  readonly size?: number;
}

export interface RescheduleBookingPayload {
  readonly id: string;
  readonly startAt: string;
  readonly adminNotes?: string;
}

export const bookingsQueryKeys = {
  all: ['admin', 'bookings'] as const,
  list: (filters: BookingsFilters) => ['admin', 'bookings', filters] as const,
} as const;

export function useBookings(filters: BookingsFilters = {}) {
  return useQuery<PaginaSpring<BookingAdminItem>, AxiosError<ProblemDetails>>({
    queryKey: bookingsQueryKeys.list(filters),
    queryFn: async () => {
      const params: Record<string, string | number> = {
        page: filters.page ?? 0,
        size: filters.size ?? 12,
      };

      if (filters.status) {
        params['status'] = filters.status;
      }

      if (filters.from) {
        params['from'] = filters.from;
      }

      if (filters.to) {
        params['to'] = filters.to;
      }

      const { data } = await apiClient.get<PaginaSpring<BookingAdminItem>>(
        '/admin/bookings',
        { params }
      );

      return data;
    },
    staleTime: 30 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<ProblemDetails>,
    { id: string; newStatus: BookingStatus; adminNotes?: string }
  >({
    mutationFn: async ({ id, newStatus, adminNotes }) => {
      await apiClient.patch(`/admin/bookings/${id}/status`, {
        new_status: newStatus,
        admin_notes: adminNotes,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingsQueryKeys.all });
    },
  });
}

export function useRescheduleBooking() {
  const queryClient = useQueryClient();

  return useMutation<
    BookingAdminItem,
    AxiosError<ProblemDetails>,
    RescheduleBookingPayload
  >({
    mutationFn: async ({ id, startAt, adminNotes }) => {
      const { data } = await apiClient.patch<BookingAdminItem>(
        `/admin/bookings/${id}/reschedule`,
        {
          start_at: startAt,
          admin_notes: adminNotes,
        }
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingsQueryKeys.all });
    },
  });
}

export function extractBookingsError(error: AxiosError<ProblemDetails>): string {
  const detail = error.response?.data?.detail;

  if (detail) {
    return detail;
  }

  if (error.response?.status === 404) {
    return 'A marcação selecionada não foi encontrada.';
  }

  if (error.response?.status === 400 || error.response?.status === 422) {
    return 'Revise os filtros ou o estado informado antes de tentar novamente.';
  }

  return 'Não foi possível atualizar o painel de marcações.';
}
