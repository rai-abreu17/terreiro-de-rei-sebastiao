export type BookingStatus =
  | 'PENDING_PAYMENT'
  | 'CONFIRMED'
  | 'EXPIRED'
  | 'CANCELLED'
  | 'REFUNDED'
  | 'COMPLETED'
  | 'NO_SHOW';

export type BookingModality = 'ONLINE' | 'IN_PERSON';

export interface BookingPayload {
  serviceId: string;
  startAt: string;
  modality: BookingModality;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
}

export interface BookingServiceSummary {
  id: string;
  name: string;
  durationMin: number;
}

export interface BookingAmount {
  cents: number;
  formatted: string;
  currency: string;
}

export interface BookingCheckout {
  provider: string;
  preferenceId: string;
  initPointUrl: string;
}

export interface BookingResponse {
  bookingId: string;
  status: BookingStatus;
  holdExpiresAt: string | null;
  service?: BookingServiceSummary;
  serviceId?: string;
  startAt?: string;
  endAt?: string;
  modality?: BookingModality;
  amount?: BookingAmount;
  checkout: BookingCheckout | null;
  viewToken?: string;
}