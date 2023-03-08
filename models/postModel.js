const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'title can not be empty!'] },
    content: { type: String, required: [true, 'content can not be empty!'] },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Post user is required!'],
    },
    // comment: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'Comment',
    // },
  },
  {
    timestamps: true,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  })
  next();
});

// virtual populate
// postSchema.virtual("comments", {
//   ref:"Comment",
//   foreignField:'post',
//   localField:'_id'
// })
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
