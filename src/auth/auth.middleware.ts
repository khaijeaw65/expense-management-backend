import { NextFunction, Request, Response } from 'express';
import TokenManager from './token-manager';
import UnauthorizedError from '../error/unauthorized';
import { User } from '../user/user.model';

export default class AuthMiddleware {
  tokenManager = new TokenManager();

  validateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers?.authorization;
    if (!authHeader) {
      throw new UnauthorizedError('authorization header not found.');
    }
    const [schema, token] = authHeader.split(' ');

    if (schema !== 'Bearer') {
      throw new UnauthorizedError('invalid token schema');
    }

    if (!token) {
      throw new UnauthorizedError('token not found');
    }

    const decoded = this.tokenManager.verifyToken(token) as User;

    req.user = decoded;
    next();
  }
}
