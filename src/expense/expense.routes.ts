import RouterBase from '../common/router.base';
import ExpenseController from './expense.controller';

export default class ExpenseRouter extends RouterBase {
  private controller = new ExpenseController();

  constructor() {
    super();
    this.router.use(this.authMiddleware.validateToken.bind(this.authMiddleware));
    this.setupEndpoint();
  }

  protected setupEndpoint(): void {
    this.router.post('/getFamilySummary', this.controller.getFamilySummary.bind(this.controller));

    this.router.get('/getUserSummary', this.controller.getUserSummary.bind(this.controller));

    this.router.get('/getUserExpense', this.controller.getUserExpense.bind(this.controller));

    this.router.get('/getUserIncome', this.controller.getUserIncome.bind(this.controller));

    this.router.post('/addExpense', this.controller.addExpense.bind(this.controller));

    this.router.post('/addIncome', this.controller.addIncome.bind(this.controller));

    this.router.post('/deleteExpense', this.controller.deleteExpense.bind(this.controller));
  }
}
