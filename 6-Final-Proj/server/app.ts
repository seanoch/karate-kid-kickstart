import express from "express";
import cookieParser from "cookie-parser";
import { userIdMiddleware } from "./middlewares";
import { ITodoDAO } from "./types";
import { getTodoRouter } from "./routers/todo_router";

export function getApp (db: ITodoDAO) {
  const app: express.Application = express();

  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static("public"));
  app.use(userIdMiddleware);

  app.use("/todos", getTodoRouter(db));

  return app;
}
