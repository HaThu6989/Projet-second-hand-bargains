import {
  GET_USER,
  UPDATE_USER,
  GET_AUTHTOKEN,
  CHECK_OWNER_PAGE,
} from "../actions/UserAction";

const initialState = {
  userDetail: null,
  token: null,
  isOwnerPage: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, userDetail: action.payload };
    case GET_AUTHTOKEN:
      return { ...state, token: action.payload };
    case UPDATE_USER:
      return { ...state, userDetail: action.payload };
    case CHECK_OWNER_PAGE:
      if (action.payload.data.isOwnerPage === false) {
        return { ...state, isOwnerPage: false };
      } else {
        return { ...state, isOwnerPage: true };
      }
    default:
      return state;
  }
};
