import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import autgMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// All routes after authMiddleware will be need a token
routes.use(autgMiddleware);

routes.put('/users', UserController.update);

routes.post('/repicients', RecipientController.store);
routes.put('/repicients', RecipientController.update);

export default routes;
