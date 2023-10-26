import { GET_USER, UPDATE_USER } from "../actions/UserAction";

const initialState = {
  userDetail: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, userDetail: action.payload };
    case UPDATE_USER:
      return { ...state, userDetail: action.payload };
    default:
      return state;
  }
};
