import express from 'express';

// Import database - start connection with database
import './database';

// Import Routes
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    // Initialize Middleware and Routes
    this.middleware();
    this.routes();
  }

  middleware() {
    // Set config to server understand json
    this.server.use(express.json());
  }

  routes() {
    // Pass routes to server
    this.server.use(routes);
  }
}

export default new App().server;
