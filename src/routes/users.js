const express = require("express");
const router = express.Router();

const usersController = require("../app/controllers/UsersController");

router.get("/test", usersController.index);
router.post("/users", usersController.post);
router.post("/login", usersController.login);

module.exports = router;
