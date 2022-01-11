var express = require("express");
var router = express.Router();
const app = require("../app");
const signUpController = require("../controller/signUpController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", signUpController.signUp);

module.exports = router;
