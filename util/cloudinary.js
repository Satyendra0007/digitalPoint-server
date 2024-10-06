const cloudinary = require('cloudinary').v2
const fs = require("fs")

cloudinary.config({
  cloud_name: 'dyqemcxnl',
  api_key: '846598734547581',
  api_secret: '8W7ANiqTjcJHiXbPiQSzSS-7c8c' // Click 'View API Keys' above to copy your API secret
});

const uploadImage = async (pathName, destination) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(pathName, {
      folder: `digitalpoint/${destination}`,
      resource_type: 'image'
    })

    fs.unlink(pathName, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      } else {
        console.log(`File deleted successfully: ${pathName}`);
      }
    });

    return uploadResult;
  }
  catch (error) {
    console.log(error);
    return null;
  }
}


const deleteIMage = async (public_id) => {
  await cloudinary.uploader.destroy(public_id, function (error, result) {
    console.log(result, error)
  });
}

module.exports = { uploadImage, deleteIMage }