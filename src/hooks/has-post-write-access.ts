// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Forbidden, NotFound } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
import app from '../app';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const post = await app.services.post._get(context.id as string);

    context.params.post = post;
    if (!context.params.user?._id.toString() === post.createdBy) {
      throw new Forbidden("Access Not Allowed");
    }
    return context;
  };
};
