import pool from '../common/database';
import { Expense, NewExpense } from './expense.model';

export default class ExpenseRepository {
  db = pool;

  async getExpenseByUserId(userId: number) {
    const sql = `SELECT
                 id,
                 userId,
                 userFullName,
                 typeId,
                 type,
                 amount,
                 detail,
                 date
                 FROM vExpenses WHERE userId = ? AND typeId = 2`;

    const expenses = this.db.query<Expense[]>(sql, userId);

    return expenses;
  }

  async getIncomeByUserId(userId: number) {
    const sql = `SELECT
                 id,
                 userId,
                 userFullName,
                 typeId,
                 type,
                 amount,
                 detail,
                 date
                 FROM vExpenses WHERE userId = ? AND typeId = 1`;

    const expenses = this.db.query<Expense[]>(sql, userId);

    return expenses;
  }

  async getUserMonthlySummary(userId: number) {
    const sql = `SELECT
                 DATE_FORMAT(date, '%Y-%m') as date,
                 SUM(IF(vexpenses.typeId = 1, vexpenses.amount, null)) as income,
                 SUM(IF(vexpenses.typeId = 2, vexpenses.amount, null)) as expense
                 FROM vexpenses
                 WHERE vexpenses.userId = ?
                 GROUP BY DATE_FORMAT(date, '%Y-%m')
                 ORDER BY DATE_FORMAT(date, '%Y-%m') DESC`;

    const result = await this.db.query(sql, [userId]);

    return result;
  }

  async getUserYearlySummary(userId: number) {
    const sql = `SELECT
                 year,
                 JSON_ARRAYAGG(
                         JSON_OBJECT(
                                 'month', month,
                                 'income', income,
                                 'expense', expense
                             )
                     ) as summary
                  FROM (
                  SELECT
                      YEAR(date) as year,
                      DATE_FORMAT(date, '%M') as month,
                      SUM(IF(vexpenses.typeId = 1, vexpenses.amount, null)) as income,
                      SUM(IF(vexpenses.typeId = 2, vexpenses.amount, null)) as expense
                  FROM vexpenses
                  WHERE userId = ?
                  GROUP BY YEAR(date), DATE_FORMAT(date, '%M')) as data
                  GROUP BY year`;

    const result = await this.db.query(sql, userId);

    return result;
  }

  async getFamilyMonthlySummary(familyId: number) {
    const sql = `SELECT
                 DATE_FORMAT(date, '%Y-%m') as date,
                 SUM(IF(vexpenses.typeId = 1, vexpenses.amount, null)) as income,
                 SUM(IF(vexpenses.typeId = 2, vexpenses.amount, null)) as expense
                 FROM vexpenses
                 JOIN family_details ON vexpenses.userId = family_details.user_id
                 JOIN families f on family_details.family_id = f.id
                 WHERE f.id = ?
                 GROUP BY DATE_FORMAT(date, '%Y-%m')
                 ORDER BY DATE_FORMAT(date, '%Y-%m') DESC`;

    const result = await this.db.query(sql, familyId);

    return result;
  }

  async getFamilyYearlySummary(familyId: number) {
    const sql = `SELECT
                 year,
                 JSON_ARRAYAGG(
                         JSON_OBJECT(
                                 'month', month,
                                 'income', income,
                                 'expense', expense
                             )
                     ) as summary
                 FROM (
                 SELECT
                     YEAR(date) as year,
                     DATE_FORMAT(date, '%M') as month,
                     SUM(IF(vexpenses.typeId = 1, vexpenses.amount, null)) as income,
                     SUM(IF(vexpenses.typeId = 2, vexpenses.amount, null)) as expense
                 FROM vexpenses
                 JOIN family_details ON family_details.user_id = vexpenses.userId
                 JOIN families f on f.id = family_details.family_id
                 WHERE f.id = ?
                 GROUP BY YEAR(date), DATE_FORMAT(date, '%M')) as data
                 GROUP BY year`;

    const result = await this.db.query(sql, familyId);

    return result;
  }

  async insertExpense(expense: NewExpense) {
    const sql = `INSERT INTO expenses SET
                 user_id = ?,
                 detail = ?,
                 amount = ?,
                 date = ?,
                 type_id = 2`;

    await this.db.query(sql, [
      expense.userId,
      expense.detail,
      expense.amount,
      expense.date,
    ]);
  }

  async insertIncome(expense: NewExpense) {
    const sql = `INSERT INTO expenses SET
                 user_id = ?,
                 detail = ?,
                 amount = ?,
                 date = ?,
                 type_id = 1`;

    await this.db.query(sql, [
      expense.userId,
      expense.detail,
      expense.amount,
      expense.date,
    ]);
  }

  async deleteExpense(expenseId: number) {
    const sql = 'DELETE FROM expenses WHERE id = ? LIMIT 1';

    await this.db.query(sql, expenseId);
  }
}
