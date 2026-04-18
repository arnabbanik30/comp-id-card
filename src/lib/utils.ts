import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { WCA_HOST } from './config';
import type { ClassValue } from 'clsx';
import { authStore } from '#/stores/auth';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*
 * @param path - Full API path including the `/api/v0` prefix (e.g. `/api/v0/me`).
 */
export async function wcaApiFetch(path: string, options: RequestInit = {}) {
  const token = authStore.state.accessToken;
  if (!token) {
    throw new Error(`Not logged in, cannot fetch ${path}`);
  }
  const url = `${WCA_HOST}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
