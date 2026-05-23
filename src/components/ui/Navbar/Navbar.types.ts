export interface NavbarProps {
  /** Nome do administrador exibido de forma abreviada ou acessível */
  nomeAdministrador: string;
  /** Título principal exibido no cabeçalho */
  titulo?: string;
  /** Callback para a ação de logout */
  aoSair: () => void;
  /** Callback opcional para abrir configurações (avatar menu mobile) */
  aoAbrirConfiguracoes?: () => void;
}
