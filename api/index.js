const express = require('express')
const userRoutes = require('./routes/user.route')

const app = express()

require('./config/database').connect()

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})

// app.get('/', (req, res) => {
//     res.json({
//         message: "API is working"
//     })
// })

app.use('/api/user', userRoutes)