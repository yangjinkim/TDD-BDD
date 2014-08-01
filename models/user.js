var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  'id' : String,
  'password' : String,
  'email' : String,
  'name' : String,
  'age' : Number
});

mongoose.model('user', userSchema);

