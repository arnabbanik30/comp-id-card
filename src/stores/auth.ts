import { Store } from '@tanstack/store';
import type { WcaUser } from '#/lib/auth/types';
import { fetchMe } from '#/lib/auth/auth';

type AuthStoreType = {
  accessToken?: string | null;
  expiresIn?: string | null;
  isSignedIn?: boolean;
  user?: WcaUser | null;
};

export const authStorageKey = (key: keyof AuthStoreType) =>
  `comp-id-card-auth-${key}`;

const getFromStorage = <T>(
  key: keyof AuthStoreType,
  defaultVal: T,
  parse = false,
) => {
  if (typeof window === 'undefined') {
    return defaultVal;
  }
  const item = localStorage.getItem(authStorageKey(key));
  if (!item) {
    return defaultVal;
  }
  return parse ? JSON.parse(item) : (item as unknown as T);
};

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
  return new Date() >= new Date(expirationTime);
};

export const checkTokenExpiration = () => {
  const isExpired = hasTokenExpired(
    localStorage.getItem(authStorageKey('expiresIn')),
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

  localStorage.setItem(authStorageKey('accessToken'), token);
  localStorage.setItem(authStorageKey('expiresIn'), expirationTime.toString());
  localStorage.setItem(authStorageKey('isSignedIn'), 'true');
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
    localStorage.removeItem(authStorageKey(key as keyof AuthStoreType));
  }
  authStore.setState(() => ({}));
};

const setMe = (user: WcaUser | null) => {
  authStore.setState((prev) => ({
    ...prev,
    user,
  }));
  localStorage.setItem(authStorageKey('user'), JSON.stringify(user));
};

export const initializeAuth = async () => {
  checkTokenExpiration();

  const hash = window.location.hash.replace(/^#/, '');
  const hashParams = new URLSearchParams(hash);

  if (hashParams.has('access_token')) {
    const token = hashParams.get('access_token')!;
    const expiresIn = parseInt(hashParams.get('expires_in') || '7200', 10);

    setAccessToken(token, expiresIn);
    const user = await fetchMe(token);
    setMe(user);
    window.history.replaceState({}, '', window.location.pathname);
  }
};
