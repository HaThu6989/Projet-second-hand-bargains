import express from "express";
import {
  createNewProduct,
  getAllProducts,
} from "../controllers/product.controller.js";

const router = express();

router.get("/allProducts", getAllProducts);
router.post("/createNewProduct", createNewProduct);

export default router;
