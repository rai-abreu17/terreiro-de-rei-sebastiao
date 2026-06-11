/**
 * @deprecated Arquivo sem importadores — pode ser removido do repositório.
 *
 * O retorno do checkout do Mercado Pago agora chega direto em
 * `/booking/:bookingId/status?vt=...` (back_urls configuradas pelo backend na
 * criação da preferência), então o parse de parâmetros `b`/`r` deixou de existir.
 * Para formatação de dinheiro, use `@/lib/money` ou `@/utils/formatters`.
 */
export {};
