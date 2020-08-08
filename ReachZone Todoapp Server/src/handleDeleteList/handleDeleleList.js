
/**
 *handleDeleteList function
 * @param {Object} req
 * @param {Object} res
 * @param {Contructor} User
 */

const handleDeleteList = function (req, res, User) {
    //destructure req.params object
    let {id, listId} = req.params
    // find user with id
    User.findById({ _id: id }).then(user => {
        // checking if user exist
        if (!user) {
            // return error if user does not exist
            return res.status(400).send({ status: 'error', message: 'user not found' })
        }
        // filter list to return all list without the id that was passed as params 
        let filteredList = user.lists.filter(list => list.id !== listId)
        //set users list to filtered list
        user.lists = filteredList
        // update user's list
        User.updateOne({ _id: id }, {$set: {lists: user.lists}})
        .then((result) => {
            // return success
            return res.status(201).send({ status: 'success',lists:user.lists })
        })
        .catch((err) => {
            // retun error to client
            return res.status(400).send({ status: 'error', message: err.message })
        })
    })
    //checking error while searching user
    .catch(err => {
        // return error to client
        return res.status(500).send({ status: 'error', message: err.message })
    })

}
// export function for further usage
module.exports = handleDeleteList
