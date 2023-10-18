import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [favouriteProducts, setFavouriteProducts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/product/allProducts`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const requets = {
      favouriteProducts: favouriteProducts,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/${user?._id}/edit`, requets)
      .then((response) => {
        console.log("response.data", response.data);
      })
      .catch((error) => console.log(error));
  }, [favouriteProducts]);

  // Add/remove from favorite list
  const toggleFavorite = (productClicked) => {
    if (favouriteProducts.includes(productClicked)) {
      // Remove productClicked from favouriteProducts
      // return favouriteProducts updated
      const updatedFavoritesProducts = favouriteProducts?.filter(
        (elm) => elm?._id !== productClicked?._id
      );
      setFavouriteProducts(updatedFavoritesProducts);
    } else {
      // Add to favorites
      setFavouriteProducts([...favouriteProducts, productClicked]);
    }
  };

  console.log("favouriteProducts", favouriteProducts);

  return (
    <div className="product-list">
      <h1> All Products</h1>
      {products?.map((product) => (
        <div key={product?.id} className="product-card">
          <h2>{product?.name}</h2>
          {user?._id && (
            <button
              className={`${
                favouriteProducts?.includes(product)
                  ? "remove-favourite"
                  : "add-favourite"
              }`}
              onClick={() => {
                toggleFavorite(product);
              }}
            ></button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
