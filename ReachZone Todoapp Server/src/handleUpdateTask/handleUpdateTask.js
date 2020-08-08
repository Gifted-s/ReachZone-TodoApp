
/**
 *handleUpdateTask function
 * @param {Object} req
 * @param {Object} res
 * @param {Contructor} User
 */

const handleUpdateTask = function (req, res, User) {
    let {id, listId, taskId} = req.params
    let {updatedTask} = req.body
    User.findById({ _id: id }).then(user => {
        if (!user) {
            return res.status(400).send({ status: 'error', message: 'user not found' })
        }
        let list = user.lists.find(list => list.id === listId)
        let task = list.tasks.find(task => task.taskId ===taskId)
        task.task = updatedTask
       
        User.updateOne({ _id: id }, {$set: {lists: user.lists}})
        .then((result) => {
            
            return res.status(201).send({ status: 'success',lists:user.lists })
        })
        .catch((err) => {
            return res.status(400).send({ status: 'error', message: err.message })
        })
    })
    .catch(err => {
        return res.status(500).send({ status: 'error', message: err.message })
    })

}
// export function for further usage
module.exports = handleUpdateTask
