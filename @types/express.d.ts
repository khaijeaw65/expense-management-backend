import { User } from '../src/user/user.model';

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
