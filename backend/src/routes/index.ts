import { Router } from 'express';
import userRouter from './users.routes';

const routes = Router();

// Aqui onde fica as rotas que eu quero utilizar;
routes.use('/users', userRouter);

export default routes;
