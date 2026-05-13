import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const { user, logout } = useAuth();
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  useEffect(() => {
    setMenuMobileAberto(false);
  }, [location.pathname]);

  const nomeAdministrador = user?.displayName?.trim() || user?.email || 'Administradora';

  const aoSair = () => {
    void logout().finally(() => {
      setMenuMobileAberto(false);
      navigate('/admin/login', { replace: true });
    });
  };

  const alternarMenu = () => setMenuMobileAberto((estadoAtual) => !estadoAtual);
  const fecharMenu = () => setMenuMobileAberto(false);

  return (
    <div className={estilos.layoutContainer}>
      <Sidebar
        itens={ITENS_MENU}
        nomeAdministrador={nomeAdministrador}
        aoSair={aoSair}
        variante="fixa"
      />

      {menuMobileAberto ? (
        <>
          <button
            type="button"
            className={estilos.drawerOverlay}
            onClick={fecharMenu}
            aria-label="Fechar menu de navegação"
          />

          <div className={estilos.drawerContent}>
            <Sidebar
              itens={ITENS_MENU}
              nomeAdministrador={nomeAdministrador}
              aoSair={aoSair}
              aoSelecionarItem={fecharMenu}
              variante="gaveta"
            />
          </div>
        </>
      ) : null}

      <div className={estilos.mainContent}>
        <Navbar
          nomeAdministrador={nomeAdministrador}
          aoAbrirMenu={alternarMenu}
          aoSair={aoSair}
        />

        <main className={estilos.contentArea} aria-live="polite">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
