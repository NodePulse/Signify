const mongoose = require('mongoose')

require('dotenv').config()

<<<<<<< HEAD
exports.connect = async () => {
    await mongoose.connect(process.env.MONGO)
=======
exports.connect = () => {
    mongoose.connect(process.env.MONGO)
>>>>>>> 30f7cc72e0fc86405ce75d5a0f9d143874482e1d
    .then(
        console.log("Database connection successfully")
    )
    .catch(err => {
        console.log("Database connection error")
        console.error(err)
        process.exit(1)
    })
}