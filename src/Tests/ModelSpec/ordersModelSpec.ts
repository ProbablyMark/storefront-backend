import { OrderModel } from '../../Models/ordersModel';
import { UserModel } from '../../Models/usersModel';

const order = new OrderModel();
const user = new UserModel();
describe('test the order Model', () => {
  ////
  beforeAll(async () => {
    await user.create({
      first_name: 'first',
      last_name: 'last',
      password: 'password test'
    });
  });

  it('should have an completedOrders method', () => {
    expect(order.completedOrders).toBeDefined();
  });

  it('should have a create method', () => {
    expect(order.create).toBeDefined();
  });

  it('should have a currentOrder method', () => {
    expect(order.currentOrder).toBeDefined();
  });

  /////////////////
  it('create method should add an order', async () => {
    const result = await order.create(1); //to return a order obj
    expect(result).toEqual({
      order_id: 1,

      user_id: 1,
      status: 'active'
    });
  });

  it('index method should return an array of orders completed for userid 1', async () => {
    const result = await order.completedOrders(1);
    expect(result).toEqual([]); //to return a order array
  });

  /////////////
});
