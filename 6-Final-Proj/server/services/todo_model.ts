import mongoose, { Schema, Model } from "mongoose";
import { ITodoModel } from "../types";
import { TodoItem } from "../../common/types";

const TodoSchema = new Schema<TodoItem>({
  userId: { type: String, required: true },
  id: { type: String, required: true },
  text: { type: String, required: true },
  check: { type: Boolean, required: true },
});
export class MongoTodoModel implements ITodoModel {
  model: Model<TodoItem>;

  constructor() {
    this.model = mongoose.model("Todo", TodoSchema);
  }

  createIndex() {
    this.model.collection.createIndex({ userId: 1, id: 1 }, { unique: true });
  }

  getItems(userId: string): Promise<Array<TodoItem>> {
    const query = { userId };

    return this.model.find(query)
      .exec()
      .then((docs) => {
        let items: Array<TodoItem> = [];

        items = docs.map(function (doc) {
          return {
            userId: doc.userId,
            id: doc.id,
            text: doc.text,
            check: doc.check,
          };
        });

        return items;
      });
  }

  createItem(item: TodoItem): Promise<boolean> {
    const dbTodoItem = new this.model(item);

    return dbTodoItem.save().then((docs) => true);
  }

  editItem(item: TodoItem): Promise<boolean> {
    const query = { userId: item.userId, id: item.id };

    return this.model.findOneAndUpdate(query, item)
      .exec()
      .then((docs) => docs != null);
  }

  deleteItem(userId: string, itemId: string): Promise<boolean> {
    const query = { userId: userId, id: itemId };

    return this.model.deleteOne(query)
      .exec()
      .then((obj) => obj.deletedCount == 1);
  }
}
