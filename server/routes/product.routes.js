import express from "express";
import {
  createNewProduct,
  getAllProducts,
} from "../controllers/product.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express();

router.get("/allProducts", getAllProducts);
router.post("/createNewProduct", isAuthenticated, createNewProduct);

export default router;
