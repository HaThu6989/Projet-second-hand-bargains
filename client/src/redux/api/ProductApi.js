import axios from "axios";

const storedToken = localStorage.getItem("authToken");

const APIPublic = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const APIPrivate = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${storedToken}`,
  },
});

export const getAllProducts = () => APIPublic.get("/product/allProducts");
export const getOneProduct = (id) => APIPublic.get(`/product/${id}`);

export const createNewProduct = (request) =>
  APIPrivate.post("/product/createNewProduct", request);
export const updateProduct = (id) => APIPrivate.put(`/product/${id}`);
export const deleteProduct = (id) => APIPrivate.delete(`/product/${id}`);
