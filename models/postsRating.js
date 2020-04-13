let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostRatingSchema = ({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true},
  rating: { type: Number, default: 0, enum: [-1, 0, 1]}
});

module.exports = mongoose.model('PostRating', PostRatingSchema);

