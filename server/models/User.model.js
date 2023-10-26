import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  numberPhone: String,
  address: String,
  favouriteProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  ownerProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const UserModel = model("User", userSchema);

export default UserModel;
