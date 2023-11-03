import * as UserApi from "../api/UserApi";

export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const GET_AUTHTOKEN = "GET_AUTHTOKEN";
export const CHECK_OWNER_PAGE = "CHECK_OWNER_PAGE";

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
