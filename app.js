require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const errorPage = require("./routes/error");
const todoRoutes = require("./routes/todos");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(todoRoutes);
app.use(errorPage);

app.listen(4000);
console.log("http://localhost:4000");
