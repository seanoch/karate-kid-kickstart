import mongoose, { Schema, Model } from "mongoose";
import { IDBConnection } from "../types";
import { MongoTodoModel } from "./todo_model";
import dotenv from "dotenv";

dotenv.config();
export class MongoTodoService extends MongoTodoModel implements IDBConnection {
  MAX_CONNECTION_ATTEMPTS: number = 2;
  CONNECTION_ATTEMPTS_INTERVAL: number = 5000;
  mongoURI: string;

  constructor() {
    super();
    this.mongoURI = process.env.MONGO_URI || "";
  }

  async sleep(ms: number) {
    await new Promise((r) => setTimeout(r, ms));
  }

  async setup() {
    let attempts: number = 0;
    let connected: boolean = false;

    while (attempts < this.MAX_CONNECTION_ATTEMPTS && !connected) {
      try {
        await mongoose.connect(this.mongoURI);
        connected = true;
      } catch (err) {
        attempts++;
        await this.sleep(this.CONNECTION_ATTEMPTS_INTERVAL);
      }
    }

    if (!connected) {
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
