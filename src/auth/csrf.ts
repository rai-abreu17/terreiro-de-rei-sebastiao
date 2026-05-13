export function getCsrfToken(): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const valor = `; ${document.cookie}`;
  const partes = valor.split('; csrf_token=');

  if (partes.length !== 2) {
    return null;
  }

  return partes.pop()?.split(';').shift() ?? null;
}