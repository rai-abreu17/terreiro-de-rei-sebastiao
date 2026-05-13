export interface ServiceCardProps {
  /** Título do serviço */
  titulo: string;
  /** Descrição breve do serviço */
  descricao?: string;
  /** Preço formatado em Reais (ex: R$ 150,00) */
  precoFormatado: string;
  /** Duração em formato legível (ex: 60 min) */
  duracaoFormatada: string;
  /** Define se o card representa o serviço atualmente selecionado */
  estaSelecionado?: boolean;
  /** Rótulo do botão de ação */
  rotuloBotao?: string;
  /** Callback acionado ao clicar no botão de agendamento */
  aoClicarAgendar: () => void;
}
