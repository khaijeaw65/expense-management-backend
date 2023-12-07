import UserRepository from '../user/user.repository';
import FamilyRepository from './family.repository';

export default class FamilyService {
  private repo = new FamilyRepository();

  private userRepo = new UserRepository();

  public async getUserFamily(userId: number) {
    return this.repo.getUserFamily(userId);
  }

  public async getFamilyMember(familyId: number, userId: number) {
    return this.repo.getFamilyMember(familyId, userId);
  }

  public async createFamily(name: string, userId: number) {
    return this.repo.insertFamily(name, userId);
  }

  public async createMember(familyId: number, username: string) {
    const user = await this.userRepo.getByUsername(username);
    return this.repo.insertFamilyMember(familyId, user.id);
  }

  public async deleteFamily(familyId: number) {
    return this.repo.deleteFamily(familyId);
  }

  public async removeUserFromFamily(familyId: number, userId: number) {
    return this.repo.deleteFamilyMember(familyId, userId);
  }
}
