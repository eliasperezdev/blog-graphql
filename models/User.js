import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
        select: false,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Provide a valid email",
        ],
      },
      displayName: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

const User =  mongoose.model("User", userSchema);

export default User