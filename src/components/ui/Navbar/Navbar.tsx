import React, { useEffect, useRef, useState } from 'react';
import { LogOut, Settings } from 'lucide-react';
import * as estilos from './Navbar.css';
import type { NavbarProps } from './Navbar.types';

function obterIniciais(nome: string): string {
  const limpo = nome.trim();
  if (!limpo) return '?';
  const partes = limpo.split(/\s+/).filter(Boolean);
  if (partes.length === 1) {
    return partes[0].slice(0, 1).toUpperCase();
  }
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

export function Navbar({
  nomeAdministrador,
  titulo = 'Painel administrativo',
  aoSair,
  aoAbrirConfiguracoes,
}: NavbarProps): React.ReactElement {
  const [menuAberto, setMenuAberto] = useState(false);
  const containerMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuAberto) return;

    const aoClicarFora = (evento: MouseEvent) => {
      if (
        containerMenuRef.current &&
        !containerMenuRef.current.contains(evento.target as Node)
      ) {
        setMenuAberto(false);
      }
    };

    const aoApertarEscape = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') setMenuAberto(false);
    };

    document.addEventListener('mousedown', aoClicarFora);
    document.addEventListener('keydown', aoApertarEscape);

    return () => {
      document.removeEventListener('mousedown', aoClicarFora);
      document.removeEventListener('keydown', aoApertarEscape);
    };
  }, [menuAberto]);

  const iniciais = obterIniciais(nomeAdministrador);

  const aoSelecionarSair = () => {
    setMenuAberto(false);
    aoSair();
  };

  const aoSelecionarConfiguracoes = () => {
    setMenuAberto(false);
    aoAbrirConfiguracoes?.();
  };

  return (
    <header className={estilos.container} aria-label="Cabeçalho administrativo">
      <div className={estilos.brandGroup}>
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

        <div className={estilos.avatarWrap} ref={containerMenuRef}>
          <button
            type="button"
            className={estilos.avatarButton}
            onClick={() => setMenuAberto((v) => !v)}
            aria-label={`Menu da conta de ${nomeAdministrador}`}
            aria-haspopup="menu"
            aria-expanded={menuAberto}
          >
            {iniciais}
          </button>

          {menuAberto ? (
            <div className={estilos.avatarMenu} role="menu">
              <div className={estilos.avatarMenuHeader}>
                <span className={estilos.avatarMenuLabel}>Sessão ativa</span>
                <span className={estilos.avatarMenuNome}>{nomeAdministrador}</span>
              </div>
              <button
                type="button"
                role="menuitem"
                className={estilos.avatarMenuItem}
                onClick={aoSelecionarConfiguracoes}
              >
                <Settings size={16} aria-hidden="true" />
                Configurações
              </button>
              <button
                type="button"
                role="menuitem"
                className={`${estilos.avatarMenuItem} ${estilos.avatarMenuItemPerigo}`}
                onClick={aoSelecionarSair}
              >
                <LogOut size={16} aria-hidden="true" />
                Sair
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
