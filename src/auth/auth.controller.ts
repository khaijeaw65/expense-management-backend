import { Request, Response, NextFunction } from 'express';
import AuthService from './auth.service';
import InternalError from '../error/internal';
import { NewUser } from '../user/user.model';

export default class AuthController {
  private service = new AuthService();

  async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    try {
      const result = await this.service.authentication(username, password);
      res.status(200).send({
        result,
      });
    } catch (error) {
      next(new InternalError(error, 'authentication error'));
    }
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    const user: NewUser = req.body;

    try {
      const result = await this.service.register(user);
      res.status(200).send({
        result,
      });
    } catch (error) {
      next(new InternalError(error, 'register error'));
    }
  }

  public async getProfile(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;

    try {
      const result = await this.service.refreshProfile(id);
      res.status(200).send({
        result,
      });
    } catch (error) {
      next(new InternalError(error, 'register error'));
    }
  }
}
