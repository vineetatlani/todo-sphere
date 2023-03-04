// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { CacheManager } from '../helpers/cache-manager';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { query } = context.params;
    const cacheManager: CacheManager = context.app.get("cacheManager");
    const others: any = {
      ...query,
    };

    if (context.id) {
      others.id = context.id;
    }

    const key = cacheManager.getParsedKey({
      path: context.path,
      method: context.method,
      paginate: context.params.paginate,
      others: others,
    });

    context.params.cacheKey = key;

    return context;
  };
};
