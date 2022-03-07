import mongoose, { Schema, Model } from "mongoose";
import { ITodoModel } from "../types";
import { TodoItem } from "../../common/types"

export class MongoTodoModel implements ITodoModel {
  Todo: Model<TodoItem>;

  constructor() {
    const TodoSchema = new Schema<TodoItem>({
      userId: { type: String, required: true },
      id: { type: String, required: true },
      text: { type: String, required: true },
      check: { type: Boolean, required: true },
    });

    TodoSchema.index({ userId: 1, id: 1 }, { unique: true });

    this.Todo = mongoose.model("Todo", TodoSchema);
  }

  getItems(userId: string): Promise<Array<TodoItem>> {
    const query = { userId: userId };

    return this.Todo.find(query)
      .exec()
      .then((docs) => {
        var items: Array<TodoItem> = [];

        docs.forEach(function (doc) {
          items.push({
            userId: doc.userId,
            id: doc.id,
            text: doc.text,
            check: doc.check,
          });
        });

        return items;
      });
  }

  createItem(item: TodoItem): Promise<boolean> {
    const dbTodoItem = new this.Todo(item);

    return dbTodoItem.save().then(docs => true);
  }

  editItem(item: TodoItem): Promise<boolean> {
    const query = { userId: item.userId, id: item.id };

    return this.Todo.findOneAndUpdate(query, item)
      .exec()
      .then(docs => docs!=null);
  }

  deleteItem(userId: string, itemId: string): Promise<boolean> {
    const query = { userId: userId, id: itemId };

    return this.Todo.deleteOne(query)
      .exec()
      .then(obj => obj.deletedCount==1);
  }
}
