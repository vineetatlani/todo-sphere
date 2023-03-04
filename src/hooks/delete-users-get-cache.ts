// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { CacheManager } from '../helpers/cache-manager';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const cacheManager: CacheManager = context.app.get("cacheManager");

    const key = cacheManager.getParsedKey({
      path: 'users',
      method: 'get',
      others: {
        id: context.id,
      }    
    });

    cacheManager.deleteKeyInCache(key);

    return context;
  };
};
