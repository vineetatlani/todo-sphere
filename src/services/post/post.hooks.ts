import * as authentication from "@feathersjs/authentication";
import hasPostWriteAccess from "../../hooks/has-post-write-access";
import addCreatedBy from "../../hooks/add-created-by";
import deleteCommentsOnPosts from "../../hooks/delete-comments-on-posts";
import { disallow } from "feathers-hooks-common";
import generateCacheKey from "../../hooks/generate-cache-key";
import getFromCache from "../../hooks/get-from-cache";
import setCache from "../../hooks/set-cache";
import deletePostGetCache from "../../hooks/delete-post-get-cache";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [generateCacheKey(), getFromCache()],
    create: [addCreatedBy()],
    update: [],
    patch: [hasPostWriteAccess()],
    remove: [hasPostWriteAccess(), deleteCommentsOnPosts()],
  },

  after: {
    all: [],
    find: [],
    get: [setCache()],
    create: [],
    update: [],
    patch: [deletePostGetCache()],
    remove: [deletePostGetCache()],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
