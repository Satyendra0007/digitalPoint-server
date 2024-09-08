const express = require("express")
const authController = require("../controllers/auth-controller")
const userMiddleware = require("../middlewares/user-middleware")

const router = express.Router()
router.use(express.json())

router.route("/login").post(authController.logIn)
router.route("/signup").post(authController.signUp)
router.route("/user").get(userMiddleware, authController.getUserData)

module.exports = router