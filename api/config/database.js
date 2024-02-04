const mongoose = require('mongoose')

require('dotenv').config()

exports.connect = () => {
    mongoose.connect(process.env.MONGO)
    .then(
        console.log("Database connection successfully")
    )
    .catch(err => {
        console.log("Database connection error")
        console.error(err)
        process.exit(1)
    })
}