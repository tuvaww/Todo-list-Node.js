const Todo = require("../models/Todo");
const { ObjectId } = require("mongodb");

exports.getStart = (req, res, next) => {
  res.render("index", {
    pageTitel: "Start Page",
  });
};

exports.getCreate = (req, res, next) => {
  res.render("todos/create-todo", {
    pageTitel: "Create Todo",
    editing: false,
  });
};

exports.postCreate = async (req, res, next) => {
  const titel = req.body.titel;
  const description = req.body.desc;

  const todo = new Todo(description, titel, null, null, false, null);

  todo.save();

  res.redirect("/all-todos");
};

exports.getTodos = async (req, res, next) => {
  const todos = await Todo.fetchAll();
  res.render("todos/all-todos", {
    pageTitel: "All Todos",
    AllTodos: todos,
    done: false,
  });
};

exports.getDetails = async (req, res, next) => {
  const todoID = ObjectId(req.params.id);
  const todo = await Todo.findById(todoID);
  res.render("todos/todo-details", {
    pageTitel: "Todo Details",
    todo: todo,
  });
};

exports.getEdit = async (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/create-todo");
  }

  const todoID = ObjectId(req.params.id);
  const todo = await Todo.findById(todoID);
  res.render("todos/create-todo", {
    pageTitel: "Edit todo",
    editing: editMode,
    todo: todo,
  });
};

exports.postEditTodo = (req, res, next) => {
  const todoId = req.body.todoId;
  const editedTitel = req.body.titel;
  const editedDesc = req.body.desc;
  const date = req.body.todoDate;
  const done = req.body.done;
  const created = +req.body.todoCreated;

  let parseDone = /true/i.test(done);
  const editedTodo = new Todo(
    editedDesc,
    editedTitel,
    todoId,
    date,
    parseDone,
    created
  );

  editedTodo.save();
  res.redirect("/all-todos");
};

exports.getDeleteTodo = (req, res, next) => {
  const todoId = ObjectId(req.params.id);

  Todo.deleteTodo(todoId);

  res.redirect("/all-todos");
};

exports.getSortFtL = async (req, res, next) => {
  const todos = await Todo.sortFirstToLast();
  console.log("sort", todos);
  res.render("todos/all-todos", {
    pageTitel: "All Todos",
    AllTodos: todos,
    done: false,
  });
};

exports.getSortLtF = async (req, res, next) => {
  const todos = await Todo.sortLastToFirst();
  res.render("todos/all-todos", {
    pageTitel: "All Todos",
    AllTodos: todos,
    done: false,
  });
};

exports.getNotDone = async (req, res, next) => {
  const todos = await Todo.sortNotDone();
  res.render("todos/all-todos", {
    pageTitel: "Not done Todos",
    AllTodos: todos,
    done: true,
  });
};

exports.getOnlyDone = async (req, res, next) => {
  const todos = await Todo.sortDone();
  res.render("todos/all-todos", {
    pageTitel: "Done Todos",
    AllTodos: todos,
    done: true,
  });
};
