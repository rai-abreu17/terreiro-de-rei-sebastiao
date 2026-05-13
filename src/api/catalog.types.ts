/**
 * Contratos TypeScript para a API de Catálogo do Terreiro de Rei Sebastião.
 *
 * Tipos derivados dos endpoints §5.3.2 da SPEC.
 * Dinheiro em centavos (BIGINT), datas em ISO 8601 (UTC).
 */

// ── Enums ──────────────────────────────────────────

/** Tipo de serviço: consulta oracular ou ritual espiritual. */
export type TipoServico = 'CONSULTATION' | 'RITUAL';

/** Modalidade de atendimento. */
export type ModalidadeAtendimento = 'ONLINE' | 'IN_PERSON';

// ── Categorias ─────────────────────────────────────

/** Representação resumida de uma categoria (embutida em respostas de serviço). */
export interface CategoriaResumo {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
}

/** Resposta completa de uma categoria. */
export interface RespostaCategoria {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly description: string | null;
  readonly displayOrder: number;
  readonly isPublished: boolean;
  readonly createdAt: string;
}

/** Payload para criação/atualização de categoria. */
export interface RequisicaoCategoria {
  readonly name: string;
  readonly description?: string | null;
  readonly displayOrder?: number;
}

// ── Serviços ───────────────────────────────────────

/** Resposta completa de um serviço. */
export interface RespostaServico {
  readonly id: string;
  readonly slug: string;
  readonly type: TipoServico;
  readonly name: string;
  readonly category: CategoriaResumo;
  readonly shortDescription: string | null;
  readonly longDescription: string | null;
  readonly durationMin: number;
  readonly priceCents: number;
  readonly currency: string;
  readonly modalities: ModalidadeAtendimento[];
  readonly isPublished: boolean;
  readonly displayOrder: number;
  readonly createdAt: string;
}

/** Payload para criação de serviço. */
export interface RequisicaoCriarServico {
  readonly categoryId: string;
  readonly type: TipoServico;
  readonly slug: string;
  readonly name: string;
  readonly shortDescription?: string | null;
  readonly longDescription?: string | null;
  readonly durationMin: number;
  readonly priceCents: number;
  readonly modalities: ModalidadeAtendimento[];
}

/** Payload para atualização parcial de serviço (PATCH). */
export interface RequisicaoAtualizarServico {
  readonly categoryId?: string;
  readonly slug?: string;
  readonly name?: string;
  readonly shortDescription?: string | null;
  readonly longDescription?: string | null;
  readonly durationMin?: number;
  readonly priceCents?: number;
  readonly modalities?: ModalidadeAtendimento[];
  readonly displayOrder?: number;
}

// ── Paginação (Spring Data) ────────────────────────

/** Envelope de paginação padrão retornado pelo Spring Data. */
export interface PaginaSpring<T> {
  readonly content: T[];
  readonly totalElements: number;
  readonly totalPages: number;
  readonly size: number;
  readonly number: number;
  readonly first: boolean;
  readonly last: boolean;
  readonly empty: boolean;
}

// ── RFC 7807 Problem Details ───────────────────────

/** Erro de campo individual (array `errors[]` do Problem Details). */
export interface ErroDeCampo {
  readonly field: string;
  readonly message: string;
}

/** Resposta de erro padronizada conforme RFC 7807. */
export interface ProblemDetails {
  readonly type: string;
  readonly title: string;
  readonly status: number;
  readonly detail: string;
  readonly instance: string;
  readonly code: string;
  readonly traceId: string;
  readonly errors?: ErroDeCampo[];
}

// ── Filtros de listagem admin ──────────────────────

/** Parâmetros de filtro para listagem de serviços (admin). */
export interface FiltrosServicoAdmin {
  readonly type?: TipoServico | null;
  readonly categoryId?: string | null;
  readonly page?: number;
  readonly size?: number;
  readonly sort?: string;
}

/** Parâmetros de filtro para listagem de serviços (público). */
export interface FiltrosServicoPublico {
  readonly type?: TipoServico | null;
  readonly categorySlug?: string | null;
  readonly page?: number;
  readonly size?: number;
}
