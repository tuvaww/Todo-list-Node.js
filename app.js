const express = require("express");
const app = express();
const path = require("path");
const rootDir = require("./helpers/path");

const todoController = require("./controller/todos");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", todoController.getStart);
app.get("/all-todos", todoController.getTodos);
app.get("/sort-first-created", todoController.getSortFtL);
app.get("/sort-last-created", todoController.getSortLtF);
app.get("/sort-not-done", todoController.getNotDone);
app.get("/sort-done", todoController.getOnlyDone);

app.post("/create-todo", todoController.postCreate);

app.get("/create-todo", todoController.getCreate);
app.get("/todo/:id", todoController.getDetails);
app.get("/edit-todo/:id", todoController.getEdit);
app.post("/edit-todo", todoController.postEditTodo);
app.get("/delete-todo/:id", todoController.getDeleteTodo);

app.listen(4000);
console.log("http://localhost:4000");
