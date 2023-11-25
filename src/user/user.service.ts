import bcrypt from 'bcrypt';
import UserRepository from './user.repository';
import { NewUser } from './user.model';

export default class UserService {
  repo = new UserRepository();

  async getUserByUsername(username: string) {
    return this.repo.getByUsername(username);
  }

  async getById(userId: number) {
    const user = await this.repo.getById(userId);

    const { password: userPass, ...existsUser } = user;

    return existsUser;
  }

  async createUser(user: NewUser) {
    const data = { ...user };
    const encryptPassword = await bcrypt.hash(data.password, 10);

    const newUser = { ...data, password: encryptPassword };

    const userId = await this.repo.insertOne(newUser);

    const createdUser = { id: userId, ...data };

    return createdUser;
  }
}
