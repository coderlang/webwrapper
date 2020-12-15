import {Storage, DBManager} from "foundation";

class WebLocalStorage implements Storage {
  async get(key: string): Promise<[string, Error | null]> {
    let ret = localStorage.getItem(key);
    if (ret === null) {
      return Promise.resolve(["", new Error("key not found")]);
    }

    return [ret, null]
  }

  async remove(key: string): Promise<Error | null> {
    localStorage.removeItem(key);
    return Promise.resolve(null);
  }

  async set(key: string, value: string): Promise<Error | null> {
    localStorage.setItem(key, value);
    return Promise.resolve(null);
  }
}

export class WebDBManager extends DBManager {
  protected newSessionStorage():Storage {
    return new WebLocalStorage();
  }

  protected newLocalStorage():Storage {
    return new WebLocalStorage();
  }
}