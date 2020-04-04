let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let SubzedditSchema = ({
  title: { type: String, maxlength: 120, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  creation_date: { type: Date, default: Date.now(), required: true},
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}]
});

module.exports = mongoose.model('Subzeddit', SubzedditSchema);



