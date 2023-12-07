import AuthRouter from './auth/auth.routes';
import RouterBase from './common/router.base';
import ExpenseRouter from './expense/expense.routes';
import FamilyRouter from './family/family.routes';

export default class AppRouter extends RouterBase {
  private authRouter = new AuthRouter();

  private expenseRouter = new ExpenseRouter();

  private familyRouter = new FamilyRouter();

  constructor() {
    super();
    this.setupEndpoint();
  }

  protected setupEndpoint(): void {
    this.router.use('/auth', this.authRouter.getRouter());
    this.router.use('/expenses', this.expenseRouter.getRouter());
    this.router.use('/families', this.familyRouter.getRouter());
  }
}
