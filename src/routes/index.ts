// src/routes/index.ts
import { Router, request, response } from 'express';
import appointments from './appointments';
import users from './users';
import sessions from './sessions';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', users);
routes.use('/sessions', sessions);

export default routes;
