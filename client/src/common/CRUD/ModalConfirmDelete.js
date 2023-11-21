import React from "react";

function ModalConfirmDelete({ setOpenModalDelete, handleDelete }) {
  return (
    <div className="modal-confirm-delete">
      <h3>Voulez-vous vraiment le supprimer ?</h3>
      <div className="response-confirm-delete">
        <button onClick={handleDelete}>Oui</button>
        <button onClick={() => setOpenModalDelete(false)}>Non</button>
      </div>
    </div>
  );
}

export default ModalConfirmDelete;
