import type { SlotDisponivel } from '@/api/public.types';

export interface SlotPickerProps {
  /** A lista de slots disponíveis para o dia */
  slots: SlotDisponivel[];
  /** O slot atualmente selecionado (se houver) */
  slotSelecionado?: SlotDisponivel | null;
  /** Função de callback ao selecionar um slot */
  aoSelecionarSlot: (slot: SlotDisponivel) => void;
  /** Se deve exibir estado de carregamento */
  carregando?: boolean;
}
