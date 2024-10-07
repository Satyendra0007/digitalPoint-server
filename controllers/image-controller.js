const Image = require("../models/image-model")
const { uploadImage, deleteIMage } = require("../util/cloudinary")
const cloudinary = require('cloudinary').v2; // Import Cloudinary's Node.js SDK
const streamifier = require('streamifier');



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRETE // Click 'View API Keys' above to copy your API secret
});


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
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: '/digitalpoint/gallery' },
      async (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Upload to Cloudinary failed', details: err });
        }
        await Image.create({ public_id: result.public_id, url: result.secure_url })
        res.status(200).json({ message: "Image Added Successfully" })
      }
    );
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
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