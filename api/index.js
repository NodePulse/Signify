const express = require('express')

const app = express()

require('./config/database').connect()

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})