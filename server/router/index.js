const Router = require("express").Router;
const { body } = require("express-validator");

const userController = require("../controller/user-controller");
const authModdleware = require("../middleware/auth.middleware");

const router = new Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh); //activate access token
router.get("/users", authModdleware, userController.getUsers);

module.exports = router;
