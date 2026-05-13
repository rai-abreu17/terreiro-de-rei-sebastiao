import { createGlobalTheme } from '@vanilla-extract/css';

/**
 * @prohibited VERDE-FLORESTA (ex: #228B22, #2E8B57, #006400 e similares)
 * Uso dominante é anti-padrão cultural neste projeto. Verde-floresta remete a
 * entidades de outras tradições, incompatíveis com a Família do Lençol.
 * Violação desta regra invalida a entrega e exige revisão completa.
 *
 * @prohibited ROSA (ex: #FF69B4, #FFB6C1, #DB7093 e similares)
 * Mesma razão: pertence a outras entidades. Proibido em qualquer tom dominante.
 * A cor verde-de-estado em `color.estado.sucesso` é a ÚNICA exceção tolerada
 * e apenas como sinalização funcional de sistema (confirmação de pagamento),
 * nunca como cor de marca ou elemento decorativo dominante.
 *
 * ICONOGRAFIA PERMITIDA — remissões respeitosas e atestadas pelo PRD (Seção 6):
 * ✅ Touro Negro       — manifestação icônica de Rei Sebastião nos Lençóis
 * ✅ Estrela na testa  — elemento central do Touro Encantado; também do bumba-meu-boi
 * ✅ Coroa             — Rei Sebastião é entidade régia ("encantado gentil")
 * ✅ Mar / ondas       — palácio de cristal submerso próximo à Ilha dos Lençóis
 * ✅ Lua               — aparição do touro em noites sem luar
 * ✅ Espada / lança    — "guerreiro militar" conforme cantiga do Tambor de Mina
 *
 * NOTA: Hexadecimais provisórios até validação final com a liderança do terreiro (Sprint 009).
 */
export const tokens = createGlobalTheme(':root', {
  color: {
    primaria: '#6B1A1A', // Vermelho-vinho — cor predominante da Família do Lençol
    fundo: '#FFFFFF',    // Branco absoluto
    secundaria: '#0D1F3C', // Azul-marinho/noite
    acento: {
      dourado: '#C9A84C', // Dourado metálico — chifres do touro, realeza
      prateado: '#9BA5B0', // Prateado metálico — ícones secundários, espada
    },
    texto: {
      primario: '#1A1A1A',   // Contraste 18.1:1 sobre branco
      secundario: '#4A4444',
      invertido: '#FFFFFF',  // Contraste 7.2:1 sobre primária, 16.1:1 sobre secundária
    },
    estado: {
      erro: '#C0392B',
      sucesso: '#1A6B3A',
      alerta: '#B7791F',
    },
    /** Aliases semânticos de marca — mapeados para as cores primitivas acima */
    brand: {
      primary: '#6B1A1A',    // = primaria
      primaryHover: '#7D2323',
      seaNight: '#0D1F3C',   // = secundaria
      onPrimary: '#FFFFFF',  // = texto.invertido
      accentGold: '#C9A84C', // = acento.dourado
    },
    /**
     * Aliases explícitos da identidade do terreiro para uso semântico em futuras peças.
     * Verde permanece restrito ao estado de sucesso, conforme as regras culturais do workspace.
     */
    identidade: {
      vermelhoEncantaria: '#6B1A1A',
      azulReino: '#0D1F3C',
      douradoCoroa: '#C9A84C',
      prataEspada: '#9BA5B0',
      brancoRitual: '#FFFFFF',
    },
    /** Escala de cinza neutro para bordas, fundos e textos de suporte */
    neutral: {
      50: '#F9F7F5',
      200: '#E5E2DD',
      400: '#9C9490',
      600: '#4B4542',
      800: '#1F1C1B',
    },
    semantic: {
      danger: '#C0392B', // = estado.erro
    },
  },
  font: {
    family: {
      /**
       * Serifa clássica/elegante — evoca a herança portuguesa e o caráter régio.
       * Usada em: h1, h2, h3, display titles, pull quotes.
       */
      titulo: '"Cormorant Garamond", "Georgia", serif',
      /**
       * Sans-serif limpa e de extrema legibilidade.
       * Usada em: body text, botões, labels, inputs, descrições, tabelas.
       */
      corpo: '"Inter", "system-ui", sans-serif',
      /** Alias para `titulo` — para uso em componentes que pedem "display" */
      display: '"Cormorant Garamond", "Georgia", serif',
    },
    size: {
      sm: '0.875rem',  // 14px
      md: '1rem',      // 16px
      base: '1rem',    // 16px — alias de md
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      h2: '2rem',      // 32px
      h1: 'clamp(1.9rem, 4.5vw, 3.2rem)',         // Títulos de seção majestosos
      display: 'clamp(2.6rem, 7vw, 5rem)',         // Título principal do hero
    },
    weight: {
      semibold: '600',
      bold: '700',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
  },
  breakpoint: {
    md: '768px',
  },
  motion: {
    fast: '150ms',
    base: '250ms',
    slow: '500ms',
  },
});
