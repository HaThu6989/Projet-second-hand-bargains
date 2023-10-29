import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../../redux/actions/ProductAction";

function ProductDetail() {
  const { productId } = useParams();

  console.log("productId", productId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneProduct(productId));
  }, [productId]);

  const productSelected = useSelector(
    (state) => state.productReducer.productDetail
  );
  console.log("productSelected", productSelected);

  return (
    <div className="container-product-detail">
      <h2>
        {productSelected?.name} <span> - {productSelected?.price}€ </span>
      </h2>
      <div className="seller">
        <div className="seller-slogan">
          {productSelected?.seller.username.split("")[0]}
        </div>
        <p className="seller-username">{productSelected?.seller.username}</p>
      </div>
      <p>{productSelected?.description}</p>
    </div>
  );
}

export default ProductDetail;
