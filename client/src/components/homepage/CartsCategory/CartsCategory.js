import React from "react";
import CartCategory from "./CartCategory";

const CartsCategory = () => {
  return (
    <>
      <div className="container-cart-category">
        <div className="heading">
          <i className="fa-solid fa-border-all"></i>
          <h2>Toutes les catégories </h2>
        </div>
        <CartCategory />
      </div>
    </>
  );
};

export default CartsCategory;
