const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const items = {};

app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.send(items);
})

app.post('/:id', (req, res) => {
  items[req.params.id] = {
    text:  req.body.text,
    check: req.body.check
  };
  res.send(items);
})

app.delete('/:id', (req, res) => {
  delete items[req.params.id]
  res.send(items);
})

app.listen(port, () => {
  console.log(`My Checklist server listening on port ${port}`)
})
