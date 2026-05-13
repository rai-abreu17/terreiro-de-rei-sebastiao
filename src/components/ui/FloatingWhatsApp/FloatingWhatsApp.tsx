import React from 'react';
import { IconWhatsApp } from '../../../assets/icons/SimbolosReiSebastiao';
import * as styles from './FloatingWhatsApp.css';

export function FloatingWhatsApp(): React.ReactElement {
  return (
    <a
      href="https://wa.me/5598985762144"
      className={styles.fabLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Entrar em contato pelo WhatsApp do Terreiro Rei Sebastião"
    >
      <IconWhatsApp size={30} aria-hidden={true} />
    </a>
  );
}
