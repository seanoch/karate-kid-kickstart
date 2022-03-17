import { Request, Response } from "express";
import { ITodoDAO, ValidationError, DuplicateKeyError } from "../types";
import { TodoItem, guid } from "../../common/types";
import { getUserId } from "../identity.utils";
export class TodoController {
  constructor(private db: ITodoDAO) {}

  getItems = (req: Request, res: Response<Array<TodoItem>>) => {
    this.db
      .getItems(getUserId(req))
      .then((items) => res.status(200).send(items));
  };

  createItem = (
    req: Request<{}, void | Error, TodoItem>,
    res: Response<void | Error>
  ) => {
    const item: TodoItem = req.body;
    const userId = getUserId(req);

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

  editItem = (
    req: Request<{ id: guid }, any, TodoItem>,
    res: Response
  ) => {
    const userId = getUserId(req);
    const item: TodoItem = req.body;

    this.db
      .editItem(userId, item)
      .then((success) => (success ? res.sendStatus(200) : res.sendStatus(400)));
  };

  deleteItem = (
    req: Request<{ id: guid }>,
    res: Response
  ) => {
    this.db
      .deleteItem(getUserId(req), req.params.id)
      .then((success) => (success ? res.sendStatus(200) : res.sendStatus(400)));
  };
}
