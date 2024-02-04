const express = require('express')
const userRoutes = require('./routes/user.route')
const authRoutes = require('./routes/auth.route')
const databaseConnection = require('./config/database')

const app = express()
app.use(express.json())

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})

databaseConnection.connect()

// app.get('/', (req, res) => {
//     res.json({
//         message: "API is working"
//     })
// })

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})