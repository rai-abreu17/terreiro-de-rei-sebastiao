import React from 'react';
import {
  IconLocalizacao,
  IconWhatsApp,
} from '../../../../assets/icons/SimbolosReiSebastiao';
import * as styles from './ContactCTA.css';

export function ContactCTA(): React.ReactElement {
  return (
    <section aria-labelledby="cta-visita-titulo" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow} aria-hidden="true">Venha nos Visitar</p>

        <h2 id="cta-visita-titulo" className={styles.titulo}>
          Conheça o Terreiro
        </h2>

        <p className={styles.subtitulo}>
          A Casa de Rei Sebastião recebe consulentes com respeito, tradição e
          acolhimento. Encontre-nos ou inicie uma conversa — estamos à sua espera.
        </p>

        <div className={styles.botoesRow}>
          <a
            href="https://maps.app.goo.gl/RXp3TEh14xBgmYQy5"
            className={styles.btnMaps}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver a localização do Terreiro Rei Sebastião no Google Maps"
          >
            <IconLocalizacao size={20} aria-hidden={true} />
            Como Chegar
          </a>

          <a
            href="https://wa.me/5598985762144"
            className={styles.btnWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Entrar em contato pelo WhatsApp do Terreiro Rei Sebastião"
          >
            <IconWhatsApp size={20} aria-hidden={true} />
            Falar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
