export interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
}

export interface FaqSectionProps {
  /** Título da seção de perguntas frequentes */
  titulo?: string;
  /** Lista de perguntas e respostas */
  itensFaq?: readonly FaqItem[];
}
