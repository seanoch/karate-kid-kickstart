const todo_service = require('../services/todo_service');

module.exports.setup = () => todo_service.setup();

module.exports.getItems = (req, res) => 
todo_service.getItems(req.userId)
.then((items) => res.status(200).send(items))
.catch((err) => res.status(500).send(err));

module.exports.createItem = (req, res) => 
todo_service.createItem(
    req.userId,
    req.body.id,
    req.body.text,
    req.body.check,
)
.then(() => res.sendStatus(201))
.catch((err) => res.status(500).send(err));

module.exports.editItem = (req, res) => 
todo_service.editItem(
    req.userId,
    req.params.id,
    req.body.text,
    req.body.check,
)
.then(() => res.sendStatus(200))
.catch((err) => res.status(500).send(err));

module.exports.deleteItem = (req, res) => 
todo_service.deleteItem(req.userId, req.params.id)
.then(() => res.sendStatus(200))
.catch((err) => res.status(500).send(err));