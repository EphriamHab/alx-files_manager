// eslint-disable-next-line no-unused-vars
import { MongoClient } from 'mongodb';
import envLoader from './env_loader';

/**
 * Represents a MongoDB client.
 */
class DBClient {
  /**
   * Creates a new DBClient instance.
   */
  constructor() {
    envLoader();
    // eslint-disable-next-line no-undef
    const host = process.env.DB_HOST || 'localhost';
    // eslint-disable-next-line no-undef
    const port = process.env.DB_PORT || 27017;
    // eslint-disable-next-line no-undef
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(dbURL, { useUnifiedTopology: true });
  }

  /**
   * Establishes a connection to the MongoDB server.
   * @returns {Promise<void>}
   */
  async connect() {
    try {
      await this.client.connect();
      // eslint-disable-next-line no-undef
      console.log('Connected to MongoDB');
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  /**
   * Checks if this client's connection to the MongoDB server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    await this.connect(); // Ensure connection before performing operations
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * Retrieves the number of files in the database.
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    await this.connect(); // Ensure connection before performing operations
    return this.client.db().collection('files').countDocuments();
  }

  /**
   * Retrieves a reference to the `users` collection.
   * @returns {Promise<Collection>}
   */
  async usersCollection() {
    await this.connect(); // Ensure connection before performing operations
    return this.client.db().collection('users');
  }

  /**
   * Retrieves a reference to the `files` collection.
   * @returns {Promise<Collection>}
   */
  async filesCollection() {
    await this.connect(); // Ensure connection before performing operations
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
