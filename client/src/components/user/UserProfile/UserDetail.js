import React from "react";
import { Link } from "react-router-dom";

function UserDetail({ userDetail, isOwnerPage }) {
  return (
    <div className="user-detail">
      <div className="seller-slogan-username">
        <div className="seller-slogan">
          {userDetail?.username?.split("")[0].toUpperCase()}
        </div>
        <h2 className="seller-username">
          {userDetail?.username?.toUpperCase()}
        </h2>
      </div>

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
      {isOwnerPage && (
        <Link to={`/${userDetail?._id}/update`}>Mise à jour</Link>
      )}
    </div>
  );
}

export default UserDetail;
