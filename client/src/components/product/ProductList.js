import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/auth.context";
import { getUserDetail } from "../../redux/actions/UserAction";
import IsFavourite from "./IsFavourite";
import DeleteProduct from "./CRUD/DeleteProduct";

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
    <div className="product-list">
      <h1> All Products</h1>
      {allProducts?.map((product) => {
        const isFavourite = userDetail?.favouriteProducts.some(
          (elm) => elm._id === product?._id
        );
        const isOwner = user?._id && user?._id === product?.seller?._id;

        return (
          <div key={product?._id} className="product-card">
            <div className="title">
              <Link to={`/productList/${product?._id}`}>
                <h2>{product?.name}</h2>
              </Link>
            </div>
            {user?._id && (
              <IsFavourite
                user={user}
                userDetail={userDetail}
                isFavourite={isFavourite}
                productSelected={product}
              />
            )}
            {isOwner && (
              <DeleteProduct
                userDetail={userDetail}
                productSelected={product}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
