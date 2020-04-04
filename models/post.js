const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = ({
  title: { type: String, maxlength: 120, required: true},
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  content: { type: Schema.Types.Mixed },
  comments: { type: Schema.Types.ObjectId, ref: 'Comment'}
});

module.exports = mongoose.model('Post', PostSchema);