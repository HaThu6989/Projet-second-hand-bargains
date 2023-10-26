import { GET_ALL_PRODUCTS, CREATE_NEW_PRODUCT } from "../actions/ProductAction";

const initialState = {
  allProducts: null,
  productDetail: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: action.payload };
    case CREATE_NEW_PRODUCT:
      console.log("action.payload", action.payload);
      return { ...state, allProducts: [...state.allProducts, action.payload] };
    default:
      return state;
  }
};
