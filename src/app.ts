import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
// import { ProductRoutes } from './app/modules/product/product.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
// app.use('/api/products', ProductRoutes);

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Blog Application is Running 🎈');
});

// console.log(process.cwd());
export default app;
