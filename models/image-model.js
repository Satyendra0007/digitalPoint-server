const Mongoose = require("mongoose")

const imageSchema = new Mongoose.Schema({
  public_id: { type: String, require: true },
  url: { type: String, require: true }
})

const Image = Mongoose.models.Image || new Mongoose.model("Image", imageSchema)
module.exports = Image