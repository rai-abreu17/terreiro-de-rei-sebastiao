const STORAGE_KEY = 'terreiro.admin.accessToken';

let accessTokenMemoria: string | null = null;

function obterSessionStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function obterAccessToken(): string | null {
  if (accessTokenMemoria) {
    return accessTokenMemoria;
  }

  const storage = obterSessionStorage();
  accessTokenMemoria = storage?.getItem(STORAGE_KEY) ?? null;
  return accessTokenMemoria;
}

export function registrarAccessToken(token: string | null): void {
  accessTokenMemoria = token;

  const storage = obterSessionStorage();
  if (!storage) {
    return;
  }

  if (token) {
    storage.setItem(STORAGE_KEY, token);
    return;
  }

  storage.removeItem(STORAGE_KEY);
}

export function limparAccessToken(): void {
  registrarAccessToken(null);
}
