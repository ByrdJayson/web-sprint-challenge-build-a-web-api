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

router.get('/:id', (req, res) => {
    const { id } = req.params
    Action.get(id)
        .then(action => {
            if(action){
                res.status(200).json(action)
            } else {
                res.status(404).json({message: `Actions with id ${id} not found`})
            }
        })
        .catch(() => {
            res.status(500).json({message: "Error Retrieving Actions"})
        })
})

module.exports = router