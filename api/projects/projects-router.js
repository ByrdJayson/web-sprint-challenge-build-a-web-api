const express = require('express')
const Project = require('./projects-model')
const router = express.Router()

router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Error Fetching Projects!"})
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Project.get(id)
        .then(project => {
            if(!project){
                res.status(404).json({message: "Project not found!"})
            } else {
                res.status(200).json(project)
            }
        })
        .catch(err => {
            console.log(error)
            res.status(500).json({message: "Error Fetching Project!"})
        })
})

module.exports = router