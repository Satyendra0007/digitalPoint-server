const Service = require("../models/service-model")
const { uploadImage, deleteIMage } = require("../util/cloudinary")

const getServices = async (req, res) => {
  try {
    const services = await Service.find()
    return res.status(200).json(services)
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error" })
  }
}

const addService = async (req, res) => {
  try {
    const imageUrl = await uploadImage(req.file.path, "services")
    await Service.create({ ...req.body, thumbnail: imageUrl.secure_url, imageId: imageUrl.public_id })
    return res.status(200).json({ message: "Service Added " })
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error" })
  }
}

const deleteService = async (req, res) => {
  try {
    const service = await Service.findOne({ _id: req.params.id })
    await deleteIMage(service.imageId)
    await Service.deleteOne({ _id: req.params.id })
    return res.status(200).json({ message: "Service Deleted" })
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error" })
  }
}

const editService = async (req, res) => {
  try {
    await Service.updateOne({ _id: req.params.id }, { $set: { ...req.body } })
    return res.status(200).json({ message: "Service Updated " })
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error" })
  }
}

module.exports = { getServices, addService, deleteService, editService }