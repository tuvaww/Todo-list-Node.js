const Todo = require("../models/Todo");

exports.getStart = (req, res, next) => {
  res.render("index", {
    path: "/",
    pageTitel: "Start Page",
  });
};

exports.getCreate = (req, res, next) => {
  res.render("create-todo", {
    path: "/create-todo",
    pageTitel: "Create Todo",
    editing: false,
  });
};

exports.postCreate = (req, res, next) => {
  const titel = req.body.titel;
  const description = req.body.desc;

  const todo = new Todo(description, titel, null, null, false, null);

  console.log("new todo", todo);
  todo.save();
  res.redirect("/all-todos");
};

exports.getTodos = (req, res, next) => {
  Todo.fetchAll((todos) => {
    res.render("all-todos", {
      pageTitel: "All Todos",
      path: "/all-todos",
      AllTodos: todos,
      done: false,
    });
  });
};

exports.getDetails = (req, res, next) => {
  const todoID = req.params.id;
  Todo.findById(todoID, (todo) => {
    res.render("todo-details", {
      pageTitel: "Todo Details",
      todo: todo,
      path: "/all-todos",
    });
  });
};

exports.getEdit = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/create-todo");
  }

  const todoID = req.params.id;

  Todo.findById(todoID, (todo) => {
    res.render("create-todo", {
      pageTitel: "Edit todo",
      path: "/edit-todo",
      editing: editMode,
      todo: todo,
    });
  });
};

exports.postEditTodo = (req, res, next) => {
  const todoId = req.body.todoId;
  const editedTitel = req.body.titel;
  const editedDesc = req.body.desc;
  const date = req.body.todoDate;
  const done = req.body.done;
  const created = req.body.todoCreated;

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
  const todoId = req.params.id;

  Todo.deleteTodo(todoId);

  res.redirect("/all-todos");
};

exports.getSortFtL = (req, res, next) => {
  Todo.sortFirstToLast();
  res.redirect("/all-todos");
};

exports.getSortLtF = (req, res, next) => {
  Todo.sortLastToFirst();
  res.redirect("/all-todos");
};

exports.getNotDone = (req, res, next) => {
  Todo.fetchAll((todos) => {
    const todo = todos.filter((t) => t.done === false);

    res.render("all-todos", {
      pageTitel: "Not done Todos",
      path: "/all-todos",
      AllTodos: todo,
      done: true,
    });
  });
};

exports.getOnlyDone = (req, res, next) => {
  Todo.fetchAll((todos) => {
    const todo = todos.filter((t) => t.done === true);

    res.render("all-todos", {
      pageTitel: "Done Todos",
      path: "/all-todos",
      AllTodos: todo,
      done: true,
    });
  });
};
