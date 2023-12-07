import { NextFunction, Request, Response } from 'express';
import InternalError from '../error/internal';
import ExpenseService from './expense.service';
import { NewExpense } from './expense.model';

export default class ExpenseController {
  service = new ExpenseService();

  async getUserExpense(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;
    try {
      const result = await this.service.getUserExpense(id);
      res.status(200).send({
        result,
      });
    } catch (error) {
      next(new InternalError(error, 'user get expense error'));
    }
  }

  async getUserIncome(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;
    try {
      const result = await this.service.getUserIncome(id);
      res.status(200).send({
        result,
      });
    } catch (error) {
      next(new InternalError(error, 'user get expense error'));
    }
  }

  async getUserSummary(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;
    try {
      const result = await this.service.getSummary(id);
      res.status(200).send({
        result,
      });
    } catch (error) {
      next(new InternalError(error, 'user get summary error'));
    }
  }

  async getFamilySummary(req: Request, res: Response, next: NextFunction) {
    const { familyId } = req.body;
    try {
      const result = await this.service.getFamilySummary(familyId);
      res.status(200).send({
        result,
      });
    } catch (error) {
      next(new InternalError(error, 'user get family summary error'));
    }
  }

  async addExpense(req: Request, res: Response, next: NextFunction) {
    const expense = req.body as NewExpense;

    expense.userId = req.user.id;

    try {
      await this.service.createExpense(expense);
      res.status(200).send({
        result: 'success',
      });
    } catch (error) {
      next(new InternalError(error, 'user create expense error'));
    }
  }

  async addIncome(req: Request, res: Response, next: NextFunction) {
    const expense = req.body as NewExpense;

    expense.userId = req.user.id;

    try {
      await this.service.createIncome(expense);
      res.status(200).send({
        result: 'success',
      });
    } catch (error) {
      next(new InternalError(error, 'user create expense error'));
    }
  }

  async deleteExpense(req: Request, res: Response, next: NextFunction) {
    const { expenseId } = req.body;

    try {
      await this.service.deleteExpense(Number(expenseId));
      res.status(200).send({
        result: 'success',
      });
    } catch (error) {
      next(new InternalError(error, 'user delete expense error'));
    }
  }
}
