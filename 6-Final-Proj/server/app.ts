import express from "express";
import cookieParser from "cookie-parser";
import * as todoController from "./controllers/todo_controller";
import { userIdMiddleware } from "./middlewares";
import { ITodoModel } from "./types";

export function getApp (db: ITodoModel) {
  const app: express.Application = express();
  const controller = new todoController.TodoController(db);

  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static("public"));
  app.use(userIdMiddleware);

  app.get("/todos", controller.getItems);

  app.post("/todos", controller.createItem);

  app.put("/todos/:id", controller.editItem);

  app.delete("/todos/:id", controller.deleteItem);

  return app;
}
