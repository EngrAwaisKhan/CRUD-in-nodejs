const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'Post id is required!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User Details is required!'],
    },
  },
  {
    timestamps: true,
  },
  // {
  //   toJSON: { virtual: true },
  //   toObject: { virtual: true },
  // }
);

commentSchema.pre(/^find/, function(next){
  this.populate({
    path:'post',
    select:'title -user'
}).populate({
  path:'user',
  select:'name'
});
  next();  
});



const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
