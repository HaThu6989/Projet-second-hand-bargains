import {
  GET_ALL_PRODUCTS,
  CREATE_NEW_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ONE_PRODUCT,
} from "../actions/ProductAction";

const initialState = {
  allProducts: [],
  productDetail: null,
  productsAfterSearch: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: action.payload };
    case GET_ONE_PRODUCT:
      return { ...state, productDetail: action.payload };
    case CREATE_NEW_PRODUCT:
      return { ...state, allProducts: [...state.allProducts, action.payload] };
    case UPDATE_PRODUCT:
      const productUpdated = action.payload;
      const allProductsAfterUpdate = state.allProducts.map((product) => {
        if (product?._id === productUpdated?._id) {
          return productUpdated;
        } else {
          return product;
        }
      });
      return { ...state, allProducts: allProductsAfterUpdate };
    case DELETE_PRODUCT:
      const allProductsAfterDelete = state.allProducts.filter((elm) => {
        return elm._id !== action.payload;
      });
      return { ...state, allProducts: allProductsAfterDelete };
    default:
      return state;
  }
};
