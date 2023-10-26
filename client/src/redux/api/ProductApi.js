import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllProducts = () => API.get("/product/allProducts");
export const createNewProduct = (request) =>
  API.post("/product/createNewProduct", request);
// export const updateProduct = () => API.get("/product/allProducts");
// export const deleteProduct = () => API.get("/product/allProducts");
// export const getProductDetail = () => API.get("/product/allProducts");
