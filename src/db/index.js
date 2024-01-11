let mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_CONNECT_URL}${process.env.MONGODB_DATABASE}`)
            .then(() => console.log('Database connected'))
            .catch((error) => console.log(error.message))
    } catch (error) {
        console.log('error', error.message);
    }
}

module.exports = connectDB