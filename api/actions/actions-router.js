const express = require('express')
const Action = require('./actions-model')
const router = express.Router()


router.get('/', (req, res) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => {
            res.status(500).json({message: "Error Retrieving Actions"})
        })
})

module.exports = router