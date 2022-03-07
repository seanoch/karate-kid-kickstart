import dotenv from "dotenv";
import { getApp } from "./app"
import { MongoTodoService } from "./services/todo_service"

dotenv.config();
const port = process.env.PORT || 3000;

const mongodbTodoService = new MongoTodoService();
const app = getApp(mongodbTodoService);

app.listen(port, () => {
    console.log(`My Checklist server listening on port ${port}`);
    mongodbTodoService.setup();
  })