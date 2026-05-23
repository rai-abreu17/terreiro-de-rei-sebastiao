import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarCog, List, NotebookTabs } from 'lucide-react';
import { Sidebar } from '@/components/ui/Sidebar/Sidebar';
import { Navbar } from '@/components/ui/Navbar/Navbar';
import { useAuth } from '@/auth/useAuth';
import * as estilos from './AdminLayout.css';
import type { ItemNavegacao } from '@/components/ui/Sidebar/Sidebar.types';

const ITENS_MENU: ItemNavegacao[] = [
  { rotulo: 'Dashboard', caminho: '/admin', icone: <LayoutDashboard size={20} aria-hidden="true" /> },
  { rotulo: 'Marcações', caminho: '/admin/bookings', icone: <NotebookTabs size={20} aria-hidden="true" /> },
  { rotulo: 'Agenda de Horários', caminho: '/admin/availability/rules', icone: <CalendarCog size={20} aria-hidden="true" /> },
  { rotulo: 'Catálogo', caminho: '/admin/catalog/services', icone: <List size={20} aria-hidden="true" /> },
];

export function AdminLayout(): React.ReactElement {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const nomeAdministrador = user?.displayName?.trim() || user?.email || 'Administradora';

  const aoSair = () => {
    void logout().finally(() => {
      navigate('/admin/login', { replace: true });
    });
  };

  return (
    <div className={estilos.layoutContainer}>
      <Sidebar
        itens={ITENS_MENU}
        nomeAdministrador={nomeAdministrador}
        aoSair={aoSair}
        variante="fixa"
      />

      <div className={estilos.mainContent}>
        <Navbar
          nomeAdministrador={nomeAdministrador}
          aoSair={aoSair}
        />

        <main className={estilos.contentArea} aria-live="polite">
          <Outlet />
        </main>
      </div>

      <nav className={estilos.bottomNav} aria-label="Navegação principal mobile">
        {ITENS_MENU.map((item) => (
          <NavLink
            key={item.caminho}
            to={item.caminho}
            end={item.caminho === '/admin'}
            className={({ isActive }) =>
              isActive
                ? `${estilos.bottomNavLink} ${estilos.bottomNavLinkAtivo}`
                : estilos.bottomNavLink
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={
                    isActive
                      ? `${estilos.bottomNavIconWrap} ${estilos.bottomNavIconWrapAtivo}`
                      : estilos.bottomNavIconWrap
                  }
                  aria-hidden="true"
                >
                  {item.icone}
                </span>
                <span>{item.rotulo === 'Agenda de Horários' ? 'Agenda' : item.rotulo}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
