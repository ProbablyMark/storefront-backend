import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { errorMiddleWare } from './Middlewares/errorMiddleware';
import cors from 'cors';
import morgan from 'morgan';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

//use morgan
app.use(morgan(':method :url :status :http-version :response-time '));

//use cors
app.use(cors());
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
//routers

//Not found MW
app.use((req: Request, res: Response) => {
  res.status(404);
});
//error MW
app.use(errorMiddleWare);
