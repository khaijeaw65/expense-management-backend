import AuthRouter from './auth/auth.routes';
import RouterBase from './common/router.base';

export default class AppRouter extends RouterBase {
  private authRouter = new AuthRouter();

  constructor() {
    super();
    this.setupEndpoint();
  }

  protected setupEndpoint(): void {
    this.router.get('/', (req, res) => res.send('eiei'));
    this.router.use('/auth', this.authRouter.getRouter());
  }
}
