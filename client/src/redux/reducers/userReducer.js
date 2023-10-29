import { GET_USER, UPDATE_USER, GET_AUTHTOKEN } from "../actions/UserAction";

const initialState = {
  userDetail: null,
  token: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, userDetail: action.payload };
    case GET_AUTHTOKEN:
      return { ...state, token: action.payload };
    case UPDATE_USER:
      return { ...state, userDetail: action.payload };
    default:
      return state;
  }
};
