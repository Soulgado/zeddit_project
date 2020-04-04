let mongoose = require('mongoose');

let Schema = mongoose.Schema;

const UserSchema = ({
  username: { type: String, maxlength: 50, required: true },
  password: { type: String, minlength: 5, maxlength: 20, required: true},
  group: { type: String, default: 'user', enum: ['user', 'moderator', 'administrator'], required: true}
});

module.exports = mongoose.model('User', UserSchema);