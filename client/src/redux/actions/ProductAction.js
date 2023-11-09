import * as ProductApi from "../api/ProductApi";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const CREATE_NEW_PRODUCT = "CREATE_NEW_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const GET_ONE_PRODUCT = "GET_ONE_PRODUCT";

export const getAllProducts = () => async (dispatch) => {
  const allProducts = await ProductApi.getAllProducts();
  dispatch({ type: "GET_ALL_PRODUCTS", payload: allProducts.data });
};

export const createNewProduct = (request) => async (dispatch) => {
  const newProduct = await ProductApi.createNewProduct(request);
  dispatch({ type: "CREATE_NEW_PRODUCT", payload: newProduct.data });
};

export const updateProduct = (id, request) => async (dispatch) => {
  const productUpdated = await ProductApi.updateProduct(id, request);
  dispatch({ type: "UPDATE_PRODUCT", payload: productUpdated.data });
};

export const deleteProduct = (id) => async (dispatch) => {
  const productDeletedId = await ProductApi.deleteProduct(id);
  dispatch({ type: "DELETE_PRODUCT", payload: productDeletedId.data });
};

export const getOneProduct = (id) => async (dispatch) => {
  const productDetail = await ProductApi.getOneProduct(id);
  dispatch({ type: "GET_ONE_PRODUCT", payload: productDetail.data });
};
