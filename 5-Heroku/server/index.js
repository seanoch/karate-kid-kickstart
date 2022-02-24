const express = require('express')
const cookieParser = require('cookie-parser')
const todo_controller = require('./controllers/todo_controller')
const middlewares = require('./middlewares')

const app = express()
const port = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(middlewares.userIdMiddleware);

todo_controller.setup();

app.get('/todos', todo_controller.getItems);

app.post('/todos', todo_controller.createItem);

app.put('/todos/:id', todo_controller.editItem);

app.delete('/todos/:id', todo_controller.deleteItem);

app.listen(port, () => {
  console.log(`My Checklist server listening on port ${port}`)
})
