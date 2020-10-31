import { Router } from 'express';
import userRouter from './users.routes';
import roleRouter from './roles.routes';

const routes = Router();

// Aqui onde fica as rotas que eu quero utilizar;
routes.use('/users', userRouter);
routes.use('/roles', roleRouter);

export default routes;
