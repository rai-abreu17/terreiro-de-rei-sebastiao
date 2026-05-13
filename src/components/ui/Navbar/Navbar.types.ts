export interface NavbarProps {
  /** Nome do administrador exibido de forma abreviada ou acessível */
  nomeAdministrador: string;
  /** Título principal exibido no cabeçalho */
  titulo?: string;
  /** Callback para abrir o menu em dispositivos móveis */
  aoAbrirMenu: () => void;
  /** Callback para a ação de logout */
  aoSair: () => void;
}
