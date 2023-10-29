import ProductModel from "../../src/models/Product.model.js";
import UserModel from "../../src/models/User.model.js";
import fs from "fs";

// Upload image
export const uploadImage = (res, req, next) => {
  const TempFile = req.files.upload;

  fs.readFile(TempFile.path, "utf8", (err) => {
    res.status(200).json({
      upload: true,
      url: `http://localhost:5006/${TempFile.path}`,
    });
    if (err) return console.log(err);
  });
};

// Create the new product
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

    console.log("newProduct", newProduct);
    // Update User ownerProducts
    await UserModel.findByIdAndUpdate(
      newProduct.seller._id,
      { $push: { ownerProducts: newProduct._id } },
      { $set: { claimed: true } }
    );

    const productCreated = await ProductModel.findById(newProduct._id);

    console.log("productCreated", productCreated);
    res.status(200).json(productCreated);
  } catch (error) {
    console.log("There was an error creating the new product", error);
    res.status(500).json({
      message: "error creating a new product",
      error: err,
    });
  }
};

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

export const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

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

export const getOneProduct = (req, res, next) => {
  const { productId } = req.params;

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
