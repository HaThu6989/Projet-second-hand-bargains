import React, { useState } from "react";
import deleteicon from "../../../assets/button/delete-icon.jpg";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/actions/ProductAction";
import ModalConfirmDelete from "./ModalConfirmDelete";

function DeleteProduct(props) {
  const { productSelected } = props;
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(productSelected?._id));
    setOpenModalDelete(false);
  };

  return (
    <>
      <button
        type="button"
        className="button-delete"
        onClick={() => setOpenModalDelete(!openModalDelete)}
        data-toggle="tooltip"
        data-placement="top"
        title="Supprimer"
      >
        <img src={deleteicon} />
      </button>
      {openModalDelete && (
        <ModalConfirmDelete
          setOpenModalDelete={setOpenModalDelete}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
}

export default DeleteProduct;
