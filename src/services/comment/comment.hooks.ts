import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import addCreatedBy from '../../hooks/add-created-by';
import hasCommentWriteAccess from '../../hooks/has-comment-write-access';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [addCreatedBy()],
    update: [],
    patch: [hasCommentWriteAccess()],
    remove: [hasCommentWriteAccess()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
