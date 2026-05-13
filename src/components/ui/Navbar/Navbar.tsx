import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import * as estilos from './Navbar.css';
import type { NavbarProps } from './Navbar.types';

export function Navbar({
  nomeAdministrador,
  titulo = 'Painel administrativo',
  aoAbrirMenu,
  aoSair,
}: NavbarProps): React.ReactElement {
  return (
    <header className={estilos.container} aria-label="Cabeçalho administrativo">
      <div className={estilos.brandGroup}>
        <button
          type="button"
          className={estilos.menuButton}
          onClick={aoAbrirMenu}
          aria-label="Abrir menu de navegação"
        >
          <Menu size={20} aria-hidden="true" />
        </button>

        <div className={estilos.titleBlock}>
          <span className={estilos.eyebrow}>Terreiro de Rei Sebastião</span>
          <span className={estilos.logoTexto}>{titulo}</span>
        </div>
      </div>

      <div className={estilos.actionsGroup}>
        <span className={estilos.adminInfo}>Sessão ativa: {nomeAdministrador}</span>

        <button
          type="button"
          className={estilos.logoutButton}
          onClick={aoSair}
          aria-label="Sair da conta"
        >
          <LogOut size={18} aria-hidden="true" />
          <span className={estilos.logoutLabel}>Sair</span>
        </button>
      </div>
    </header>
  );
}
