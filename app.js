import express from "express";
import bodyParser from "body-parser";
import db from "./db/db";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/v1/todos", (req, res, err) => {
  console.log(err);
  return res.status(200).send({
    success: "true",
    message: "todos retrievessd",
    todos: db,
  });
});

app.post("/api/v1/todos", (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({
      succes: "false",
      message: "Title is required",
    });
  } else if (!req.body.description) {
    return res.status(400).send({
      success: "false",
      message: "Descriptions is required",
    });
  }
  const todo = {
    id: db.length + 1,
    title: req.body.title,
    description: req.body.description,
  };
  db.push(todo);
  return res.status(201).send({
    sucess: "true",
    message: "todo was added successfully",
    todo,
  });
});

app.get("/api/v1/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.map(todo => {
    if (todo.id === id) {
      return res.status(200).send({
        success: "true",
        message: "todo retirev successfully",
        todo,
      });
    }
  });
  return res.status(404).send({
    sucess: "false",
    message: "todo doesnt exist",
    id,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
