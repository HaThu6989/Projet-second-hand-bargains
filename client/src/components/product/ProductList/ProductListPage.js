import React, { useContext, useEffect } from "react";
import ProductCart from "./ProductCart";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/auth.context";
import { getUserDetail } from "../../../redux/actions/UserAction";

const ProductListPage = ({ allProducts }) => {
  const { user } = useContext(AuthContext);
  const userDetail = useSelector((state) => state.userReducer.userDetail);
  const dispatch = useDispatch(getUserDetail(user?._id));

  useEffect(() => {
    dispatch(getUserDetail(user?._id));
  }, [user]);

  return (
    <div className="product-list-page-container">
      <h2>Toutes nos annonces</h2>

      <div className="product-carts-container">
        {allProducts?.map((product) => {
          const isFavourite = userDetail?.favouriteProducts?.some(
            (elm) => elm?._id === product?._id
          );

          return (
            <ProductCart
              userDetail={userDetail}
              product={product}
              isFavourite={isFavourite}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductListPage;
