export interface ItemNavegacao {
  rotulo: string;
  caminho: string;
  icone: React.ReactNode;
}

export type VarianteSidebar = 'fixa' | 'gaveta';

export interface SidebarProps {
  /** Lista de links de navegação do painel */
  itens: ItemNavegacao[];
  /** Nome do administrador exibido no rodapé da sidebar */
  nomeAdministrador: string;
  /** Callback para a ação de logout */
  aoSair: () => void;
  /** Fecha a gaveta ou executa ação auxiliar ao selecionar um item */
  aoSelecionarItem?: () => void;
  /** Controla se a sidebar é fixa no desktop ou renderizada como gaveta móvel */
  variante?: VarianteSidebar;
}
