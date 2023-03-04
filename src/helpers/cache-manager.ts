import { Cache, CacheClass } from "memory-cache";
import { Application } from "../declarations";
import logger from "../logger";

interface Dependencies {
  path: string;
  method: 'find' | 'get' | 'create' | 'update' | 'patch' | 'remove';
  paginate?: any;
  others: {
    [key: string]: any;
  };
}

export class CacheManager {
  private cache: CacheClass<string, string>;
  private timeout: number;
  private cachePrefix = "cache-";
  private static cacheManager: CacheManager;

  private constructor() {
    this.cache = new Cache();
    this.timeout = (Number(process.env.CACHE_TIMEOUT_IN_MINUTES)) * 60 * 1000;
  }

  public static getCacheManager() {
    if (CacheManager.cacheManager) {
      return CacheManager.cacheManager;
    }
    CacheManager.cacheManager = new CacheManager();
    return CacheManager.cacheManager;
  }

  public getObject(key: any) {
    try {
      const result = this.cache.get(key);
      if (result) {
        return JSON.parse(result);
      }
      return result;
    } catch (error) {
      logger.error('cache-get', error);
      return null;
    }
  }

  public setObject(key: any, object: any) {
    return this.cache.put(key, JSON.stringify(object), this.timeout);
  }

  public deleteKeyInCache(key: string) {
    this.cache.del(key);
  }

  public clearCache() {
    this.cache.clear();
  }

  public getParsedKey(dependencies: Dependencies): string {
    const key = JSON.stringify(dependencies);
    return `${this.cachePrefix}${key}`;
  }
}

export const configureCacheManager = (app: Application) => {
  const cacheManager = CacheManager.getCacheManager()
  app.set("cacheManager", cacheManager);
};
