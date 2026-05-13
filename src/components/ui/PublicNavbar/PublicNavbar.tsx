import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { PublicNavbarProps } from './PublicNavbar.types';
import {
  IconInstagram,
  IconWhatsApp,
  IconTikTok,
} from '../../../assets/icons/SimbolosReiSebastiao';
import * as styles from './PublicNavbar.css';

const REDES_NAVBAR = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/terreiro_rei_sebastiao?igsh=MTM3ZTkzbHBiN2JzMg==',
    Icon: IconInstagram,
    ariaLabel: 'Visitar o Instagram do Terreiro Rei Sebastião',
    tamanho: 22,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5598985762144',
    Icon: IconWhatsApp,
    ariaLabel: 'Entrar em contato pelo WhatsApp do Terreiro Rei Sebastião',
    tamanho: 30,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@terreiro.rei.sebastiao?_r=1&_t=ZS-96JgjEmvhRZ',
    Icon: IconTikTok,
    ariaLabel: 'Visitar o TikTok do Terreiro Rei Sebastião',
    tamanho: 22,
  },
] as const;

export function PublicNavbar({ linksNavegacao = [] }: PublicNavbarProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleLinkClick = () => {
    setMenuAberto(false);
  };

  return (
    <nav className={styles.navContainer}>
      <div className={styles.navInner}>
        <Link to="/#inicio" className={styles.logo}>
          Terreiro Rei Sebastião
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.navLinksDesktop}>
          {linksNavegacao.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={styles.navLink}
            >
              {link.rotulo}
            </Link>
          ))}

          {/* Ícones sociais — separados por borda sutil à esquerda */}
          <div
            className={styles.navSocialGroup}
            role="list"
            aria-label="Redes sociais do Terreiro Rei Sebastião"
          >
            {REDES_NAVBAR.map(({ label, href, Icon, ariaLabel, tamanho }) => (
              <a
                key={label}
                href={href}
                className={styles.navSocialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                role="listitem"
              >
                <Icon size={tamanho} aria-hidden={true} />
              </a>
            ))}
          </div>

          <Link to="/agendar" className={styles.ctaLink}>
            Agendar Consulta
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuAberto ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${menuAberto ? styles.mobileMenuAberto : ''}`}
      >
        {linksNavegacao.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={styles.mobileNavLink}
            onClick={handleLinkClick}
          >
            {link.rotulo}
          </Link>
        ))}
        <Link
          to="/agendar"
          className={styles.mobileCtaLink}
          onClick={handleLinkClick}
        >
          Agendar Consulta
        </Link>

        {/* Ícones sociais no menu mobile */}
        <div
          className={styles.mobileSocialRow}
          role="list"
          aria-label="Redes sociais do Terreiro Rei Sebastião"
        >
          {REDES_NAVBAR.map(({ label, href, Icon, ariaLabel }) => (
            <a
              key={label}
              href={href}
              className={styles.mobileSocialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ariaLabel}
              role="listitem"
            >
              <Icon size={22} aria-hidden={true} />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
