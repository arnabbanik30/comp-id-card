import { Store } from '@tanstack/store';

type AuthStoreType = {
  accessToken: string | null;
  expiresIn: number | null;
  isSignedIn: boolean;
};

export const authStorageKey = (key: keyof AuthStoreType) =>
  `comp-id-card-auth-${key}`;

export const authStore = new Store<AuthStoreType>({
  accessToken:
    typeof window !== 'undefined'
      ? localStorage.getItem(authStorageKey('accessToken'))
      : null,
  expiresIn:
    typeof window !== 'undefined'
      ? (localStorage.getItem(authStorageKey('expiresIn')) as number | null)
      : null,
  isSignedIn:
    typeof window !== 'undefined'
      ? !!localStorage.getItem(authStorageKey('accessToken'))
      : false,
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
  ).getTime();

  localStorage.setItem(authStorageKey('accessToken'), token);
  localStorage.setItem(authStorageKey('expiresIn'), expirationTime.toString());
  authStore.setState((state) => ({
    ...state,
    accessToken: token,
    expiresIn: expirationTime,
    isSignedIn: true,
  }));
};

export const resetAuthStatus = () => {
  localStorage.removeItem(authStorageKey('accessToken'));
  authStore.setState((state) => ({
    ...state,
    accessToken: null,
    isSignedIn: false,
    expiresIn: null,
  }));
};

export const initializeAuth = () => {
  checkTokenExpiration();

  const hash = window.location.hash.replace(/^#/, '');
  const hashParams = new URLSearchParams(hash);

  if (hashParams.has('access_token')) {
    const token = hashParams.get('access_token')!;
    const expiresIn = parseInt(hashParams.get('expires_in') || '7200', 10);

    setAccessToken(token, expiresIn);

    window.history.replaceState({}, '', window.location.pathname);
  }
};
