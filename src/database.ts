import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const {
  POSTGRES_TEST_DB,
  ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD
} = process.env;
// let client = new Pool();
// if (ENV === 'dev') {
//   client = new Pool({
//     host: POSTGRES_HOST,
//     database: POSTGRES_DB,
//     user: POSTGRES_USER,
//     password: POSTGRES_PASSWORD
//   });
// }
// if (ENV === 'test') {
//   client = new Pool({
//     host: POSTGRES_HOST,
//     database: POSTGRES_TEST_DB,
//     user: POSTGRES_USER,
//     password: POSTGRES_PASSWORD
//   });
// }
const client: Pool =
  ENV === 'test'
    ? new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
      })
    : new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
      });
export default client;
