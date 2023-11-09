import React, { useContext, useEffect } from "react";
import ProductCart from "./ProductCart";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/auth.context";
import { getUserDetail } from "../../../redux/actions/UserAction";
import { useLocation } from "react-router-dom";

const ProductListPage = ({ allProducts }) => {
  const { user } = useContext(AuthContext);
  const userDetail = useSelector((state) => state.userReducer.userDetail);
  const dispatch = useDispatch(getUserDetail(user?._id));
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");
  const searchCategory = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    dispatch(getUserDetail(user?._id));
  }, [user]);

  const productListToRender = allProducts.filter((elm) => {
    if (searchQuery) {
      return elm.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchCategory) {
      return elm.category === searchCategory;
    } else if (!searchCategory && !searchCategory) {
      return elm;
    } else {
      return null;
    }
  });

  return (
    <div className="product-list-page-container">
      {productListToRender?.length > 0 ? (
        <h2>
          Toutes nos annonces{" "}
          {searchQuery
            ? `concernant "${searchQuery}"`
            : searchCategory
            ? `concernant "${searchCategory}"`
            : ""}
        </h2>
      ) : (
        <h2>Aucun résultat</h2>
      )}

      <div className="product-carts-container">
        {productListToRender?.map((product) => {
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
