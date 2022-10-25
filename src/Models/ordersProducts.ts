import client from '../database';

import { OrdersProducts } from '../Types/ordersProducts';

export class OrdersProductsModel {
  async addProductToOrder(
    orderId: number,
    productId: number
  ): Promise<OrdersProducts> {
    try {
      const connection = await client.connect();
      const sql = [
        `INSERT INTO orders_products (order_id, product_id  ) VALUES ($1,$2) returning *; `,
        ` UPDATE products
        SET times_ordered = times_ordered +1
             
        WHERE product_id = $1  returning *;
        `
      ];
      const result1 = await connection.query(sql[0], [orderId, productId]);
      const result2 = await connection.query(sql[1], [productId]);
      connection.release();
      return result1.rows[0], result2.rows[0];
    } catch (error) {
      throw new Error(`cannot add product to order xxx ${error} xxx`);
    }
  }

  async removeProductFromOrder(
    orderId: number,
    productId: number
  ): Promise<void> {
    try {
      const connection = await client.connect();
      const sql = [
        `
        
        
        DELETE TOP 1 FROM orders_products WHERE order_id = $1 AND product_id = $2  returning *`,
        `UPDATE products
        SET times_ordered = times_ordered -1 
             
        WHERE product_id = $1;
        `
      ];
      const result1 = await connection.query(sql[0], [orderId, productId]);
      const result2 = await connection.query(sql[1], [productId]);
      connection.release();
      return result1.rows[0], result2.rows[0];
    } catch (error) {
      throw new Error(`cannot remove product to order  ${error}`);
    }
  }
}
