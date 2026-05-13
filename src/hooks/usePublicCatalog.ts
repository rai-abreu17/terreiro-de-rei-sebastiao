import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import {
  listarCategoriasPublicas,
  listarServicosPublicos,
  publicQueryKeys,
} from '@/api/public';
import type {
  ProblemDetails,
  RespostaCategoria,
  RespostaServico,
} from '@/api/catalog.types';
import type {
  CatalogoPublico,
  GrupoServicosPublicos,
} from '@/api/public.types';

function organizarGruposPorCategoria(
  categorias: RespostaCategoria[],
  servicos: RespostaServico[]
): GrupoServicosPublicos[] {
  const grupos = new Map<string, GrupoServicosPublicos>();

  categorias.forEach((categoria) => {
    grupos.set(categoria.id, {
      categoria: {
        id: categoria.id,
        slug: categoria.slug,
        name: categoria.name,
        description: categoria.description,
        displayOrder: categoria.displayOrder,
      },
      servicos: [],
    });
  });

  servicos.forEach((servico) => {
    const grupoExistente = grupos.get(servico.category.id);

    if (grupoExistente) {
      grupoExistente.servicos.push(servico);
      return;
    }

    grupos.set(servico.category.id, {
      categoria: {
        id: servico.category.id,
        slug: servico.category.slug,
        name: servico.category.name,
        description: null,
        displayOrder: Number.MAX_SAFE_INTEGER,
      },
      servicos: [servico],
    });
  });

  return [...grupos.values()]
    .filter((grupo) => grupo.servicos.length > 0)
    .sort((grupoA, grupoB) => {
      if (grupoA.categoria.displayOrder !== grupoB.categoria.displayOrder) {
        return grupoA.categoria.displayOrder - grupoB.categoria.displayOrder;
      }

      return grupoA.categoria.name.localeCompare(grupoB.categoria.name, 'pt-BR');
    })
    .map((grupo) => ({
      ...grupo,
      servicos: [...grupo.servicos].sort(
        (servicoA, servicoB) => servicoA.displayOrder - servicoB.displayOrder
      ),
    }));
}

export function usePublicCatalog() {
  return useQuery<CatalogoPublico, AxiosError<ProblemDetails>>({
    queryKey: publicQueryKeys.catalogo,
    queryFn: async () => {
      const [categorias, paginaServicos] = await Promise.all([
        listarCategoriasPublicas(),
        listarServicosPublicos(),
      ]);

      const servicos = paginaServicos.content;

      return {
        categorias,
        servicos,
        gruposPorCategoria: organizarGruposPorCategoria(categorias, servicos),
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}