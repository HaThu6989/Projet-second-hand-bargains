import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, updateUser } from "../../../redux/actions/UserAction";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserDetail(userId));
  }, []);

  const userDetail = useSelector((state) => state.userReducer.userDetail);

  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [numberPhone, setNumberPhone] = useState("");

  useEffect(() => {
    if (userDetail) {
      setUsername(userDetail?.username);
      setAddress(userDetail?.address);
      setNumberPhone(userDetail?.numberPhone);
    }
  }, [userDetail]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const request = {
      username: username,
      address: address,
      numberPhone: numberPhone,
    };
    dispatch(updateUser(userId, request));
    dispatch(getUserDetail(userId));
    navigate(`/${userId}/page`);
  };

  return (
    <div className="form-auth">
      <h1 className="user-title-profile-CRUD" style={{ padding: "20px 0" }}>
        Mise à jour de votre compte
      </h1>
      <form onSubmit={handleUpdate}>
        <div className="box-label-input signup">
          <label>Nom</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="box-label-input signup">
          <label>Adresse</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="box-label-input signup">
          <label>N° de téléphone</label>
          <input
            type="text"
            name="numberPhone"
            value={numberPhone}
            onChange={(e) => setNumberPhone(e.target.value)}
          />
        </div>
        <button variant="success" type="submit" className="my-2">
          Mise à jour
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
