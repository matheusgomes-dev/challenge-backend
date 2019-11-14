const express = require("express");
const router = express.Router();

const AuthController = require("./controllers/AuthController");
const ToolController = require("./controllers/ToolController");
const UserController = require("./controllers/UserController");

const AuthMiddleware = require("./middlewares/auth");

router.post("/token", AuthController.authenticate);
router.post("/users", UserController.post);

router.use(AuthMiddleware);

router.get("/tools/:tag?", ToolController.get);
router.post("/tools", ToolController.post);
router.delete("/tools/:id", ToolController.remove);

router.get("/users", UserController.get);

module.exports = router;
