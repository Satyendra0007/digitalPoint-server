const express = require("express")
const imageController = require("../controllers/image-controller")
const userMiddleware = require('../middlewares/user-middleware')
const adminMiddleware = require('../middlewares/admin-middleware')
const cors = require("cors")
const multer = require("multer")

const router = express.Router()
router.use(cors())

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/image").get(imageController.fetchAllImages)
router.route("/image").post(userMiddleware, adminMiddleware, upload.single('image'), imageController.addImage)
router.route("/image/:id").delete(userMiddleware, adminMiddleware, imageController.deleteImage)

module.exports = router


































// const express = require("express")
// const imageController = require("../controllers/image-controller")
// const userMiddleware = require('../middlewares/user-middleware')
// const adminMiddleware = require('../middlewares/admin-middleware')
// const cors = require("cors")
// const multer = require("multer")
// const fs = require("fs")

// const router = express.Router()
// router.use(express.json({
//   limit: "20mb"
// }))
// router.use(cors())

// const fileStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     fs.mkdir('./uploads/', (err) => {
//       cb(null, './uploads/');
//     });
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })
// const upload = multer({ storage: fileStorage })

// router.route("/image").get(imageController.fetchAllImages)
// router.route("/image").post(userMiddleware, adminMiddleware, upload.single('image'), imageController.addImage)
// router.route("/image/:id").delete(userMiddleware, adminMiddleware, imageController.deleteImage)

// module.exports = router