import { useMutation } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { apiClient } from '@/api/client';
import type { ProblemDetails } from '@/api/catalog.types';
import type {
  BookingCheckout,
  BookingPayload,
  BookingResponse,
} from '@/types/booking';

export type { BookingPayload, BookingResponse } from '@/types/booking';
export type CreateBookingRequest = BookingPayload;

interface BookingCheckoutWire {
  provider?: string;
  preferenceId?: string;
  initPointUrl?: string | null;
  init_point_url?: string | null;
}

interface BookingResponseWire extends Omit<BookingResponse, 'checkout'> {
  checkout?: BookingCheckoutWire | null;
  initPointUrl?: string | null;
  init_point_url?: string | null;
}

// ══════════════════════════════════════════════════
//  CHAVES DE CACHE
// ══════════════════════════════════════════════════

export const chavesBooking = {
  detalhes: (bookingId: string, viewToken?: string) =>
    ['booking', bookingId, viewToken ?? 'sem-token'] as const,
};

function normalizeCheckout(
  resposta: BookingResponseWire
): BookingCheckout | null {
  const initPointUrl =
    resposta.checkout?.initPointUrl ??
    resposta.checkout?.init_point_url ??
    resposta.initPointUrl ??
    resposta.init_point_url ??
    null;

  if (!initPointUrl) {
    return null;
  }

  return {
    provider: resposta.checkout?.provider ?? 'MERCADO_PAGO',
    preferenceId: resposta.checkout?.preferenceId ?? '',
    initPointUrl,
  };
}

function normalizeBookingResponse(
  resposta: BookingResponseWire
): BookingResponse {
  return {
    bookingId: resposta.bookingId,
    status: resposta.status,
    holdExpiresAt: resposta.holdExpiresAt ?? null,
    service: resposta.service,
    serviceId: resposta.serviceId,
    startAt: resposta.startAt,
    endAt: resposta.endAt,
    modality: resposta.modality,
    amount: resposta.amount,
    checkout: normalizeCheckout(resposta),
    viewToken: resposta.viewToken,
  };
}

export function resolveBookingCheckoutUrl(
  booking: BookingResponse | null | undefined
): string | null {
  return booking?.checkout?.initPointUrl ?? null;
}

export async function createBooking(
  requisicao: BookingPayload
): Promise<BookingResponse> {
  const idempotencyKey = crypto.randomUUID();
  const { data } = await apiClient.post<BookingResponseWire>(
    '/public/bookings',
    requisicao,
    {
    headers: {
      'Idempotency-Key': idempotencyKey,
    },
    }
  );

  return normalizeBookingResponse(data);
}

export async function getBookingStatus(
  bookingId: string,
  viewToken?: string
): Promise<BookingResponse> {
  try {
    const { data } = await apiClient.get<BookingResponseWire>(
      `/bookings/${bookingId}`,
      {
      params: viewToken ? { vt: viewToken } : undefined,
      }
    );

    return normalizeBookingResponse(data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      const { data } = await apiClient.get<BookingResponseWire>(
        `/public/bookings/${bookingId}`,
        {
          params: viewToken ? { vt: viewToken } : undefined,
        }
      );

      return normalizeBookingResponse(data);
    }

    throw error;
  }
}

// ══════════════════════════════════════════════════
//  HOOKS
// ══════════════════════════════════════════════════

/**
 * Cria um novo agendamento.
 * Espera status 201.
 */
export function useCreateBooking() {
  return useMutation<
    BookingResponse,
    AxiosError<ProblemDetails>,
    BookingPayload
  >({
    mutationFn: createBooking,
  });
}
