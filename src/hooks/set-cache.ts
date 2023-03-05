// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { CacheManager } from '../helpers/cache-manager';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const key = context.params.cacheKey;
    const cacheUsed = context.params.cacheUsed;

    if (!key || cacheUsed) {
      return context;
    }
    
    const cacheManager: CacheManager = context.app.get("cacheManager");
    cacheManager.setObject(key, context.result);
  
    return context;
  };
};
