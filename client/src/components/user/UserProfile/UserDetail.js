import React from "react";
import { Link } from "react-router-dom";

function UserDetail({ userDetail }) {
  return (
    <div className="user-detail">
      <h2 className="user-title-profile-CRUD">
        Bonjour <span>{userDetail?.username}</span> !
      </h2>
      <table className="user-detail-table">
        <tr>
          <th>Nom</th>
          <td>{userDetail?.username}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{userDetail?.email}</td>
        </tr>
        <tr>
          <th>N° téléphone</th>
          <td>{userDetail?.numberPhone}</td>
        </tr>
        <tr>
          <th>Adresse</th>
          <td>{userDetail?.address}</td>
        </tr>
      </table>
      <Link to={`/${userDetail?._id}/update`}>Mise à jour</Link>
    </div>
  );
}

export default UserDetail;
