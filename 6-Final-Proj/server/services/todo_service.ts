import mongoose, { Schema, Model } from "mongoose";
import { IDBConnection } from "../types";
import { MongoTodoModel } from "./todo_model";
import dotenv from "dotenv";

dotenv.config();
export class MongoTodoService extends MongoTodoModel implements IDBConnection {
  mongoURI: string;
  connectionAttempts: number;

  constructor() {
    super();
    this.mongoURI = process.env.MONGO_URI || "";
    this.connectionAttempts = 0;
  }

  async setup() {
    let success = false;
    let attempts = 0;

    while (!success && attempts < 2) {
      try {
        await mongoose.connect(this.mongoURI);
        success = true;
      } catch (err) {
        attempts++;
      }
    }

    if (!success) {
      process.exit(1);
    }

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
