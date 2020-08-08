
/**
 *handleSignin function
 * @param {Object} req
 * @param {Object} res
 * @param {Contructor} User
 */
const handleSignin = function (req, res, User) {
  // destructure the req.body object
  const {email, password } = req.body
    // find user with entered email
    User.findOne({ email }).then((user) => {
      // validate user
      checkuser(user)
    })
    // check if there is an error
      .catch(err => {
        // send error to user
        res.status(500).send({ error: err.message })
    })
  // this function will validate the user signing in
  const checkuser = function (user) {
    // chack if user email exists or not
    if (!user) {
      // send a response telling client no user with the email sent
      return res.status(400).send({ error: 'No user with this email' })
    }     
    // execute function to validate users passsword
    checkpassword(user)
  }
  // this function validate a user password
  const checkpassword = function (user) {
    // compare entered password with password from database
    if (!user.comparePassword(password)) {
      // send a response to user that email is invalid
      return res.status(400).send({ error: 'invalid password, check password and try again' })
    }
    // if user passes all validation then send the user information back to client
    res.status(200).send(user)
  }

}
// export function for further usage
module.exports = handleSignin
