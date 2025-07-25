const cloudinary = require('cloudinary').v2
const CloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage

require('dotenv').config();

cloudinary.config({
 cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
console.log(process.env.CLOUDINARY_NAME)
console.log(process.env.CLOUDINARY_API_KEY)
console.log(process.env.CLOUDINARY_API_SECRET)

const storage = new CloudinaryStorage({
    cloudinary,
      params: {
        folder: 'train-mate-images',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 800, height: 800, crop: 'limit' }]
    }
})

module.exports = {cloudinary, storage};