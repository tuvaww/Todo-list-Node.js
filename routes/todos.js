const express = require("express");
const router = express.Router();

const todoController = require("../controller/todos");

router.get("/", todoController.getStart);
router.get("/all-todos", todoController.getTodos);
router.get("/sort-first-created", todoController.getSortFtL);
router.get("/sort-last-created", todoController.getSortLtF);
router.get("/sort-not-done", todoController.getNotDone);
router.get("/sort-done", todoController.getOnlyDone);
router.post("/create-todo", todoController.postCreate);
router.get("/create-todo", todoController.getCreate);
router.get("/todo/:id", todoController.getDetails);
router.get("/edit-todo/:id", todoController.getEdit);
router.post("/edit-todo", todoController.postEditTodo);
router.get("/delete-todo/:id", todoController.getDeleteTodo);

module.exports = router;
