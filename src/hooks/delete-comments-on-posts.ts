// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { ObjectId } from 'mongoose';
import app from '../app';
import logger from '../logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const post = context.params.post;
    deleteAllCommentsOnPost(post._id).catch(err => logger.error);
    return context;
  };
};

async function deleteAllCommentsOnPost(postId: ObjectId) {
  await app.services.comment.Model.deleteMany({
    postId: postId
  })
}