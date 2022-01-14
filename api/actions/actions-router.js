const express = require('express')
const Action = require('./actions-model')
const Project = require('./actions-model')
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

router.post('/', (req, res) => {
    const { project_id, description, notes } = req.body

    if(!project_id || !description || !notes) {
        res.status(400).json({message: "Project ID, Description, and Notes are required"})
    } else {
        Project.get(project_id)
            .then(project => {
                if(project) {
                    Action.insert(req.body)
                        .then(action => {
                            res.status(201).json(action)
                        })
                        .catch(() => {
                            res.status(500).json({message: "Error Inserting Action"})
                        })
                } else {
                    res.status(404).json({message: `Project ID ${project_id} not found`})
                }
            })
    }
})

router.put('/:id'), (req, res) => {
    const { id } = req.params
    const { notes, project_id, description } = req.body
    if(!project_id || !description || !notes) {
        res.status(400).json({message: "Project ID, Description, and Notes are required"})
    } else {
        Project.get(project_id)
            .then(project => {
                if(project) {
                    Action.update(project, req.body)
                        .then(action => {
                            res.status(201).json(action)
                        })
                        .catch(() => {
                            res.status(500).json({message: "Error Updating Action"})
                        })
                } else {
                    res.status(404).json({message: `Project ID ${project_id} not found`})
                }
            })
    }
}

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Action.get(id)
        .then(action => {
            if(action) {
                Action.remove(id)
                    .then(() => {
                        res.status(200)
                    })
            } else {
                res.status(404).json({message: "Action Not Found"})
            }
        })

})

module.exports = router