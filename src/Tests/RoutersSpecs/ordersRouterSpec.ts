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

  it('get order route with no token, should   not authrize ', async () => {
    const response = await request.get('/orders/currentOrder/1');
    expect(response.statusCode).toEqual(401);
  });

  /////////////
  it('get order index route with no token, should   not authrize ', async () => {
    const response = await request.get('/orders/yourOrders/1 ');
    expect(response.statusCode).toEqual(401);
  });
});
