import mongoose, { Schema, Model } from "mongoose";
import { IDBConnection } from "../types";
import { MongoTodoModel } from "./todo_model";
import dotenv from "dotenv";

export class MongoTodoService extends MongoTodoModel implements IDBConnection {
  mongoURI: string;

  constructor() {
    super();

    dotenv.config();
    this.mongoURI = process.env.MONGO_URI || "";
  }

  async setup() {
    try {
      await mongoose.connect(this.mongoURI);
      console.log("MobgoDB is connected!");
    } catch (error) {
      console.log(error);
    }
  }

  async teardown() {
    await mongoose.connection.close();
  }

  async clearDatabase() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }

}
