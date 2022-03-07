import mongoose, { Schema, Model } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoTodoModel } from "../../services/todo_model";
import { IDBConnection } from "../../types";

export class TestTodoService extends MongoTodoModel implements IDBConnection {
  mongoServer: MongoMemoryServer | undefined;

  constructor() {
    super();
  }

  async setup() {
    try {
      this.mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(this.mongoServer.getUri());
    } catch (e) {
      console.log(e);
    }
  }

  async teardown() {
    await mongoose.connection.dropDatabase();
    delete mongoose.connection.models["Todo"];
    await mongoose.connection.close();

    if (this.mongoServer) {
      await this.mongoServer.stop();
    }
  }

  async clearDatabase() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}
