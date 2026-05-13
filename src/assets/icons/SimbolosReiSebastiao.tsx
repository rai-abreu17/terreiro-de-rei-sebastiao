import React, { useId } from 'react';

interface IconProps {
  readonly size?: number;
  readonly color?: string;
  readonly 'aria-hidden'?: boolean;
}

/** Instagram — câmera minimalista com lente e flash */
export function IconInstagram({ size = 24, color = 'currentColor', 'aria-hidden': ariaHidden = true }: IconProps): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill={color} stroke="none" />
    </svg>
  );
}

/** WhatsApp — ícone oficial: balão com recorte do telefone via SVG mask */
export function IconWhatsApp({ size = 24, color = 'currentColor', 'aria-hidden': ariaHidden = true }: IconProps): React.ReactElement {
  const maskId = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden={ariaHidden}
    >
      <defs>
        <mask id={maskId}>
          {/* Área branca = visível; área preta = recortada (telefone) */}
          <rect fill="white" x="0" y="0" width="48" height="48" />
          <path
            fill="black"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011
              c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906
              c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255
              c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543
              c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119
              c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968
              c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831
              C20.612,19.329,19.69,16.983,19.268,16.045z"
          />
        </mask>
      </defs>
      {/* Balão de mensagem com rabo (tail) — shape oficial do WhatsApp */}
      <path
        fill={color}
        mask={`url(#${maskId})`}
        d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774
          c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342
          c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776
          C39.795,19.778,38.156,15.814,35.176,12.832z"
      />
    </svg>
  );
}

/** TikTok — nota musical oficial da marca (path icons8/TikTok) */
export function IconTikTok({ size = 24, color = 'currentColor', 'aria-hidden': ariaHidden = true }: IconProps): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden={ariaHidden}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5
        2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01
        a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34
        6.34 6.34 0 0 0 6.33-6.34V8.71a8.15 8.15 0 0 0 4.79 1.54V6.79a4.85 4.85 0 0 1-1.02-.1z" />
    </svg>
  );
}

/** Localização — alfinete de mapa */
export function IconLocalizacao({ size = 24, color = 'currentColor', 'aria-hidden': ariaHidden = true }: IconProps): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

/** Toalha Branca — símbolo de pureza e fidalguia dos Senhores de Toalha */
export function IconToalhaBranca({ size = 48, color = 'currentColor', 'aria-hidden': ariaHidden = true }: IconProps): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      {/* Barra horizontal — varão de onde a toalha é suspensa */}
      <line x1="3" y1="6" x2="21" y2="6" />
      {/* Ganchos nas extremidades */}
      <circle cx="7" cy="6" r="1.2" fill={color} stroke="none" />
      <circle cx="17" cy="6" r="1.2" fill={color} stroke="none" />
      {/* Corpo da toalha — pano fluindo suavemente */}
      <path d="M7 6 L6 20 Q9 22 12 20 Q15 22 18 20 L17 6" />
      {/* Linha de dobra central — textura do tecido */}
      <line x1="7.5" y1="13" x2="16.5" y2="13" strokeDasharray="1.5 1.5" strokeWidth="1" />
    </svg>
  );
}

/** Bengala — cetro patriarcal e símbolo de autoridade régia */
export function IconBengala({ size = 48, color = 'currentColor', 'aria-hidden': ariaHidden = true }: IconProps): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      {/* Haste vertical */}
      <line x1="14" y1="21" x2="14" y2="9" />
      {/* Cabo curvo em J — alça ornamental */}
      <path d="M14 9 Q14 4 10 4 Q6 4 6 8" />
      {/* Ornamento dourado no topo do cabo */}
      <circle cx="6" cy="8" r="1.8" fill={color} stroke="none" />
      {/* Ponteira decorativa na base */}
      <line x1="12" y1="21" x2="16" y2="21" strokeWidth="2" />
    </svg>
  );
}

/** Guarda-Sol Cerimonial — proteção da cabeça iluminada da divindade */
export function IconGuardaSol({ size = 48, color = 'currentColor', 'aria-hidden': ariaHidden = true }: IconProps): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      {/* Cabo/haste */}
      <line x1="12" y1="22" x2="12" y2="14" />
      {/* Cúpula do guarda-sol */}
      <path d="M4 14 Q4 6 12 6 Q20 6 20 14" />
      {/* Varetas internas — estrutura do guarda-sol */}
      <line x1="12" y1="6" x2="12" y2="14" strokeWidth="1" />
      <line x1="7.5" y1="8" x2="12" y2="14" strokeWidth="1" />
      <line x1="16.5" y1="8" x2="12" y2="14" strokeWidth="1" />
      {/* Franja cerimonial na borda inferior */}
      <path d="M4 14 Q5 16 6 14 Q7 16 8 14 Q9 16 10 14 Q11 16 12 14 Q13 16 14 14 Q15 16 16 14 Q17 16 18 14 Q19 16 20 14" strokeWidth="1" />
    </svg>
  );
}

/** Espada Vermelha — lâmina guerreira que corta demandas e infortúnios */
export function IconEspadaVermelha({ size = 48, color = 'currentColor', 'aria-hidden': ariaHidden = true }: IconProps): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      {/* Lâmina — triângulo apontado para cima */}
      <path d="M12 3 L10 16 L14 16 Z" />
      {/* Ranhura central da lâmina */}
      <line x1="12" y1="6" x2="12" y2="14" strokeWidth="0.75" />
      {/* Guarda — barra horizontal */}
      <line x1="7" y1="16" x2="17" y2="16" strokeWidth="2" />
      {/* Punho/cabo */}
      <line x1="12" y1="18" x2="12" y2="22" strokeWidth="2" />
      {/* Pomo — remate do cabo */}
      <circle cx="12" cy="22" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}

/** Escudo e Cruz de Cristo — proteção do cavaleiro cruzado */
export function IconCruzCristo({ size = 48, color = 'currentColor', 'aria-hidden': ariaHidden = true }: IconProps): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      {/* Contorno do escudo */}
      <path d="M12 3 L20 7 L20 15 Q20 20 12 22 Q4 20 4 15 L4 7 Z" />
      {/* Cruz de Cristo dentro do escudo */}
      <line x1="12" y1="8" x2="12" y2="18" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

/** Coroa Real — insígnia régia do Rei Sebastião, Encantado Gentil */
export function IconCoroaReal({ size = 48, color = 'currentColor', 'aria-hidden': ariaHidden = true }: IconProps): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 300 240"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      {/* Corpo da coroa — 3 pontas em W */}
      <path d="M28,205 L28,128 L0,50 L88,115 L150,12 L212,115 L300,50 L272,128 L272,205 Z"
        strokeWidth="8" />
      {/* Faixa de base */}
      <rect x="18" y="200" width="264" height="34" rx="17" strokeWidth="7" />
      {/* Gema central — pedra na ponta do meio */}
      <path d="M150,14 L159,34 L150,44 L141,34 Z" fill={color} stroke="none" />
      {/* Ornamentos nas pontas laterais */}
      <circle cx="3" cy="53" r="10" strokeWidth="5" />
      <circle cx="3" cy="53" r="3" fill={color} stroke="none" />
      <circle cx="297" cy="53" r="10" strokeWidth="5" />
      <circle cx="297" cy="53" r="3" fill={color} stroke="none" />
      {/* Marcações e gemas na faixa */}
      <line x1="75" y1="200" x2="75" y2="234" strokeWidth="3.5" />
      <circle cx="112" cy="217" r="6" fill={color} stroke="none" />
      <line x1="150" y1="200" x2="150" y2="234" strokeWidth="3.5" />
      <circle cx="188" cy="217" r="6" fill={color} stroke="none" />
      <line x1="225" y1="200" x2="225" y2="234" strokeWidth="3.5" />
    </svg>
  );
}

/** Espadas Cruzadas — as lâminas do guerreiro militar da Encantaria */
export function IconEspadasCruzadas({ size = 48, color = 'currentColor', 'aria-hidden': ariaHidden = true }: IconProps): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 280 280"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      aria-hidden={ariaHidden}
    >
      {/* Espada 1 — diagonal baixo-esquerda → cima-direita */}
      <line x1="32" y1="248" x2="248" y2="32" strokeWidth="6" />
      {/* Guarda espada 1 */}
      <line x1="58" y1="202" x2="102" y2="158" strokeWidth="11" />
      {/* Pomo espada 1 */}
      <circle cx="26" cy="254" r="15" strokeWidth="5.5" />
      <circle cx="26" cy="254" r="6" fill={color} stroke="none" />
      {/* Espada 2 — diagonal cima-esquerda → baixo-direita */}
      <line x1="32" y1="32" x2="248" y2="248" strokeWidth="6" />
      {/* Guarda espada 2 */}
      <line x1="178" y1="158" x2="222" y2="202" strokeWidth="11" />
      {/* Pomo espada 2 */}
      <circle cx="254" cy="254" r="15" strokeWidth="5.5" />
      <circle cx="254" cy="254" r="6" fill={color} stroke="none" />
    </svg>
  );
}

/** Touro Negro com Estrela — O Grande Símbolo da lenda dos Lençóis Maranhenses */
export function IconTouroNegro({ size = 48, color = 'currentColor', 'aria-hidden': ariaHidden = true }: IconProps): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 280 275"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      aria-hidden={ariaHidden}
    >
      {/* Chifre esquerdo — em crescente */}
      <path d="M92,88 C76,64 54,38 28,20 C40,48 58,72 80,92" strokeWidth="7" />
      {/* Chifre direito */}
      <path d="M188,88 C204,64 226,38 252,20 C240,48 222,72 200,92" strokeWidth="7" />
      {/* Cabeça — oval levemente afunilado no queixo */}
      <path d="M80,92 C63,108 56,140 59,172 C63,208 90,238 140,248 C190,238 217,208 221,172 C224,140 217,108 200,92 C186,78 164,70 140,70 C116,70 94,78 80,92 Z"
        strokeWidth="7" strokeLinejoin="round" />
      {/* Estrela de 5 pontas na testa — signo icônico do Touro Encantado */}
      <path d="M140,94 L148,117 L172,117 L153,131 L160,154 L140,140 L120,154 L127,131 L108,117 L132,117 Z"
        fill={color} stroke="none" />
      {/* Olho esquerdo */}
      <circle cx="100" cy="168" r="12" strokeWidth="5" />
      <circle cx="100" cy="168" r="4.5" fill={color} stroke="none" />
      {/* Olho direito */}
      <circle cx="180" cy="168" r="12" strokeWidth="5" />
      <circle cx="180" cy="168" r="4.5" fill={color} stroke="none" />
      {/* Focinho */}
      <ellipse cx="140" cy="220" rx="33" ry="21" strokeWidth="5" />
      {/* Narinas */}
      <ellipse cx="126" cy="222" rx="7.5" ry="6" fill={color} stroke="none" />
      <ellipse cx="154" cy="222" rx="7.5" ry="6" fill={color} stroke="none" />
    </svg>
  );
}

/** Tambores Sagrados — o Hum, o Humpi e o Lé, regidos pelo Gã de ferro */
export function IconTambor({ size = 48, color = 'currentColor', 'aria-hidden': ariaHidden = true }: IconProps): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      {/* Tampa superior do tambor */}
      <ellipse cx="12" cy="8" rx="8" ry="3" />
      {/* Laterais do corpo */}
      <line x1="4" y1="8" x2="4" y2="16" />
      <line x1="20" y1="8" x2="20" y2="16" />
      {/* Aro inferior */}
      <path d="M4 16 Q4 19 12 19 Q20 19 20 16" />
      {/* Cordas de afinação — detalhe de tensão na lateral */}
      <line x1="7" y1="8" x2="6.5" y2="16" strokeWidth="0.75" />
      <line x1="12" y1="5" x2="12" y2="8" strokeWidth="0.75" />
      <line x1="17" y1="8" x2="17.5" y2="16" strokeWidth="0.75" />
      {/* Baqueta */}
      <path d="M18 5 L22 2" strokeWidth="1.5" />
      <circle cx="22" cy="2" r="1" fill={color} stroke="none" />
    </svg>
  );
}
