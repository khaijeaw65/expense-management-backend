import pool from '../common/database';

export default class FamilyRepository {
  private db = pool;

  async getUserFamily(userId: number) {
    const sql = `SELECT 
                 families.id as id,
                 name
                 FROM families
                       JOIN family_details fd on families.id = fd.family_id
                       JOIN users u on fd.user_id = u.id
                 WHERE u.id = ?`;

    const families = await this.db.query(sql, userId);

    return families;
  }

  async getFamilyMember(familyId: number, userId: number) {
    const sql = `SELECT 
                 u.id as id,
                 CONCAT_WS(' ', u.first_name, u.last_name) as name,
                 u.username as username
                 FROM families
                       JOIN family_details fd on families.id = fd.family_id
                       JOIN users u on fd.user_id = u.id
                 WHERE families.id = ? AND u.id != ?`;

    const members = await this.db.query(sql, [familyId, userId]);

    return members;
  }

  async insertFamily(name: string, userId: number) {
    const sql = 'INSERT INTO families SET name = ?';

    const { insertId } = await this.db.query(sql, [
      name,
    ]);

    await this.insertFamilyMember(insertId, userId);
  }

  async insertFamilyMember(familyId: number, userId: number) {
    const sql = `INSERT INTO family_details SET
                 family_id = ?,
                 user_id = ?`;

    await this.db.query(sql, [
      familyId,
      userId,
    ]);
  }

  async deleteFamily(familyId: number) {
    const sql = 'DELETE FROM families WHERE id = ? LIMIT 1';
    await this.db.query(sql, familyId);
  }

  async deleteFamilyMember(familyId: number, userId: number) {
    const sql = 'DELETE FROM family_details WHERE family_id = ? AND user_id = ?';

    await this.db.query(sql, [familyId, userId]);
  }
}
