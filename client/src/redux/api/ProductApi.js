import axios from "axios";

// Function to create a new axios instance with updated headers
const createAPIPrivateInstance = (token) => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to get the stored token from localStorage
const getStoredToken = () => {
  return localStorage.getItem("authToken");
};

// Create the initial APIPrivate instance
let APIPrivate = createAPIPrivateInstance(getStoredToken());

// Request interceptor to update headers before each request
APIPrivate.interceptors.request.use(
  (config) => {
    // Update the Authorization header with the latest token
    config.headers.Authorization = `Bearer ${getStoredToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const APIPublic = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getAllProducts = () => APIPrivate.get("/product/allProducts");
export const getOneProduct = (id) => APIPublic.get(`/product/${id}`);
export const createNewProduct = (request) =>
  APIPrivate.post("/product/createNewProduct", request);
export const updateProduct = (id, request) =>
  APIPrivate.put(`/product/${id}`, request);
export const deleteProduct = (id) => APIPrivate.delete(`/product/${id}`);
