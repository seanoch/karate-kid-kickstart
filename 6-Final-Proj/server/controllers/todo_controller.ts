import { Request, Response } from "express";
import { ITodoModel } from "../types";
import {TodoItem} from "../../common/types"
export class TodoController {
  db: ITodoModel;

  constructor(db: ITodoModel) {
    this.db = db;
  }

  getItems = (req: Request, res: Response) => {
      return this.db
        .getItems(req.body.userId)
        .then((items) => res.status(200).send(items))
        .catch((err) => res.status(500).send(err));
  }

  createItem = (req: Request, res: Response) => {
      const { id, text, check, userId } : 
      {id:string, text:string, check:boolean, userId:string} = req.body;

      const item: TodoItem = {
        userId: userId, id: id, text: text, check: check
      };

      return this.db
        .createItem(item)
        .then((success) => res.sendStatus(201))
        .catch((err) => res.status(400).send(err));
  }

  editItem = (req: Request, res: Response) => {
      const { id } = req.params;
      const { text, check, userId } : 
      {text:string, check:boolean, userId:string} = req.body;

      const item: TodoItem = {
        userId: userId, id: id, text: text, check: check
      };

      return this.db
        .editItem(item)
        .then((success) => success ? res.sendStatus(200) : res.sendStatus(400))
        .catch((err) => res.status(500).send(err));
  }

  deleteItem = (req: Request, res: Response) => {
      return this.db
        .deleteItem(req.body.userId, req.params.id)
        .then((success) =>  success ? res.sendStatus(200) : res.sendStatus(400))
        .catch((err) => res.status(500).send(err));
  }
}
