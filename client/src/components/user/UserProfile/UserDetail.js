import React from "react";
import { Link } from "react-router-dom";

function UserDetail({ userDetail, isOwnerPage }) {
  const firstLetterUsernameSeller = userDetail?.username
    ?.split("")[0]
    ?.toLowerCase();

  const firstLetterEmailSeller = userDetail?.email?.split("")[0]?.toLowerCase();

  return (
    <div className="user-detail">
      <div className="seller-slogan-username">
        <div className="seller-slogan">
          {firstLetterUsernameSeller?.toUpperCase() ||
            firstLetterEmailSeller?.toUpperCase() ||
            ".."}
        </div>
        <h2 className="seller-username text-ellipsis-table">
          {userDetail?.username?.toUpperCase() || userDetail?.email}
        </h2>
      </div>

      <table className="user-detail-table">
        <tr>
          <th>Nom</th>
          <td className="text-ellipsis-table username">
            {userDetail?.username}
          </td>
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
