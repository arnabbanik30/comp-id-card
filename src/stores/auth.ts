import { Store } from '@tanstack/store';
import type { WcaUser } from '#/lib/auth/types';
import { fetchMe } from '#/lib/auth/auth';
import { createStorageHelper } from './utils';

type AuthStoreType = {
  accessToken?: string | null;
  expiresIn?: string | null;
  isSignedIn?: boolean;
  user?: WcaUser | null;
};

export const getAuthStorageKey = (key: keyof AuthStoreType) =>
  `comp-id-card-auth-${key}`;

const getFromStorage = createStorageHelper<AuthStoreType>(getAuthStorageKey);

export const authStore = new Store<AuthStoreType>({
  accessToken: getFromStorage('accessToken', null),
  expiresIn: getFromStorage('expiresIn', null),
  isSignedIn: !!getFromStorage('accessToken', false),
  user: getFromStorage('user', null, true) as WcaUser,
});

const hasTokenExpired = (expirationTime: string | null): boolean => {
  if (!expirationTime) {
    return false;
  }
  return new Date() >= new Date(parseInt(expirationTime));
};

export const checkTokenExpiration = () => {
  const isExpired = hasTokenExpired(
    localStorage.getItem(getAuthStorageKey('expiresIn')),
  );

  if (!isExpired) {
    return false;
  }
  resetAuthStatus();

  return true;
};

export const setAccessToken = (token: string, expiresIn: number) => {
  const expiresInMinus15Mins = expiresIn - 15 * 60;
  const expirationTime = new Date(
    new Date().getTime() + expiresInMinus15Mins * 1000,
  )
    .getTime()
    .toString();

  localStorage.setItem(getAuthStorageKey('accessToken'), token);
  localStorage.setItem(
    getAuthStorageKey('expiresIn'),
    expirationTime.toString(),
  );
  localStorage.setItem(getAuthStorageKey('isSignedIn'), 'true');
  authStore.setState((prev) => ({
    ...prev,
    accessToken: token,
    expiresIn: expirationTime,
    isSignedIn: true,
  }));
};

export const resetAuthStatus = () => {
  const store = authStore.get();
  for (const key in store) {
    localStorage.removeItem(getAuthStorageKey(key as keyof AuthStoreType));
  }
  authStore.setState(() => ({}));
};

const setMe = (user: WcaUser | null) => {
  authStore.setState((prev) => ({
    ...prev,
    user,
  }));
  localStorage.setItem(getAuthStorageKey('user'), JSON.stringify(user));
};

export const initializeAuth = async () => {
  checkTokenExpiration();

  const hash = window.location.hash.replace(/^#/, '');
  const hashParams = new URLSearchParams(hash);

  if (hashParams.has('access_token')) {
    const token = hashParams.get('access_token')!;
    const expiresIn = parseInt(hashParams.get('expires_in') || '7200', 10);

    setAccessToken(token, expiresIn);
    const user = await fetchMe();
    setMe(user);
    window.history.replaceState({}, '', window.location.pathname);
  }
};
