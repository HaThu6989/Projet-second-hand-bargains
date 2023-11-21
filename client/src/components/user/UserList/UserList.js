import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import deleteicon from "../../../assets/button/delete-icon.jpg";
import { AuthContext } from "../../../context/auth.context";
import { deleteUser, getAllUsers } from "../../../redux/actions/UserAction";
import ModalConfirmDelete from "../../../common/CRUD/ModalConfirmDelete";

function UserList() {
  const { admin } = useContext(AuthContext);
  const allUsers = useSelector((state) => state.userReducer.allUsers);
  const dispatch = useDispatch();

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [userSelected, setUserSelected] = useState();

  useEffect(() => {
    dispatch(getAllUsers(admin?._id));
  }, [admin]);

  const handleShowDelete = (userToDelete) => {
    setOpenModalDelete(!openModalDelete);
    setUserSelected(userToDelete);
  };

  const handleDeleteUser = () => {
    console.log("userSelected", userSelected);
    dispatch(deleteUser(admin?._id, userSelected?._id));
    setOpenModalDelete(false);
  };
  return (
    <div className="user-list-page-container">
      <h2>Utilisateurs</h2>
      <table className="user-list-table">
        <thead>
          <tr>
            <th className="index">#</th>
            <th className="name">Nom</th>
            <th className="email">Email</th>
            <th className="delete">Supp</th>
          </tr>
        </thead>
        <tbody>
          {allUsers
            ?.filter((elm) => elm.email !== "admin@gmail.com")
            .map((elm, index) => {
              return (
                <tr key={index}>
                  <td className="index"> {index + 1} </td>
                  <td className="name">
                    <Link to={`/${elm._id}/page`}>
                      <div className="text-ellipsis-table">{elm.username}</div>
                    </Link>
                  </td>
                  <td className="email">
                    <Link to={`/${elm._id}/page`}>
                      <div className="text-ellipsis-table">{elm.email}</div>
                    </Link>
                  </td>
                  <td className="delete">
                    <div>
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
                    </div>
                  </td>
                </tr>
              );
            })}
          {openModalDelete && (
            <ModalConfirmDelete
              setOpenModalDelete={setOpenModalDelete}
              handleDelete={handleDeleteUser}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
