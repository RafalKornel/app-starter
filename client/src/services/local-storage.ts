export type LocalStorageKeys = "access_token" | "redirect-to";

export class LocalStorageService {
  static set(key: LocalStorageKeys, value: string) {
    localStorage.setItem(key, value);
  }

  static get(key: LocalStorageKeys) {
    return localStorage.getItem(key);
  }

  static remove(key: LocalStorageKeys) {
    localStorage.removeItem(key);
  }
}
