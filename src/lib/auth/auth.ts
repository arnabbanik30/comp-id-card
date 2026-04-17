import { APP_ID, WCA_HOST } from '../config';

import type { WcaUser } from './types';

export function signIn() {
  const params = new URLSearchParams({
    client_id: APP_ID,
    response_type: 'token',
    redirect_uri: window.location.origin,
    scope: 'public dob email manage_competitions openid profile cms',
  });

  window.location.assign(`${WCA_HOST}/oauth/authorize?${params.toString()}`);
}

export async function fetchMe(accessToken: string | null): Promise<WcaUser> {
  if (!accessToken) {
    throw new Error('Not logged in, cannot fetch api/v0/me');
  }
  const response = await fetch(`${WCA_HOST}/api/v0/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  const data = await response.json();
  return data.me as WcaUser;
}
