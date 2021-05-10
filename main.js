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

app.get("/users", (request, response)=>{
    response.status(200);
    response.json(users)
})

app.get("/users/:name", (request, response)=>{
    const user = request.params.name;
    
})

app.listen(port, ()=>{
    console.log(`app listening at http://localhost:${port}`);
})