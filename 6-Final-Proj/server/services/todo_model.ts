import mongoose, { Schema, Model } from "mongoose";
import { ITodoModel, ValidationError, DuplicateKeyError } from "../types";
import { TodoItem, guid } from "../../common/types";
import { MongoError } from "mongodb";

interface TodoItemDBEntry extends TodoItem {
  userId: guid;
}

const TodoSchema = new Schema<TodoItemDBEntry>({
  userId: { type: String, required: true },
  id: { type: String, required: true },
  text: { type: String, required: true },
  check: { type: Boolean, required: true },
});
export class MongoTodoModel implements ITodoModel {
  model: Model<TodoItemDBEntry>;

  constructor() {
    this.model = mongoose.model("Todo", TodoSchema);
  }

  createIndex() {
    this.model.collection.createIndex({ userId: 1, id: 1 }, { unique: true });
  }

  getItems(userId: guid): Promise<Array<TodoItem>> {
    const query = { userId };

    return this.model
      .find(query)
      .exec()
      .then((docs) => {
        let items: Array<TodoItem> = [];

        items = docs.map(function (doc) {
          return {
            id: doc.id,
            text: doc.text,
            check: doc.check,
          };
        });

        return items;
      });
  }

  createItem(userId: guid, item: TodoItem): Promise<boolean | void> {
    const itemDBEntry: TodoItemDBEntry = {
      userId: userId,
      id: item.id,
      text: item.text,
      check: item.check,
    };
    const dbTodoItem = new this.model(itemDBEntry);

    return dbTodoItem
      .save()
      .then((docs) => true)
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          const messages: Array<string> = Object.values(error.errors).map(
            (err) => err.message
          );
          throw new ValidationError(messages.join("/n"));
        } else if ((error as MongoError).code === 11000) {
          throw new DuplicateKeyError("An item with such ID already exists!");
        } else {
          throw new Error("Something went wrong");
        }
      });
  }

  editItem(userId: guid, item: TodoItem): Promise<boolean> {
    const itemDBEntry: TodoItemDBEntry = {
      userId: userId,
      id: item.id,
      text: item.text,
      check: item.check,
    };
    const query = { userId: userId, id: item.id };

    return this.model
      .findOneAndUpdate(query, itemDBEntry)
      .exec()
      .then((docs) => docs != null);
  }

  deleteItem(userId: guid, itemId: guid): Promise<boolean> {
    const query = { userId: userId, id: itemId };

    return this.model
      .deleteOne(query)
      .exec()
      .then((obj) => obj.deletedCount == 1);
  }
}
