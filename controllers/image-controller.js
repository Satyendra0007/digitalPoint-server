const Image = require("../models/image-model")
const { uploadImage, deleteIMage } = require("../util/cloudinary")
const cloudinary = require('cloudinary')


const fetchAllImages = async (req, res) => {
  try {
    const images = await Image.find({})
    res.status(200).json(images)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

const addImage = async (req, res) => {
  try {
    const imageUrl = await uploadImage(req.file.path, 'gallery')
    await Image.create({ public_id: imageUrl.public_id, url: imageUrl.secure_url })
    res.status(200).json({ message: "Image Added Successfully", image: req.file.buffer })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

const deleteImage = async (req, res) => {
  try {
    const image = await Image.findOne({ _id: req.params.id });
    await deleteIMage(image.public_id)
    await Image.deleteOne({ public_id: image.public_id })
    res.status(200).json({ message: "Image Deleted Succesfully" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}


module.exports = { fetchAllImages, addImage, deleteImage }