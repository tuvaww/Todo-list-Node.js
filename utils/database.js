const { MongoClient } = require("mongodb");

async function getDb() {
  const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);

  await client.connect();

  const db = client.db("todos");

  return db;
}

async function getTodoCollection() {
  const db = await getDb();

  return db.collection("allTodos");
}

module.exports = {
  getTodoCollection,
  getDb,
};
