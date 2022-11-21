import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('test the auth end point server', () => {
  ////

  it('get not found route , should return 404 for bad url ', async () => {
    const response = await request.get('/nonexistent');
    expect(response.statusCode).toEqual(404);
  });

  /////////////////

  it('get log in route with no user, should   not authrize ', async () => {
    const response = await request.get('/users/login');
    expect(response.statusCode).toEqual(404);
  });

  /////////////
});
