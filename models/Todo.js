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

module.exports = class Todo {
  constructor(desc, titel, id, date) {
    this.description = desc;
    this.titel = titel;
    this.id = id;
    this.date = date;
  }

  save() {
    getAllTodos((todos) => {
      if (this.id) {
        const originalTodoIndex = todos.findIndex((t) => t.id === this.id);

        const editedTodo = [...todos];
        editedTodo[originalTodoIndex] = this;
        fs.writeFile(p, JSON.stringify(editedTodo), (err) => {
          console.log(err);
        });
      } else {
        let newdate = new Date();
        const day = ("0" + newdate.getDate()).slice(-2);
        const getmonth = newdate.getMonth() + 1;
        const month = "0" + getmonth;
        const year = newdate.getFullYear();
        const created = newdate.getTime();

        this.created = created;

        this.date = day + "." + month + "." + year;
        console.log("datum", this.date);
        this.id = shortID.generate();

        console.log("bör vara id", this.id);
        todos.push(this);
        fs.writeFile(p, JSON.stringify(todos), (err) => {
          console.log(err);
        });
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
      const todo = todos.find((t) => t.id === id);
      const editedList = todos.filter((t) => t.id !== id);
      fs.writeFile(p, JSON.stringify(editedList), (err) => {
        console.log(err);
      });
    });
  }

  static sortFirstToLast() {
    getAllTodos((todos) => {
      const sorted = todos.sort((a, b) => a.created - b.created);

      fs.writeFile(p, JSON.stringify(sorted), (err) => {
        console.log(err);
      });
    });
  }

  static sortLastToFirst() {
    getAllTodos((todos) => {
      const sorted = todos.sort((a, b) => b.created - a.created);

      fs.writeFile(p, JSON.stringify(sorted), (err) => {
        console.log(err);
      });
    });
  }
};
