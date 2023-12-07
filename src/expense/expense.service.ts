import { NewExpense } from './expense.model';
import ExpenseRepository from './expense.repository';

export default class ExpenseService {
  repo = new ExpenseRepository();

  async getSummary(userId: number) {
    const monthly = await this.repo.getUserMonthlySummary(userId);
    const yearly = await this.repo.getUserYearlySummary(userId);

    return {
      monthly,
      yearly,
    };
  }

  async getFamilySummary(familyId: number) {
    const monthly = await this.repo.getFamilyMonthlySummary(familyId);
    const yearly = await this.repo.getFamilyYearlySummary(familyId);

    return {
      monthly,
      yearly,
    };
  }

  async getUserExpense(userId: number) {
    return this.repo.getExpenseByUserId(userId);
  }

  async getUserIncome(userId: number) {
    return this.repo.getIncomeByUserId(userId);
  }

  async createExpense(expense: NewExpense) {
    return this.repo.insertExpense(expense);
  }

  async createIncome(income: NewExpense) {
    return this.repo.insertIncome(income);
  }

  async deleteExpense(expenseId: number) {
    return this.repo.deleteExpense(expenseId);
  }
}
