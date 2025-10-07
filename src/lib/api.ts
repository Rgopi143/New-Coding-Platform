const RAW_API_BASE = (import.meta as any).env?.VITE_API_URL || '';
const API_BASE = RAW_API_BASE.replace(/\/+$/, '');

if (!API_BASE && (import.meta as any).env?.MODE !== 'development') {
  console.warn('VITE_API_URL is not set; API calls will likely fail in production');
}

function getAuthToken(): string | null {
  try {
    return localStorage.getItem('auth_token');
  } catch {
    return null;
  }
}

function setAuthToken(token: string) {
  try {
    localStorage.setItem('auth_token', token);
  } catch {}
}

async function request(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  const token = getAuthToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const isDev = (import.meta as any).env?.MODE === 'development';
  if (!API_BASE && !isDev) {
    throw new Error('API base URL not configured. Set VITE_API_URL for production.');
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const contentType = res.headers.get('Content-Type') || '';
  const isJson = contentType.includes('application/json');
  const body = isJson ? await res.json().catch(() => ({})) : await res.text();
  if (!res.ok) {
    const message = (isJson && (body?.message as string)) || res.statusText || 'Request failed';
    throw new Error(message);
  }
  return body;
}

export async function registerUser(input: { email: string; password: string; name: string }) {
  const data = await request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(input)
  });
  return data;
}

export async function loginUser(input: { email: string; password: string }) {
  const data = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(input)
  });
  if (data?.token) setAuthToken(data.token);
  return data;
}

export async function fetchMe() {
  return await request('/api/auth/me');
}

export function logout() {
  try {
    localStorage.removeItem('auth_token');
  } catch {}
}
