const AUTH_CHANNEL_NAME = 'auth';
type AuthChannelMessage = 'logout';

export function broadcastAuthLogout(): void {
  if (typeof BroadcastChannel === 'undefined') {
    return;
  }

  const channel = new BroadcastChannel(AUTH_CHANNEL_NAME);
  channel.postMessage('logout' satisfies AuthChannelMessage);
  channel.close();
}

export function subscribeToAuthLogout(
  onLogout: () => void
): () => void {
  if (typeof BroadcastChannel === 'undefined') {
    return () => undefined;
  }

  const channel = new BroadcastChannel(AUTH_CHANNEL_NAME);
  const handler = (event: MessageEvent<AuthChannelMessage>) => {
    if (event.data === 'logout') {
      onLogout();
    }
  };

  channel.addEventListener('message', handler);

  return () => {
    channel.removeEventListener('message', handler);
    channel.close();
  };
}