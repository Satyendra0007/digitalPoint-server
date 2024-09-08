const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
  name: { type: String, require: true },
  duration: { type: String, require: true },
  desc: { type: String, require: true },
  author: { type: String, require: true },
})

const Service = mongoose.models.Service || new mongoose.model("Service", serviceSchema);
module.exports = Service