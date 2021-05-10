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

app.get('/first-user', (req, res) =>{
    const first = users[0];
    res.status(200);
    res.json(first)
})

app.get('/', (req, res) =>{
    res.send("Hello World!")
})
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
