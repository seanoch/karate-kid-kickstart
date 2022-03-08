import express from "express";
import { ITodoModel } from "../types";
import { TodoController } from "../controllers/todo_controller";

export function getTodoRouter(db: ITodoModel) : express.Router {
  const router = express.Router();
  const controller = new TodoController(db);

  router.get("/", controller.getItems);

  router.post("/", controller.createItem);

  router.put("/:id", controller.editItem);

  router.delete("/:id", controller.deleteItem);

  return router;
}
