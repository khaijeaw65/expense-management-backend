import RouterBase from '../common/router.base';
import AuthController from './auth.controller';

export default class AuthRouter extends RouterBase {
  protected controller = new AuthController();

  constructor() {
    super();
    this.setupEndpoint();
  }

  protected setupEndpoint(): void {
    this.router.post('/login', this.controller.login.bind(this.controller));

    this.router.post('/register', this.controller.register.bind(this.controller));

    this.router.get(
      '/profile',
      this.authMiddleware.validateToken.bind(this.authMiddleware),
      this.controller.getProfile.bind(this.controller),
    );
  }
}
