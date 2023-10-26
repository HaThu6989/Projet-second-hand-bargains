import ProductModel from "../models/Product.model.js";

// Create the new product
export const createNewProduct = (req, res, next) => {
  const { name, price, category, seller } = req.body;

  console.log("req.body", req.body);

  ProductModel.create({ name, price, category, seller })
    .then((response) => res.status(201).json(response))
    .catch((error) => {
      console.log("There was an error creating the new product", error);
      res.status(500).json({
        message: "error creating a new product",
        error: err,
      });
    });
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
