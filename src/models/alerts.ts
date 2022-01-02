import { Collection, Db, ObjectId } from 'mongodb';

export class Alert {
  readonly _id?: ObjectId;

  constructor(
    public timestamp: number,
    public type: string,
    public username: string,
    public amount?: number
  ) {}
}

export class AlertRepository {
  private collection: Collection<Alert>;

  constructor(private db: Db) {
    this.collection = db.collection('alerts');
    this.collection.createIndex({ timestamp: -1 });
    this.collection.createIndex({ type: 1, username: 1 });
  }

  async insert(alert: Alert) {
    this.collection.insertOne(alert);
  }

  async findOne(type: string, username: string) {
    return await this.collection.findOne({ type, username });
  }

  async query(opts: { type: string; minimum: number }[], limit: number) {
    const filter: { $and: [{ type: string }, { amount: { $gte: number } }] }[] =
      [];

    opts.forEach((limit) => {
      filter.push({
        $and: [{ type: limit.type }, { amount: { $gte: limit.minimum } }],
      });
    });

    return await this.collection
      .find({
        $or: filter,
      })
      .limit(limit)
      .sort({ timestamp: -1 })
      .toArray();
  }
}
