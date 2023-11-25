import jwt from 'jsonwebtoken';
import config from '../common/config';

export default class TokenManager {
  private secretKey = config.app.authenKey;

  verifyToken(token: string) {
    return jwt.verify(token, this.secretKey);
  }

  generateToken(data: string | object) {
    return jwt.sign(data, this.secretKey, {
      expiresIn: '10h',
    });
  }
}
