import dotenv from "dotenv";
import { getApp } from "./app";
import { AtlasMongoTodo } from "./model/todo_atlas";

dotenv.config();
const port = process.env.PORT || 3000;

const mongodbTodoService = new AtlasMongoTodo();
const app = getApp(mongodbTodoService);

app.listen(port, () => {
    console.log(`My Checklist server listening on port ${port}`);
    mongodbTodoService.setup();
  })