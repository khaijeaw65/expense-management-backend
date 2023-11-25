import { Router } from 'express';
import AuthMiddleware from '../auth/auth.middleware';

export default abstract class RouterBase {
  protected router = Router();

  protected authMiddleware = new AuthMiddleware();

  protected abstract setupEndpoint(): void;

  public getRouter() {
    return this.router;
  }
}
