import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    description: String,
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // usersLike: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "UserModel",
    //   },
    // ],
    category: {
      type: String,
      enum: [
        "electromenager",
        "ameublement",
        "enfants",
        "vetements",
        "livres",
        "autre",
      ],
      default: "autre",
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model("Product", productSchema);

export default ProductModel;
