const express = require("express");
const router = express.Router();

const err404 = require("../controller/404");

router.get("", err404.error);

module.exports = router;
