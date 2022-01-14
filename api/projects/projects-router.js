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
            res.status(500).json({ message: "Error Fetching Projects!" })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Project.get(id)
        .then(project => {
            if (!project) {
                res.status(404).json({ message: "Project not found!" })
            } else {
                res.status(200).json(project)
            }
        })
        .catch(err => {
            console.log(error)
            res.status(500).json({ message: "Error Fetching Project!" })
        })
})

router.post('/', (req, res) => {
    const { name, description } = req.body

    if (!name || !description) {
        res.status(400).json({ message: "Name and description are required" })
    } else {
        Project.insert(req.body)
            .then(project => {
                res.status(201).json(project)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: "Error Posting Project!" })
            })
    }

    router.put('/:id', (req, res) => {
        const { id } = req.params
        const { name, description, completed } = req.body
        if (!name || !description) {
            res.status(400).json({ message: "Name and description are required" })
        } else if (typeof completed === 'undefined') {
            res.status(400).json({ message: "Completed is required" })
        }
        else {
            Project.update(id, req.body)
                .then(project => {
                    res.status(200).json(project)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ message: "Error Updating Project!" })
                })
        }
    })

    router.delete('/:id', (req, res) => {
        const { id } = req.params
        Project.remove(id)
            .then(project => {
                if(project) {
                    res.status(200).json()
                } else {
                    res.status(404).json({message: `Project with id ${id} not found`})
                }
            })
            .catch(() => {
                res.status(500).json({message: `Error Deleting Project`})
            })
    })


})

module.exports = router