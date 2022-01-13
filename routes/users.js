var express = require("express");
var router = express.Router();
const app = require("../app.js");
const signUpController = require("../controller/signUpController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signUp", signUpController.signUp);
router.post("/login", signUpController.login);
router.post("/forget", signUpController.forget);
router.post("/reset", signUpController.reset);


module.exports = router;
