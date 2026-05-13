/**
 * Fábrica de marcas d'água SVG para fundos de seções.
 *
 * Cada função recebe a `cor` do traçado (compatível com a seção de destino)
 * e retorna uma string CSS `url("data:image/svg+xml,...")` pronta para uso
 * em `backgroundImage` dentro de pseudo-elementos vanilla-extract.
 *
 * As cores são parâmetros (não hardcoded no SVG) para que o mesmo símbolo
 * possa ser reutilizado em seções de fundo diferente sem duplicação de código.
 *
 * Referência iconográfica aprovada (PRD Seção 6, padroes-rei-sebastiao.md):
 *  ✅ Coroa  — Rei Sebastião é entidade régia ("encantado gentil")
 *  ✅ Espada — "guerreiro militar" conforme cantiga do Tambor de Mina
 *  ✅ Touro  — Touro Negro dos Lençóis, manifestação icônica do Rei
 */

function svgUrl(svg: string): string {
  return `url("data:image/svg+xml,${encodeURIComponent(svg.replace(/\s+/g, ' ').trim())}")`;
}

/* ─── 1. COROA REAL ──────────────────────────────────────────────────────────
 * Três pontas principais (formato W), faixa de base com gemas e marcações.
 * Colocação: AboutSection (topo-direita) — o reinado que fundamenta a Casa.
 * Cor recomendada: tokens.color.primaria (#6B1A1A) sobre fundo branco.
 * ─────────────────────────────────────────────────────────────────────────── */
export function svgCoroaReal(cor: string): string {
  return svgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240" fill="none">
      <path
        d="M28,205 L28,128 L0,50 L88,115 L150,12 L212,115 L300,50 L272,128 L272,205 Z"
        stroke="${cor}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>
      <rect x="18" y="200" width="264" height="34" rx="17"
        stroke="${cor}" stroke-width="7"/>
      <path d="M150,14 L159,34 L150,44 L141,34 Z" fill="${cor}"/>
      <circle cx="3" cy="53" r="10" stroke="${cor}" stroke-width="5"/>
      <circle cx="3" cy="53" r="3" fill="${cor}"/>
      <circle cx="297" cy="53" r="10" stroke="${cor}" stroke-width="5"/>
      <circle cx="297" cy="53" r="3" fill="${cor}"/>
      <line x1="75" y1="200" x2="75" y2="234" stroke="${cor}" stroke-width="3.5"/>
      <circle cx="112" cy="217" r="6" fill="${cor}"/>
      <line x1="150" y1="200" x2="150" y2="234" stroke="${cor}" stroke-width="3.5"/>
      <circle cx="188" cy="217" r="6" fill="${cor}"/>
      <line x1="225" y1="200" x2="225" y2="234" stroke="${cor}" stroke-width="3.5"/>
    </svg>
  `);
}

/* ─── 2. ESPADAS CRUZADAS ────────────────────────────────────────────────────
 * Duas lâminas cruzadas com guarda e pomo circulares. Formato diagonal X.
 * Colocação: ServicesSection (baixo-esquerda) — os instrumentos do trabalho.
 * Cor recomendada: tokens.color.secundaria (#0D1F3C) sobre fundo areia.
 * ─────────────────────────────────────────────────────────────────────────── */
export function svgEspadasCruzadas(cor: string): string {
  return svgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280" fill="none">
      <line x1="32" y1="248" x2="248" y2="32"
        stroke="${cor}" stroke-width="6" stroke-linecap="round"/>
      <line x1="58" y1="202" x2="102" y2="158"
        stroke="${cor}" stroke-width="11" stroke-linecap="round"/>
      <circle cx="26" cy="254" r="15" stroke="${cor}" stroke-width="5.5"/>
      <circle cx="26" cy="254" r="6" fill="${cor}"/>
      <line x1="32" y1="32" x2="248" y2="248"
        stroke="${cor}" stroke-width="6" stroke-linecap="round"/>
      <line x1="178" y1="158" x2="222" y2="202"
        stroke="${cor}" stroke-width="11" stroke-linecap="round"/>
      <circle cx="254" cy="254" r="15" stroke="${cor}" stroke-width="5.5"/>
      <circle cx="254" cy="254" r="6" fill="${cor}"/>
    </svg>
  `);
}

/* ─── 3. TOURO NEGRO ─────────────────────────────────────────────────────────
 * Cabeça frontal com chifres em crescente, estrela de 5 pontas na testa,
 * olhos expressivos e focinho oval. O Grande Símbolo da lenda dos Lençóis.
 * Colocação: HeroSection (baixo-direita) — o Rei Encantado recebe o consulente.
 * Cor recomendada: #FFFFFF sobre fundo oceano noturno.
 * ─────────────────────────────────────────────────────────────────────────── */
export function svgTouroNegro(cor: string): string {
  return svgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 275" fill="none">
      <path d="M92,88 C76,64 54,38 28,20 C40,48 58,72 80,92"
        stroke="${cor}" stroke-width="7" stroke-linecap="round"/>
      <path d="M188,88 C204,64 226,38 252,20 C240,48 222,72 200,92"
        stroke="${cor}" stroke-width="7" stroke-linecap="round"/>
      <path d="M80,92 C63,108 56,140 59,172 C63,208 90,238 140,248 C190,238 217,208 221,172 C224,140 217,108 200,92 C186,78 164,70 140,70 C116,70 94,78 80,92 Z"
        stroke="${cor}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M140,94 L148,117 L172,117 L153,131 L160,154 L140,140 L120,154 L127,131 L108,117 L132,117 Z"
        fill="${cor}"/>
      <circle cx="100" cy="168" r="12" stroke="${cor}" stroke-width="5"/>
      <circle cx="100" cy="168" r="4.5" fill="${cor}"/>
      <circle cx="180" cy="168" r="12" stroke="${cor}" stroke-width="5"/>
      <circle cx="180" cy="168" r="4.5" fill="${cor}"/>
      <ellipse cx="140" cy="220" rx="33" ry="21" stroke="${cor}" stroke-width="5"/>
      <ellipse cx="126" cy="222" rx="7.5" ry="6" fill="${cor}"/>
      <ellipse cx="154" cy="222" rx="7.5" ry="6" fill="${cor}"/>
    </svg>
  `);
}
