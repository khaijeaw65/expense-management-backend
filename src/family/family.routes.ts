import RouterBase from '../common/router.base';
import FamilyController from './family.controller';

export default class FamilyRouter extends RouterBase {
  private controller = new FamilyController();

  constructor() {
    super();
    this.router.use(this.authMiddleware.validateToken.bind(this.authMiddleware));
    this.setupEndpoint();
  }

  protected setupEndpoint(): void {
    this.router.get('/getUserFamily', this.controller.getUserFamily.bind(this.controller));

    this.router.post('/getFamilyMember', this.controller.getFamilyMember.bind(this.controller));

    this.router.post('/createFamily', this.controller.createFamily.bind(this.controller));

    this.router.post('/addMember', this.controller.addFamilyMember.bind(this.controller));

    this.router.post('/removeMember', this.controller.removeMember.bind(this.controller));

    this.router.post('/deleteFamily', this.controller.deleteFamily.bind(this.controller));
  }
}
