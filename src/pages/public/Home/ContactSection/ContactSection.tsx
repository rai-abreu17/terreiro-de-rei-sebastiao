import React from 'react';
import * as styles from './ContactSection.css';

const CONTACT_CARDS = [
  {
    title: 'Agendamento online',
    text: 'Escolha o servico, a data e o horario diretamente pela agenda publica, sem depender de contato manual para iniciar o atendimento.',
  },
  {
    title: 'Confirmacao da reserva',
    text: 'Depois da marcacao, o acompanhamento acontece pelo link de status e pelos dados informados no cadastro da reserva.',
  },
  {
    title: 'Modalidades de atendimento',
    text: 'Os servicos podem ser oferecidos nas modalidades online e presencial, conforme a disponibilidade configurada para cada dia.',
  },
];

export function ContactSection(): React.ReactElement {
  return (
    <section id="contato" className={styles.contactSectionContainer} aria-labelledby="contact-title">
      <div className={styles.contentGrid}>
        <div className={styles.textBlock}>
          <h2 id="contact-title" className={styles.sectionTitle}>
            Contato e Atendimento
          </h2>
          <p className={styles.sectionSubtitle}>
            Tudo o que voce precisa para iniciar e acompanhar sua reserva em um so lugar.
          </p>
          <p className={styles.sectionParagraph}>
            Para novos atendimentos, utilize o fluxo de agendamento online. Assim voce escolhe o servico desejado,
            visualiza os horarios disponiveis e conclui a reserva com confirmacao automatica.
          </p>
          <p className={styles.sectionParagraph}>
            Se a sua marcacao ja foi criada, acompanhe o andamento pelo link de status e mantenha o e-mail e o telefone
            informados no cadastro atualizados para receber as orientacoes do atendimento.
          </p>
          <div className={styles.actionsRow}>
            <a href="/agendar" className={styles.primaryAction}>
              Ir para agendamento
            </a>
            <a href="#faq" className={styles.secondaryAction}>
              Ver perguntas frequentes
            </a>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          {CONTACT_CARDS.map((card) => (
            <article key={card.title} className={styles.infoCard}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}