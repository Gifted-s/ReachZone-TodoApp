
/**
 *handleAddToList function
 * @param {Object} req
 * @param {Object} res
 * @param {Contructor} User
 */
const uuid = require('uuid')
const handleAddToList = function (req, res, User) {
    //destructure req.params object
    let { id, listId } = req.params
    // destructure req.body
    let { task } = req.body
    // find a user by id
    User.findById({ _id: id }, (err, user) => {
        //checking if user does not exist
        if (!user) {
            //return error
            return res.status(400).send({ status: 'error', message: 'user not found' })
        }
        //  get the list by its id
        const list = user.lists.find(item => item.id === listId)
        // push the new task to the list
        list.tasks.push({ task, taskId: uuid.v1() })
        // update the lists
        User.updateOne({ _id: id }, { $set: { lists: user.lists } })
            .then((result) => {
                // return success 
                return res.status(201).send({ status: 'success', lists: user.lists })
            })
            // checking if there was an error
            .catch((err) => {
                // return  error to client with the error message 
                return res.status(500).send({ status: 'error', message: err.message })
            })
    })
    .catch(err => {
        // return internal server error to client with the error message 
       return res.status(500).send({ error: 'error', message: err.message })
   })
    
}
// export function for further usage
module.exports = handleAddToList
