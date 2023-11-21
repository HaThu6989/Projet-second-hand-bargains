import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import deleteicon from "../../../assets/button/delete-icon.jpg";
import { AuthContext } from "../../../context/auth.context";
import { getAllUsers } from "../../../redux/actions/UserAction";

function UserList() {
  const { admin } = useContext(AuthContext);
  const allUsers = useSelector((state) => state.userReducer.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers(admin?._id));
  }, [admin]);

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
                    <Link to={`/${elm._id}/page`} className="text-ellipsis">
                      {elm.username}
                    </Link>
                  </td>
                  <td className="email">{elm.email}€</td>
                  <td className="delete">
                    <div>
                      <button
                        type="button"
                        className="button-delete"
                        // onClick={() => handleShowDelete(elm)}
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
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
