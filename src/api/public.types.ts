import type {
  ModalidadeAtendimento,
  RespostaCategoria,
  RespostaServico,
} from '@/api/catalog.types';

export interface CategoriaPublica {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
}

export interface ServicoPublico {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly durationMinutes: number;
  readonly price: number;
  readonly type: 'CONSULTATION' | 'RITUAL';
  readonly category: CategoriaPublica;
}

export interface SlotDisponivel {
  readonly startAt: string;
  readonly endAt: string;
  readonly modalitiesAvailable: ModalidadeAtendimento[];
}

export interface RespostaDisponibilidadePublica {
  readonly serviceId: string;
  readonly timezone: string;
  readonly slots: SlotDisponivel[];
}

export interface GrupoServicosPublicos {
  readonly categoria: Pick<
    RespostaCategoria,
    'id' | 'slug' | 'name' | 'description' | 'displayOrder'
  >;
  readonly servicos: RespostaServico[];
}

export interface CatalogoPublico {
  readonly categorias: RespostaCategoria[];
  readonly servicos: RespostaServico[];
  readonly gruposPorCategoria: GrupoServicosPublicos[];
}
