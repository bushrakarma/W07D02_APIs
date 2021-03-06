const { json } = require("body-parser");
const { response } = require("express");
const express = require("express");
const { request } = require("http");
const app = express();
const port = 3000;

app.use(express.json());

const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 20 },
  { name: "Mark", age: 19 },
];

app.get("/users", (request, response) => {
  response.status(200);
  response.json(users);
});

app.get("/user/:name", (req, res) => {
  const user = req.params.name;
  const found = users.find((element) => {
    return element.name === user;
  });
  if (found) {
    res.status(200);
    res.json(found);
  } else {
    res.status(404);
    res.json("User not found");
  }
});

app.post("/create/user", (req, res) => {
  const newUser = {
    name: req.body.name,
    age: req.body.age,
  };

  users.push(newUser);
  res.status(201);
  res.json(users);
});

app.get("/first-user", (req, res) => {
  const first = users[0];
  res.status(200);
  res.json(first);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

// Practice

const todos = [
  { todo: " wake up", isCompleted: true },
  { todo: "Eat Breakfast", isCompleted: false },
];
app.get("/todos", (req, res) => {
  res.json(todos);
  res.status(200);
});

app.post("/create/todo", (req, res) => {
    const toDo = {
        todo: req.body.todo,
        isCompleted: req.body.isCompleted
    }
    todos.push(toDo)
    res.status(201)
    res.json(toDo)
});

app.get('/completed/todos', (req, res) => {
    const completed = todos.filter((element, index) =>{
        return element.isCompleted === true
    })
    res.json(completed)
})

app.put("/update/todo/:name", (req, res) => {
    const toDoUpdate = req.params.name;
    const found = todos.find((element)=>{
        return element.name === toDoUpdate
    })
    const found = {
        todo: req.body.todo,
        isCompleted:req.body.isCompleted,
    }
    res.json(found);
    res.status(200)
})

app.put("/complete/todo/:name", (req, res) => {
    const toDoCompleted = req.params.name;
    const found = todos.find((element)=>{
        return element.name === toDoCompleted
    })
    if(found){
        found.isCompleted = true;
        res.status(200)
        res.json("Updated")
    }else{
        res.status(404)
        res.json('ToDo is not found')
    }
})

app.delete("/delete/todo/:name", (req, res) => {
    const toDelete = req.params.name;
    const found = todos.find((element)=>{
        return element.name === toDelete
    })
    let index = todos.indexOf(found)
    let toDoDeleted = todos.slice(index, -1)
    res.json(toDoDeleted)
    res.status(200)
})