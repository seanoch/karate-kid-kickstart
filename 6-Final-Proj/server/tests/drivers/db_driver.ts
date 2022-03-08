import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoTodoModel } from "../../services/todo_model";
import { IDBConnection } from "../../types";

export class TestTodoService extends MongoTodoModel implements IDBConnection {
  mongoServer: MongoMemoryServer | undefined;

  constructor() {
    super();
  }

  async setup() {
    this.mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(this.mongoServer.getUri());
    this.createIndex();
  }

  async teardown() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await this.mongoServer?.stop();
  }

  async clearDatabase() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}
