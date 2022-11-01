import { UserModel } from '../../Models/usersModel';

const user = new UserModel();

describe('test the user Model', () => {
  ////

  it('should have an index method', () => {
    expect(user.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(user.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(user.create).toBeDefined();
  });

  /////////////////
  it('create method should add a user', async () => {
    const result = await user.create({
      first_name: 'first',
      last_name: 'last',
      password: 'password test'
    }); //to return a user obj
    expect(typeof result).toEqual('object');
  });

  it('index method should return an array of users created', async () => {
    const result = await user.index();
    expect(result).toBeInstanceOf(Array); //to return a user array
  });

  it('show method should return the correct user', async () => {
    const result = await user.show(1);
    expect(typeof result).toEqual('object'); //to return a user obj
  });

  /////////////
});
