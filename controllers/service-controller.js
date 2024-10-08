const Service = require("../models/service-model")
const { deleteIMage } = require("../util/cloudinary")
const cloudinary = require('cloudinary').v2; // Import Cloudinary's Node.js SDK
const streamifier = require('streamifier');

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
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: '/digitalpoint/service' },
      async (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Upload to Cloudinary failed', details: err });
        }
        await Service.create({ ...req.body, thumbnail: result.secure_url, imageId: result.public_id })
        return res.status(200).json({ message: "Service Added " })
      }
    );
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" })
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