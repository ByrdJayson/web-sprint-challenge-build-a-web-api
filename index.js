require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 9000
const server = require('./api/server')

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})



