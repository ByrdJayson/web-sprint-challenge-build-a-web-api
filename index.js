require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 9000
const server = require('./api/server')


server.get('/', (req, res) => {
    res.send('<h2>Jaysons Sprint 1 API!</h2>')
})


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})



