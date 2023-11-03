import express from "express";
import multiparty from "connect-multiparty";
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  uploadImage,
} from "../controllers/product.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import isOwnerProduct from "../middleware/isOwnerProduct.js";

const MuiltiPartyMiddleware = multiparty({ uploadDir: "./public/images" });

const router = express();

router.get("/allProducts", isAuthenticated, getAllProducts);
router.post("/createNewProduct", isAuthenticated, createNewProduct);
router.delete("/:productId", isAuthenticated, isOwnerProduct, deleteProduct);
router.get("/:productId", getOneProduct);
router.post("/upload-image-product", MuiltiPartyMiddleware, uploadImage);

export default router;
