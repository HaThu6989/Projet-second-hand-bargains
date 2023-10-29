import {
  GET_ALL_PRODUCTS,
  CREATE_NEW_PRODUCT,
  DELETE_PRODUCT,
  GET_ONE_PRODUCT,
} from "../actions/ProductAction";

const initialState = {
  allProducts: null,
  productDetail: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: action.payload };
    case GET_ONE_PRODUCT:
      return { ...state, productDetail: action.payload };
    case CREATE_NEW_PRODUCT:
      return { ...state, allProducts: [...state.allProducts, action.payload] };
    case DELETE_PRODUCT:
      const allProductsUpdated = state.allProducts.filter((elm) => {
        return elm._id !== action.payload;
      });
      return { ...state, allProducts: allProductsUpdated };
    default:
      return state;
  }
};
