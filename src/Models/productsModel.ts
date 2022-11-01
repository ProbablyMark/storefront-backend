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
      const sql = `SELECT * FROM products WHERE product_id=($1)`;
      const result = await connection.query(sql, [id]);
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
        category,times_ordered) VALUES ($1,$2,$3,0) returning *`;
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
      const sql = `SELECT * FROM products WHERE category=($1)`;
      const result = await connection.query(sql, [category]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get products ${error}`);
    }
  }
}
