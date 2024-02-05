const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const errorHandler = require('../utils/error')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const signUp = async (req, res, next) => {
    const { username, email, password } = req.body

    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json({
            message: "User created successfully"
        })
    } catch (error) {
        next(error)
    }
}

const signIn = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, "User not found"))
        }

        const validPassword = await bcrypt.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(401, "Invalid password"))
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: hashedPassword, ...rest } = validUser._doc
        const expiryDate = new Date(Date.now() + 3600000)
        res
            .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(rest)
    } catch (error) {
        next(error)
    }
}

module.exports = { signIn, signUp }