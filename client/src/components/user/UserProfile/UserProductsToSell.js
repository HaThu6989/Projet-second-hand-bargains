import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteProduct from "../../product/CRUD/DeleteProduct";

function UserProductsToSell({ userDetail }) {
  return (
    <div className="user-list-products to-sell">
      <div className="container-title">
        <h3>Mes annonces</h3>
        <Link to={`/${userDetail?._id}/createNewProduct`}>
          Déposer une annonce
        </Link>
      </div>
      <table className="user-list-products-table">
        <thead>
          <tr>
            <th className="index">#</th>
            <th className="name">Nom</th>
            <th className="price">Prix</th>
            <th className="delete">Supp</th>
          </tr>
        </thead>
        <tbody>
          {userDetail?.ownerProducts.map((elm, index) => {
            return (
              <tr>
                <td className="index"> {index + 1} </td>
                <td className="name">{elm.name}</td>
                <td className="price">{elm.price}€</td>
                <td className="delete">
                  <DeleteProduct
                    userDetail={userDetail}
                    productSelected={elm}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserProductsToSell;
