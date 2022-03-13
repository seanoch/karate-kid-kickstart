import { Request, Response } from "express";
import { ITodoModel } from "../types";
import { TodoItem } from "../../common/types";
export class TodoController {
  constructor(private db: ITodoModel) {}

  getItems = (req: Request<void>, res: Response<Array<TodoItem>>) => {
    this.db
      .getItems(req.cookies.userId)
      .then((items) => res.status(200).send(items));
  };

  createItem = (req: Request<TodoItem>, res: Response<void>) => {
    const item: TodoItem = req.body;
    const userId = req.cookies.userId;

    this.db
      .createItem(userId, item)
      .then((success) => res.sendStatus(201))
      .catch((err) => res.status(400).send(err));
  };

  editItem = (req: Request<TodoItem>, res: Response<void>) => {
    const userId = req.cookies.userId;
    const item: TodoItem = req.body;

    this.db
      .editItem(userId, item)
      .then((success) => (success ? res.sendStatus(200) : res.sendStatus(400)));
  };

  deleteItem = (req: Request<TodoItem>, res: Response<void>) => {
    this.db
      .deleteItem(req.cookies.userId, req.params.id)
      .then((success) => (success ? res.sendStatus(200) : res.sendStatus(400)));
  };
}
