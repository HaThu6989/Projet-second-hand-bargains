import mongoose from "mongoose";
import ProductModel from "../../src/models/Product.model.js";
import UserModel from "../../src/models/User.model.js";
import dotenv from "dotenv";
dotenv.config();

/* Upload image */
export const uploadImage = (req, res, next) => {
  let tempFile = req.files.upload;
  let path = tempFile.path;

  res.status(200).json({
    uploaded: true,
    url: `http://localhost:${process.env.PORT}/${path}`,
  });
};

/* Create the new product */
export const createNewProduct = async (req, res, next) => {
  try {
    const { name, price, category, seller, description } = req.body;

    const newProduct = await ProductModel.create({
      name,
      price,
      category,
      seller,
      description,
    });

    /* Update User ownerProducts */
    await UserModel.findByIdAndUpdate(
      newProduct.seller._id,
      { $push: { ownerProducts: newProduct._id } },
      { $set: { claimed: true } }
    );

    const productCreated = await ProductModel.findById(newProduct._id).populate(
      "seller"
    );

    res.status(200).json(productCreated);
  } catch (error) {
    console.log("There was an error creating the new product", error);
    res.status(500).json({
      message: "error creating a new product",
      error: err,
    });
  }
};

/* Update product */
export const updateProduct = (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  ProductModel.findByIdAndUpdate(productId, req.body, { new: true })
    .then((productUpdated) => res.status(200).json(productUpdated))
    .catch((error) => {
      console.log("Error updating product", error);
      res.status(400).json(error);
    });
};

/* Get all Products */
export const getAllProducts = (req, res, next) => {
  ProductModel.find()
    .populate("seller")
    .then((productsArray) => {
      res.status(200).json(productsArray);
    })
    .catch((error) => {
      console.log(
        "There was an error getting the product list from the database:",
        error
      );
      next(error);
    });
};

/* Delete Product */
export const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    const productToDelete = await ProductModel.findByIdAndDelete({
      _id: productId,
    });

    await UserModel.findByIdAndUpdate(productToDelete?.seller, {
      $pull: { ownerProducts: productId },
    });

    await UserModel.findByIdAndUpdate(productToDelete?.seller, {
      $pull: { ownerProducts: productId },
    });
    res.status(200).json(productId);
  } catch (error) {
    console.log("There was an error of deleting the product", error);
    res.status(500).json({
      message: "error of deleting the product",
      error: error,
    });
  }
};

/* Get one Product */
export const getOneProduct = (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  ProductModel.findById(productId)
    .populate("seller")
    .then((productDetail) => {
      res.status(200).json(productDetail);
    })
    .catch((error) => {
      console.log("Error to get one product", error);
      res.status(500).json({
        message: "error to get one product",
        error: error,
      });
    });
};
