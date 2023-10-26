import React from "react";

function UserProductsFavourite({ userDetail }) {
  console.log("userDetail", userDetail);
  return (
    <div className="user-list-products favourite">
      <h3>Vos produits préférés</h3>
      <table className="user-list-products-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {userDetail?.favouriteProducts.map((elm, index) => {
            return (
              <tr>
                <td> {index + 1} </td>
                <td>{elm.name}</td>
                <td>{elm.price}€</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserProductsFavourite;
