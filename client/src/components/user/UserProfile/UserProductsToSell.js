import React from "react";
import { Link } from "react-router-dom";
import DeleteProduct from "../../product/CRUD/DeleteProduct";
import updateIcon from "../../../assets/button/edit-icon.jpg";

function UserProductsToSell({ userDetail, isOwnerPage }) {
  return (
    <div className="user-list-products">
      <div className="container-title">
        <h3>Mes annonces</h3>
        {isOwnerPage && (
          <Link to={`/${userDetail?._id}/createNewProduct`}>
            Déposer une annonce
          </Link>
        )}
      </div>
      <table className="user-list-products-table">
        <thead>
          <tr>
            <th className="index">#</th>
            <th className="name">Nom</th>
            <th className="price">Prix</th>
            {isOwnerPage && <th className="delete">Supp</th>}
          </tr>
        </thead>
        <tbody>
          {userDetail?.ownerProducts.map((elm, index) => {
            return (
              <tr key={index}>
                <td className="index"> {index + 1} </td>
                <td className="name">
                  <Link to={`/productList/${elm._id}`}>{elm.name}</Link>
                </td>
                <td className="price">{elm.price}€</td>
                {isOwnerPage && (
                  <td className="delete-update-container">
                    <div className="delete-update">
                      <DeleteProduct
                        userDetail={userDetail}
                        productSelected={elm}
                      />
                      <Link
                        to={`/productList/${elm._id}/update`}
                        state={{ data: elm }}
                        className="button-update"
                        title="Editer"
                      >
                        <img src={updateIcon} />
                      </Link>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserProductsToSell;
