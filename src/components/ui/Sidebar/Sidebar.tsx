import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import * as estilos from './Sidebar.css';
import type { SidebarProps } from './Sidebar.types';

export function Sidebar({
  itens,
  nomeAdministrador,
  aoSair,
  aoSelecionarItem,
  variante = 'fixa',
}: SidebarProps): React.ReactElement {
  return (
    <aside className={estilos.container[variante]} aria-label="Menu administrativo principal">
      <div className={estilos.logoArea}>
        <span className={estilos.logoChancela}>Terreiro de Rei Sebastião</span>
        <strong className={estilos.logoTexto}>Painel administrativo</strong>
      </div>

      <nav aria-label="Navegação da barra lateral" className={estilos.navLista}>
        {itens.map((item) => (
          <NavLink
            key={item.caminho}
            to={item.caminho}
            end={item.caminho === '/admin'}
            onClick={aoSelecionarItem}
            className={({ isActive }) =>
              isActive ? `${estilos.navItem} ${estilos.navItemAtivo}` : estilos.navItem
            }
          >
            {() => (
              <>
                <span aria-hidden="true">{item.icone}</span>
                <span>{item.rotulo}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className={estilos.footer}>
        <span className={estilos.adminNome}>Sessão ativa: {nomeAdministrador}</span>
        <button
          type="button"
          onClick={aoSair}
          className={estilos.logoutButton}
          aria-label="Sair da conta"
        >
          <LogOut size={16} aria-hidden="true" />
          Sair
        </button>
      </div>
    </aside>
  );
}
