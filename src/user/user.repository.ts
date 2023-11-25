import { SqlError } from 'mariadb';
import pool from '../common/database';
import { NewUser, User } from './user.model';
import DuplicateUserError from './error/DuplicateUser';

export default class UserRepository {
  db = pool;

  async getByUsername(username: string) {
    const sql = `SELECT 
                 id,
                 username,
                 password,
                 first_name as firstName,
                 last_name as lastName
                 FROM users where username = ?`;

    const [user] = await this.db.query<User[]>(sql, username);

    return user;
  }

  async getById(id: number) {
    const sql = `SELECT 
                 id,
                 username,
                 password,
                 first_name as firstName,
                 last_name as lastName
                 FROM users where id = ?`;

    const [user] = await this.db.query<User[]>(sql, id);

    return user;
  }

  async insertOne(user: NewUser) {
    const sql = `INSERT INTO users SET
                 username = ?,
                 password = ?,
                 first_name = ?,
                 last_name = ?`;

    try {
      const { insertId } = await this.db.query(sql, [
        user.username,
        user.password,
        user.firstName,
        user.lastName,
      ]);

      return insertId;
    } catch (error: unknown) {
      if (error instanceof SqlError && error.code === 'ER_DUP_ENTRY') {
        throw new DuplicateUserError();
      }
      throw error;
    }
  }
}
