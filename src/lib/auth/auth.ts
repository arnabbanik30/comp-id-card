import { APP_ID, WCA_HOST } from '../config';

import { wcaApiFetch } from '../utils';
import type { WcaUser } from './types';
import { resetAuthStatus } from '#/stores/auth';

export function signIn() {
  const params = new URLSearchParams({
    client_id: APP_ID,
    response_type: 'token',
    redirect_uri: window.location.origin,
    scope: 'public dob email manage_competitions openid profile cms',
  });

  window.location.assign(`${WCA_HOST}/oauth/authorize?${params.toString()}`);
}

export function signOut() {
  resetAuthStatus();
}

export async function fetchMe(): Promise<WcaUser> {
  const data = await wcaApiFetch('/api/v0/me');
  return data.me as WcaUser;
}
