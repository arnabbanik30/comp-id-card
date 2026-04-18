export const createStorageHelper = <TStore>(
  getStorageKey: (key: keyof TStore) => string,
) => {
  return <T>(key: keyof TStore, defaultVal: T, parse = false) => {
    if (typeof window === 'undefined') {
      return defaultVal;
    }
    const item = localStorage.getItem(getStorageKey(key));
    if (!item) {
      return defaultVal;
    }
    return parse ? JSON.parse(item) : (item as unknown as T);
  };
};
