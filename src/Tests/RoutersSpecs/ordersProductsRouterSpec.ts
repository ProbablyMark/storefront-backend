import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('test the end point server', () => {
  ////

  it('get not found route , should return 404 for bad url ', async () => {
    const response = await request.get('/nonexistent');
    expect(response.statusCode).toEqual(404);
  });

  /////////////////

  it('post order route with no token, should   not authrize ', async () => {
    const response = await request
      .post('/orders/addProduct')
      .send({ orderId: 1, productId: 1 });
    expect(response.statusCode).toEqual(401);
  });

  /////////////
  it('delete order   route with no token, should   not authrize ', async () => {
    const response = await request.delete('/orders/removeProduct ').send({
      orderId: 3,
      productId: 6
    });
    expect(response.statusCode).toEqual(401);
  });
});
