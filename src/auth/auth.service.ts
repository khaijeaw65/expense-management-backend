import bcrypt from 'bcrypt';
import UnauthorizedError from '../error/unauthorized';
import TokenManager from './token-manager';
import { NewUser, UserWithOutPassword } from '../user/user.model';
import UserService from '../user/user.service';

export default class AuthService {
  private userService = new UserService();

  private tokenManager = new TokenManager();

  async authentication(username: string, password: string): Promise<{ user: UserWithOutPassword, token: string }> {
    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      throw new UnauthorizedError('invalid credentials');
    }

    const passwordValid = bcrypt.compare(user.password, password);

    if (!passwordValid) {
      throw new UnauthorizedError('invalid credentials');
    }

    const { password: existsPassword, ...userWithoutPassword } = user;

    const token = this.tokenManager.generateToken(userWithoutPassword);

    return {
      user: userWithoutPassword,
      token,
    };
  }

  async register(user: NewUser) {
    const newUser = await this.userService.createUser(user);

    const token = this.tokenManager.generateToken(newUser);

    return {
      user: newUser,
      token,
    };
  }

  async refreshProfile(userId: number) {
    const user = await this.userService.getById(userId);

    const token = this.tokenManager.generateToken(user);

    return {
      user,
      token,
    };
  }
}
