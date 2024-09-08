const express = require("express")
const router = express.Router()
const serviceController = require("../controllers/service-controller")
const userMiddleware = require("../middlewares/user-middleware")
const adminMiddleware = require("../middlewares/admin-middleware")

router.route("/services").get(userMiddleware, serviceController.service)

module.exports = router