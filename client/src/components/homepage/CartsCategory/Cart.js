import React from "react";
import Ndata from "./Ndata";

const CartCategory = () => {
  return (
    <>
      <div className="box-cart-category">
        {Ndata.map((val, index) => {
          return (
            <div
              style={{ backgroundImage: "url(" + val.cover + ")" }}
              className="box"
              key={index}
            >
              <div className="title-category">
                <h4>{val.name}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CartCategory;
