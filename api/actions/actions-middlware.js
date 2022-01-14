const Action = require('./actions-model')

function validateItem(req, res, next) {
    const { notes, description, project_id } = req.params

    if (!notes || !description || !project_id) {
        next({ status: 400, message: "Notes Description and Project ID required" })
    } else {
        next()
    }
}

async function validateActionId(req, res, next) {
    try {
        const { id } = req.params
        const action = await Action.get(id)

        if (action) {
            req.action = action
            next()
        } else {
            next({ status: 404, message: "Cannot Find Action" })
        }
    }
    catch (err) {
        next(err)
    }
}




module.exports = {
    validateItem,
    validateActionId,

}