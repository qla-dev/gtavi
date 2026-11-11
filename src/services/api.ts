const API_URL = 'https://qla.dev/gta-vi-ai-companion/endpoints/api';

async function request<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'omit',
  });

  if (!res.ok) {
    throw new Error(`API ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  health: () => request<{ status: string; database: { connected: boolean } }>('/health'),

  aiChat: (message: string, history: { role: string; content: string }[] = []) =>
    request<{ reply: string; source: string }>('/ai/chat', { message, history }),

  loadState: (deviceId: string) =>
    request<{ exists: boolean; state: Record<string, unknown> | null }>('/state/load', { device_id: deviceId }),

  saveState: (deviceId: string, state: Record<string, unknown>) =>
    request<{ saved: boolean }>('/state/save', { device_id: deviceId, state }),
};
