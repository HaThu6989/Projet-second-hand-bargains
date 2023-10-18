import React from "react";
import CartCategory from "./Cart";

const Carts = () => {
  return (
    <>
      <div className="container-cart-category">
        <div className="heading">
          <i className="fa-solid fa-border-all"></i>
          <h2>All categories </h2>
        </div>
        <CartCategory />
      </div>
    </>
  );
};

export default Carts;
