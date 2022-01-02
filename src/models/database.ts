import { MongoClient } from 'mongodb';
import { AlertRepository } from './alerts';

export class Database {
  private client: MongoClient;

  alerts?: AlertRepository;

  constructor(mongoUrl: string, private dbName: string) {
    this.client = new MongoClient(mongoUrl);
  }

  async connect() {
    await this.client.connect();
    const db = this.client.db(this.dbName);

    this.alerts = new AlertRepository(db);
  }
}
