let csrfTokenMemoria: string | null = null;

export function registrarCsrfToken(token: string | null): void {
  csrfTokenMemoria = token;
}

export function getCsrfToken(): string | null {
  if (csrfTokenMemoria) {
    return csrfTokenMemoria;
  }

  // Fallback para ambiente same-origin (local/dev)
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