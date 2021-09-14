//require mongoose to connect
const mongoose = require('mongoose')

//require dotenv to get the MONGO_URI
require('dotenv').config({path: "./config/.env"})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Database connected successfully")
    } catch (error) {
        console.log("An error has occured while trying to connect")
    }
}

module.exports = connectDB
