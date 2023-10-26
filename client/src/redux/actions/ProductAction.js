import * as ProductApi from "../api/ProductApi";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const CREATE_NEW_PRODUCT = "CREATE_NEW_PRODUCT";

export const getAllProducts = () => async (dispatch) => {
  const allProducts = await ProductApi.getAllProducts();
  dispatch({ type: "GET_ALL_PRODUCTS", payload: allProducts.data });
};

export const createNewProduct = (request) => async (dispatch) => {
  const newProduct = await ProductApi.createNewProduct(request);
  console.log("newProduct", newProduct.data);
  dispatch({ type: "CREATE_NEW_PRODUCT", payload: newProduct.data });
};
