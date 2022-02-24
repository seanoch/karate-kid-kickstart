const todo_service = require("../services/todo_service");

const setup = () => todo_service.setup();

const getItems = (req, res) =>
  todo_service
    .getItems(req.userId)
    .then((items) => res.status(200).send(items))
    .catch((err) => res.status(500).send(err));

const createItem = (req, res) => {
  const { id, text, check } = req.body;
  const { userId } = req;

  return todo_service
    .createItem(userId, id, text, check)
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(500).send(err));
};

const editItem = (req, res) => {
  const { id } = req.params;
  const { text, check } = req.body;
  const { userId } = req;

  return todo_service
    .editItem(userId, id, text, check)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
};

const deleteItem = (req, res) =>
  todo_service
    .deleteItem(req.userId, req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));

module.exports = {
    setup,
    getItems,
    createItem,
    editItem,
    deleteItem
}