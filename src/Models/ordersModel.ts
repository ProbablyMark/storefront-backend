import client from '../database';
import { Order } from '../Types/orders';

export class OrderModel {
  async currentOrder(id: number): Promise<object> {
    try {
      const connection = await client.connect();
      const sql = [
        `SELECT * FROM orders WHERE order_id=($1)`,
        `SELECT product_id FROM orders_products WHERE order_id=($1)`
      ];
      const result1 = await connection.query(sql[0], [id]);
      const result2 = await connection.query(sql[1], [id]);
      connection.release();
      return { order: result1.rows[0], orderProducts: result2.rows };
    } catch (error) {
      throw new Error(`cannot get order ${error}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO orders ( 
        user_id,
        
        status ) values($1,'active' ) returning *`;
      const result = await connection.query(sql, [order.userId]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot add order  ${error}`);
    }
  }

  async completedOrders(userId: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1) AND status=completed`;
      const result = await connection.query(sql, [userId]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get order ${error}`);
    }
  }
}
