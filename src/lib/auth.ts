import { APP_ID, WCA_HOST } from './config';

export function signIn() {
  const params = new URLSearchParams({
    client_id: APP_ID,
    response_type: 'token',
    redirect_uri: window.location.origin,
    scope: 'public dob email manage_competitions openid profile cms',
  });

  window.location.assign(`${WCA_HOST}/oauth/authorize?${params.toString()}`);
}
