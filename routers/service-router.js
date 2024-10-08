const express = require("express")
const router = express.Router()
const serviceController = require("../controllers/service-controller")
const userMiddleware = require("../middlewares/user-middleware")
const adminMiddleware = require("../middlewares/admin-middleware")
const multer = require("multer")

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/").get(serviceController.getServices)
  .post(userMiddleware, adminMiddleware, upload.single('image'), serviceController.addService)
router.route("/:id").delete(userMiddleware, adminMiddleware, serviceController.deleteService)
  .patch(userMiddleware, adminMiddleware, serviceController.editService)


module.exports = router