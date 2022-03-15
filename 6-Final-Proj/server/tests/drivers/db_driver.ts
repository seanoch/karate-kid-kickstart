import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoTodoDAO } from "../../model/todo_dao";
import { IDBConnection } from "../../types";

export class InMemoryMongoTodo extends MongoTodoDAO implements IDBConnection {
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
