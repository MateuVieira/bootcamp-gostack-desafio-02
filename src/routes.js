import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import autgMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// All routes after authMiddleware will be need a token
routes.use(autgMiddleware);

routes.put('/users', UserController.update);

export default routes;
