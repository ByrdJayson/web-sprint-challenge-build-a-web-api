const express = require('express')
const Action = require('./actions-model')
const Project = require('./actions-model')
const router = express.Router()
const { validateActionId, validateItem } = require('./actions-middlware')

router.get('/', (req, res) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => {
            res.status(500).json({ message: "Error Retrieving Actions" })
        })
})

router.get('/:id', validateActionId, (req, res, next) => {
    const { id } = req.params
    Action.get(id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})

router.post('/', (req, res) => {
    const { project_id, description, notes } = req.body

    if (!project_id || !description || !notes) {
        res.status(400).json({ message: "Project ID, Description, and Notes are required" })
    } else {
        Project.get(project_id)
            .then(project => {
                if (project) {
                    Action.insert(req.body)
                        .then(action => {
                            res.status(201).json(action)
                        })
                        .catch(() => {
                            res.status(500).json({ message: "Error Inserting Action" })
                        })
                } else {
                    res.status(404).json({ message: `Project ID ${project_id} not found` })
                }
            })
    }
})

router.put('/:id'), (req, res) => {
    const { id } = req.params
    const { notes, project_id, description } = req.body
    Action.update(id, req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(() => {
            res.status(500).json({ message: "Error Updating Action" })
        })
}

router.delete('/:id', (req, res) => {
    const { id } = req.params
    const { project_id, notes, description, completed } = req.body
    Action.remove(id)
        .then(action => {
            res.json(req.action)
        })
        .catch(() => {
            res.status(500).json({ message: "Error Removing Action" })
        })

})

module.exports = router