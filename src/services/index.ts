import { Application } from '../declarations';
import users from './users/users.service';
import post from './post/post.service';
import comment from './comment/comment.service';
import todo from './todo/todo.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(post);
  app.configure(comment);
  app.configure(todo);
}
