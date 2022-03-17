import mongoose, { Schema, Model } from "mongoose";
import { ITodoDAO, ValidationError, DuplicateKeyError } from "../types";
import { TodoItem, guid, UserID } from "../../common/types";
import { MongoError } from "mongodb";

const ASCENDING_INDEX = 1;

interface TodoItemDBEntry extends TodoItem {
  userId: guid;
}

const TodoSchema = new Schema<TodoItemDBEntry>({
  userId: { type: String, required: true },
  id: { type: String, required: true },
  text: { type: String, required: true },
  check: { type: Boolean, required: true },
});

export class MongoTodoDAO implements ITodoDAO {
  model: Model<TodoItemDBEntry>;

  constructor() {
    this.model = mongoose.model("Todo", TodoSchema);
  }

  createIndex() {
    this.model.collection.createIndex(
      { userId: ASCENDING_INDEX, id: ASCENDING_INDEX },
      { unique: true }
    );
  }

  getItems(userId: UserID): Promise<Array<TodoItem>> {
    const query = { userId };

    return this.model
      .find(query)
      .exec()
      .then((docs) => {
        let items: Array<TodoItem> = [];

        items = docs.map(function (doc) {
          const { id, text, check } = doc;
          return {
            id,
            text,
            check,
          };
        });

        return items;
      });
  }

  createItem(userId: UserID, item: TodoItem): Promise<boolean> {
    const { id, text, check } = item;
    const itemDBEntry: TodoItemDBEntry = {
      userId,
      id,
      text,
      check,
    };
    const dbTodoItem = new this.model(itemDBEntry);

    return dbTodoItem
      .save()
      .then(() => true)
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

  editItem(userId: UserID, item: TodoItem): Promise<boolean> {
    const { id, text, check } = item;
    const itemDBEntry: TodoItemDBEntry = {
      userId,
      id,
      text,
      check,
    };
    const query = { userId, id };

    return this.model
      .findOneAndUpdate(query, itemDBEntry)
      .exec()
      .then((docs) => docs != null);
  }

  deleteItem(userId: UserID, itemId: guid): Promise<boolean> {
    const query = { userId: userId, id: itemId };

    return this.model
      .deleteOne(query)
      .exec()
      .then((obj) => obj.deletedCount == 1);
  }
}
