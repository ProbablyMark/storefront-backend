import { ProductModel } from '../../Models/productsModel';

const product = new ProductModel();

describe('test the product Model', () => {
  ////

  it('should have an index method', () => {
    expect(product.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(product.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(product.create).toBeDefined();
  });
  it('should have a showByCategory method', () => {
    expect(product.showByCategory).toBeDefined();
  });

  /////////////////
  it('create method should add a product', async () => {
    const result = await product.create({
      name: 'product',
      price: 20,
      category: 'category'
    }); //to return a product obj
    expect(result).toEqual({
      product_id: 1,
      name: 'product',
      price: 20,
      category: 'category',
      times_ordered: 0
    });
  });

  it('index method should return an array of products created', async () => {
    const result = await product.index();
    expect(result).toEqual([
      {
        product_id: 1,
        name: 'product',
        price: 20,
        category: 'category',
        times_ordered: 0
      }
    ]); //to return a product array
  });

  it('showByCategory method should return an array of products of specific category', async () => {
    const result = await product.showByCategory('category');
    expect(result).toEqual([
      {
        product_id: 1,
        name: 'product',
        price: 20,
        category: 'category',
        times_ordered: 0
      }
    ]); //to return a product array
  });

  it('show method should return the correct product', async () => {
    const result = await product.show(1);
    expect(result).toEqual({
      product_id: 1,
      name: 'product',
      price: 20,
      category: 'category',
      times_ordered: 0
    }); //to return a product obj
  });

  /////////////
});
