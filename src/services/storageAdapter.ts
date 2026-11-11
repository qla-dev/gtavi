/**
 * LocalStorage adapter with safe fallbacks and serialization
 */
export const storageAdapter = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(`gtavi_os_${key}`);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`gtavi_os_${key}`, JSON.stringify(value));
    } catch {
      // storage quota or incognito fallback
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(`gtavi_os_${key}`);
    } catch {
      // ignore
    }
  },

  clearAll(): void {
    try {
      const keys = Object.keys(localStorage);
      for (const k of keys) {
        if (k.startsWith('gtavi_os_')) {
          localStorage.removeItem(k);
        }
      }
    } catch {
      // ignore
    }
  }
};
