import * as UserApi from "../api/UserApi";

export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const GET_AUTHTOKEN = "GET_AUTHTOKEN";
export const CHECK_OWNER_PAGE = "CHECK_OWNER_PAGE";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const DELETE_USER = "DELETE_USER";

export const getUserDetail = (userId) => async (dispatch) => {
  const userDetail = await UserApi.getUserDetail(userId);
  dispatch({ type: "GET_USER", payload: userDetail.data });
};

export const updateUser = (userId, request) => async (dispatch) => {
  const userUpdated = await UserApi.updateUser(userId, request);
  dispatch({ type: "UPDATE_USER", payload: userUpdated.data });
};

export const checkOwnerPage = (userId) => async (dispatch) => {
  const isOwnerPage = await UserApi.checkOwnerPage(userId);
  dispatch({ type: "CHECK_OWNER_PAGE", payload: isOwnerPage });
};

export const getAllUsers = (adminId) => async (dispatch) => {
  const allUsers = await UserApi.getAllUsers(adminId);
  dispatch({ type: "GET_ALL_USERS", payload: allUsers.data });
};

export const deleteUser = (id) => async (dispatch) => {
  const userDeletedId = await UserApi.deleteUser(id);
  dispatch({ type: "DELETE_USER", payload: userDeletedId.data });
};
