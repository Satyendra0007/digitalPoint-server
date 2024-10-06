require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDb = require("./util/db")
const authRouter = require("./routers/auth-router")
const contactRouter = require("./routers/contact-router")
const serviceRouter = require("./routers/service-router")
const adminRouter = require("./routers/admin-router")
const imageRouter = require("./routers/image-router")

const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter)
app.use("/api/admin", adminRouter)
app.use("/api/gallery", imageRouter)
app.use("/api/services",serviceRouter)

app.get("/", (req, res) => {
  res.send("hello world !")
})

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("App is running on Port", PORT)
  })
}).catch((error) => {
  console.log(error)
  console.log("Failed to Connect ")
})
