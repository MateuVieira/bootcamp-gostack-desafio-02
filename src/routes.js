import { Router } from 'express';

// Section of Controllers imports
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

// Section of Middleware imports
import autgMiddleware from './app/middleware/auth';

const routes = new Router();

// Route to open a session
routes.post('/sessions', SessionController.store);

// All routes after authMiddleware will pass by a validation od session
routes.use(autgMiddleware);

// Routes /uses
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

// Routes /repicients
routes.get('/repicients', RecipientController.index);
routes.get('/repicients/:id', RecipientController.show);
routes.post('/repicients', RecipientController.store);
routes.put('/repicients', RecipientController.update);
routes.delete('/repicients/:id', RecipientController.delete);

export default routes;
