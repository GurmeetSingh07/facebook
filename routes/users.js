var express = require("express");
var router = express.Router();
const app = require("../app.js");
const userController = require("../controller/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// singUp ==> singup
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post("/forget", userController.forget);
router.put("/reset", userController.reset);


module.exports = router;
