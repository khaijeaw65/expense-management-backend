import { NextFunction, Request, Response } from 'express';
import FamilyService from './family.service';
import InternalError from '../error/internal';

export default class FamilyController {
  private service = new FamilyService();

  async getUserFamily(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;

    try {
      const result = await this.service.getUserFamily(id);
      res.status(200).send({ result });
    } catch (error) {
      next(new InternalError(error, 'user get family error'));
    }
  }

  async getFamilyMember(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;
    const { familyId } = req.body;

    try {
      const result = await this.service.getFamilyMember(familyId, id);
      res.status(200).send({ result });
    } catch (error) {
      next(new InternalError(error, 'user get family member error'));
    }
  }

  async createFamily(req: Request, res: Response, next: NextFunction) {
    const { userId, name } = req.body;

    try {
      await this.service.createFamily(name, userId);
      res.status(200).send({ result: 'success' });
    } catch (error) {
      next(new InternalError(error, 'create family error'));
    }
  }

  async addFamilyMember(req: Request, res: Response, next: NextFunction) {
    const { familyId, username } = req.body;

    try {
      await this.service.createMember(familyId, username);
      res.status(200).send({ result: 'success' });
    } catch (error) {
      next(new InternalError(error, 'add family member error'));
    }
  }

  async deleteFamily(req: Request, res: Response, next: NextFunction) {
    const { familyId } = req.body;

    try {
      await this.service.deleteFamily(familyId);
      res.status(200).send({ result: 'success' });
    } catch (error) {
      next(new InternalError(error, 'user delete family error'));
    }
  }

  async removeMember(req: Request, res: Response, next: NextFunction) {
    const { userId, familyId } = req.body;

    try {
      await this.service.removeUserFromFamily(familyId, userId);
      res.status(200).send({ result: 'success' });
    } catch (error) {
      next(new InternalError(error, 'leave family error'));
    }
  }
}
