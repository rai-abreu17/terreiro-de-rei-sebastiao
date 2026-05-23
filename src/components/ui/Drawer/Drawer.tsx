import { useEffect, useRef, type TouchEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import * as styles from './Drawer.css';

interface DrawerProps {
  readonly open: boolean;
  readonly title: string;
  readonly children: ReactNode;
  readonly footer?: ReactNode;
  readonly mobileVariant?: 'default' | 'compact';
  readonly onClose: () => void;
}

export function Drawer({
  open,
  title,
  children,
  footer,
  mobileVariant = 'default',
  onClose,
}: DrawerProps) {
  const panelRef = useRef<HTMLElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchDeltaYRef = useRef(0);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const previousKeyboardOffset = document.documentElement.style.getPropertyValue('--drawer-keyboard-offset');
    const visualViewport = window.visualViewport;

    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    const ajustarViewport = () => {
      if (!visualViewport) {
        return;
      }

      const deslocamento = Math.max(0, window.innerHeight - visualViewport.height - visualViewport.offsetTop);
      document.documentElement.style.setProperty('--drawer-keyboard-offset', `${deslocamento}px`);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    ajustarViewport();
    document.addEventListener('keydown', handleKeyDown);
    visualViewport?.addEventListener('resize', ajustarViewport);
    visualViewport?.addEventListener('scroll', ajustarViewport);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.setProperty('--drawer-keyboard-offset', previousKeyboardOffset);
      document.removeEventListener('keydown', handleKeyDown);
      visualViewport?.removeEventListener('resize', ajustarViewport);
      visualViewport?.removeEventListener('scroll', ajustarViewport);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  const resetDrag = () => {
    touchStartYRef.current = null;
    touchDeltaYRef.current = 0;
    if (panelRef.current) {
      panelRef.current.style.transform = '';
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    const alvo = event.target as Node;
    if (bodyRef.current?.contains(alvo) && bodyRef.current.scrollTop > 0) {
      touchStartYRef.current = null;
      return;
    }

    touchStartYRef.current = event.touches[0]?.clientY ?? null;
    touchDeltaYRef.current = 0;
  };

  const handleTouchMove = (event: TouchEvent<HTMLElement>) => {
    if (touchStartYRef.current === null || !panelRef.current) {
      return;
    }

    const deltaY = Math.max(0, (event.touches[0]?.clientY ?? touchStartYRef.current) - touchStartYRef.current);
    touchDeltaYRef.current = deltaY;

    if (deltaY > 0) {
      panelRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (touchDeltaYRef.current > 80) {
      onClose();
      resetDrag();
      return;
    }

    resetDrag();
  };

  const panelClassName = [
    styles.panel,
    mobileVariant === 'compact' ? styles.panelMobileCompact : '',
  ].filter(Boolean).join(' ');

  return createPortal(
    <>
      <button
        type="button"
        className={styles.overlay}
        onClick={onClose}
        aria-label="Fechar painel"
      />

      <aside
        ref={panelRef}
        className={panelClassName}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        tabIndex={-1}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.sheetHandle} aria-hidden="true" />

        <header className={styles.header}>
          <h2 id="drawer-title" className={styles.title}>
            {title}
          </h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar painel"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div ref={bodyRef} className={styles.body} data-scrollable="true">{children}</div>

        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </aside>
    </>,
    document.body
  );
}
