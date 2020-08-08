
/**
 * handleSignup
 * @param {Object} req
 * @param {Object} res
 * @param {Object} User
 */


const isValidEmail = require('is-valid-email')
const handleSignup = function (req, res, User) {

  const {email, password, name} = req.body
  if(!email){
    return res.status(400).send({ error: 'email is required' })
  }
  if(!isValidEmail(email)){
    return res.status(400).send({ error: 'email must be formatted well' })
  }
  if(!password){
    return res.status(400).send({ error: 'password is required' })
  }
  // find user with enterd email and executing the callback function
  User.findOne({ email }).then((user) => {
    // checking if email has been used
    if (user) {
      // send a response to user that email has been used
      return res.status(400).send({ error: 'Email has been used by someone else or you, try to login' })
    }
 
    const newUser = new User({ email , password, name })
    // hash password with bcrypt
    newUser.password = newUser.hashPassword(newUser.password)
    // save user to database
    newUser.save().then(user=>{
     return  res.status(200).send({status:'success', user})
    })
  })
}
// export function for further usage
module.exports = handleSignup
