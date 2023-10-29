import React, { useState } from "react";
import { useDispatch } from "react-redux";

import deleteicon from "../../../assets/delete-icon.jpg";
import ModalConfirmDelete from "../../product/CRUD/ModalConfirmDelete";
import { getUserDetail, updateUser } from "../../../redux/actions/UserAction";

function UserProductsFavourite({ userDetail }) {
  const [openModalDeleteFavourite, setOpenModalDeleteFavourite] =
    useState(false);
  const [productSelected, setProductSelected] = useState();

  const dispatch = useDispatch();

  const handleDeleteProductFavourite = () => {
    const updatedFavoritesProducts = userDetail?.favouriteProducts?.filter(
      (elm) => elm?._id !== productSelected?._id
    );
    const request = {
      favouriteProducts: updatedFavoritesProducts,
    };
    dispatch(updateUser(userDetail?._id, request));
    dispatch(getUserDetail(userDetail?._id));
    setOpenModalDeleteFavourite(false);
  };

  const handleShowDelete = (productToDelete) => {
    setOpenModalDeleteFavourite(!openModalDeleteFavourite);
    setProductSelected(productToDelete);
  };

  return (
    <>
      <div className="user-list-products favourite">
        <div className="container-title">
          <h3>Annonces favorites</h3>
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
            {userDetail?.favouriteProducts.map((elm, index) => {
              return (
                <tr>
                  <td className="index"> {index + 1} </td>
                  <td className="name">{elm.name}</td>
                  <td className="price">{elm.price}€</td>
                  <td className="delete">
                    <button
                      type="button"
                      className="button-delete"
                      onClick={() => handleShowDelete(elm)}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Supprimer"
                    >
                      <img src={deleteicon} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {openModalDeleteFavourite && (
        <ModalConfirmDelete
          setOpenModalDelete={setOpenModalDeleteFavourite}
          handleDelete={handleDeleteProductFavourite}
        />
      )}
    </>
  );
}

export default UserProductsFavourite;
