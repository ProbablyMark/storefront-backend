import client from '../database';
import { Product } from '../Types/products';

export class ProductModel {
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM products`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get products ${error}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM products WHERE id=${id}`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot get product ${error}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO products ( 
        name,
        price,
        category,) values($1,$2,$3) returning *`;
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot add product  ${error}`);
    }
  }

  async showByCategory(category: string): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM products WHERE category=${category}`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get products ${error}`);
    }
  }
}
