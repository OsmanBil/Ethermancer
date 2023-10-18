import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  url: string;
  quantity: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get products: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO products (name, description, price, url) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [
        p.name,
        p.description,
        p.price,
        p.url,
      ]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}: ${err}`);
    }
  }

  async update(
    id: number,
    updatedProduct: Partial<Product>,
  ): Promise<Product | null> {
    try {
      const conn = await Client.connect();
      const existingProduct = await this.findById(id);

      if (!existingProduct) {
        throw new Error(`Product with ID ${id} not found.`);
      }
      const mergedProduct: Product = { ...existingProduct, ...updatedProduct };
      const sql =
        'UPDATE products SET name = $1, description = $2, price = $3, url = $4 WHERE id = $5 RETURNING *';
      const result = await conn.query(sql, [
        mergedProduct.name,
        mergedProduct.description,
        mergedProduct.price,
        mergedProduct.url,
        id,
      ]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Unable to update product (ID: ${id}): ${err}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}: ${err}`);
    }
  }

  async findById(id: number): Promise<Product | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id = $1';
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(`Unable to find product (ID: ${id}): ${err}`);
    }
  }
}
