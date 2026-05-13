import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { PublicNavbar } from '@components/ui/PublicNavbar/PublicNavbar';
import type { LinkNavegacao } from '@components/ui/PublicNavbar/PublicNavbar.types';
import { PublicFooter } from '@components/ui/PublicFooter/PublicFooter';
import { FloatingWhatsApp } from '@components/ui/FloatingWhatsApp/FloatingWhatsApp';
import * as styles from './PublicLayout.css';

interface PublicLayoutProps {
  children: ReactNode;
}

const LINKS_NAVEGACAO_HOME: LinkNavegacao[] = [
  { rotulo: 'Início', href: '/#inicio' },
  { rotulo: 'Sobre', href: '/#sobre' },
  { rotulo: 'Serviços', href: '/#servicos' },
  { rotulo: 'FAQ', href: '/#faq' },
  { rotulo: 'Contato', href: '/#contato' },
];

function resolverLinksNavegacao(pathname: string): LinkNavegacao[] {
  const correspondenciaServico = matchPath('/servicos/:categorySlug/:serviceSlug', pathname);

  if (correspondenciaServico?.params.categorySlug) {
    const caminhoCategoria = `/servicos/${correspondenciaServico.params.categorySlug}`;

    return [
      { rotulo: 'Início', href: '/#inicio' },
      { rotulo: 'Sobre', href: `${pathname}#sobre` },
      { rotulo: 'Serviços', href: `${caminhoCategoria}#servicos` },
      { rotulo: 'FAQ', href: `${pathname}#faq` },
      { rotulo: 'Contato', href: '/#contato' },
    ];
  }

  const correspondenciaCategoria = matchPath('/servicos/:categorySlug', pathname);

  if (correspondenciaCategoria) {
    return [
      { rotulo: 'Início', href: '/#inicio' },
      { rotulo: 'Sobre', href: `${pathname}#sobre` },
      { rotulo: 'Serviços', href: `${pathname}#servicos` },
      { rotulo: 'FAQ', href: `${pathname}#faq` },
      { rotulo: 'Contato', href: '/#contato' },
    ];
  }

  return LINKS_NAVEGACAO_HOME;
}

function rolarParaAncora(hash: string) {
  const ancora = decodeURIComponent(hash.replace(/^#/, ''));

  requestAnimationFrame(() => {
    const elemento = document.getElementById(ancora);

    if (elemento) {
      elemento.scrollIntoView({ block: 'start', behavior: 'auto' });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  });
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const location = useLocation();
  const linksNavegacao = resolverLinksNavegacao(location.pathname);

  useEffect(() => {
    if (location.hash) {
      rolarParaAncora(location.hash);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.hash, location.pathname]);

  return (
    <div className={styles.layoutWrapper}>
      <PublicNavbar linksNavegacao={linksNavegacao} />
      <main className={styles.conteudoPrincipal}>{children}</main>
      <PublicFooter linksNavegacao={linksNavegacao} />
      <FloatingWhatsApp />
    </div>
  );
}
