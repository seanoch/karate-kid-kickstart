import { Request, Response } from "express";
import { ITodoModel, ValidationError, DuplicateKeyError } from "../types";
import { TodoItem } from "../../common/types";
export class TodoController {
  constructor(private db: ITodoModel) {}

  getItems = (req: Request<void>, res: Response<Array<TodoItem>>) => {
    this.db
      .getItems(req.cookies.userId)
      .then((items) => res.status(200).send(items));
  };

  createItem = (req: Request<TodoItem>, res: Response<void | Error>) => {
    const item: TodoItem = req.body;
    const userId = req.cookies.userId;

    this.db
      .createItem(userId, item)
      .then((success) => res.sendStatus(201))
      .catch((err) => {
        if (
          err instanceof ValidationError ||
          err instanceof DuplicateKeyError
        ) {
          res.status(400).send(err);
        } else {
          res.status(500).send(err);
        }
      });
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
