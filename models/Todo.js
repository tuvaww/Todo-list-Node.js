const path = require("path");
const rootDir = require("../helpers/path");
const fs = require("fs");
const shortID = require("short-id");
const p = path.join(rootDir, "data", "savedTodos.json");

const getAllTodos = (cb) => {
  fs.readFile(p, (err, fileData) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileData));
    }
  });
};
const writeToFile = (data) => {
  fs.writeFile(p, JSON.stringify(data), (err) => {
    console.log(err);
  });
};

module.exports = class Todo {
  constructor(desc, titel, id, date, done) {
    this.description = desc;
    this.titel = titel;
    this.id = id;
    this.date = date;
    this.done = done;
  }

  save() {
    getAllTodos((todos) => {
      if (this.id) {
        const originalTodoIndex = todos.findIndex((t) => t.id === this.id);

        const editedTodo = [...todos];
        editedTodo[originalTodoIndex] = this;
        writeToFile(editedTodo);
      } else {
        let newdate = new Date();
        const day = ("0" + newdate.getDate()).slice(-2);
        const getmonth = newdate.getMonth() + 1;
        const month = "0" + getmonth;
        const year = newdate.getFullYear();

        this.date = day + "." + month + "." + year;
        console.log("datum", this.date);

        const created = newdate.getTime();
        this.created = created;

        this.id = shortID.generate();

        console.log("bör vara id", this.id);
        todos.push(this);
        writeToFile(todos);
      }
    });
  }

  static fetchAll(cb) {
    getAllTodos(cb);
  }

  static findById(id, cb) {
    getAllTodos((todos) => {
      const todo = todos.find((t) => t.id === id);
      cb(todo);
    });
  }

  static deleteTodo(id) {
    getAllTodos((todos) => {
      ///////7
      const todo = todos.find((t) => t.id === id);
      const editedList = todos.filter((t) => t.id !== id);
      writeToFile(editedList);
    });
  }

  static sortFirstToLast() {
    getAllTodos((todos) => {
      const sorted = todos.sort((a, b) => a.created - b.created);

      writeToFile(sorted);
    });
  }

  static sortLastToFirst() {
    getAllTodos((todos) => {
      const sorted = todos.sort((a, b) => b.created - a.created);

      writeToFile(sorted);
    });
  }

  static done() {
    getAllTodos((todos) => {
      console.log(
        "test",

        todos.filter((t) => t.done === false)
      );

      let notDone = todos.filter((t) => t.done === false);

      return notDone;
    });
  }
};
