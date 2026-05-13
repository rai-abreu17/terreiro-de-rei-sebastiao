import React from 'react';
import type { SlotPickerProps } from './SlotPicker.types';
import { 
  containerGrelha, 
  estilosBotaoSlot, 
  textoModalidade, 
  mensagemVazio 
} from './SlotPicker.css';

/**
 * Formata um horário em formato HH:mm a partir de uma data ISO.
 */
function formatarHorario(dataISO: string): string {
  try {
    const data = new Date(dataISO);
    return data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Fortaleza',
    });
  } catch {
    return dataISO; // fallback se for inválido
  }
}

/**
 * Traduz a modalidade para o rótulo do usuário
 */
function traduzirModalidade(modality: string): string {
  switch (modality) {
    case 'ONLINE': return 'Online';
    case 'IN_PERSON': return 'Presencial';
    default: return '';
  }
}

function resumirModalidades(modalities: readonly string[]): string {
  if (modalities.length === 0) {
    return 'Modalidade a definir';
  }

  return modalities.map(traduzirModalidade).filter(Boolean).join(' · ');
}

export function SlotPicker({
  slots,
  slotSelecionado,
  aoSelecionarSlot,
  carregando = false,
}: SlotPickerProps): React.ReactElement {
  if (carregando) {
    return (
      <div className={mensagemVazio} aria-busy="true">
        Buscando horários disponíveis...
      </div>
    );
  }

  if (!slots || slots.length === 0) {
    return (
      <div className={mensagemVazio}>
        Nenhum horário disponível para esta data.
      </div>
    );
  }

  return (
    <div 
      className={containerGrelha} 
      role="radiogroup" 
      aria-label="Selecione um horário disponível"
    >
      {slots.map((slot) => {
        const isSelecionado = slotSelecionado?.startAt === slot.startAt;
        const variante = isSelecionado ? 'selecionado' : 'livre';

        return (
          <button
            key={slot.startAt}
            type="button"
            className={estilosBotaoSlot[variante]}
            role="radio"
            aria-checked={isSelecionado}
            onClick={() => aoSelecionarSlot(slot)}
          >
            <span>{formatarHorario(slot.startAt)}</span>
            <span className={textoModalidade}>
              {resumirModalidades(slot.modalitiesAvailable)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
