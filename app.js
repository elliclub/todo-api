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

app.delete("/api/v1/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.map((todo, index) => {
    if (todo.id === id) {
      db.splice(index, 1);

      return res.status(200).send({
        succes: "true",
        message: "deleted this todo",
        todo,
      });
    }
  });

  return res.status(404).send({
    succes: "false",
    message: "wasnt able to delete",
  });
});

app.put("/api/v1/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  let todoFound;
  let itemIndex;

  db.map((todo, index) => {
    if (todo.id === id) {
      todoFound = todo;
      itemIndex = index;
    }
  });

  if (!todoFound) {
    return res.status(400).send({
      success: "false",
      message: "couldnt find this todo",
    });
  }

  if (!req.body.title) {
    return res.status(400).send({
      success: "false",
      message: "needs title",
    });
  } else if (!req.body.description) {
    return res.status(400).send({
      success: "false",
      message: "needs description dude",
    });
  }

  const updatedTodo = {
    id: todoFound.id,
    title: req.body.title,
    description: req.body.description,
  };

  db.splice(itemIndex, 1, updatedTodo);
  return res.status(200).send({
    success: "true",
    message: "cool it's updated now",
    updatedTodo,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
