const Service = require("../models/service-model")

const service = async (req, res) => {
  try {
    const services = await Service.find()
    return res.status(200).json(services)
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error" })
  }
}

module.exports = { service }