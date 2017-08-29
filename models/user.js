const mongoose = require('mongoose');

//User Schema 
const UserSchema = mongoose.Schema({
  name : {
    type: string,
    required: true
  },
  email : {
    type: string,
    required: true
  },
  usernmae : {
    type: string,
    required: true
  },
  password : {
    type: string,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);