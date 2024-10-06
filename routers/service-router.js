const express = require("express")
const router = express.Router()
const serviceController = require("../controllers/service-controller")
const userMiddleware = require("../middlewares/user-middleware")
const adminMiddleware = require("../middlewares/admin-middleware")
const multer = require("multer")
const fs = require("fs")

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir('./uploads/', (err) => {
      cb(null, './uploads/');
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: fileStorage })

router.route("/").get(serviceController.getServices)
  .post(userMiddleware, adminMiddleware, upload.single('image'), serviceController.addService)
router.route("/:id").delete(userMiddleware, adminMiddleware, serviceController.deleteService)
  .patch(userMiddleware, adminMiddleware, serviceController.editService)


module.exports = router