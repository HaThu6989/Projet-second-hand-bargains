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

export const getUserDetail = (userId) => APIPrivate.get(`/user/${userId}`);
export const updateUser = (userId, request) =>
  APIPrivate.put(`/user/${userId}/update`, request);
