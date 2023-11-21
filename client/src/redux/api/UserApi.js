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

export const getUserDetail = (userId) => APIPrivate.get(`/user/${userId}`);
export const getAllUsers = (adminId) =>
  APIPrivate.get(`/user/${adminId}/allUsers`);
export const updateUser = (userId, request) =>
  APIPrivate.put(`/user/${userId}/update`, request);
export const deleteUser = (userId) =>
  APIPrivate.delete(`/user/${userId}/delete`);
export const checkOwnerPage = (userId) =>
  APIPrivate.get(`/user/${userId}/checkOwnerPage`);
export const checkIsAdmin = (userId) =>
  APIPrivate.get(`/user/${userId}/checkIsAdmin`);
