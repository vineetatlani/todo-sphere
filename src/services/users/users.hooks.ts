import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { discard, iff, isNot, isProvider } from "feathers-hooks-common";
import { Forbidden, MethodNotAllowed } from "@feathersjs/errors"
import throwError from '../../hooks/throw-error';
import { UserRoles } from '../../models/users.model';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

const isCurrentUser = (context: any) => context.params.user?._id.equals(context.id);
export const isAdmin =  (context: any) =>
  context.params.user && context.params.user.role === UserRoles.ADMIN;

export default {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ iff(isProvider("external"), discard("role")), hashPassword('password') ],
    update: [ throwError(new MethodNotAllowed("Method Not Allowed")) ],
    patch: [ hashPassword('password'),  authenticate('jwt'), iff(
      isNot(isAdmin),
      iff(isProvider("external"), discard("role")),
      iff(isNot(isCurrentUser), throwError(new Forbidden("Access Not Allowed"))))
    ],
    remove: [ throwError(new MethodNotAllowed("Method Not Allowed")) ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
