const mongoose = require(`../db/connection`)

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    tasks: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'}],
    googleId: String
  }, {
    timestamps: true
  })

//prehook
UserSchema.pre('findOne', function(next){
  this.populate('tasks')
  next()
})

UserSchema.pre('find', function(next){
  this.populate('tasks')
  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User