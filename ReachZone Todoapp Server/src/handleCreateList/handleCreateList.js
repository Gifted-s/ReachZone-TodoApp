
/**
 *handleCreateList function
 * @param {Object} req
 * @param {Object} res
 * @param {Contructor} User
 */
const uuid = require('uuid')
const handleCreateList = function (req, res, User) {
    // destructure the req.body object
    let { listname } = req.body
    // creating the list object
    let newList = {
        id: uuid.v1(),
        listname,
        tasks: []
    }
    // find a user by its id
    User.findById({ _id: req.params.id }).then(user => {
        // checking if the user did not exist
        if (!user) {
            // return error with message
            return res.status(400).send({ status: 'error', message: 'user not found' })
        }
        // push list to existing list array
        user.lists.push(newList)
        // update db
        User.updateOne({ _id: req.params.id }, { $set: { lists: user.lists } })
            .then((result) => {
                //return success
                return res.status(201).send({ status: 'success', lists: user.lists })
            })  // get error while saving
            .catch((err) => {
                //return error to client

                return res.status(400).send({ status: 'error', message: err.message })
            })
    })
        // get error while searching user
        .catch(err => {
            // return error to client
            return res.status(500).send({ status: 'error', message: err.message })
        })

}
// export function for further usage
module.exports = handleCreateList
