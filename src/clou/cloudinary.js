const cloudinary = require('cloudinary').v2;
const fs = require('fs')

cloudinary.config({
    cloud_name: 'dozfx09mw',
    api_key: '139816312658234',
    api_secret: 'PAikfTF-Hey47Sn8FXnM-ceaew0'
});

const uploadFile = async (path) => {
    try {
        const result = await cloudinary.uploader.upload(path);

        fs.unlinkSync(path)

        return result
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    uploadFile
}