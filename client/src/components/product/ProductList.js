import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/auth.context";
import { getUserDetail } from "../../redux/actions/UserAction";
import Header from "../../common/header/Header";
import IsFavourite from "./IsFavourite";

const ProductList = ({ allProducts }) => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getUserDetail(user?._id));
    }
  }, [user?._id]);

  const userDetail = useSelector((state) => state.userReducer.userDetail);

  return (
    <>
      <Header />
      <div className="product-list">
        <h1> All Products</h1>
        {allProducts?.map((product) => {
          const isFavourite = userDetail?.favouriteProducts.some(
            (elm) => elm._id === product?._id
          );
          return (
            <div key={product?._id} className="product-card">
              <h2>{product?.name}</h2>
              {user?._id && (
                <IsFavourite
                  user={user}
                  userDetail={userDetail}
                  isFavourite={isFavourite}
                  product={product}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
