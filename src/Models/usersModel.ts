import client from '../database';

import { User } from '../Types/users';

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM users`;
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
      const sql = `SELECT * FROM users WHERE id=${id}`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot get user ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO products ( 
        fisrtName,
        lastName,
        password ) values($1,$2,$3) returning *`;
      const result = await connection.query(sql, [
        user.fisrtName,
        user.lastName,
        user.password
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot add user  ${error}`);
    }
  }
}
