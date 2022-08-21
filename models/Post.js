import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema(
    {
      authorId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Post =  mongoose.model("Post", postSchema);

export default Post