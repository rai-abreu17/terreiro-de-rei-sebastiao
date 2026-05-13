import { ServiceList } from './ServiceList';

/**
 * Página administrativa de gestão do catálogo de serviços.
 *
 * Rota: `/admin/catalog/services`
 *
 * O QueryClientProvider é provido pelo root da aplicação (main.tsx).
 */
export function PaginaCatalogoAdmin() {
  return <ServiceList />;
}
