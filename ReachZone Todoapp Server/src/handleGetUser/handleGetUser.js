
/**
 *handleGetUser
 * @param {Object} req
 * @param {Object} res
 * @param {Constructor} User
 */
const handleGetUser = function (req, res, User) {
  // find a user by id
  User.findById({ _id: req.params.id }, (err, user) => {
    // if an error occured, throw it
    if (err) throw err
    // send back the user
    res.status(200).send(user)
  })
}
// export the function for further usage
module.exports = handleGetUser
