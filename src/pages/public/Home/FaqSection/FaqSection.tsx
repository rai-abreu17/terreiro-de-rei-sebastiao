import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import {
  faqSectionContainer,
  sectionTitle,
  accordionRoot,
  accordionItem,
  accordionHeader,
  accordionTrigger,
  accordionContent,
  accordionContentInner,
  chevronIcon,
} from './FaqSection.css';
import type { FaqSectionProps } from './FaqSection.types';

const defaultFaqs = [
  {
    id: 'faq-1',
    pergunta: 'Como funciona o agendamento online?',
    resposta: 'Você escolhe o serviço desejado, seleciona a data e horário disponíveis na agenda e preenche seus dados. Após o pagamento via Mercado Pago, sua consulta é confirmada automaticamente.',
  },
  {
    id: 'faq-2',
    pergunta: 'Quais dados preciso fornecer para a consulta?',
    resposta: 'Solicitamos apenas seu nome, e-mail e celular. Esses dados são tratados com total sigilo e utilizados exclusivamente para identificar sua reserva e entrarmos em contato se necessário.',
  },
  {
    id: 'faq-3',
    pergunta: 'Posso escolher entre atendimento presencial e online?',
    resposta: 'Sim. A disponibilidade de modalidades (online ou presencial) depende do dia selecionado, conforme as regras estabelecidas pela casa. O sistema exibirá as opções válidas para o momento escolhido.',
  },
  {
    id: 'faq-4',
    pergunta: 'Como sei que minha marcação foi confirmada?',
    resposta: 'Assim que o pagamento for aprovado pelo Mercado Pago, nosso sistema registrará o agendamento e você receberá uma confirmação na própria tela. Não é necessário enviar comprovante via WhatsApp.',
  },
];

export function FaqSection({
  titulo = 'Perguntas Frequentes',
  itensFaq = defaultFaqs,
}: FaqSectionProps): React.ReactElement {
  return (
    <section id="faq" className={faqSectionContainer} aria-labelledby="faq-title">
      <h2 id="faq-title" className={sectionTitle}>
        {titulo}
      </h2>
      
      <Accordion.Root
        className={accordionRoot}
        type="single"
        collapsible
      >
        {itensFaq.map((faq) => (
          <Accordion.Item key={faq.id} value={faq.id} className={accordionItem}>
            <Accordion.Header className={accordionHeader}>
              <Accordion.Trigger className={accordionTrigger}>
                {faq.pergunta}
                <svg
                  className={chevronIcon}
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className={accordionContent}>
              <div className={accordionContentInner}>
                {faq.resposta}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
