
/**
 *handleUpdateList function
 * @param {Object} req
 * @param {Object} res
 * @param {Contructor} User
 */

const handleUpdateList = function (req, res, User) {
        //destructure req.params object
    let {id, listId} = req.params
      // destructure req.body object
    let {listname} = req.body
     // find a user by id
    User.findById({ _id: id }).then(user => {
        //checking if user does not exist
        if (!user) {
            //return error
            return res.status(400).send({ error: 'error', message: 'user not found' })
        }
        //  get the list by its id
        let list = user.lists.find(list => list.id === listId)
        // update list name
        list.listname = listname

         // update the lists
          User.updateOne({ _id: id }, {$set: {lists: user.lists}})
        .then((result) => {
              // return success 
            return res.status(201).send({ status: 'success',lists:user.lists })
        })
         // checking if there was an error
        .catch((err) => {
            // return  error to client with the error message 
            return res.status(400).send({ error: 'error', message: err.message })
        })
    })
    .catch(err => {
         // return internal server error to client with the error message 
        return res.status(500).send({ error: 'error', message: err.message })
    })

}
// export function for further usage
module.exports = handleUpdateList
