import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getUserDetail = (userId) => API.get(`/user/${userId}`);
export const updateUser = (userId, request) =>
  API.put(`/user/${userId}/update`, request);
