import { Link, useParams } from 'react-router-dom';
import { ServiceForm } from '@/features/catalog-admin/components/ServiceForm';
import { useService } from '@/hooks/useCatalog';
import * as styles from './PaginaFormularioServico.css';

export function PaginaFormularioServico() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const isEditing = Boolean(serviceId);
  const {
    data: service,
    isLoading,
    isError,
  } = useService(serviceId);

  return (
    <section className={styles.pagina}>
      <header className={styles.cabecalho}>
        <Link className={styles.navegacao} to="/admin/catalog/services">
          Voltar para a listagem
        </Link>
        <h1 className={styles.titulo}>
          {isEditing ? 'Editar Serviço' : 'Novo Serviço'}
        </h1>
        <p className={styles.descricao}>
          Guarde os dados do catálogo com o mesmo rigor aplicado pela administração da Casa.
        </p>
      </header>

      {isEditing && isLoading ? (
        <div className={styles.painelEstado}>A carregar os dados do serviço...</div>
      ) : isEditing && isError ? (
        <div className={styles.painelEstado}>
          Não foi possível carregar o serviço solicitado para edição.
        </div>
      ) : (
        <ServiceForm servicoExistente={service} />
      )}
    </section>
  );
}