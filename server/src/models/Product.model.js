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
    category: {
      type: String,
      enum: [
        "electromenager",
        "ameublement",
        "enfants",
        "vetements",
        "livres",
        "autres",
      ],
      default: "autres",
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

export default Product;
