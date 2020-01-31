import Sequelize from 'sequelize';

// Import models
import User from '../app/models/Users';
import Recipient from '../app/models/Recipient';

// Import database config
import databaseConfig from '../config/database';

// Create array of models
const models = [User, Recipient];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Start connection with database
    this.connection = new Sequelize(databaseConfig);

    // Set connection with model
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
