const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
  thumbnail: { type: String, require: true },
  name: { type: String, require: true },
  url: { type: String, require: true },
  imageId: { type: String, require: true }
})

const Service = mongoose.models.Service || new mongoose.model("Service", serviceSchema);
module.exports = Service