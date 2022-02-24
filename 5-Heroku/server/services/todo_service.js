const mongoose = require("mongoose");
require("dotenv").config();

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  user_id: String,
  id: String,
  text: String,
  check: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

const MONGO_URI = process.env.MONGO_URI;

module.exports.setup = () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("MobgoDB is connected!");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};

module.exports.getItems = (userId) => {
  const query = { user_id: userId };

  return Todo.find(query)
    .exec()
    .then((docs) => {
      var items = [];

      docs.forEach(function (doc) {
        items.push({
          id: doc.id,
          text: doc.text,
          check: doc.check,
        });
      });

      return items;
    })
    .catch((error) => error);
};

module.exports.createItem = (userId, itemId, text, check) => {
  const dbTodoItem = new Todo({
    user_id: userId,
    id: itemId,
    text: text,
    check: check
  });

  return dbTodoItem.save()
    .catch((error) => error);
};

module.exports.editItem = (userId, itemId, text, check) => {
  const query = { user_id: userId, id: itemId };
  const item = { 
    user_id: userId,
    id: itemId,
    text: text,
    check: check
  };

  return Todo.findOneAndUpdate(query, item)
    .exec()
    .catch((error) => error);
};

module.exports.deleteItem = (userId, itemId) => {
  const query = { user_id: userId, id: itemId };

  return Todo.deleteOne(query)
    .exec()
    .catch((error) => error);
};
