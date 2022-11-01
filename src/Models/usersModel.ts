import client from '../database';

import { User } from '../Types/users';

export class UserModel {
  async index(): Promise<object[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT user_id, first_name, last_name FROM users`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get users ${error}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM users WHERE user_id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot get user ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO users ( 
        first_name,
        last_name,
        password ) VALUES ($1,$2,$3) returning *`;
      const result = await connection.query(sql, [
        user.first_name,
        user.last_name,
        user.password
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot add user  ${error}`);
    }
  }
  async delete(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `DELETE FROM users WHERE user_id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot get user ${error}`);
    }
  }
}
