import supertest from 'supertest';
import { UserModel } from '../../Models/usersModel';
import app from '../../server';
import bcrypt from 'bcrypt';

const request = supertest(app);
const user = new UserModel();

describe('test the user end point  server', () => {
  ////
  let token: unknown;
  beforeAll(async () => {
    const testuser = await user.create({
      first_name: 'first',
      last_name: 'last',
      password: await bcrypt.hash('password test', await bcrypt.genSalt())
    });
    console.log(testuser);

    const response = await request
      .post('/users/login')
      .send({ user_id: 1, password: 'password test' });
    token = response.body.token;
    console.log(token);
  });

  ////////////
  it('get not found route , should return 404 for bad url ', async () => {
    const response = await request.get('/nonexistent');
    expect(response.statusCode).toEqual(404);
  });

  /////////////////

  it('get user route with no token, should   not authrize ', async () => {
    const response = await request.get('/users/showUser/1');
    expect(response.statusCode).toEqual(401);
  });
  it('get user route with   token, should    authrize ', async () => {
    const response = await request
      .get('/users/showUser/1')
      .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toEqual(200);
  });

  /////////////
  it('get user index route with token, should authrize ', async () => {
    const response = await request
      .get('/users/index ')
      .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toEqual(200);
  });
  it('get user index route with no token, should   not authrize ', async () => {
    const response = await request.get('/users/index ');

    expect(response.statusCode).toEqual(401);
  });
});
