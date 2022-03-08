import mongoose, { Schema, Model } from "mongoose";
import { IDBConnection } from "../types";
import { MongoTodoModel } from "./todo_model";
import dotenv from "dotenv";

dotenv.config();
export class MongoTodoService extends MongoTodoModel implements IDBConnection {
  mongoURI: string;

  constructor() {
    super();
    this.mongoURI = process.env.MONGO_URI || "";
  }

  async setup() {
    await mongoose.connect(this.mongoURI);
    this.createIndex();
  }

  teardown() {
    return mongoose.connection.close();
  }

  async clearDatabase() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}
