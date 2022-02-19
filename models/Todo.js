const db = require("../utils/database");
const { ObjectId } = require("mongodb");

module.exports = class Todo {
  constructor(desc, titel, id, date, done, created) {
    this.description = desc;
    this.titel = titel;
    this._id = id ? ObjectId(id) : null;
    this.date = date;
    this.done = done;
    this.created = created;
  }

  async save() {
    const collection = await db.getTodoCollection();
    if (this._id) {
      await collection.updateOne({ _id: this._id }, { $set: this });
    } else if (!this._id) {
      let newdate = new Date();
      const day = ("0" + newdate.getDate()).slice(-2);
      const getmonth = newdate.getMonth() + 1;
      const month = "0" + getmonth;
      const year = newdate.getFullYear();
      const created = newdate.getTime();

      this.date = day + "." + month + "." + year;
      this.created = created;

      await collection.insertOne(this);
    }
  }

  static async fetchAll() {
    const collection = await db.getTodoCollection();
    const getAllT = await collection.find().toArray();
    return getAllT;
  }

  static async findById(id) {
    const collection = await db.getTodoCollection();
    const todo = await collection.findOne({ _id: id });

    return todo;
  }

  static async deleteTodo(id) {
    const collection = await db.getTodoCollection();
    await collection.deleteOne({ _id: id });
  }

  static async sortFirstToLast() {
    const collection = await db.getTodoCollection();
    const todos = await collection.find().toArray();
    const sorted = todos.sort((a, b) => a.created - b.created);
    return sorted;
  }

  static async sortLastToFirst() {
    const collection = await db.getTodoCollection();
    const todos = await collection.find().toArray();
    const sorted = todos.sort((a, b) => b.created - a.created);

    return sorted;
  }

  static async sortDone() {
    const collection = await db.getTodoCollection();
    const todos = await collection.find().toArray();
    const doneTodos = todos.filter((t) => t.done === true);

    return doneTodos;
  }
  static async sortNotDone() {
    const collection = await db.getTodoCollection();
    const todos = await collection.find().toArray();
    const notDoneTodos = todos.filter((t) => t.done === false);

    return notDoneTodos;
  }
};
