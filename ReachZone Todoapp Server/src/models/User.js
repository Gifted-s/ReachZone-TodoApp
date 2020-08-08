const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema



const UserSchema = new Schema({
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  lists:[
    {
      id:String,
      listname:String,
      tasks:[
        {
          task:String,
          taskId:String
        }
      ]
    }
  ]
})

UserSchema.methods.hashPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
