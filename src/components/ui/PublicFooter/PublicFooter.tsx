import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconTambor,
  IconInstagram,
  IconWhatsApp,
  IconTikTok,
  IconLocalizacao,
} from '../../../assets/icons/SimbolosReiSebastiao';
import { tokens } from '../../../design-system/tokens.css';
import type { LinkNavegacao } from '../PublicNavbar/PublicNavbar.types';
import * as styles from './PublicFooter.css';

const REDES_SOCIAIS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/terreiro_rei_sebastiao?igsh=MTM3ZTkzbHBiN2JzMg==',
    Icon: IconInstagram,
    ariaLabel: 'Visitar o Instagram do Terreiro Rei Sebastião',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5598985762144',
    Icon: IconWhatsApp,
    ariaLabel: 'Entrar em contato pelo WhatsApp do Terreiro Rei Sebastião',
  },
  {
    label: 'Localização',
    href: 'https://maps.app.goo.gl/RXp3TEh14xBgmYQy5',
    Icon: IconLocalizacao,
    ariaLabel: 'Ver a localização do Terreiro Rei Sebastião no Google Maps',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@terreiro.rei.sebastiao?_r=1&_t=ZS-96JgjEmvhRZ',
    Icon: IconTikTok,
    ariaLabel: 'Visitar o TikTok do Terreiro Rei Sebastião',
  },
] as const;

interface PublicFooterProps {
  linksNavegacao?: LinkNavegacao[];
}

export function PublicFooter({ linksNavegacao = [] }: PublicFooterProps) {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerInner}>
        {/* Coluna da Marca */}
        <div className={styles.marcaColuna}>
          <Link to="/#inicio" className={styles.logoFooter}>
            Terreiro Rei Sebastião
          </Link>
          <p className={styles.tagline}>
            Consultas espirituais com respeito, tradição e acolhimento.
          </p>
        </div>

        {/* Coluna de Navegação */}
        <div className={styles.colunaNav}>
          <h3 className={styles.colunaTitulo}>Navegação</h3>
          {linksNavegacao.map((link) => (
            <Link key={link.href} to={link.href} className={styles.footerLink}>
              {link.rotulo}
            </Link>
          ))}
        </div>

        {/* Coluna de Contato */}
        <div className={styles.colunaNav}>
          <h3 className={styles.colunaTitulo}>Contato</h3>
          <p className={styles.contatoTexto}>
            Entre em contato para agendar sua consulta espiritual.
          </p>
          <Link to="/agendar" className={styles.footerLink}>
            Agendar Consulta
          </Link>
        </div>

        {/* Coluna de Redes Sociais */}
        <div className={styles.colunaRedes}>
          <h3 className={styles.colunaTitulo}>Redes Sociais</h3>
          {REDES_SOCIAIS.map(({ label, href, Icon, ariaLabel }) => (
            <a
              key={label}
              href={href}
              className={styles.linkRede}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ariaLabel}
            >
              <span className={styles.iconeRede} aria-hidden="true">
                <Icon size={18} />
              </span>
              {label}
            </a>
          ))}
        </div>
      </div>

      <hr className={styles.separador} />

      {/*
       * Tambores Sagrados — o Hum, o Humpi e o Lé repercutem aqui, no rodapé.
       * O tambor é a base metafísica do sistema, a voz que convoca os encantados.
       * Dois tambores ladeiam o copyright como guardiões do fundamento da casa.
       */}
      <div className={styles.rodape}>
        <span className={styles.ornatoTambor} aria-hidden="true" role="presentation">
          <IconTambor size={20} color={tokens.color.acento.prateado} aria-hidden={true} />
        </span>

        <p className={styles.copyright}>
          © {anoAtual} Terreiro Rei Sebastião. Todos os direitos reservados.
        </p>

        <span className={styles.ornatoTambor} aria-hidden="true" role="presentation">
          <IconTambor size={20} color={tokens.color.acento.prateado} aria-hidden={true} />
        </span>
      </div>
    </footer>
  );
}
