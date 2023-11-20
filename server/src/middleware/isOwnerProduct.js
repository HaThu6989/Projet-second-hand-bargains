import Product from "../models/Product.model.js";
import mongoose from "mongoose";

const isOwnerProduct = (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findById(productId)
    .populate("seller")
    .then((productFromDB) => {
      const inputString = req.payloadAfterVerifyByExpressjwt._id;
      const objectId = new mongoose.Types.ObjectId(inputString);
      if (productFromDB.seller._id.equals(objectId)) {
        next();
      } else {
        res
          .status(401)
          .json({ message: "You aren't the owner of this product" });
      }
    });
};

export default isOwnerProduct;
