import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../../../redux/actions/ProductAction";
import InfoUser from "./InfoUser";
import InfoProduct from "./InfoProduct";

function ProductPage() {
  const { productId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneProduct(productId));
  }, [productId]);

  const productSelected = useSelector(
    (state) => state.productReducer.productDetail
  );

  return (
    <div className="product-detail-container">
      <div className="info-product-user-container">
        <InfoProduct productSelected={productSelected} />
        <InfoUser productSelected={productSelected} />
      </div>
      <div className="description-container">
        <div className="description-title">Description</div>
        <div
          className="description-content"
          dangerouslySetInnerHTML={{ __html: productSelected?.description }}
        />
      </div>
    </div>
  );
}

export default ProductPage;
