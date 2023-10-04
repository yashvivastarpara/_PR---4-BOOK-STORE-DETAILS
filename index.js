const express = require("express");
const connect = require("./database");
const schema = require("./schema");
const { check } = require("./check");
const app = express();
app.use(express.json());

let port = 8090

app.get("/", (req, res) => {
  res.status(200).send("welcome to the book store");
});

app.get("/books/book/:id", async (req, res) => {
  let { id } = req.params;
  let book = await schema.findById(id);
  if (book) {
    res.status(200).send(book);
  } else {
    res.status(404).send("error");
  }
});

app.delete("/books/book/:id", async (req, res) => {
  let { id } = req.params;
  let delet = await schema.findByIdAndDelete(id);
  let data = await schema.find();
  console.log(delet);
  res.send(data);
});

app.get("/books", async (req, res) => {
  let book = await schema.find(req.body);
  res.send(book);
});

app.post("/books/addbooks", check, async (req, res) => {
  let post = await schema.create(req.body);
  res.send(post);
});

app.patch("books/update/:id", async (req, res) => {
  let { id } = req.params;
  let data = await schema.findByIdAndUpdate(id, req.body);
  let get = await schema.find();
  console.log(data);
  res.send(get);
});

app.get(`/books/filter`, async (req, res) => {
  let { author, category, title, sort } = req.query;
  let titleRegex = new RegExp(title, "i");

  if (author) {
    const filter = await schema.find({ author: author });
    res.send(filter);
  } else if (category) {
    const filter = await schema.find({ category: category });
    res.send(filter);
  } else if (title) {
    const filter = await schema.find({ title: { $regex: titleRegex } });
    res.send(filter);
  } else if (sort == "lth") {
    const ltoh = await schema.find().sort({ price: 1 });
    res.send(ltoh);
  } else if (sort == "htl") {
    const htoh = await schema.find().sort({ price: -1 });
    res.send(htoh);
  }
});

app.listen(port, () => {
  console.log(`Server Start :--> loclahosht:${port}`);
  connect();
});
