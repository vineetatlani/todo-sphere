// Application hooks that run for every service
// Don't remove this comment. It's needed to format import lines nicely.

import { MethodNotAllowed } from "@feathersjs/errors";
import throwError from "./hooks/throw-error";

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [throwError(new MethodNotAllowed("Method not Allowed"))],
    patch: [],
    remove: []
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
