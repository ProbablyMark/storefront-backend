import client from '../database';
import { Order } from '../Types/orders';

export class OrderModel {
  async currentOrder(id: number): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM orders WHERE id=${id}`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot get order ${error}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO orders ( 
        userId,
        products,
        status ) values($1,$2,$3) returning *`;
      const result = await connection.query(sql, [
        order.userId,
        order.products,
        order.status
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot add order  ${error}`);
    }
  }

  async completedOrders(userId: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM orders WHERE userId=${userId} AND status=completed`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get order ${error}`);
    }
  }
}
