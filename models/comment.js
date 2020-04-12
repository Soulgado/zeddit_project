const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = ({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  content: { type: String, maxlength: 1000, required: true},
  parentComment: { type: Schema.Types.ObjectId, ref: 'Comment'}
});

module.exports = mongoose.model('Comment', CommentSchema);